import React, { useState } from 'react'
import {
  Zap, Users, UserCheck, UserX, Wifi, WifiOff, Clock, ShieldAlert,
  Search, RefreshCw, Send, Plus, Filter, MoreHorizontal, Power, CheckCircle2
} from 'lucide-react'

export type ActivationSubView =
  | 'Activation:Activate'
  | 'Activation:Prepaid'
  | 'Activation:Active'
  | 'Activation:Expired'
  | 'Activation:Online'
  | 'Activation:Offline'
  | 'Activation:Roaming'
  | 'Activation:FUP'
  | 'Activation:GracePeriod'

export type ActivationViewProps = {
  currentSubView: string
  onSelectSubView: (subView: string) => void
  onOpenAddCustomer?: () => void
  onSendSms?: (phone: string, text: string) => void
}

type ActivationRecord = {
  id: string
  name: string
  phone: string
  mac: string
  ip: string
  router: string
  plan: string
  type: 'prepaid' | 'postpaid' | 'voucher' | 'binding'
  status: 'active' | 'expired' | 'online' | 'offline' | 'roaming' | 'fup' | 'grace'
  uptime: string
  dataUsed: string
  expiresAt: string
}

const SAMPLE_USERS: ActivationRecord[] = [
  { id: 'act-1', name: 'John Kiprono', phone: '+254 712 345 678', mac: 'BC:D0:74:1A:22:90', ip: '192.168.88.102', router: 'demo49-AMATECH', plan: '24 Hours Unlimited', type: 'voucher', status: 'online', uptime: '3h 14m', dataUsed: '1.2 GB', expiresAt: 'Today, 21:30' },
  { id: 'act-2', name: 'Faith Wanjiku', phone: '+254 722 987 654', mac: '44:65:0D:88:12:33', ip: '192.168.88.104', router: 'demo49-AMATECH', plan: 'Weekly 10 GB', type: 'prepaid', status: 'online', uptime: '1d 4h', dataUsed: '6.4 GB', expiresAt: 'Sep 28, 12:00' },
  { id: 'act-3', name: 'Kevin Otieno', phone: '+254 733 456 789', mac: 'A0:B1:C2:D3:E4:F5', ip: '192.168.88.108', router: 'demo46', plan: 'Monthly 20 Mbps', type: 'prepaid', status: 'active', uptime: 'Offline', dataUsed: '45 GB', expiresAt: 'Oct 15, 00:00' },
  { id: 'act-4', name: 'Mary Achieng', phone: '+254 701 112 233', mac: '78:4F:43:91:AA:50', ip: '192.168.88.115', router: 'demo47', plan: '1 Hour Speed Pass', type: 'voucher', status: 'expired', uptime: 'Expired', dataUsed: '450 MB', expiresAt: 'Yesterday, 18:20' },
  { id: 'act-5', name: 'Brian Mwangi', phone: '+254 790 334 455', mac: 'E8:8D:28:C0:99:11', ip: '192.168.88.120', router: 'demo48', plan: 'FUP Throttled Plan', type: 'prepaid', status: 'fup', uptime: '4h 10m', dataUsed: '102 GB (Cap reached)', expiresAt: 'Sep 30, 23:59' },
  { id: 'act-6', name: 'Hassan Ali', phone: '+254 720 556 677', mac: '3C:06:30:11:8A:77', ip: '192.168.88.130', router: 'demo49-AMATECH', plan: 'Monthly Home Fiber', type: 'prepaid', status: 'grace', uptime: 'Grace Period', dataUsed: '88 GB', expiresAt: 'Grace ends in 18 hrs' },
  { id: 'act-7', name: 'Beatrice Ndinda', phone: '+254 711 778 899', mac: '00:1A:2B:3C:4D:5E', ip: '192.168.88.142', router: 'demo49-AMATECH', plan: 'Weekly Pass', type: 'voucher', status: 'roaming', uptime: 'Roaming: AP-East to AP-Lobby', dataUsed: '3.1 GB', expiresAt: 'Sep 27, 10:00' },
]

export function ActivationView({
  currentSubView,
  onSelectSubView,
  onOpenAddCustomer,
  onSendSms,
}: ActivationViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<ActivationRecord[]>(SAMPLE_USERS)
  const [selectedUser, setSelectedUser] = useState<ActivationRecord | null>(null)
  const [showQuickActivateModal, setShowQuickActivateModal] = useState(false)
  const [notice, setNotice] = useState('')

  // Quick activate form state
  const [activateName, setActivateName] = useState('')
  const [activatePhone, setActivatePhone] = useState('')
  const [activatePlan, setActivatePlan] = useState('24 Hours Unlimited')
  const [activateRouter, setActivateRouter] = useState('demo49-AMATECH')
  const [activateMac, setActivateMac] = useState('')

  // Determine active tab from currentSubView
  const getSubTab = (): string => {
    if (currentSubView.includes(':Prepaid')) return 'prepaid'
    if (currentSubView.includes(':Active')) return 'active'
    if (currentSubView.includes(':Expired')) return 'expired'
    if (currentSubView.includes(':Online')) return 'online'
    if (currentSubView.includes(':Offline')) return 'offline'
    if (currentSubView.includes(':Roaming')) return 'roaming'
    if (currentSubView.includes(':FUP')) return 'fup'
    if (currentSubView.includes(':GracePeriod')) return 'grace'
    return 'all'
  }

  const activeTab = getSubTab()

  const filteredUsers = users.filter((u) => {
    // Filter by tab
    if (activeTab === 'prepaid' && u.type !== 'prepaid') return false
    if (activeTab === 'active' && u.status !== 'active' && u.status !== 'online') return false
    if (activeTab === 'expired' && u.status !== 'expired') return false
    if (activeTab === 'online' && u.status !== 'online') return false
    if (activeTab === 'offline' && u.status === 'online') return false
    if (activeTab === 'roaming' && u.status !== 'roaming') return false
    if (activeTab === 'fup' && u.status !== 'fup') return false
    if (activeTab === 'grace' && u.status !== 'grace') return false

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        u.name.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.mac.toLowerCase().includes(q) ||
        u.ip.includes(q) ||
        u.plan.toLowerCase().includes(q) ||
        u.router.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleKickUser = (id: string, name: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'offline', uptime: 'Disconnected' } : u))
    )
    setNotice(`User ${name} disconnected from MikroTik router.`)
    setTimeout(() => setNotice(''), 3000)
  }

  const handleRechargeUser = (id: string, name: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'online', expiresAt: 'Extended +24h' } : u))
    )
    setNotice(`User ${name} plan recharged and activated on router.`)
    setTimeout(() => setNotice(''), 3000)
  }

  const handleQuickActivateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: ActivationRecord = {
      id: `act-${Date.now()}`,
      name: activateName || 'Direct Activated User',
      phone: activatePhone || '+254 700 000 000',
      mac: activateMac || 'E0:D5:5E:11:22:33',
      ip: `192.168.88.${Math.floor(Math.random() * 100) + 150}`,
      router: activateRouter,
      plan: activatePlan,
      type: 'prepaid',
      status: 'online',
      uptime: 'Just activated',
      dataUsed: '0 MB',
      expiresAt: '24h from now',
    }
    setUsers([newUser, ...users])
    setShowQuickActivateModal(false)
    setActivateName('')
    setActivatePhone('')
    setActivateMac('')
    setNotice(`Successfully activated ${newUser.name} on ${newUser.router}!`)
    setTimeout(() => setNotice(''), 3500)
  }

  return (
    <section className="page-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">RouterOS Radius & Hotspot Access</p>
          <h1>Activation Management</h1>
          <p className="heading-sub">
            Monitor and control user credentials, active sessions, expired subscriptions, and MikroTik bindings.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button primary" onClick={() => setShowQuickActivateModal(true)}>
            <Zap size={16} /> Quick Activate User
          </button>
        </div>
      </section>

      {notice && (
        <div className="alert-notice" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
          <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
          {notice}
        </div>
      )}

      {/* Tabs matching screenshots */}
      <div className="tab-strip" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
        {[
          ['All Users', 'Activation:All'],
          ['Activate User', 'Activation:Activate'],
          ['Prepaid Users', 'Activation:Prepaid'],
          ['Active Users', 'Activation:Active'],
          ['Expired Users', 'Activation:Expired'],
          ['Online Users', 'Activation:Online'],
          ['Offline Users', 'Activation:Offline'],
          ['Roaming Users', 'Activation:Roaming'],
          ['FUP Users', 'Activation:FUP'],
          ['Grace Period Users', 'Activation:GracePeriod'],
        ].map(([label, nav]) => {
          const isSelected = currentSubView === nav || (nav === 'Activation:All' && currentSubView === 'Activation')
          return (
            <button
              key={label}
              className={`button secondary ${isSelected ? 'active-tab' : ''}`}
              style={isSelected ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
              onClick={() => {
                if (nav === 'Activation:Activate') {
                  setShowQuickActivateModal(true)
                } else {
                  onSelectSubView(nav)
                }
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Search and stats bar */}
      <div className="filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search by name, phone, MAC address, IP or router..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px' }}
          />
        </div>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
          Showing <strong>{filteredUsers.length}</strong> records
        </span>
      </div>

      {/* Users Table */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone / Contact</th>
                <th>MAC & IP Address</th>
                <th>Router</th>
                <th>Package Plan</th>
                <th>Status</th>
                <th>Data / Uptime</th>
                <th>Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: 'var(--muted)' }}>
                    No users found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <strong>{u.name}</strong>
                    </td>
                    <td>{u.phone}</td>
                    <td>
                      <span className="code-pill font-mono" style={{ fontSize: '11px', display: 'block' }}>{u.mac}</span>
                      <small className="muted">{u.ip}</small>
                    </td>
                    <td><span className="badge">{u.router}</span></td>
                    <td><strong>{u.plan}</strong></td>
                    <td>
                      <span
                        className={`status ${
                          u.status === 'online' || u.status === 'active'
                            ? 'active'
                            : u.status === 'expired'
                            ? 'expired'
                            : 'pending'
                        }`}
                        style={
                          u.status === 'online'
                            ? { background: '#dcfce7', color: '#166534' }
                            : u.status === 'fup'
                            ? { background: '#fef3c7', color: '#92400e' }
                            : u.status === 'grace'
                            ? { background: '#e0e7ff', color: '#3730a3' }
                            : {}
                        }
                      >
                        {u.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px' }}>{u.uptime}</div>
                      <small className="muted">{u.dataUsed}</small>
                    </td>
                    <td style={{ fontSize: '12px' }}>{u.expiresAt}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {u.status === 'online' ? (
                          <button
                            className="icon-button"
                            title="Disconnect user session from MikroTik"
                            onClick={() => handleKickUser(u.id, u.name)}
                            style={{ color: '#b91c1c' }}
                          >
                            <Power size={14} />
                          </button>
                        ) : (
                          <button
                            className="icon-button"
                            title="Recharge / Re-activate user"
                            onClick={() => handleRechargeUser(u.id, u.name)}
                            style={{ color: '#166534' }}
                          >
                            <RefreshCw size={14} />
                          </button>
                        )}
                        <button
                          className="icon-button"
                          title="Send SMS notification"
                          onClick={() => {
                            if (onSendSms) onSendSms(u.phone, `Hello ${u.name}, your Wi-Fi account is active on ${u.plan}.`)
                            else alert(`SMS composer opened for ${u.phone}`)
                          }}
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Activate Modal */}
      {showQuickActivateModal && (
        <div className="modal-backdrop" onClick={() => setShowQuickActivateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="modal-close" onClick={() => setShowQuickActivateModal(false)}>×</button>
            <div className="modal-head">
              <div className="modal-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                <Zap size={22} />
              </div>
              <p className="eyebrow" style={{ color: '#1d4ed8' }}>Instant Provisioning</p>
              <h2>Activate User on MikroTik</h2>
              <p className="modal-copy">Add customer credentials and immediately provision to RouterOS Hotspot / Radius.</p>
            </div>

            <form onSubmit={handleQuickActivateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Customer Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={activateName}
                  onChange={(e) => setActivateName(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Phone Number (M-Pesa format)</label>
                <input
                  type="text"
                  placeholder="+254 700 000 000"
                  value={activatePhone}
                  onChange={(e) => setActivatePhone(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Target Router</label>
                <select value={activateRouter} onChange={(e) => setActivateRouter(e.target.value)} style={{ width: '100%' }}>
                  <option value="demo49-AMATECH">demo49-AMATECH (Online)</option>
                  <option value="demo46">demo46 (Offline)</option>
                  <option value="demo47">demo47 (Offline)</option>
                  <option value="demo48">demo48 (Offline)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Package / Plan</label>
                <select value={activatePlan} onChange={(e) => setActivatePlan(e.target.value)} style={{ width: '100%' }}>
                  <option value="1 Hour Speed Pass">1 Hour Speed Pass - Ksh 20</option>
                  <option value="24 Hours Unlimited">24 Hours Unlimited - Ksh 50</option>
                  <option value="Weekly 10 GB">Weekly 10 GB - Ksh 250</option>
                  <option value="Monthly 20 Mbps">Monthly 20 Mbps - Ksh 1,500</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Device MAC Address (Optional bypass)</label>
                <input
                  type="text"
                  placeholder="AA:BB:CC:DD:EE:FF"
                  value={activateMac}
                  onChange={(e) => setActivateMac(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="button secondary" onClick={() => setShowQuickActivateModal(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="button primary" style={{ flex: 1.5 }}>
                  <Zap size={15} /> Provision & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
