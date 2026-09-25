import React, { useState } from 'react'
import { LifeBuoy, Plus, Search, MessageSquare, CheckCircle2, Clock, AlertCircle, Phone, User, Trash2 } from 'lucide-react'

type Ticket = {
  id: string
  customerName: string
  customerPhone: string
  router: string
  category: 'Slow Internet' | 'Payment Deducted / No Access' | 'Voucher Invalid' | 'Smart TV Issue' | 'No Connection'
  message: string
  status: 'Open' | 'In Progress' | 'Resolved'
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  createdAt: string
  resolvedAt?: string
}

const INITIAL_TICKETS: Ticket[] = [
  { id: 'TICK-101', customerName: 'David Kiptoo', customerPhone: '+254 722 345 889', router: 'demo49-AMATECH', category: 'Payment Deducted / No Access', message: 'M-Pesa STK deducted Ksh 50 for 24h pass, transaction code QK829182, but voucher was not automatically received.', status: 'Open', priority: 'Urgent', createdAt: 'Today, 11:20' },
  { id: 'TICK-102', customerName: 'Grace Auma', customerPhone: '+254 710 445 566', router: 'demo49-AMATECH', category: 'Smart TV Issue', message: 'Bought monthly TV pass, TV says "No internet, secured" and cannot open login page.', status: 'In Progress', priority: 'High', createdAt: 'Today, 08:45' },
  { id: 'TICK-103', customerName: 'Eric Kipchumba', customerPhone: '+254 733 112 233', router: 'demo46', category: 'Slow Internet', message: 'Buffering on YouTube despite having the 20 Mbps plan.', status: 'Resolved', priority: 'Medium', createdAt: 'Yesterday, 14:10', resolvedAt: 'Yesterday, 15:30' },
]

export function SupportTicketsView() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS)
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All')
  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [notice, setNotice] = useState('')

  // Form states
  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [router, setRouter] = useState('demo49-AMATECH')
  const [cat, setCat] = useState<Ticket['category']>('Payment Deducted / No Access')
  const [prio, setPrio] = useState<Ticket['priority']>('High')
  const [msg, setMsg] = useState('')

  const filtered = tickets.filter((t) => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        t.customerName.toLowerCase().includes(q) ||
        t.customerPhone.includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.message.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    const newT: Ticket = {
      id: `TICK-${Math.floor(Math.random() * 900) + 100}`,
      customerName: custName || 'Walk-in Customer',
      customerPhone: custPhone || '+254 700 000 000',
      router,
      category: cat,
      message: msg || 'No description provided.',
      status: 'Open',
      priority: prio,
      createdAt: 'Just now',
    }
    setTickets([newT, ...tickets])
    setShowCreateModal(false)
    setCustName('')
    setCustPhone('')
    setMsg('')
    setNotice(`Ticket ${newT.id} created successfully!`)
    setTimeout(() => setNotice(''), 3000)
  }

  const handleUpdateStatus = (id: string, newStatus: Ticket['status']) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: newStatus, resolvedAt: newStatus === 'Resolved' ? 'Just now' : undefined } : t)))
    setNotice(`Ticket ${id} marked as ${newStatus}`)
    setTimeout(() => setNotice(''), 2500)
  }

  return (
    <section className="page-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Customer Care &amp; Troubleshooting Desk</p>
          <h1>Support Tickets</h1>
          <p className="heading-sub">
            Track, assign, and resolve subscriber network complaints, voucher delivery issues, and TV bypass requests.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> Open New Ticket
          </button>
        </div>
      </section>

      {notice && (
        <div className="alert-notice" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
          <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
          {notice}
        </div>
      )}

      {/* Filter bar */}
      <div className="filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search tickets by ID, customer, phone or issue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((st) => (
            <button
              key={st}
              className={`button secondary ${statusFilter === st ? 'active-tab' : ''}`}
              style={statusFilter === st ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets table */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Router</th>
                <th>Issue Category</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '36px', color: 'var(--muted)' }}>
                    No support tickets found matching this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id}>
                    <td><strong className="code-pill font-mono">{t.id}</strong></td>
                    <td>{t.customerName}</td>
                    <td>{t.customerPhone}</td>
                    <td><span className="badge">{t.router}</span></td>
                    <td><strong style={{ fontSize: '13px' }}>{t.category}</strong></td>
                    <td style={{ fontSize: '12px', maxWidth: '240px' }} className="muted">{t.message}</td>
                    <td>
                      <span
                        className="badge"
                        style={
                          t.priority === 'Urgent'
                            ? { background: '#fee2e2', color: '#991b1b' }
                            : t.priority === 'High'
                            ? { background: '#fef3c7', color: '#b45309' }
                            : { background: '#e0f2fe', color: '#0369a1' }
                        }
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <select
                        value={t.status}
                        onChange={(e) => handleUpdateStatus(t.id, e.target.value as any)}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--line)',
                          background:
                            t.status === 'Resolved' ? '#dcfce7' : t.status === 'In Progress' ? '#fef3c7' : '#fee2e2',
                          color:
                            t.status === 'Resolved' ? '#166534' : t.status === 'In Progress' ? '#92400e' : '#991b1b',
                        }}
                      >
                        <option value="Open">OPEN</option>
                        <option value="In Progress">IN PROGRESS</option>
                        <option value="Resolved">RESOLVED</option>
                      </select>
                    </td>
                    <td className="muted" style={{ fontSize: '11px' }}>{t.createdAt}</td>
                    <td>
                      <button
                        className="icon-button"
                        title="Delete ticket"
                        onClick={() => setTickets(tickets.filter((x) => x.id !== t.id))}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
            <div className="modal-head">
              <div className="modal-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
                <LifeBuoy size={22} />
              </div>
              <p className="eyebrow" style={{ color: '#b45309' }}>Support Incident</p>
              <h2>Open Customer Support Ticket</h2>
            </div>

            <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Customer Name</label>
                <input type="text" placeholder="e.g. John Doe" value={custName} onChange={(e) => setCustName(e.target.value)} required style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Phone Number</label>
                <input type="text" placeholder="+254 7..." value={custPhone} onChange={(e) => setCustPhone(e.target.value)} required style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Router Station</label>
                <select value={router} onChange={(e) => setRouter(e.target.value)} style={{ width: '100%' }}>
                  <option value="demo49-AMATECH">demo49-AMATECH (Online)</option>
                  <option value="demo46">demo46 (Offline)</option>
                  <option value="demo47">demo47 (Offline)</option>
                  <option value="demo48">demo48 (Offline)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Issue Category</label>
                <select value={cat} onChange={(e) => setCat(e.target.value as any)} style={{ width: '100%' }}>
                  <option value="Payment Deducted / No Access">Payment Deducted / No Access (M-Pesa STK)</option>
                  <option value="Smart TV Issue">Smart TV Issue (Captive Portal Bypass)</option>
                  <option value="Voucher Invalid">Voucher Invalid / Expired Early</option>
                  <option value="Slow Internet">Slow Internet / High Latency</option>
                  <option value="No Connection">No Connection / Wi-Fi Disconnected</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Priority</label>
                <select value={prio} onChange={(e) => setPrio(e.target.value as any)} style={{ width: '100%' }}>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Incident Description</label>
                <textarea rows={3} placeholder="Customer statement, M-Pesa receipt, or device MAC..." value={msg} onChange={(e) => setMsg(e.target.value)} required style={{ width: '100%', resize: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="button secondary" onClick={() => setShowCreateModal(false)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="button primary" style={{ flex: 1.5 }}><LifeBuoy size={15} /> Save Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
