import { useState } from 'react'
import { Copy, Download, RefreshCw, Trash2, Ticket, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useVouchers } from '../hooks/useVouchers'

export function VouchersManager() {
  const {
    vouchers,
    loading,
    error,
    generateVouchers,
    deleteVoucher,
    getAvailableCount,
    getRedeemedCount,
  } = useVouchers()

  const [showGenerator, setShowGenerator] = useState(false)
  const [count, setCount] = useState(10)
  const [selectedPackage, setSelectedPackage] = useState('1 Hour Unlimited Rush')
  const [generating, setGenerating] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const packages = [
    '1 Hour Unlimited Rush',
    '24h Day Pass Unlimited',
    '7 Day Access',
    '30 Day Subscription',
    '5 GB Data',
  ]

  const handleGenerate = async () => {
    setGenerating(true)
    const success = await generateVouchers(count, selectedPackage)
    setGenerating(false)

    if (success) {
      setShowGenerator(false)
      setCount(10)
    }
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this voucher?')) {
      await deleteVoucher(id)
    }
  }

  const handleDownloadCSV = () => {
    const csv = [
      ['Code', 'Package', 'Status', 'Redeemed By', 'Redeemed At', 'Created At'],
      ...vouchers.map((v) => [
        v.code,
        v.package_name,
        v.status,
        v.redeemed_by || '-',
        v.redeemed_at ? new Date(v.redeemed_at).toLocaleString() : '-',
        new Date(v.created_at).toLocaleString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vouchers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ticket className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold">Vouchers Manager</h2>
        </div>
        <button
          onClick={() => setShowGenerator(!showGenerator)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
        >
          + Generate Vouchers
        </button>
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
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="text-3xl font-bold text-blue-700">{vouchers.length}</div>
          <div className="text-sm text-blue-600">Total Vouchers</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="text-3xl font-bold text-green-700">{getAvailableCount()}</div>
          <div className="text-sm text-green-600">Available</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <div className="text-3xl font-bold text-purple-700">{getRedeemedCount()}</div>
          <div className="text-sm text-purple-600">Redeemed</div>
        </div>
      </div>

      {/* Generator Form */}
      {showGenerator && (
        <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg space-y-4">
          <h3 className="font-bold text-lg text-orange-900">Generate New Vouchers</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Vouchers
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package</label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {packages.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 transition font-medium"
            >
              {generating ? 'Generating...' : 'Generate'}
            </button>
            <button
              onClick={() => setShowGenerator(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Vouchers List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg">Voucher Codes</h3>
          {vouchers.length > 0 && (
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>

        {loading && (
          <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Loading vouchers...
          </div>
        )}

        {!loading && vouchers.length === 0 && (
          <div className="p-8 text-center text-gray-500">No vouchers generated yet.</div>
        )}

        {!loading && vouchers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Code</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Package</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Redeemed By</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Created</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {voucher.code}
                        </code>
                        <button
                          onClick={() => handleCopy(voucher.code)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition"
                          title="Copy code"
                        >
                          {copiedCode === voucher.code ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{voucher.package_name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          voucher.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {voucher.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {voucher.redeemed_by || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {new Date(voucher.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {voucher.status === 'available' && (
                        <button
                          onClick={() => handleDelete(voucher.id)}
                          className="p-1 text-red-400 hover:text-red-600 transition"
                          title="Delete voucher"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
