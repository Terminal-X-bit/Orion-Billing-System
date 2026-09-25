import React, { useState } from 'react'
import { PieChart, Calendar, ArrowUpRight, ArrowDownRight, HardDrive, Wifi, Users, Activity } from 'lucide-react'

export type DataUsageViewProps = {
  initialWindow?: 'daily' | 'weekly' | 'monthly'
  onSelectWindow?: (window: 'daily' | 'weekly' | 'monthly') => void
}

export function DataUsageView({ initialWindow = 'daily', onSelectWindow }: DataUsageViewProps) {
  const [activeWindow, setActiveWindow] = useState<'daily' | 'weekly' | 'monthly'>(initialWindow)

  const handleSwitchWindow = (w: 'daily' | 'weekly' | 'monthly') => {
    setActiveWindow(w)
    if (onSelectWindow) onSelectWindow(w)
  }

  return (
    <section className="page-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Network Traffic &amp; Bandwidth Analytics</p>
          <h1>Data Usage Monitoring</h1>
          <p className="heading-sub">
            Granular upload and download metering across all MikroTik router interfaces, user sessions, and packages.
          </p>
        </div>
        <div className="heading-actions">
          <div className="tab-strip" style={{ display: 'flex', gap: '6px' }}>
            <button
              className={`button secondary ${activeWindow === 'daily' ? 'active-tab' : ''}`}
              style={activeWindow === 'daily' ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
              onClick={() => handleSwitchWindow('daily')}
            >
              Daily Usage
            </button>
            <button
              className={`button secondary ${activeWindow === 'weekly' ? 'active-tab' : ''}`}
              style={activeWindow === 'weekly' ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
              onClick={() => handleSwitchWindow('weekly')}
            >
              Weekly Usage
            </button>
            <button
              className={`button secondary ${activeWindow === 'monthly' ? 'active-tab' : ''}`}
              style={activeWindow === 'monthly' ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
              onClick={() => handleSwitchWindow('monthly')}
            >
              Monthly Usage
            </button>
          </div>
        </div>
      </section>

      {/* Top 3 Usage Cards matching screenshot 3 layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {/* Today's Data Usage */}
        <div className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px' }}>Today's Data Usage</h3>
            <span className="badge" style={{ background: '#dbeafe', color: '#1e40af' }}>Live</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)' }}>
                <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }} />
                Upload
              </div>
              <strong style={{ fontSize: '18px', display: 'block', marginTop: '4px' }}>1.42 GB</strong>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)' }}>
                <span style={{ width: '12px', height: '12px', background: '#06b6d4', borderRadius: '2px' }} />
                Download
              </div>
              <strong style={{ fontSize: '18px', display: 'block', marginTop: '4px' }}>14.85 GB</strong>
            </div>
          </div>
          <div style={{ height: '8px', width: '100%', background: 'var(--bar-bg)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: '9%', background: '#3b82f6' }} />
            <div style={{ width: '91%', background: '#06b6d4' }} />
          </div>
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Total: <strong>16.27 GB</strong></span>
            <span>Date: {new Date().toISOString().split('T')[0]}</span>
          </div>
        </div>

        {/* Weekly Data Usage */}
        <div className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px' }}>Weekly Data Usage</h3>
            <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>7 Days</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)' }}>
                <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }} />
                Upload
              </div>
              <strong style={{ fontSize: '18px', display: 'block', marginTop: '4px' }}>8.6 GB</strong>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)' }}>
                <span style={{ width: '12px', height: '12px', background: '#06b6d4', borderRadius: '2px' }} />
                Download
              </div>
              <strong style={{ fontSize: '18px', display: 'block', marginTop: '4px' }}>92.4 GB</strong>
            </div>
          </div>
          {/* Mini weekly bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '8px', paddingTop: '10px' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => {
              const heights = [35, 45, 28, 55, 60, 48, 40]
              return (
                <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '100%', height: `${heights[i]}%`, background: '#06b6d4', borderRadius: '3px 3px 0 0' }} />
                  <span style={{ fontSize: '9px', color: 'var(--muted)' }}>{d}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Monthly Data Usage */}
        <div className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px' }}>Monthly Data Usage</h3>
            <span className="badge" style={{ background: '#fef3c7', color: '#b45309' }}>Month-to-Date</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)' }}>
                <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }} />
                Upload
              </div>
              <strong style={{ fontSize: '18px', display: 'block', marginTop: '4px' }}>34.2 GB</strong>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--muted)' }}>
                <span style={{ width: '12px', height: '12px', background: '#06b6d4', borderRadius: '2px' }} />
                Download
              </div>
              <strong style={{ fontSize: '18px', display: 'block', marginTop: '4px' }}>410.8 GB</strong>
            </div>
          </div>
          {/* Monthly histogram */}
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '8px', paddingTop: '10px' }}>
            {['Jan', 'Apr', 'Jul', 'Oct'].map((m, i) => {
              const heights = [20, 45, 65, 95]
              return (
                <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '100%', height: `${heights[i]}%`, background: i === 3 ? 'var(--coral)' : '#06b6d4', borderRadius: '3px 3px 0 0' }} />
                  <span style={{ fontSize: '9px', color: 'var(--muted)' }}>{m}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Consumers Table */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Top Bandwidth Consumers ({activeWindow.toUpperCase()})</h3>
            <p style={{ margin: '3px 0 0', color: 'var(--muted)', fontSize: '12px' }}>
              Real-time bytes counter pulled from MikroTik RouterOS <code>/ip hotspot active</code>
            </p>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer / Host</th>
                <th>MAC Address</th>
                <th>IP Address</th>
                <th>Router</th>
                <th>Package Plan</th>
                <th>Upload</th>
                <th>Download</th>
                <th>Total Consumption</th>
                <th>Share of Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Samsung Crystal 4K TV (Room 204)', mac: '48:E2:44:81:92:AA', ip: '192.168.88.210', router: 'demo49-AMATECH', plan: 'Smart TV Unlimited', up: '820 MB', down: '12.4 GB', total: '13.22 GB', share: '32%' },
                { name: 'Kevin Otieno', mac: 'A0:B1:C2:D3:E4:F5', ip: '192.168.88.108', router: 'demo46', plan: 'Monthly 20 Mbps', up: '2.1 GB', down: '9.8 GB', total: '11.9 GB', share: '29%' },
                { name: 'Brian Mwangi (FUP)', mac: 'E8:8D:28:C0:99:11', ip: '192.168.88.120', router: 'demo48', plan: 'FUP Throttled Plan', up: '450 MB', down: '6.2 GB', total: '6.65 GB', share: '16%' },
                { name: 'Faith Wanjiku', mac: '44:65:0D:88:12:33', ip: '192.168.88.104', router: 'demo49-AMATECH', plan: 'Weekly 10 GB', up: '310 MB', down: '4.8 GB', total: '5.11 GB', share: '12%' },
                { name: 'John Kiprono', mac: 'BC:D0:74:1A:22:90', ip: '192.168.88.102', router: 'demo49-AMATECH', plan: '24 Hours Unlimited', up: '180 MB', down: '1.2 GB', total: '1.38 GB', share: '3%' },
              ].map((row) => (
                <tr key={row.mac}>
                  <td><strong>{row.name}</strong></td>
                  <td><span className="code-pill font-mono">{row.mac}</span></td>
                  <td>{row.ip}</td>
                  <td><span className="badge">{row.router}</span></td>
                  <td>{row.plan}</td>
                  <td className="font-mono text-muted">{row.up}</td>
                  <td className="font-mono text-muted">{row.down}</td>
                  <td><strong>{row.total}</strong></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '40px', height: '6px', background: 'var(--bar-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: row.share, height: '100%', background: 'var(--coral)' }} />
                      </div>
                      <small>{row.share}</small>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
