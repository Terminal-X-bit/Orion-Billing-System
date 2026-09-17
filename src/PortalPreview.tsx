// Live preview of the guest portal inside Settings -> Captive Portal Branding.
// Renders the REAL portal page (raw portal.html/css/js) in a srcdoc iframe,
// with the operator's in-progress branding injected exactly like the bridge
// does — so the preview always matches what guests will see, even before
// saving. The iframe's failing /packages fetch triggers the portal's own demo
// fallback, so the simulated M-Pesa flow is visible too.

import { useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, Monitor, QrCode, Smartphone, X } from 'lucide-react'
import { buildPortalPreviewDocument, type PortalBrandingPreview } from './portalPreviewDoc'
import { qrSvg } from './qr'
import { usePortalReachability } from './portalReachability'
import { getPortalUrlOverride, resolvePortalUrl, safeHttpUrl, setPortalUrlOverride } from './portalUrl'
import { getInitialTheme, type Theme } from './useTheme'

type DeviceMode = 'desktop' | 'mobile'

const DEVICE_FRAME: Record<DeviceMode, { width: number; label: string }> = {
  desktop: { width: 900, label: 'Desktop' },
  mobile: { width: 390, label: 'Phone' },
}

type Props = {
  branding: PortalBrandingPreview
}

export function PortalPreview({ branding }: Props) {
  const [device, setDevice] = useState<DeviceMode>('desktop')
  const [qrOpen, setQrOpen] = useState(false)
  const [urlDraft, setUrlDraft] = useState(getPortalUrlOverride())
  // Keyed on the stringified branding so identity churn (the parent re-renders
  // on every poll with a new literal) never rebuilds/reloads the iframe —
  // only real content changes do.
  const [debouncedKey, setDebouncedKey] = useState(() => JSON.stringify(branding))
  const frameRef = useRef<HTMLIFrameElement>(null)

  // Debounce so every keystroke doesn't rebuild/re-exec the whole document.
  useEffect(() => {
    const next = JSON.stringify(branding)
    if (next === debouncedKey) return
    const t = window.setTimeout(() => setDebouncedKey(next), 350)
    return () => window.clearTimeout(t)
  }, [branding, debouncedKey])

  const doc = useMemo(
    () => buildPortalPreviewDocument(JSON.parse(debouncedKey) as PortalBrandingPreview),
    [debouncedKey],
  )

  // Is the live portal (bridge) actually serving guests right now?
  const reach = usePortalReachability()

  // Live portal URL: operator draft (validated live) or best-known default.
  const portalUrl = useMemo(
    () => safeHttpUrl(urlDraft) || resolvePortalUrl(),
    [urlDraft],
  )
  const qr = useMemo(() => qrSvg(portalUrl), [portalUrl])

  // Keep the iframe's theme in lockstep with the dashboard's.
  useEffect(() => {
    const iframe = frameRef.current
    if (!iframe) return
    const theme: Theme = getInitialTheme()
    try {
      iframe.contentWindow?.localStorage.setItem('orion_theme', theme)
    } catch {
      /* cross-origin or private mode — ignore */
    }
  }, [doc, device])

  return (
    <div
      style={{
        background: 'var(--card-subtle-bg)',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: '13px' }}>Live portal preview</strong>
            <span
              className={`live-pill portal-status-pill ${reach.state}`}
              title={
                reach.state === 'online'
                  ? `Portal is reachable at ${reach.url}`
                  : reach.state === 'offline'
                    ? `No response from ${reach.url} — is the bridge running?`
                    : 'Checking portal reachability…'
              }
            >
              <i />{' '}
              {reach.state === 'online'
                ? 'Portal online'
                : reach.state === 'offline'
                  ? 'Portal offline'
                  : 'Checking…'}
            </span>
          </div>
          <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--muted)' }}>
            Exactly what guests see — updates as you type, before you save.
          </p>
 </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setQrOpen((v) => !v)}
            title="Show a QR code pointing at the live portal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '8px',
              border: `1.5px solid ${qrOpen ? 'var(--coral)' : 'var(--line)'}`,
              background: qrOpen ? 'var(--coral-subtle)' : 'transparent',
              color: qrOpen ? 'var(--coral)' : 'var(--muted)',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            <QrCode size={13} /> QR
          </button>
          <a
            href={portalUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1.5px solid var(--line)',
              color: 'var(--muted)',
              fontWeight: 700,
              fontSize: '11px',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={13} /> Open live portal
          </a>
          {(Object.keys(DEVICE_FRAME) as DeviceMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setDevice(mode)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: '8px',
                border: `1.5px solid ${device === mode ? 'var(--coral)' : 'var(--line)'}`,
                background: device === mode ? 'var(--coral-subtle)' : 'transparent',
                color: device === mode ? 'var(--coral)' : 'var(--muted)',
                fontWeight: 700,
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {mode === 'desktop' ? <Monitor size={13} /> : <Smartphone size={13} />}
              {DEVICE_FRAME[mode].label}
            </button>
          ))}
        </div>
      </div>

      {qrOpen && (
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '12px',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 132,
              height: 132,
              flexShrink: 0,
              background: '#ffffff',
              borderRadius: '8px',
              padding: '8px',
              border: '1px solid var(--line)',
            }}
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong style={{ fontSize: '12px' }}>Test on your phone</strong>
            <p style={{ margin: '4px 0 10px', fontSize: '11px', color: 'var(--muted)' }}>
              Scan from a device on the hotspot network to open the real guest
              portal served by the bridge. The preview here is exactly what it
              will show.
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="url"
                value={urlDraft}
                placeholder="http://192.168.88.10:8787/portal"
                onChange={(e) => {
                  setUrlDraft(e.target.value)
                  setPortalUrlOverride(e.target.value)
                }}
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  background: 'var(--card-subtle-bg)',
                  color: 'var(--ink)',
                }}
              />
              {!safeHttpUrl(urlDraft) && urlDraft.trim() !== '' && (
                <span style={{ fontSize: '11px', color: 'var(--danger, #c94a32)', fontWeight: 700 }}>
                  Using default — enter a valid http(s) URL
                </span>
              )}
              {urlDraft.trim() === '' && (
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  Default: this host + bridge port 8787
                </span>
              )}
            </div>
            <p style={{ margin: '8px 0 0', fontSize: '11px', fontWeight: 700, wordBreak: 'break-all' }}>
              {portalUrl}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setQrOpen(false)}
            title="Close QR panel"
            style={{
              border: '0',
              background: 'transparent',
              color: 'var(--muted)',
              cursor: 'pointer',
              padding: '2px',
              lineHeight: 0,
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '100%',
            maxWidth: DEVICE_FRAME[device].width,
            transition: 'max-width 0.25s ease',
            borderRadius: '14px',
            border: '1px solid var(--line)',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(20, 32, 27, 0.12)',
            background: 'var(--bg)',
          }}
        >
          <iframe
            ref={frameRef}
            title="Captive portal preview"
            srcDoc={doc}
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            style={{
              display: 'block',
              width: '100%',
              height: device === 'mobile' ? 620 : 540,
              border: '0',
              background: 'var(--bg)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
