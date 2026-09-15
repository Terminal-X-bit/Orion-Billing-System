// Voucher code generation shared by payment fulfilment and future batch tools.

const VOUCHER_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O/1/I (unambiguous when typed)

function generateVoucherCode(prefix = 'ORN', randomSource = null) {
  const bytes = randomSource ? randomSource(8) : require('crypto').randomBytes(8)
  const pick = (n) =>
    Array.from(bytes.slice(0, n))
      .map((b) => VOUCHER_ALPHABET[b % VOUCHER_ALPHABET.length])
      .join('')
  return `${String(prefix || 'ORN').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) || 'ORN'}-${pick(4)}-${pick(4)}`
}

module.exports = { generateVoucherCode, VOUCHER_ALPHABET }
