import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Voucher } from '../types'

export function useVouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all vouchers
  const fetchVouchers = async () => {
    if (!supabase) {
      setError('Supabase is not configured')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('vouchers')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      const mappedVouchers: Voucher[] = (data || []).map((v) => ({
        ...v,
        status: v.redeemed_at ? 'redeemed' : 'available',
      }))

      setVouchers(mappedVouchers)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch vouchers'
      setError(message)
      console.error('Error fetching vouchers:', err)
    } finally {
      setLoading(false)
    }
  }

  // Generate new vouchers
  const generateVouchers = async (count: number, packageName: string) => {
    if (!supabase) {
      setError('Supabase is not configured')
      return false
    }

    try {
      const newVouchers = Array.from({ length: count }).map(() => ({
        code: generateVoucherCode(),
        package_name: packageName,
        redeemed_by: null,
        redeemed_at: null,
      }))

      const { error: insertError } = await supabase.from('vouchers').insert(newVouchers)

      if (insertError) throw insertError

      await fetchVouchers()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate vouchers'
      setError(message)
      console.error('Error generating vouchers:', err)
      return false
    }
  }

  // Redeem a voucher
  const redeemVoucher = async (code: string, customerName: string) => {
    if (!supabase) {
      setError('Supabase is not configured')
      return false
    }

    try {
      const { error: updateError } = await supabase
        .from('vouchers')
        .update({
          redeemed_by: customerName,
          redeemed_at: new Date().toISOString(),
        })
        .eq('code', code)

      if (updateError) throw updateError

      await fetchVouchers()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to redeem voucher'
      setError(message)
      console.error('Error redeeming voucher:', err)
      return false
    }
  }

  // Delete a voucher (only unredeemed)
  const deleteVoucher = async (id: string) => {
    if (!supabase) {
      setError('Supabase is not configured')
      return false
    }

    try {
      const { error: deleteError } = await supabase
        .from('vouchers')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      await fetchVouchers()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete voucher'
      setError(message)
      console.error('Error deleting voucher:', err)
      return false
    }
  }

  // Get available vouchers count
  const getAvailableCount = () => vouchers.filter((v) => v.status === 'available').length

  // Get redeemed vouchers count
  const getRedeemedCount = () => vouchers.filter((v) => v.status === 'redeemed').length

  useEffect(() => {
    fetchVouchers()
  }, [])

  return {
    vouchers,
    loading,
    error,
    fetchVouchers,
    generateVouchers,
    redeemVoucher,
    deleteVoucher,
    getAvailableCount,
    getRedeemedCount,
  }
}

function generateVoucherCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORION-${timestamp}-${random}`
}
