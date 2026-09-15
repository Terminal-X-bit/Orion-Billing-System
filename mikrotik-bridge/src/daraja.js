// Safaricom Daraja (M-Pesa) client for STK Push.
// Zero external dependencies. Docs: https://developer.safaricom.co.ke
//
// Flow:
//   1. OAuth token (cached until expiry) from /oauth/v1/generate?grant_type=client_credentials
//   2. POST /mpesa/stkpush/v1/processrequest  -> CheckoutRequestID (+ MerchantRequestID)
//   3. Customer enters PIN on their phone; Safaricom POSTs the outcome to our
//      callback URL (handled in index.js) with ResultCode 0 = paid.
//   4. Optional reconciliation: query /mpesa/stkpushquery/v1/query for requests
//      whose callback never arrived.

const CALLBACK_TIMEOUT_MS = 90 * 1000

function timestampFor(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0')
  return (
    `${date.getFullYear()}` +
    p(date.getMonth() + 1) +
    p(date.getDate()) +
    p(date.getHours()) +
    p(date.getMinutes()) +
    p(date.getSeconds())
  )
}

/** Normalize to 2547XXXXXXXX / 2541XXXXXXXX as required by Daraja. */
function normalizePhone(input, defaultCountryCode = '254') {
  let digits = String(input || '').replace(/\D/g, '')
  if (!digits) return null
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = defaultCountryCode.replace(/\D/g, '') + digits.slice(1)
  if (/^7\d{8}$/.test(digits) || /^1\d{8}$/.test(digits)) digits = '254' + digits
  if (!/^254(7|1)\d{8}$/.test(digits)) return null
  return digits
}

function makeDarajaClient({
  consumerKey,
  consumerSecret,
  shortcode,
  passkey,
  environment = 'sandbox',
  callbackUrlBase,
}) {
  if (!consumerKey || !consumerSecret) throw new Error('Daraja consumer key/secret are required')
  if (!shortcode) throw new Error('Daraja shortcode (paybill/till) is required')
  if (!passkey) throw new Error('Daraja passkey is required')

  const host =
    environment === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke'

  let cachedToken = null // { token, expiresAt }

  async function getToken() {
    if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) return cachedToken.token
    const url =
      `${host}/oauth/v1/generate?grant_type=client_credentials`
    const res = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
      },
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`Daraja OAuth failed: HTTP ${res.status} ${body.slice(0, 200)}`)
    }
    const data = await res.json()
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + Number(data.expires_in || 3599) * 1000,
    }
    return cachedToken.token
  }

  /**
   * Initiate an STK Push (Lipa na M-Pesa Online).
   * @returns {Promise<{merchantRequestId, checkoutRequestId, customerMessage}>}
   */
  async function stkPush({ phone, amount, accountReference, description }) {
    const normalized = normalizePhone(phone)
    if (!normalized) throw new Error('Invalid Safaricom phone number (expected 07XX / 2547XX / +2547XX)')
    const amountValue = Math.round(Number(amount))
    if (!Number.isFinite(amountValue) || amountValue < 1) throw new Error('Amount must be at least 1 KSh')

    const token = await getToken()
    const timestamp = timestampFor()
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

    const res = await fetch(`${host}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: String(shortcode),
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amountValue,
        PartyA: normalized,
        PartyB: String(shortcode),
        PhoneNumber: normalized,
        CallBackURL: `${callbackUrlBase.replace(/\/$/, '')}/mpesa/callback`,
        AccountReference: String(accountReference || 'Orion Hotspot').slice(0, 12),
        TransactionDesc: String(description || 'Internet package').slice(0, 13 - 1),
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.errorCode || data.ResponseCode !== '0') {
      const detail = data.errorMessage || data.ResponseDescription || `HTTP ${res.status}`
      throw new Error(`Daraja STK push failed: ${detail}`)
    }
    return {
      merchantRequestId: data.MerchantRequestID,
      checkoutRequestId: data.CheckoutRequestID,
      customerMessage: data.CustomerMessage || '',
    }
  }

  /**
   * Query the status of an STK push (used when the callback is late/missing).
   * @returns {Promise<{paid:boolean, pending:boolean, failed:boolean, resultCode:number|null, resultDesc:string, mpesaReceipt:string|null}>}
   */
  async function stkQuery(checkoutRequestId) {
    const token = await getToken()
    const timestamp = timestampFor()
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')
    const res = await fetch(`${host}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BusinessShortCode: String(shortcode),
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }),
    })
    const data = await res.json().catch(() => ({}))
    const resultCode = data.ResultCode !== undefined ? Number(data.ResultCode) : null
    return {
      pending: data.errorCode === '500.001.1001' || resultCode === 1032,
      paid: resultCode === 0,
      failed: !data.errorCode && resultCode !== null && resultCode !== 0 && resultCode !== 1032,
      resultCode,
      resultDesc: data.ResultDesc || data.errorMessage || '',
      mpesaReceipt: data.MpesaReceiptNumber || null,
    }
  }

  return { stkPush, stkQuery, getToken, _normalizePhone: normalizePhone }
}

/**
 * Parse an STK callback payload into a flat result.
 * Returns null when the payload shape is not a valid STK callback.
 */
function parseStkCallback(body) {
  if (!body || typeof body !== 'object') return null
  const stk = body.Body && body.Body.stkCallback
  if (!stk) return null
  const item = (name) => {
    const list = (stk.CallbackMetadata && stk.CallbackMetadata.Item) || []
    const found = list.find((i) => i.Name === name)
    return found ? found.Value : null
  }
  return {
    merchantRequestId: stk.MerchantRequestID || null,
    checkoutRequestId: stk.CheckoutRequestID || null,
    resultCode: stk.ResultCode,
    resultDesc: stk.ResultDesc || '',
    amount: item('Amount'),
    mpesaReceipt: item('MpesaReceiptNumber'),
    phone: item('PhoneNumber') != null ? String(item('PhoneNumber')) : null,
    transactionDate: item('TransactionDate') != null ? String(item('TransactionDate')) : null,
  }
}

module.exports = {
  timestampFor,
  normalizePhone,
  makeDarajaClient,
  parseStkCallback,
  CALLBACK_TIMEOUT_MS,
}
