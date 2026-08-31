import { useState } from 'react'
import { Ticket, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { useVouchers } from '../hooks/useVouchers'
import { useTransactions } from '../hooks/useTransactions'

interface RedeemVoucherProps {
  onSuccess?: () => void
  onClose?: () => void
}

export function RedeemVoucher({ onSuccess, onClose }: RedeemVoucherProps) {
  const { vouchers, redeemVoucher } = useVouchers()
  const { createTransaction } = useTransactions()

  const [voucherCode, setVoucherCode] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!voucherCode.trim()) {
      setMessage({ type: 'error', text: 'Please enter a voucher code' })
      return
    }

    if (!customerName.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name' })
      return
    }

    setLoading(true)

    try {
      // Find the voucher
      const voucher = vouchers.find(
        (v) => v.code.toLowerCase() === voucherCode.toLowerCase().trim()
      )

      if (!voucher) {
        setMessage({ type: 'error', text: 'Voucher code not found' })
        setLoading(false)
        return
      }

      if (voucher.status === 'redeemed') {
        setMessage({ type: 'error', text: 'This voucher has already been redeemed' })
        setLoading(false)
        return
      }

      // Redeem the voucher
      const redeemSuccess = await redeemVoucher(voucherCode.trim(), customerName.trim())

      if (!redeemSuccess) {
        setMessage({ type: 'error', text: 'Failed to redeem voucher. Please try again.' })
        setLoading(false)
        return
      }

      // Create a transaction record
      await createTransaction(
        customerName.trim(),
        'Voucher',
        voucher.package_name,
        'Voucher redemption',
        'Paid'
      )

      setMessage({
        type: 'success',
        text: `Successfully redeemed ${voucher.package_name} voucher!`,
      })

      setVoucherCode('')
      setCustomerName('')

      // Call success callback after a delay
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (err) {
      const errorText = err instanceof Error ? err.message : 'An error occurred'
      setMessage({ type: 'error', text: errorText })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 justify-center">
          <Ticket className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold">Redeem Voucher</h2>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            )}
            <div className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {message.text}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRedeem} className="space-y-4">
          <div>
            <label htmlFor="voucher-code" className="block text-sm font-medium text-gray-700 mb-2">
              Voucher Code
            </label>
            <input
              id="voucher-code"
              type="text"
              placeholder="e.g., ORION-ABC123-XYZ789"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the 15-character voucher code from your email or SMS
            </p>
          </div>

          <div>
            <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              id="customer-name"
              type="text"
              placeholder="John Doe"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 transition font-semibold flex items-center justify-center gap-2"
          >
            {loading ? 'Redeeming...' : 'Redeem Voucher'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          {onClose && (
            <button
              onClick={onClose}
              className="text-orange-500 hover:text-orange-600 font-medium underline"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
