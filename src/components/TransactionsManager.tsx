import { useState } from 'react'
import { ReceiptText, RefreshCw, Filter, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import type { Transaction } from '../types'

export function TransactionsManager() {
  const {
    transactions,
    loading,
    error,
    getTransactionsByStatus,
    getTransactionsByMethod,
    getTotalRevenue,
    getPendingTransactions,
  } = useTransactions()

  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'failed'>('all')
  const [methodFilter, setMethodFilter] = useState<'all' | 'M-Pesa' | 'Voucher' | 'Airtel Money' | 'Card'>(
    'all'
  )

  const getFilteredTransactions = () => {
    let filtered = transactions

    if (filter !== 'all') {
      filtered = getTransactionsByStatus(filter.charAt(0).toUpperCase() + filter.slice(1))
    }

    if (methodFilter !== 'all') {
      filtered = filtered.filter((t) => t.method === methodFilter)
    }

    return filtered
  }

  const filteredTransactions = getFilteredTransactions()
  const totalRevenue = getTotalRevenue()
  const pendingCount = getPendingTransactions().length

  const statuses: Array<'all' | 'paid' | 'pending' | 'failed'> = ['all', 'paid', 'pending', 'failed']
  const methods: Array<'all' | 'M-Pesa' | 'Voucher' | 'Airtel Money' | 'Card'> = [
    'all',
    'M-Pesa',
    'Voucher',
    'Airtel Money',
    'Card',
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ReceiptText className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold">Transactions</h2>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-800">{error}</div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <div className="text-xs text-green-600 font-medium">Total Revenue</div>
          </div>
          <div className="text-3xl font-bold text-green-700">
            KSh {totalRevenue.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <div className="text-xs text-yellow-600 font-medium">Pending</div>
          </div>
          <div className="text-3xl font-bold text-yellow-700">{pendingCount}</div>
          <div className="text-xs text-yellow-600 mt-1">transactions</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <ReceiptText className="w-4 h-4 text-blue-600" />
            <div className="text-xs text-blue-600 font-medium">Total Transactions</div>
          </div>
          <div className="text-3xl font-bold text-blue-700">{transactions.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    filter === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex flex-wrap gap-2">
              {methods.map((method) => (
                <button
                  key={method}
                  onClick={() => setMethodFilter(method)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    methodFilter === method
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {method === 'all' ? 'All' : method}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg">
            {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </h3>
        </div>

        {loading && (
          <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Loading transactions...
          </div>
        )}

        {!loading && filteredTransactions.length === 0 && (
          <div className="p-8 text-center text-gray-500">No transactions found.</div>
        )}

        {!loading && filteredTransactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Method</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Package</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {transaction.id}
                      </code>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{transaction.customer_name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        {transaction.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{transaction.package_name}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{transaction.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          transaction.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {transaction.time_display}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
