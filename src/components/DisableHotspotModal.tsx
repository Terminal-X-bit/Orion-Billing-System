import React, { useState } from 'react'
import { Power, AlertTriangle, CheckCircle2, X } from 'lucide-react'

export type DisableHotspotModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (msg: string) => void
}

export function DisableHotspotModal({ isOpen, onClose, onSuccess }: DisableHotspotModalProps) {
  const [isDisabled, setIsDisabled] = useState(false)
  const [router, setRouter] = useState('All Routers - System Wide')
  const [maintenanceTime, setMaintenanceTime] = useState('30 Minutes')
  const [maintenanceMsg, setMaintenanceMsg] = useState('Network Maintenance in progress. Service will resume shortly.')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const handleToggle = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      const newState = !isDisabled
      setIsDisabled(newState)
      const msg = newState
        ? `Hotspot server disabled on ${router} for ${maintenanceTime}. Maintenance page displayed.`
        : `Hotspot server re-enabled and active on ${router}. Login portal restored.`
      if (onSuccess) onSuccess(msg)
      onClose()
    }, 1000)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-head">
          <div className="modal-icon" style={{ background: '#fee2e2', color: '#b91c1c' }}>
            <Power size={22} />
          </div>
          <p className="eyebrow" style={{ color: '#b91c1c' }}>Service Control</p>
          <h2>Disable Hotspot Server (Maintenance Mode)</h2>
          <p className="modal-copy">Temporarily suspend captive portal authentication and port redirection on MikroTik.</p>
        </div>

        <form onSubmit={handleToggle} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600 }}>Target Router</label>
            <select value={router} onChange={(e) => setRouter(e.target.value)} style={{ width: '100%' }}>
              <option value="All Routers - System Wide">All Routers - System Wide</option>
              <option value="demo49-AMATECH">demo49-AMATECH</option>
              <option value="demo46">demo46</option>
              <option value="demo47">demo47</option>
              <option value="demo48">demo48</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600 }}>Estimated Maintenance Duration</label>
            <select value={maintenanceTime} onChange={(e) => setMaintenanceTime(e.target.value)} style={{ width: '100%' }}>
              <option value="15 Minutes">15 Minutes</option>
              <option value="30 Minutes">30 Minutes</option>
              <option value="1 Hour">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
              <option value="Until Manually Enabled">Until Manually Enabled</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600 }}>Portal Maintenance Notice</label>
            <textarea
              rows={3}
              value={maintenanceMsg}
              onChange={(e) => setMaintenanceMsg(e.target.value)}
              style={{ width: '100%', resize: 'none' }}
            />
          </div>

          <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#92400e' }}>
            ⚠ Disabling the hotspot server will prevent new guests from purchasing vouchers or authenticating until re-enabled. Currently authenticated sessions will continue to route traffic.
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button type="button" className="button secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button
              type="submit"
              className="button primary"
              disabled={isProcessing}
              style={{ flex: 1.5, background: isDisabled ? 'var(--green)' : '#b91c1c', borderColor: isDisabled ? 'var(--green)' : '#b91c1c' }}
            >
              <Power size={15} /> {isProcessing ? 'Updating RouterOS...' : isDisabled ? 'Re-Enable Hotspot' : 'Disable Hotspot Server'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
