import React, { useState } from 'react'
import {
  Wifi, Sliders, Tv, Search, Plus, CheckCircle2, AlertTriangle,
  RefreshCw, Power, Trash2, ArrowUpRight, HelpCircle, Laptop, Film
} from 'lucide-react'

export type HotspotBindingProps = {
  activeTab?: 'all' | 'active' | 'expired' | 'bind' | 'speeds' | 'troubleshootTV'
  onSelectTab?: (tab: string) => void
}

type BindingRecord = {
  id: string
  mac: string
  address: string
  router: string
  type: 'bypassed' | 'regular' | 'blocked'
  deviceType: 'tv' | 'camera' | 'laptop' | 'printer' | 'console' | 'other'
  comment: string
  status: 'active' | 'expired'
  speedLimit: string
  expiresAt: string
  createdAt: string
}

const SAMPLE_BINDINGS: BindingRecord[] = [
  { id: 'b-1', mac: '48:E2:44:81:92:AA', address: '192.168.88.210', router: 'demo49-AMATECH', type: 'bypassed', deviceType: 'tv', comment: 'Samsung Crystal 4K Smart TV - Room 204', status: 'active', speedLimit: '20M/20M', expiresAt: 'Unlimited (Static)', createdAt: '2026-09-10' },
  { id: 'b-2', mac: '60:A4:B7:12:33:DE', address: '192.168.88.211', router: 'demo49-AMATECH', type: 'bypassed', deviceType: 'tv', comment: 'LG WebOS OLED TV - VIP Lounge', status: 'active', speedLimit: '30M/30M', expiresAt: '2026-10-01', createdAt: '2026-09-01' },
  { id: 'b-3', mac: 'A4:C1:38:99:44:55', address: '192.168.88.215', router: 'demo46', type: 'bypassed', deviceType: 'camera', comment: 'Dahua IP CCTV Gate Camera', status: 'active', speedLimit: '4M/4M', expiresAt: 'Permanent', createdAt: '2026-08-15' },
  { id: 'b-4', mac: 'E0:2B:96:77:88:99', address: '192.168.88.220', router: 'demo47', type: 'blocked', deviceType: 'laptop', comment: 'Abusive Torrent Download User', status: 'active', speedLimit: '0M/0M', expiresAt: 'Indefinite', createdAt: '2026-09-12' },
  { id: 'b-5', mac: '00:1F:3B:55:66:77', address: '192.168.88.225', router: 'demo48', type: 'bypassed', deviceType: 'tv', comment: 'TCL Android TV - Executive Suite 3', status: 'expired', speedLimit: '15M/15M', expiresAt: '2026-09-18 (Expired)', createdAt: '2026-08-18' },
]

export function HotspotBindingView({ activeTab = 'all', onSelectTab }: HotspotBindingProps) {
  const [bindings, setBindings] = useState<BindingRecord[]>(SAMPLE_BINDINGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [notice, setNotice] = useState('')

  // Modal form states
  const [newMac, setNewMac] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newRouter, setNewRouter] = useState('demo49-AMATECH')
  const [newType, setNewType] = useState<'bypassed' | 'regular' | 'blocked'>('bypassed')
  const [newDeviceType, setNewDeviceType] = useState<BindingRecord['deviceType']>('tv')
  const [newComment, setNewComment] = useState('')
  const [newSpeed, setNewSpeed] = useState('20M/20M')

  // TV Troubleshooter states
  const [tvScanMac, setTvScanMac] = useState('')
  const [tvBrand, setTvBrand] = useState('Samsung Smart TV')
  const [tvRoom, setTvRoom] = useState('Room 101')
  const [tvTroubleshootStep, setTvTroubleshootStep] = useState<1 | 2 | 3>(1)
  const [tvPingResult, setTvPingResult] = useState<string | null>(null)
  const [isPinging, setIsPinging] = useState(false)

  const filteredBindings = bindings.filter((b) => {
    if (activeTab === 'active' && b.status !== 'active') return false
    if (activeTab === 'expired' && b.status !== 'expired') return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        b.mac.toLowerCase().includes(q) ||
        b.comment.toLowerCase().includes(q) ||
        b.address.includes(q) ||
        b.router.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleAddBinding = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMac) return
    const created: BindingRecord = {
      id: `b-${Date.now()}`,
      mac: newMac.toUpperCase(),
      address: newAddress || `192.168.88.${Math.floor(Math.random() * 50) + 200}`,
      router: newRouter,
      type: newType,
      deviceType: newDeviceType,
      comment: newComment || 'Manual Bound Device',
      status: 'active',
      speedLimit: newSpeed,
      expiresAt: 'Unlimited',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setBindings([created, ...bindings])
    setShowAddModal(false)
    setNewMac('')
    setNewAddress('')
    setNewComment('')
    setNotice(`Device ${created.mac} (${created.type}) bound successfully to MikroTik!`)
    setTimeout(() => setNotice(''), 3000)
  }

  const handleDeleteBinding = (id: string, mac: string) => {
    setBindings(bindings.filter((b) => b.id !== id))
    setNotice(`Binding for ${mac} removed from MikroTik.`)
    setTimeout(() => setNotice(''), 3000)
  }

  const handleRunTvDiagnostics = () => {
    setIsPinging(true)
    setTimeout(() => {
      setIsPinging(false)
      setTvPingResult('SUCCESS: 4 packets sent, 4 received (0% loss), avg round-trip = 4.2ms. MikroTik DNS responding correctly.')
      setTvTroubleshootStep(3)
    }, 1500)
  }

  const handleQuickBindTv = () => {
    const mac = tvScanMac || 'AC:12:34:56:78:90'
    const newTvBinding: BindingRecord = {
      id: `b-tv-${Date.now()}`,
      mac: mac.toUpperCase(),
      address: `192.168.88.${Math.floor(Math.random() * 40) + 210}`,
      router: 'demo49-AMATECH',
      type: 'bypassed',
      deviceType: 'tv',
      comment: `${tvBrand} - ${tvRoom} (Bypassed via Troubleshooter)`,
      status: 'active',
      speedLimit: '25M/25M',
      expiresAt: 'Permanent',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setBindings([newTvBinding, ...bindings])
    setTvScanMac(mac)
    setTvTroubleshootStep(2)
    setNotice(`Smart TV MAC ${mac} successfully bypassed on MikroTik router!`)
    setTimeout(() => setNotice(''), 3000)
  }

  return (
    <section className="page-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">MikroTik RouterOS /ip hotspot ip-binding</p>
          <h1>Hotspot IP &amp; MAC Bindings</h1>
          <p className="heading-sub">
            Bypass captive portal authentication for Smart TVs, game consoles, and IoT devices, or block unauthorized MAC addresses.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button secondary" onClick={() => onSelectTab && onSelectTab('Binding:TroubleshootTV')}>
            <Tv size={16} /> Troubleshoot Smart TV
          </button>
          <button className="button primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Bind a User / Device
          </button>
        </div>
      </section>

      {notice && (
        <div className="alert-notice" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
          <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
          {notice}
        </div>
      )}

      {/* Tabs */}
      <div className="tab-strip" style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[
          ['All Bindings', 'all'],
          ['Active Bindings', 'active'],
          ['Expired Bindings', 'expired'],
          ['Create Binding Speeds', 'speeds'],
          ['Troubleshoot TV Binding', 'troubleshootTV'],
        ].map(([label, key]) => {
          const isSelected = activeTab === key || (key === 'all' && activeTab === 'Binding:All') || (key === 'speeds' && activeTab === 'Binding:CreateSpeeds') || (key === 'troubleshootTV' && activeTab === 'Binding:TroubleshootTV')
          return (
            <button
              key={key}
              className={`button secondary ${isSelected ? 'active-tab' : ''}`}
              style={isSelected ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
              onClick={() => onSelectTab && onSelectTab(key === 'all' ? 'Binding:All' : key === 'active' ? 'Binding:Active' : key === 'expired' ? 'Binding:Expired' : key === 'speeds' ? 'Binding:CreateSpeeds' : 'Binding:TroubleshootTV')}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Render Speeds subview */}
      {(activeTab === 'speeds' || activeTab === 'Binding:CreateSpeeds') ? (
        <div className="panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div className="panel-icon" style={{ background: '#e0f2fe', color: '#0284c7', width: '40px', height: '40px', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
              <Sliders size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Binding Speed Profiles &amp; Simple Queues</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                Define bandwidth rate limits applied directly to bypassed IP bindings on RouterOS.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
            {[
              { title: 'Smart TV 4K Stream', speed: '25M / 25M', queue: 'smart-tv-4k', desc: 'Unmetered high-bitrate streaming for Netflix, YouTube 4K, Showmax.' },
              { title: 'Standard HD TV', speed: '12M / 12M', queue: 'smart-tv-hd', desc: 'Recommended for 1080p Smart TVs and IPTV boxes.' },
              { title: 'CCTV Security Camera', speed: '4M / 4M', queue: 'cctv-stream', desc: 'Steady upload bandwidth for remote NVR and cloud camera backup.' },
              { title: 'Staff Workstation', speed: '50M / 50M', queue: 'staff-priority', desc: 'High priority queue bypass for reception, billing PC, and POS.' },
            ].map((prof) => (
              <div key={prof.title} className="plan-card" style={{ border: '1px solid var(--line)', borderRadius: '10px', padding: '16px', background: 'var(--card-subtle-bg)' }}>
                <span className="badge" style={{ background: '#dbeafe', color: '#1e40af' }}>{prof.queue}</span>
                <h3 style={{ margin: '10px 0 4px', fontSize: '16px' }}>{prof.title}</h3>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--coral)', margin: '8px 0' }}>{prof.speed}</div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>{prof.desc}</p>
                <button className="button secondary" style={{ marginTop: '12px', width: '100%', fontSize: '12px' }} onClick={() => setNotice(`Applied ${prof.queue} queue to MikroTik!`)}>
                  Apply Queue Rules
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (activeTab === 'troubleshootTV' || activeTab === 'Binding:TroubleshootTV') ? (
        /* Render Troubleshoot TV view */
        <div className="panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#fef3c7', color: '#b45309', width: '42px', height: '42px', borderRadius: '10px', display: 'grid', placeItems: 'center' }}>
              <Tv size={22} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Smart TV &amp; Device Binding Troubleshooter</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                Smart TVs (Samsung Tizen, LG webOS, Android TV) lack browser popup support for captive portals. Use this tool to instantly bypass authentication and verify streaming connectivity.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 340px', background: 'var(--card-subtle-bg)', padding: '18px', borderRadius: '10px', border: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Step 1: Identify TV &amp; Bypass Hotspot</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>TV Brand / Model</label>
                  <select value={tvBrand} onChange={(e) => setTvBrand(e.target.value)} style={{ width: '100%' }}>
                    <option value="Samsung Smart TV (Tizen)">Samsung Smart TV (Tizen)</option>
                    <option value="LG Smart TV (webOS)">LG Smart TV (webOS)</option>
                    <option value="Sony Bravia Android TV">Sony Bravia Android TV</option>
                    <option value="TCL / Hisense Vidaa">TCL / Hisense Vidaa</option>
                    <option value="Apple TV 4K">Apple TV 4K</option>
                    <option value="Amazon Fire TV Stick">Amazon Fire TV Stick</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Location / Room</label>
                  <input
                    type="text"
                    value={tvRoom}
                    onChange={(e) => setTvRoom(e.target.value)}
                    placeholder="e.g. Room 204 or VIP Lounge"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>TV Wi-Fi MAC Address</label>
                  <input
                    type="text"
                    value={tvScanMac}
                    onChange={(e) => setTvScanMac(e.target.value)}
                    placeholder="e.g. 48:E2:44:81:92:AA"
                    style={{ width: '100%' }}
                  />
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: '4px' }}>
                    Tip: On Samsung TVs go to Settings &gt; General &gt; Network &gt; Network Status &gt; IP Settings to find MAC.
                  </small>
                </div>

                <button className="button primary" onClick={handleQuickBindTv} style={{ marginTop: '8px' }}>
                  <Tv size={15} /> 1-Click Bypass &amp; Whitelist on MikroTik
                </button>
              </div>
            </div>

            <div style={{ flex: '1 1 340px', background: 'var(--card-subtle-bg)', padding: '18px', borderRadius: '10px', border: '1px solid var(--line)' }}>
              <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Step 2: Test Internet &amp; Streaming Connectivity</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Sends ICMP ping and DNS resolution test directly from MikroTik to the Smart TV IP address.
              </p>

              <button
                className="button secondary"
                onClick={handleRunTvDiagnostics}
                disabled={isPinging}
                style={{ width: '100%', marginBottom: '14px' }}
              >
                <RefreshCw size={15} className={isPinging ? 'spinning' : ''} />
                {isPinging ? 'Running diagnostic ping on router...' : 'Run TV Ping & DNS Test'}
              </button>

              {tvPingResult && (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#065f46' }}>
                  <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  {tvPingResult}
                </div>
              )}

              <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', fontSize: '12px' }}>
                <strong>TV Streaming Best Practices:</strong>
                <ul style={{ margin: '6px 0 0 16px', padding: 0, color: 'var(--muted)' }}>
                  <li>Always assign a static DHCP lease to Smart TVs.</li>
                  <li>Set DNS to 8.8.8.8 and 1.1.1.1 in MikroTik DHCP Network.</li>
                  <li>Disable "Block client-to-client traffic" on 5GHz AP for Chromecast/AirPlay.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Regular Bindings Table */
        <>
          <div className="filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input
                type="text"
                placeholder="Search bindings by MAC, comment, IP or router..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: '36px' }}
              />
            </div>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              Showing <strong>{filteredBindings.length}</strong> bindings
            </span>
          </div>

          <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Device &amp; Comment</th>
                    <th>MAC Address</th>
                    <th>IP Address</th>
                    <th>Router</th>
                    <th>Binding Type</th>
                    <th>Speed Limit</th>
                    <th>Expires</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBindings.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: 'var(--muted)' }}>
                        No IP bindings found. Click <strong>Bind a User / Device</strong> to add one.
                      </td>
                    </tr>
                  ) : (
                    filteredBindings.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {b.deviceType === 'tv' ? <Tv size={16} color="var(--coral)" /> : b.deviceType === 'camera' ? <Film size={16} color="#0284c7" /> : <Laptop size={16} color="var(--green)" />}
                            <strong>{b.comment}</strong>
                          </div>
                        </td>
                        <td>
                          <span className="code-pill font-mono">{b.mac}</span>
                        </td>
                        <td>{b.address}</td>
                        <td><span className="badge">{b.router}</span></td>
                        <td>
                          <span
                            className="badge"
                            style={
                              b.type === 'bypassed'
                                ? { background: '#dcfce7', color: '#166534' }
                                : b.type === 'blocked'
                                ? { background: '#fee2e2', color: '#991b1b' }
                                : { background: '#e0f2fe', color: '#075985' }
                            }
                          >
                            {b.type.toUpperCase()}
                          </span>
                        </td>
                        <td><strong>{b.speedLimit}</strong></td>
                        <td className="muted">{b.expiresAt}</td>
                        <td>
                          <span className={`status ${b.status === 'active' ? 'active' : 'expired'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="icon-button"
                            title="Delete binding from MikroTik"
                            onClick={() => handleDeleteBinding(b.id, b.mac)}
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
        </>
      )}

      {/* Add Binding Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            <div className="modal-head">
              <div className="modal-icon" style={{ background: '#dcfce7', color: '#166534' }}>
                <Wifi size={22} />
              </div>
              <p className="eyebrow" style={{ color: '#166534' }}>RouterOS IP Binding</p>
              <h2>Bind a User / Device</h2>
              <p className="modal-copy">Add device MAC to MikroTik <code>/ip hotspot ip-binding</code> to bypass captive portal or block access.</p>
            </div>

            <form onSubmit={handleAddBinding} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Device MAC Address</label>
                <input
                  type="text"
                  placeholder="AA:BB:CC:DD:EE:FF"
                  value={newMac}
                  onChange={(e) => setNewMac(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Device Label / Comment</label>
                <input
                  type="text"
                  placeholder="e.g. Samsung Smart TV Room 204"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Binding Type</label>
                <select value={newType} onChange={(e) => setNewType(e.target.value as any)} style={{ width: '100%' }}>
                  <option value="bypassed">bypassed (Full internet, NO voucher required)</option>
                  <option value="regular">regular (Normal captive portal)</option>
                  <option value="blocked">blocked (Deny all network access)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Target Router</label>
                <select value={newRouter} onChange={(e) => setNewRouter(e.target.value)} style={{ width: '100%' }}>
                  <option value="demo49-AMATECH">demo49-AMATECH (Online)</option>
                  <option value="demo46">demo46 (Offline)</option>
                  <option value="demo47">demo47 (Offline)</option>
                  <option value="demo48">demo48 (Offline)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Speed Rate Limit</label>
                <select value={newSpeed} onChange={(e) => setNewSpeed(e.target.value)} style={{ width: '100%' }}>
                  <option value="10M/10M">10M/10M (Standard Browsing)</option>
                  <option value="20M/20M">20M/20M (HD Smart TV)</option>
                  <option value="30M/30M">30M/30M (4K Ultra HD Streaming)</option>
                  <option value="50M/50M">50M/50M (VIP / Staff)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="button secondary" onClick={() => setShowAddModal(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="button primary" style={{ flex: 1.5 }}>
                  <Plus size={15} /> Save &amp; Push to Router
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
