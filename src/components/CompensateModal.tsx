import React, { useState } from 'react'
import { Scale, CheckCircle2, Clock, Send, X } from 'lucide-react'

export type CompensateModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (msg: string) => void
}

export function CompensateModal({ isOpen, onClose, onSuccess }: CompensateModalProps) {
  const [target, setTarget] = useState<'all' | 'router' | 'single'>('all')
  const [router, setRouter] = useState('demo49-AMATECH')
  const [compensationType, setCompensationType] = useState<'extend' | 'voucher' | 'data'>('extend')
  const [duration, setDuration] = useState('2 Hours')
  const [reason, setReason] = useState('ISP Fiber Cable Cut')
  const [sendSms, setSendSms] = useState(true)
  const [isApplying, setIsApplying] = useState(false)

  if (!isOpen) return null

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)
    setTimeout(() => {
      setIsApplying(false)
      const successText = `Compensation applied: ${duration} added to active subscribers (${reason}). SMS alerts dispatched.`
      if (onSuccess) onSuccess(successText)
      onClose()
    }, 1200)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-head">
          <div className="modal-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
            <Scale size={22} />
          </div>
          <p className="eyebrow" style={{ color: '#b45309' }}>Subscriber Goodwill</p>
          <h2>Compensate Affected Users</h2>
          <p className="modal-copy">Extend subscription time or issue free data credits after network outages or fiber downtime.</p>
        </div>

        <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600 }}>Target Audience</label>
            <select value={target} onChange={(e) => setTarget(e.target.value as any)} style={{ width: '100%' }}>
              <option value="all">All Active Subscribers (System-wide 17 users)</option>
              <option value="router">Subscribers on Specific Router</option>
              <option value="single">Single Customer Phone</option>
            </select>
          </div>

          {target === 'router' && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Affected Router</label>
              <select value={router} onChange={(e) => setRouter(e.target.value)} style={{ width: '100%' }}>
                <option value="demo49-AMATECH">demo49-AMATECH</option>
                <option value="demo46">demo46</option>
                <option value="demo47">demo47</option>
                <option value="demo48">demo48</option>
              </select>
            </div>
          )}

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600 }}>Compensation Offer</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)} style={{ width: '100%' }}>
              <option value="2 Hours">+2 Hours Extension</option>
              <option value="6 Hours">+6 Hours Extension</option>
              <option value="12 Hours">+12 Hours Extension</option>
              <option value="24 Hours">+24 Hours (1 Day) Extension</option>
              <option value="3 Days">+3 Days Extension</option>
              <option value="2 GB Free Data">+2 GB Free Data Allowance</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600 }}>Outage Reason (Included in SMS)</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: '100%' }}>
              <option value="ISP Fiber Cable Cut">ISP Fiber Cable Cut (Repaired)</option>
              <option value="Power Grid Blackout">Power Grid Blackout (Generator Restored)</option>
              <option value="Router Scheduled Maintenance">Router Scheduled Maintenance</option>
              <option value="M-Pesa STK Payment Gateway Delay">M-Pesa STK Payment Gateway Delay</option>
            </select>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <input type="checkbox" checked={sendSms} onChange={(e) => setSendSms(e.target.checked)} />
            Send apology &amp; extension SMS automatically to all affected phones
          </label>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="button secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="button primary" disabled={isApplying} style={{ flex: 1.5 }}>
              <Scale size={15} /> {isApplying ? 'Applying to Router...' : 'Apply Compensation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
