import React, { useState } from 'react'
import { MessageSquare, Send, Users, Router, Calendar, CheckCircle2, Search, Clock, ListFilter, Trash2 } from 'lucide-react'

export type NotificationsViewProps = {
  initialTab?: string
  onSelectTab?: (tab: string) => void
}

type SmsHistoryEntry = {
  id: string
  recipient: string
  type: 'single' | 'bulk' | 'plan' | 'router' | 'scheduled'
  message: string
  status: 'Delivered' | 'Sent' | 'Failed'
  sentAt: string
}

const SAMPLE_SMS_HISTORY: SmsHistoryEntry[] = [
  { id: 'sms-1', recipient: '+254 712 345 678 (John Kiprono)', type: 'single', message: 'Hello John, your 24h pass is now active. Enjoy high speed browsing!', status: 'Delivered', sentAt: 'Today, 12:15' },
  { id: 'sms-2', recipient: 'All Active Users (17 recipients)', type: 'bulk', message: 'Scheduled maintenance: Internet will be briefly paused from 2:00 AM to 2:30 AM for router upgrades.', status: 'Delivered', sentAt: 'Yesterday, 19:00' },
  { id: 'sms-3', recipient: 'Plan: Monthly 20 Mbps (24 recipients)', type: 'plan', message: 'Reminder: Your monthly subscription renews in 2 days. Pay via Paybill 400200 Acc: Your Phone.', status: 'Delivered', sentAt: 'Sep 22, 10:00' },
  { id: 'sms-4', recipient: 'Router: demo48 (8 recipients)', type: 'router', message: 'Power outage detected on station demo48. Backup inverter running.', status: 'Sent', sentAt: 'Sep 20, 14:30' },
]

export function NotificationsView({ initialTab = 'single', onSelectTab }: NotificationsViewProps) {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (initialTab.includes(':Bulk')) return 'bulk'
    if (initialTab.includes(':PlanSpecific')) return 'plan'
    if (initialTab.includes(':RouterSpecific')) return 'router'
    if (initialTab.includes(':Schedule')) return 'schedule'
    if (initialTab.includes(':Groups')) return 'groups'
    if (initialTab.includes(':History')) return 'history'
    return 'single'
  })

  const [history, setHistory] = useState<SmsHistoryEntry[]>(SAMPLE_SMS_HISTORY)
  const [notice, setNotice] = useState('')

  // Single User Form
  const [singlePhone, setSinglePhone] = useState('')
  const [singleMsg, setSingleMsg] = useState('Hello {name}, your Wi-Fi account is active. Enjoy browsing!')

  // Bulk Form
  const [bulkAudience, setBulkAudience] = useState<'all' | 'active' | 'expired'>('active')
  const [bulkMsg, setBulkMsg] = useState('Important update: Network speed upgrades completed!')

  // Plan Form
  const [planSelect, setPlanSelect] = useState('24 Hours Unlimited')
  const [planMsg, setPlanMsg] = useState('Your {plan} access will expire soon. Top up now to avoid interruption.')

  // Router Form
  const [routerSelect, setRouterSelect] = useState('demo49-AMATECH')
  const [routerMsg, setRouterMsg] = useState('Notice for clients on router demo49-AMATECH: Maintenance scheduled.')

  // Schedule Form
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleMsg, setScheduleMsg] = useState('')

  // Groups Form
  const [groups, setGroups] = useState([
    { id: 'g-1', name: 'VIP Hostel Clients', count: 18, desc: 'Subscribers in Blocks A & B' },
    { id: 'g-2', name: 'Cyber Cafe Regulars', count: 34, desc: 'Frequent daily voucher buyers' },
    { id: 'g-3', name: 'Home Fiber Tenants', count: 12, desc: 'Monthly recurring home fiber clients' },
  ])

  const handleSendSingle = (e: React.FormEvent) => {
    e.preventDefault()
    if (!singlePhone || !singleMsg) return
    const entry: SmsHistoryEntry = {
      id: `sms-${Date.now()}`,
      recipient: singlePhone,
      type: 'single',
      message: singleMsg,
      status: 'Delivered',
      sentAt: 'Just now',
    }
    setHistory([entry, ...history])
    setNotice(`SMS dispatched to ${singlePhone} via SMS Gateway!`)
    setSinglePhone('')
    setTimeout(() => setNotice(''), 3000)
  }

  const handleSendBulk = (e: React.FormEvent) => {
    e.preventDefault()
    const count = bulkAudience === 'active' ? 17 : bulkAudience === 'all' ? 121 : 3
    const entry: SmsHistoryEntry = {
      id: `sms-${Date.now()}`,
      recipient: `Bulk: ${bulkAudience.toUpperCase()} (${count} recipients)`,
      type: 'bulk',
      message: bulkMsg,
      status: 'Delivered',
      sentAt: 'Just now',
    }
    setHistory([entry, ...history])
    setNotice(`Bulk SMS blast sent to ${count} recipients!`)
    setTimeout(() => setNotice(''), 3000)
  }

  return (
    <section className="page-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">SMS Gateway &amp; Automated Customer Alerts</p>
          <h1>Notifications Hub</h1>
          <p className="heading-sub">
            Dispatch bulk SMS alerts, expiry reminders, router maintenance notices, and marketing messages.
          </p>
        </div>
      </section>

      {notice && (
        <div className="alert-notice" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
          <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
          {notice}
        </div>
      )}

      {/* Tabs */}
      <div className="tab-strip" style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          ['Single User', 'single', 'Notifications:Single'],
          ['Bulk Send', 'bulk', 'Notifications:Bulk'],
          ['Plan Specific', 'plan', 'Notifications:PlanSpecific'],
          ['Router Specific', 'router', 'Notifications:RouterSpecific'],
          ['Schedule SMS', 'schedule', 'Notifications:Schedule'],
          ['Sms Groups', 'groups', 'Notifications:Groups'],
          ['SMS History', 'history', 'Notifications:History'],
        ].map(([label, key, navId]) => (
          <button
            key={key}
            className={`button secondary ${activeTab === key ? 'active-tab' : ''}`}
            style={activeTab === key ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
            onClick={() => {
              setActiveTab(key)
              if (onSelectTab) onSelectTab(navId)
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Single User Form */}
      {activeTab === 'single' && (
        <div className="panel" style={{ maxWidth: '600px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Send SMS to Single Customer</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Direct SMS message routed through your configured SMS provider.
          </p>

          <form onSubmit={handleSendSingle} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Recipient Phone Number</label>
              <input
                type="text"
                placeholder="+254 712 345 678"
                value={singlePhone}
                onChange={(e) => setSinglePhone(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Message</label>
                <small style={{ color: 'var(--muted)' }}>{singleMsg.length} chars (1 SMS)</small>
              </div>
              <textarea
                rows={4}
                value={singleMsg}
                onChange={(e) => setSingleMsg(e.target.value)}
                required
                style={{ width: '100%', resize: 'none' }}
              />
            </div>

            <button type="submit" className="button primary" style={{ alignSelf: 'flex-start' }}>
              <Send size={15} /> Send Message Now
            </button>
          </form>
        </div>
      )}

      {/* Bulk Send Form */}
      {activeTab === 'bulk' && (
        <div className="panel" style={{ maxWidth: '600px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Bulk SMS Broadcast</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Send announcements or promotional offers to filtered segments of your customer database.
          </p>

          <form onSubmit={handleSendBulk} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Target Audience</label>
              <select value={bulkAudience} onChange={(e) => setBulkAudience(e.target.value as any)} style={{ width: '100%' }}>
                <option value="active">Active Subscribers Only (17 users)</option>
                <option value="expired">Expired Subscribers (Re-engagement) (3 users)</option>
                <option value="all">All Registered Customers (121 users)</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Broadcast Message</label>
                <small style={{ color: 'var(--muted)' }}>{bulkMsg.length} chars</small>
              </div>
              <textarea
                rows={4}
                value={bulkMsg}
                onChange={(e) => setBulkMsg(e.target.value)}
                required
                style={{ width: '100%', resize: 'none' }}
              />
            </div>

            <button type="submit" className="button primary" style={{ alignSelf: 'flex-start' }}>
              <Send size={15} /> Dispatch Bulk Broadcast
            </button>
          </form>
        </div>
      )}

      {/* Plan Specific Form */}
      {activeTab === 'plan' && (
        <div className="panel" style={{ maxWidth: '600px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Plan-Specific Notifications</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Target only users who purchased a specific plan (e.g. notify all 24 Hours Unlimited buyers).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Select Package Plan</label>
              <select value={planSelect} onChange={(e) => setPlanSelect(e.target.value)} style={{ width: '100%' }}>
                <option value="1 Hour Speed Pass">1 Hour Speed Pass</option>
                <option value="24 Hours Unlimited">24 Hours Unlimited</option>
                <option value="Weekly 10 GB">Weekly 10 GB</option>
                <option value="Monthly 20 Mbps">Monthly 20 Mbps</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Message</label>
              <textarea rows={4} value={planMsg} onChange={(e) => setPlanMsg(e.target.value)} style={{ width: '100%', resize: 'none' }} />
            </div>

            <button
              className="button primary"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => {
                setNotice(`SMS sent to all subscribers on ${planSelect}!`)
                setTimeout(() => setNotice(''), 3000)
              }}
            >
              <Send size={15} /> Send to Plan Users
            </button>
          </div>
        </div>
      )}

      {/* Router Specific Form */}
      {activeTab === 'router' && (
        <div className="panel" style={{ maxWidth: '600px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Router Station Specific Alert</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Send maintenance or localized alerts strictly to clients connected to a particular router.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Select Target Router</label>
              <select value={routerSelect} onChange={(e) => setRouterSelect(e.target.value)} style={{ width: '100%' }}>
                <option value="demo49-AMATECH">demo49-AMATECH (Online)</option>
                <option value="demo46">demo46 (Offline)</option>
                <option value="demo47">demo47 (Offline)</option>
                <option value="demo48">demo48 (Offline)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Message</label>
              <textarea rows={4} value={routerMsg} onChange={(e) => setRouterMsg(e.target.value)} style={{ width: '100%', resize: 'none' }} />
            </div>

            <button
              className="button primary"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => {
                setNotice(`Alert broadcast to all users on ${routerSelect}!`)
                setTimeout(() => setNotice(''), 3000)
              }}
            >
              <Send size={15} /> Send Router Alert
            </button>
          </div>
        </div>
      )}

      {/* Schedule SMS */}
      {activeTab === 'schedule' && (
        <div className="panel" style={{ maxWidth: '600px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Schedule Automated SMS Alerts</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Queue messages to be dispatched at a precise future date and time.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Schedule Date &amp; Time</label>
              <input type="datetime-local" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Message</label>
              <textarea rows={4} placeholder="Type scheduled announcement..." value={scheduleMsg} onChange={(e) => setScheduleMsg(e.target.value)} style={{ width: '100%', resize: 'none' }} />
            </div>

            <button
              className="button primary"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => {
                setNotice(`Message scheduled for ${scheduleDate || 'future date'}!`)
                setTimeout(() => setNotice(''), 3000)
              }}
            >
              <Clock size={15} /> Save Scheduled SMS
            </button>
          </div>
        </div>
      )}

      {/* SMS Groups */}
      {activeTab === 'groups' && (
        <div className="panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Customer Contact Groups</h2>
              <p style={{ margin: '3px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                Organize subscribers into reusable distribution lists.
              </p>
            </div>
            <button className="button primary" onClick={() => setNotice('New group modal opened')}>
              <Users size={15} /> Create Group
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {groups.map((g) => (
              <div key={g.id} className="plan-card" style={{ border: '1px solid var(--line)', borderRadius: '10px', padding: '16px', background: 'var(--card-subtle-bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>{g.name}</h3>
                  <span className="badge" style={{ background: '#dbeafe', color: '#1e40af' }}>{g.count} contacts</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '8px 0 14px' }}>{g.desc}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="button secondary" style={{ flex: 1, fontSize: '12px' }} onClick={() => setNotice(`SMS composer opened for group ${g.name}`)}>
                    <Send size={13} /> Message Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SMS History */}
      {activeTab === 'history' && (
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>SMS Outbox &amp; Delivery Logs</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Recipient / Audience</th>
                  <th>Type</th>
                  <th>Message Body</th>
                  <th>Status</th>
                  <th>Sent At</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td><strong>{h.recipient}</strong></td>
                    <td><span className="badge">{h.type.toUpperCase()}</span></td>
                    <td style={{ fontSize: '12px', maxWidth: '300px' }}>{h.message}</td>
                    <td>
                      <span className="status active" style={{ background: '#dcfce7', color: '#166534' }}>
                        {h.status}
                      </span>
                    </td>
                    <td className="muted" style={{ fontSize: '12px' }}>{h.sentAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
