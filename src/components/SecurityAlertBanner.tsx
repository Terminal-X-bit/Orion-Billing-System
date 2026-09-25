import React, { useState } from 'react'
import { AlertTriangle, Lock, RefreshCw, X, ShieldAlert, CheckCircle2, Eye, EyeOff } from 'lucide-react'

export type SecurityAlertProps = {
  onPasswordChanged?: (router: string, newPass: string) => void
  onRecheck?: () => void
}

export function SecurityAlertBanner({ onPasswordChanged, onRecheck }: SecurityAlertProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [routerHost, setRouterHost] = useState('remote.cloudmikrotik.online:20381')
  const [username, setUsername] = useState('user1')
  const [currentPassword, setCurrentPassword] = useState('123456')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [isRechecking, setIsRechecking] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isFixed, setIsFixed] = useState(false)

  if (isDismissed || isFixed) return null

  const handleRecheck = () => {
    setIsRechecking(true)
    setTimeout(() => {
      setIsRechecking(false)
      if (onRecheck) onRecheck()
      setStatusMessage('Rechecked! Router remote.cloudmikrotik.online:20381 still responding with weak password. Please change it immediately.')
    }, 1200)
  }

  const handleSubmitNewPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters long.')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }
    setIsFixed(true)
    setShowModal(false)
    if (onPasswordChanged) {
      onPasswordChanged(routerHost, newPassword)
    }
  }

  return (
    <>
      <div className="freelsp-security-alert">
        <div className="security-alert-header">
          <span className="badge-critical">CRITICAL</span>
          <span className="security-alert-title">
            <AlertTriangle size={17} className="warning-icon" />
            URGENT: Your Router Can Be Hacked Right Now
          </span>
          <button className="security-alert-dismiss" onClick={() => setIsDismissed(true)} title="Dismiss">
            <X size={16} />
          </button>
        </div>

        <p className="security-alert-body">
          The router(s) below are protected by a weak or default password that attackers can guess in seconds. Anyone who breaks in can reroute your customer payments to their own account, shut down your network, and lock you out. <strong>Change these passwords immediately.</strong> Every hour you wait leaves your business and your customers' data exposed.
        </p>

        <div className="security-alert-table-wrap">
          <table className="security-alert-table">
            <thead>
              <tr>
                <th>ROUTER</th>
                <th>USERNAME</th>
                <th>CURRENT PASSWORD</th>
                <th>DETECTED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-red">{routerHost}</td>
                <td><span className="code-pill">{username}</span></td>
                <td><span className="code-pill pass-pill">{currentPassword}</span></td>
                <td className="muted-text">2026-09-15 00:57:53</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="security-alert-actions">
          <button className="btn-fix-password" onClick={() => setShowModal(true)}>
            <Lock size={15} />
            Click Here To Fix This Now: Change Password
          </button>
          <button className="btn-recheck" onClick={handleRecheck} disabled={isRechecking}>
            <RefreshCw size={14} className={isRechecking ? 'spinning' : ''} />
            {isRechecking ? 'Checking router...' : 'Recheck now'}
          </button>
        </div>

        {statusMessage && (
          <div className="security-recheck-notice">
            {statusMessage}
          </div>
        )}

        <div className="security-alert-footer-note">
          ℹ Already changed the password in Network &gt; MikroTik Users? Click <strong>Recheck now</strong> to clear this warning. The system rechecks every router automatically each week.
        </div>
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            <div className="modal-head">
              <div className="modal-icon" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                <ShieldAlert size={22} />
              </div>
              <p className="eyebrow" style={{ color: '#b91c1c' }}>Security Patch</p>
              <h2>Update RouterOS Password</h2>
              <p className="modal-copy">
                Set a strong management password for <strong>{routerHost}</strong>. This command will execute via RouterOS API command: <code style={{ fontSize: '11px' }}>/user set [find name={username}] password=...</code>
              </p>
            </div>

            <form onSubmit={handleSubmitNewPassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Target Router</label>
                <input type="text" value={routerHost} disabled style={{ width: '100%', opacity: 0.7 }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Router User</label>
                <input type="text" value={username} disabled style={{ width: '100%', opacity: 0.7 }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>New Strong Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter at least 8 characters..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ width: '100%', paddingRight: '36px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Confirm Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="button secondary"
                  style={{ flex: 1 }}
                  onClick={() => {
                    const generated = Math.random().toString(36).slice(-8) + '!' + Math.floor(Math.random() * 100)
                    setNewPassword(generated)
                    setConfirmPassword(generated)
                    setShowPass(true)
                  }}
                >
                  Generate Strong Pass
                </button>
                <button type="submit" className="button primary" style={{ flex: 1.3, background: '#b91c1c', borderColor: '#b91c1c' }}>
                  <Lock size={15} /> Apply To Router
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
