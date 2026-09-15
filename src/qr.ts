// QR code generation for the "test on your phone" affordance in the portal
// preview header. Uses the vendored, dependency-free qrcode-generator
// (src/vendor/qrcode.js, MIT — Kazuhiko Arase), evaluated through the same
// CJS shim the portal preview uses, since Vite cannot import CJS named
// exports directly in the browser.

import qrcodeSrc from './vendor/qrcode.js?raw'
import { loadCjsSource } from './portalPreviewDoc'

type QrFactory = (
  typeNumber: number,
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H',
) => {
  addData: (data: string) => void
  make: () => void
  createSvgTag: (opts: { cellSize?: number; margin?: number; scalable?: boolean }) => string
}

const qrcode = loadCjsSource(qrcodeSrc) as unknown as QrFactory

/**
 * Build a crisp, scalable QR code SVG for the given text.
 * typeNumber 0 = automatic capacity selection; 'M' error correction is the
 * sweet spot for screen-scanned URLs.
 */
export function qrSvg(text: string): string {
  const qr = qrcode(0, 'M')
  qr.addData(text)
  qr.make()
  return qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true })
}
