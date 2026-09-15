// Voucher type
export type Voucher = {
  id: string
  code: string
  package_name: string
  redeemed_by: string | null
  redeemed_at: string | null
  created_at: string
  status: 'available' | 'redeemed'
}

// Transaction type
export type Transaction = {
  id: string
  customer_name: string
  method: 'M-Pesa' | 'Voucher' | 'Airtel Money' | 'Card'
  package_name: string
  amount: string
  status: 'Paid' | 'Pending' | 'Failed'
  time_display: string
  created_at: string
}

// Package type for context
export type Package = {
  id: string
  name: string
  price_amount: number
  duration: string
  data_limit: string | null
  sales_count: number
  color: string
  is_active: boolean
  created_at: string
}
