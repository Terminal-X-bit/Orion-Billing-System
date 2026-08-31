import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Transaction } from '../types'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all transactions
  const fetchTransactions = async () => {
    if (!supabase) {
      setError('Supabase is not configured')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (fetchError) throw fetchError

      setTransactions(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch transactions'
      setError(message)
      console.error('Error fetching transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create a new transaction
  const createTransaction = async (
    customerName: string,
    method: 'M-Pesa' | 'Voucher' | 'Airtel Money' | 'Card',
    packageName: string,
    amount: string,
    status: 'Paid' | 'Pending' | 'Failed' = 'Paid'
  ) => {
    if (!supabase) {
      setError('Supabase is not configured')
      return false
    }

    try {
      const id = generateTransactionId()
      const timeDisplay = formatTimeDisplay(new Date())

      const { error: insertError } = await supabase.from('transactions').insert({
        id,
        customer_name: customerName,
        method,
        package_name: packageName,
        amount,
        status,
        time_display: timeDisplay,
      })

      if (insertError) throw insertError

      await fetchTransactions()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create transaction'
      setError(message)
      console.error('Error creating transaction:', err)
      return false
    }
  }

  // Update transaction status
  const updateTransactionStatus = async (id: string, status: 'Paid' | 'Pending' | 'Failed') => {
    if (!supabase) {
      setError('Supabase is not configured')
      return false
    }

    try {
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ status })
        .eq('id', id)

      if (updateError) throw updateError

      await fetchTransactions()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update transaction'
      setError(message)
      console.error('Error updating transaction:', err)
      return false
    }
  }

  // Get transactions by customer
  const getTransactionsByCustomer = (customerName: string) => {
    return transactions.filter((t) => t.customer_name === customerName)
  }

  // Get transactions by method
  const getTransactionsByMethod = (method: string) => {
    return transactions.filter((t) => t.method === method)
  }

  // Get transactions by status
  const getTransactionsByStatus = (status: string) => {
    return transactions.filter((t) => t.status === status)
  }

  // Get total revenue
  const getTotalRevenue = () => {
    return transactions
      .filter((t) => t.status === 'Paid')
      .reduce((total, t) => {
        const amount = parseFloat(t.amount.replace(/[^0-9.]/g, ''))
        return total + amount
      }, 0)
  }

  // Get pending transactions
  const getPendingTransactions = () => transactions.filter((t) => t.status === 'Pending')

  // Get failed transactions
  const getFailedTransactions = () => transactions.filter((t) => t.status === 'Failed')

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransactionStatus,
    getTransactionsByCustomer,
    getTransactionsByMethod,
    getTransactionsByStatus,
    getTotalRevenue,
    getPendingTransactions,
    getFailedTransactions,
  }
}

function generateTransactionId(): string {
  const num = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `#TRX-${num}`
}

function formatTimeDisplay(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  return date.toLocaleDateString()
}
