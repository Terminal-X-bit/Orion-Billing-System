import React, { useState } from 'react'
import {
  Globe, WifiOff, BookOpen, FileCheck, Layers, RefreshCw,
  CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Terminal
} from 'lucide-react'

export type DiagnosticsViewProps = {
  viewType: 'starlink' | 'noInternet' | 'tutorials' | 'registration' | 'defaultPage' | 'oldSetup'
}

export function DiagnosticsView({ viewType }: DiagnosticsViewProps) {
  const [starlinkStatus, setStarlinkStatus] = useState({
    latency: '34 ms',
    downlink: '182 Mbps',
    uplink: '22 Mbps',
    obstruction: '0.00%',
    status: 'Online (Gen 3 Dishy)',
  })

  const [testingPing, setTestingPing] = useState(false)
  const [pingResult, setPingResult] = useState<string | null>(null)
  const [clientTestIp, setClientTestIp] = useState('192.168.88.102')

  const handleTestClientRouting = () => {
    setTestingPing(true)
    setTimeout(() => {
      setTestingPing(false)
      setPingResult('SUCCESS: Client ARP resolved, DHCP lease valid, DNS port 53 answering, WAN NAT rule active. Client has internet reachability.')
    }, 1200)
  }

  return (
    <section className="page-view">
      {viewType === 'starlink' && (
        <>
          <section className="page-heading">
            <div>
              <p className="eyebrow">Satellite Uplink Telemetry</p>
              <h1>Starlink / Satellite Internet Issues</h1>
              <p className="heading-sub">
                Monitor Dishy obstruction, satellite switchovers, CGNAT IP bypass, and dual-WAN failover with Fiber.
              </p>
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Dishy Status</div>
              <strong style={{ fontSize: '18px', color: 'var(--green)', display: 'block', marginTop: '4px' }}>{starlinkStatus.status}</strong>
            </div>
            <div className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Satellite Ping Latency</div>
              <strong style={{ fontSize: '18px', color: 'var(--coral)', display: 'block', marginTop: '4px' }}>{starlinkStatus.latency}</strong>
            </div>
            <div className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Downlink Throughput</div>
              <strong style={{ fontSize: '18px', display: 'block', marginTop: '4px' }}>{starlinkStatus.downlink}</strong>
            </div>
            <div className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Obstruction Ratio</div>
              <strong style={{ fontSize: '18px', color: 'var(--green)', display: 'block', marginTop: '4px' }}>{starlinkStatus.obstruction} (Clear Sky)</strong>
            </div>
          </div>

          <div className="panel" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '16px' }}>Recommended Starlink + MikroTik Configuration</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.8 }}>
              <li><strong>Bypass Mode:</strong> Enable "Bypass Mode" in the Starlink App so MikroTik WAN receives the public CGNAT IP (100.64.0.0/10) directly via DHCP.</li>
              <li><strong>MTU Size:</strong> Set MikroTik ether1 (Starlink WAN) MTU to <code>1500</code>.</li>
              <li><strong>Dual-WAN Failover:</strong> Set Distance=1 on Safaricom Fiber WAN, and Distance=2 on Starlink WAN with recursive DNS ping check (<code>target: 8.8.8.8</code>).</li>
            </ul>
          </div>
        </>
      )}

      {viewType === 'noInternet' && (
        <>
          <section className="page-heading">
            <div>
              <p className="eyebrow">DHCP, DNS &amp; Walled Garden Troubleshooter</p>
              <h1>Connected Without Internet Diagnostics</h1>
              <p className="heading-sub">
                Diagnose why clients show Wi-Fi connected with exclamation mark (!), captive portal popup failure, or DNS loop.
              </p>
            </div>
          </section>

          <div className="panel" style={{ maxWidth: '640px', padding: '24px' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '16px' }}>Test Client IP Routing &amp; DNS</h3>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input
                type="text"
                value={clientTestIp}
                onChange={(e) => setClientTestIp(e.target.value)}
                placeholder="Client IP (e.g. 192.168.88.102)"
                style={{ flex: 1 }}
              />
              <button className="button primary" onClick={handleTestClientRouting} disabled={testingPing}>
                <RefreshCw size={15} className={testingPing ? 'spinning' : ''} />
                {testingPing ? 'Diagnosing on router...' : 'Diagnose Client'}
              </button>
            </div>

            {pingResult && (
              <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
                <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                {pingResult}
              </div>
            )}

            <div style={{ background: 'var(--card-subtle-bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px' }}>
              <strong>Common Causes &amp; Fixes:</strong>
              <ol style={{ margin: '8px 0 0 18px', padding: 0, color: 'var(--muted)', lineHeight: 1.7 }}>
                <li><strong>Android/iOS Private MAC:</strong> Turn off "Randomized MAC" in the phone Wi-Fi settings for this network.</li>
                <li><strong>DNS Masquerade Missing:</strong> Ensure MikroTik NAT rule: <code>/ip firewall nat add chain=srcnat action=masquerade out-interface-list=WAN</code> is active.</li>
                <li><strong>Walled Garden Callback Blocked:</strong> Add Safaricom Daraja IP to <code>/ip hotspot walled-garden ip</code>.</li>
              </ol>
            </div>
          </div>
        </>
      )}

      {viewType === 'tutorials' && (
        <>
          <section className="page-heading">
            <div>
              <p className="eyebrow">Knowledgebase &amp; Operations Manual</p>
              <h1>MikroTik Hotspot &amp; Billing Tutorials</h1>
              <p className="heading-sub">
                Step-by-step guides for connecting RouterOS hardware, M-Pesa Till setup, and voucher printing.
              </p>
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              { title: 'Connecting MikroTik RouterOS API', desc: 'Enable API service on port 8728/8729 and configure bridge API keys.', time: '5 min read' },
              { title: 'Setting up Safaricom M-Pesa STK Push', desc: 'Obtain Daraja Consumer Key, Secret, Passkey, and Till Number for instant mobile checkout.', time: '8 min read' },
              { title: 'Smart TV & Console Whitelisting', desc: 'How to bypass captive portals for Smart TVs using /ip hotspot ip-binding.', time: '4 min read' },
              { title: 'Batch Voucher Printing on 58mm/80mm Thermal Printers', desc: 'Customizing ESC/POS templates and printing QR voucher slips for cyber cafes.', time: '6 min read' },
            ].map((t) => (
              <div key={t.title} className="panel" style={{ padding: '20px', background: 'var(--card-subtle-bg)' }}>
                <span className="badge" style={{ background: '#dbeafe', color: '#1e40af' }}>{t.time}</span>
                <h3 style={{ margin: '10px 0 6px', fontSize: '16px' }}>{t.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>{t.desc}</p>
                <button className="button secondary" style={{ marginTop: '14px', width: '100%', fontSize: '12px' }}>
                  Read Tutorial Guide <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {viewType === 'registration' && (
        <>
          <section className="page-heading">
            <div>
              <p className="eyebrow">Regulatory Compliance &amp; Operator Profile</p>
              <h1>ISP Registration &amp; Business Information</h1>
              <p className="heading-sub">
                Official licensing, Communications Authority of Kenya (CAK) compliance, and tax identifiers.
              </p>
            </div>
          </section>

          <div className="panel" style={{ maxWidth: '600px', padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Business Legal Name</label>
                <input type="text" defaultValue="Orion HighSpeed Networks Ltd" style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>KRA Tax PIN</label>
                <input type="text" defaultValue="P051982736Z" style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>CAK Telecom License Category</label>
                <input type="text" defaultValue="Applications Service Provider (ASP) - Wi-Fi Hotspot" style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Operating County / Jurisdiction</label>
                <input type="text" defaultValue="Nairobi, Kenya" style={{ width: '100%' }} />
              </div>

              <button className="button primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                <CheckCircle2 size={15} /> Save Registration Information
              </button>
            </div>
          </div>
        </>
      )}

      {viewType === 'defaultPage' && (
        <>
          <section className="page-heading">
            <div>
              <p className="eyebrow">RouterOS Template Preview</p>
              <h1>Default MikroTik Hotspot Page</h1>
              <p className="heading-sub">
                Inspect the native RouterOS login page template before applying custom Orion branding.
              </p>
            </div>
          </section>

          <div className="panel" style={{ padding: '24px', background: 'var(--card-subtle-bg)' }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '24px', textAlign: 'center', color: '#0f172a' }}>
              <h2 style={{ fontSize: '18px', margin: '0 0 6px', color: '#0f172a' }}>MikroTik RouterOS</h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>Hotspot Gateway Login</p>
              <input type="text" placeholder="Username / Voucher" disabled style={{ width: '100%', marginBottom: '10px' }} />
              <input type="password" placeholder="Password" disabled style={{ width: '100%', marginBottom: '16px' }} />
              <button className="button primary" disabled style={{ width: '100%' }}>OK / Connect</button>
              <small style={{ display: 'block', marginTop: '12px', color: '#94a3b8' }}>Powered by RouterOS v7.15</small>
            </div>
          </div>
        </>
      )}

      {viewType === 'oldSetup' && (
        <>
          <section className="page-heading">
            <div>
              <p className="eyebrow">Legacy Standalone Hotspot</p>
              <h1>Old Setup (No PPPoE)</h1>
              <p className="heading-sub">
                Configuration instructions for standalone hotspot mode without PPPoE or Radius authentication.
              </p>
            </div>
          </section>

          <div className="panel" style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '16px' }}>Standalone Hotspot Mode Overview</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
              In the old setup, the router functions purely as a captive portal hotspot without PPPoE concentrators or RADIUS servers.
              Users authenticate solely via local vouchers stored in <code>/ip hotspot user</code>.
              This mode is recommended for smaller single-AP deployments, cyber cafes, and hotel lobbies.
            </p>
          </div>
        </>
      )}
    </section>
  )
}
