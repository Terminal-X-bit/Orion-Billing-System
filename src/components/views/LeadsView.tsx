import React, { useState } from 'react'
import { Filter, UserPlus, Search, Phone, Send, CheckCircle2, UserCheck, MessageSquare, Trash2 } from 'lucide-react'

type Lead = {
  id: string
  name: string
  phone: string
  location: string
  planInterested: string
  source: string
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Lost'
  notes: string
  createdAt: string
}

const INITIAL_LEADS: Lead[] = [
  { id: 'lead-1', name: 'Dr. Samuel Mwangi', phone: '+254 722 114 477', location: 'Greenwood Plaza, Suite 4', planInterested: 'Monthly 50 Mbps Dedicated', source: 'Captive Portal Quote Request', status: 'New', notes: 'Needs stable link for telemedicine and dental clinic.', createdAt: 'Today, 09:15' },
  { id: 'lead-2', name: 'Lucy Njeri', phone: '+254 701 556 677', location: 'Hostel Block B, Room 12', planInterested: 'Monthly Unlimited 20 Mbps', source: 'Free Trial Signup', status: 'Follow-up', notes: 'Trial expired yesterday, wants paybill details for monthly payment.', createdAt: 'Yesterday, 16:40' },
  { id: 'lead-3', name: 'Apex Gaming Lounge', phone: '+254 733 998 811', location: 'Town Center Mall 2nd Floor', planInterested: 'Low Latency Gaming 30 Mbps', source: 'Direct Referral', status: 'Contacted', notes: 'Requires low ping to Europe/South Africa gaming servers.', createdAt: 'Sep 21, 2026' },
  { id: 'lead-4', name: 'Mercy Chebet', phone: '+254 714 882 233', location: 'Sunrise Apartments Flat 5', planInterested: 'Weekly 10 GB', source: 'WhatsApp Bot', status: 'Converted', notes: 'Successfully bought weekly voucher via STK Push.', createdAt: 'Sep 20, 2026' },
]

export function LeadsView({ onConvertCustomer }: { onConvertCustomer?: (lead: Lead) => void }) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [notice, setNotice] = useState('')

  // Form states
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [plan, setPlan] = useState('Monthly 20 Mbps')
  const [notes, setNotes] = useState('')

  const filtered = leads.filter((l) => {
    if (statusFilter !== 'All' && l.status !== statusFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.planInterested.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault()
    const newL: Lead = {
      id: `lead-${Date.now()}`,
      name: name || 'Inquiry Prospect',
      phone: phone || '+254 700 000 000',
      location: location || 'Local Area',
      planInterested: plan,
      source: 'Operator Direct Entry',
      status: 'New',
      notes: notes || 'No notes added.',
      createdAt: 'Just now',
    }
    setLeads([newL, ...leads])
    setShowAddModal(false)
    setName('')
    setPhone('')
    setLocation('')
    setNotes('')
    setNotice(`Lead for ${newL.name} created!`)
    setTimeout(() => setNotice(''), 3000)
  }

  const handleStatusChange = (id: string, newStatus: Lead['status']) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)))
    setNotice(`Lead status updated to ${newStatus}`)
    setTimeout(() => setNotice(''), 2500)
  }

  const handleDelete = (id: string) => {
    setLeads(leads.filter((l) => l.id !== id))
  }

  return (
    <section className="page-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Customer Acquisition Pipeline</p>
          <h1>Hotspot &amp; ISP Leads</h1>
          <p className="heading-sub">
            Track inquiries from free trial captive portal sessions, WhatsApp bots, and direct sales contacts.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button primary" onClick={() => setShowAddModal(true)}>
            <UserPlus size={16} /> Add New Lead
          </button>
        </div>
      </section>

      {notice && (
        <div className="alert-notice" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
          <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
          {notice}
        </div>
      )}

      {/* Filter and stats */}
      <div className="filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search leads by name, phone, estate or plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'New', 'Contacted', 'Follow-up', 'Converted', 'Lost'].map((st) => (
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

      {/* Leads Table */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Prospect</th>
                <th>Phone Number</th>
                <th>Location / Estate</th>
                <th>Interested Plan</th>
                <th>Lead Source</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: 'var(--muted)' }}>
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id}>
                    <td><strong>{l.name}</strong></td>
                    <td>{l.phone}</td>
                    <td>{l.location}</td>
                    <td><span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>{l.planInterested}</span></td>
                    <td className="muted" style={{ fontSize: '12px' }}>{l.source}</td>
                    <td>
                      <select
                        value={l.status}
                        onChange={(e) => handleStatusChange(l.id, e.target.value as any)}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--line)',
                          background:
                            l.status === 'New' ? '#dbeafe' : l.status === 'Converted' ? '#dcfce7' : l.status === 'Follow-up' ? '#fef3c7' : 'var(--card-bg)',
                          color:
                            l.status === 'New' ? '#1e40af' : l.status === 'Converted' ? '#166534' : l.status === 'Follow-up' ? '#92400e' : 'var(--ink)',
                        }}
                      >
                        <option value="New">NEW</option>
                        <option value="Contacted">CONTACTED</option>
                        <option value="Follow-up">FOLLOW-UP</option>
                        <option value="Converted">CONVERTED</option>
                        <option value="Lost">LOST</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '12px', maxWidth: '200px' }} className="muted">{l.notes}</td>
                    <td className="muted" style={{ fontSize: '11px' }}>{l.createdAt}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="icon-button"
                          title="Convert to Active Customer"
                          onClick={() => {
                            if (onConvertCustomer) onConvertCustomer(l)
                            handleStatusChange(l.id, 'Converted')
                            setNotice(`Lead ${l.name} converted to customer!`)
                          }}
                          style={{ color: '#166534' }}
                        >
                          <UserCheck size={14} />
                        </button>
                        <button
                          className="icon-button"
                          title="Delete lead"
                          onClick={() => handleDelete(l.id)}
                        >
                          <Trash2 size={14} />
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

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            <div className="modal-head">
              <div className="modal-icon" style={{ background: '#dcfce7', color: '#166534' }}>
                <UserPlus size={22} />
              </div>
              <p className="eyebrow" style={{ color: '#166534' }}>Pipeline Record</p>
              <h2>Add New Hotspot Lead</h2>
            </div>

            <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Prospect Name</label>
                <input type="text" placeholder="e.g. Dennis Kipchumba" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Phone Number</label>
                <input type="text" placeholder="+254 7..." value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Location / Estate / Apartment</label>
                <input type="text" placeholder="e.g. Savannah Heights, House 3B" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Plan Interested In</label>
                <select value={plan} onChange={(e) => setPlan(e.target.value)} style={{ width: '100%' }}>
                  <option value="24 Hours Unlimited">24 Hours Unlimited - Ksh 50</option>
                  <option value="Weekly 10 GB">Weekly 10 GB - Ksh 250</option>
                  <option value="Monthly 20 Mbps">Monthly 20 Mbps - Ksh 1,500</option>
                  <option value="Monthly 50 Mbps Dedicated">Monthly 50 Mbps Dedicated - Ksh 3,000</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Notes / Requirements</label>
                <textarea rows={3} placeholder="Customer preferences, installation needs..." value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', resize: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="button secondary" onClick={() => setShowAddModal(false)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="button primary" style={{ flex: 1.5 }}><UserPlus size={15} /> Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
