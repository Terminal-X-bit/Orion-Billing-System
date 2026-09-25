import React, { useState } from 'react'
import {
  Network, Server, Radio, FileText, CheckCircle2, Copy, Download,
  RefreshCw, Plus, Sliders, Shield, Terminal, ArrowRight, HardDrive, Wifi
} from 'lucide-react'

export type NetworkManagementProps = {
  activeTab?: string
  onSelectTab?: (tab: string) => void
  onOpenAddRouter?: () => void
}

export function NetworkManagementView({ activeTab = 'routers', onSelectTab, onOpenAddRouter }: NetworkManagementProps) {
  const [tab, setTab] = useState<string>(() => {
    if (activeTab.includes(':SelfInstall')) return 'selfInstall'
    if (activeTab.includes(':ReplaceRouter')) return 'replaceRouter'
    if (activeTab.includes(':IPPool')) return 'ipPool'
    if (activeTab.includes(':Backups')) return 'backups'
    if (activeTab.includes(':Wireless')) return 'wireless'
    if (activeTab.includes(':Bridge')) return 'bridge'
    if (activeTab.includes(':IPAddress')) return 'ipAddress'
    if (activeTab.includes(':Files')) return 'files'
    if (activeTab.includes(':Hotspot')) return 'hotspot'
    return 'routers'
  })

  const [notice, setNotice] = useState('')
  const [copiedScript, setCopiedScript] = useState(false)

  // Replace router wizard state
  const [oldRouter, setOldRouter] = useState('demo46')
  const [newRouter, setNewRouter] = useState('demo49-AMATECH')
  const [migrating, setMigrating] = useState(false)

  // Script text for Self Install
  const selfInstallScript = `# ========================================================
# ORION BILLING SYSTEM - MIKROTIK PROVISIONING SCRIPT
# Run in RouterOS Terminal (Winbox -> New Terminal)
# ========================================================

/ip pool add name=hs-pool ranges=192.168.88.10-192.168.88.254

/ip hotspot profile
add dns-name=wifi.orion.hotspot \\
    hotspot-address=192.168.88.1 \\
    html-directory=hotspot \\
    http-cookie-lifetime=1d \\
    login-by=http-chap,http-pap,mac-cookie,cookie \\
    name=orion-hsp-profile \\
    use-radius=no

/ip hotspot
add address-pool=hs-pool \\
    addresses-per-mac=1 \\
    disabled=no \\
    interface=bridge \\
    name=orion-hotspot \\
    profile=orion-hsp-profile

/ip hotspot user profile
add name=default shared-users=1 status-autorefresh=1m
add name=24h-unlimited rate-limit=20M/20M shared-users=1
add name=monthly-20m rate-limit=20M/20M shared-users=2

/ip hotspot walled-garden ip
add action=accept comment="Allow Safaricom Daraja M-Pesa" dst-host=api.safaricom.co.ke
add action=accept comment="Allow Safaricom M-Pesa Portal" dst-host=*.safaricom.co.ke
add action=accept comment="Allow Orion Billing API" dst-port=8787 protocol=tcp

:put "Orion Hotspot Provisioning Complete! Router connected."`

  const handleCopyScript = () => {
    navigator.clipboard.writeText(selfInstallScript)
    setCopiedScript(true)
    setNotice('RouterOS terminal script copied to clipboard!')
    setTimeout(() => {
      setCopiedScript(false)
      setNotice('')
    }, 3000)
  }

  const handleRunMigration = () => {
    setMigrating(true)
    setTimeout(() => {
      setMigrating(false)
      setNotice(`Successfully migrated 24 bindings and 4 hotspot profiles from ${oldRouter} to ${newRouter}!`)
    }, 2000)
  }

  return (
    <section className="page-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">MikroTik RouterOS Network Core</p>
          <h1>Network &amp; RouterOS Management</h1>
          <p className="heading-sub">
            Configure IP pools, bridges, wireless interfaces, backups, and generate zero-touch provisioning scripts.
          </p>
        </div>
      </section>

      {notice && (
        <div className="alert-notice" style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
          <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
          {notice}
        </div>
      )}

      {/* Tabs matching screenshot 5 */}
      <div className="tab-strip" style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          ['Self Install', 'selfInstall', 'Network:SelfInstall'],
          ['Replace Router', 'replaceRouter', 'Network:ReplaceRouter'],
          ['Routers', 'routers', 'Network:Routers'],
          ['IP Pool', 'ipPool', 'Network:IPPool'],
          ['Router Backups', 'backups', 'Network:Backups'],
          ['Wireless Settings', 'wireless', 'Network:Wireless'],
          ['Bridge', 'bridge', 'Network:Bridge'],
          ['Ip Address', 'ipAddress', 'Network:IPAddress'],
          ['Files', 'files', 'Network:Files'],
          ['Hotspot', 'hotspot', 'Network:Hotspot'],
        ].map(([label, key, navId]) => (
          <button
            key={key}
            className={`button secondary ${tab === key ? 'active-tab' : ''}`}
            style={tab === key ? { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)' } : {}}
            onClick={() => {
              setTab(key)
              if (onSelectTab) onSelectTab(navId)
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 1. Self Install Script Generator */}
      {tab === 'selfInstall' && (
        <div className="panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>MikroTik RouterOS Self-Install Script</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                Paste this script into Winbox Terminal to configure Hotspot, DHCP Pool, Walled Garden (M-Pesa), and API bridge.
              </p>
            </div>
            <button className="button primary" onClick={handleCopyScript}>
              <Copy size={15} /> {copiedScript ? 'Copied!' : 'Copy Script'}
            </button>
          </div>

          <pre style={{
            background: '#0f172a',
            color: '#38bdf8',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
            overflowX: 'auto',
            maxHeight: '400px',
            lineHeight: 1.5,
          }}>
            {selfInstallScript}
          </pre>
        </div>
      )}

      {/* 2. Replace Router Wizard */}
      {tab === 'replaceRouter' && (
        <div className="panel" style={{ maxWidth: '640px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Router Replacement &amp; Migration Wizard</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Seamlessly migrate all customer IP bindings, voucher limits, and rate limits when replacing a faulty router.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Source Router (Old/Offline)</label>
                <select value={oldRouter} onChange={(e) => setOldRouter(e.target.value)} style={{ width: '100%' }}>
                  <option value="demo46">demo46 (Offline, RB3011UiAS)</option>
                  <option value="demo47">demo47 (Offline)</option>
                  <option value="demo48">demo48 (Offline)</option>
                </select>
              </div>

              <div style={{ paddingTop: '20px' }}>
                <ArrowRight size={20} color="var(--muted)" />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Destination Router (New Replacement)</label>
                <select value={newRouter} onChange={(e) => setNewRouter(e.target.value)} style={{ width: '100%' }}>
                  <option value="demo49-AMATECH">demo49-AMATECH (Online, RB3011UiAS)</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--card-subtle-bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '12px' }}>
              <strong>Items to migrate:</strong>
              <ul style={{ margin: '6px 0 0 16px', padding: 0, color: 'var(--muted)' }}>
                <li>Hotspot User Profiles &amp; Bandwidth Speeds (5 profiles)</li>
                <li>Active IP/MAC Bindings &amp; TV Whitelists (24 bindings)</li>
                <li>Walled Garden rules for Safaricom M-Pesa</li>
                <li>DHCP Server Pool ranges</li>
              </ul>
            </div>

            <button className="button primary" onClick={handleRunMigration} disabled={migrating} style={{ alignSelf: 'flex-start' }}>
              <RefreshCw size={15} className={migrating ? 'spinning' : ''} />
              {migrating ? 'Migrating configuration to router...' : 'Start One-Click Migration'}
            </button>
          </div>
        </div>
      )}

      {/* 3. IP Pool */}
      {tab === 'ipPool' && (
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>RouterOS IP Pools (/ip pool)</h3>
              <p style={{ margin: '3px 0 0', color: 'var(--muted)', fontSize: '12px' }}>Address ranges assigned to Hotspot and PPPoE clients</p>
            </div>
            <button className="button primary" onClick={() => setNotice('IP pool editor opened')}>
              <Plus size={14} /> Add IP Pool
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Pool Name</th>
                  <th>IP Address Ranges</th>
                  <th>Total Capacity</th>
                  <th>Currently Leased</th>
                  <th>Free IPs</th>
                  <th>Assigned Service</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'hs-pool-demo49', ranges: '192.168.88.10-192.168.88.254', total: 245, used: 17, free: 228, svc: 'Hotspot Server' },
                  { name: 'pppoe-pool-demo49', ranges: '10.10.0.2-10.10.0.254', total: 253, used: 0, free: 253, svc: 'PPPoE Server' },
                  { name: 'static-tv-pool', ranges: '192.168.88.200-192.168.88.240', total: 41, used: 5, free: 36, svc: 'Smart TV IP Bindings' },
                ].map((p) => (
                  <tr key={p.name}>
                    <td><strong className="code-pill font-mono">{p.name}</strong></td>
                    <td className="font-mono">{p.ranges}</td>
                    <td>{p.total} IPs</td>
                    <td><strong style={{ color: 'var(--coral)' }}>{p.used}</strong></td>
                    <td><strong style={{ color: 'var(--green)' }}>{p.free}</strong></td>
                    <td><span className="badge">{p.svc}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Router Backups */}
      {tab === 'backups' && (
        <div className="panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>RouterOS System Backups &amp; Exports</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                Full binary system backups (.backup) and plaintext RouterOS command exports (.rsc)
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="button secondary" onClick={() => setNotice('Backup initiated: /system backup save')}>
                <HardDrive size={15} /> Save .backup File
              </button>
              <button className="button primary" onClick={() => setNotice('Export initiated: /export file=orion-config')}>
                <Download size={15} /> Export .rsc Script
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Backup File</th>
                  <th>Router</th>
                  <th>Type</th>
                  <th>File Size</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { file: 'demo49_amatech_daily_2026-09-24.backup', router: 'demo49-AMATECH', type: 'Full Binary Backup', size: '1.4 MB', date: 'Yesterday, 23:59' },
                  { file: 'orion_hotspot_rules_export.rsc', router: 'demo49-AMATECH', type: 'RouterOS Script Export', size: '48 KB', date: 'Sep 20, 2026' },
                  { file: 'demo46_rb3011_last_known_good.backup', router: 'demo46', type: 'Full Binary Backup', size: '1.2 MB', date: 'Sep 11, 2026' },
                ].map((b) => (
                  <tr key={b.file}>
                    <td><strong className="code-pill font-mono">{b.file}</strong></td>
                    <td><span className="badge">{b.router}</span></td>
                    <td>{b.type}</td>
                    <td>{b.size}</td>
                    <td className="muted">{b.date}</td>
                    <td>
                      <button className="button secondary" style={{ fontSize: '11px', padding: '4px 8px' }} onClick={() => setNotice(`Downloading ${b.file}`)}>
                        <Download size={12} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Wireless Settings */}
      {tab === 'wireless' && (
        <div className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Access Point &amp; Wireless Interface Settings</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Configure SSID broadcast names, frequencies, transmit power, and security profiles.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="plan-card" style={{ border: '1px solid var(--line)', borderRadius: '10px', padding: '18px', background: 'var(--card-subtle-bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>wlan1 (2.4 GHz B/G/N)</h3>
                <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>Running</span>
              </div>
              <div style={{ margin: '14px 0', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong>SSID:</strong> Orion_HighSpeed_WiFi</div>
                <div><strong>Mode:</strong> ap-bridge</div>
                <div><strong>Frequency:</strong> 2437 MHz (Channel 6)</div>
                <div><strong>Bandwidth:</strong> 20/40MHz Ce</div>
                <div><strong>Security:</strong> None (Hotspot Captive Portal Protected)</div>
              </div>
              <button className="button secondary" style={{ width: '100%', fontSize: '12px' }} onClick={() => setNotice('wlan1 settings saved')}>
                Save 2.4GHz Settings
              </button>
            </div>

            <div className="plan-card" style={{ border: '1px solid var(--line)', borderRadius: '10px', padding: '18px', background: 'var(--card-subtle-bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>wlan2 (5 GHz A/N/AC)</h3>
                <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>Running</span>
              </div>
              <div style={{ margin: '14px 0', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong>SSID:</strong> Orion_HighSpeed_5G</div>
                <div><strong>Mode:</strong> ap-bridge</div>
                <div><strong>Frequency:</strong> 5260 MHz (Channel 52 DFS)</div>
                <div><strong>Bandwidth:</strong> 80MHz Ceee</div>
                <div><strong>Security:</strong> None (Hotspot Captive Portal Protected)</div>
              </div>
              <button className="button secondary" style={{ width: '100%', fontSize: '12px' }} onClick={() => setNotice('wlan2 settings saved')}>
                Save 5GHz Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Bridge */}
      {tab === 'bridge' && (
        <div className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>RouterOS Bridge Interfaces (/interface bridge)</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Hardware offload and Layer 2 bridging combining Ethernet and Wireless ports.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Bridge Interface</th>
                  <th>MAC Address</th>
                  <th>Assigned Ports</th>
                  <th>VLAN Filtering</th>
                  <th>Fast Forward</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong className="code-pill font-mono">bridge-hotspot</strong></td>
                  <td className="font-mono">CC:2D:E0:41:88:90</td>
                  <td>ether2, ether3, ether4, ether5, wlan1, wlan2</td>
                  <td>Disabled</td>
                  <td>Yes</td>
                  <td><span className="status active">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. IP Address */}
      {tab === 'ipAddress' && (
        <div className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Interface IP Addresses (/ip address)</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Configured subnets and gateways on each RouterOS network interface.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Interface</th>
                  <th>IP Address / Netmask</th>
                  <th>Network Address</th>
                  <th>Role</th>
                  <th>Dynamic</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>bridge-hotspot</strong></td>
                  <td className="font-mono">192.168.88.1/24</td>
                  <td className="font-mono">192.168.88.0</td>
                  <td>Hotspot Gateway</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><strong>ether1 (WAN)</strong></td>
                  <td className="font-mono">197.232.14.82/28</td>
                  <td className="font-mono">197.232.14.80</td>
                  <td>ISP Uplink (Fiber Gateway)</td>
                  <td>Yes (DHCP Client)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. Files */}
      {tab === 'files' && (
        <div className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Hotspot Portal Files (/file)</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Captive portal HTML templates, images, and stylesheets uploaded to RouterOS flash.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Folder</th>
                  <th>Size</th>
                  <th>Type</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'login.html', folder: 'hotspot/', size: '8.4 KB', type: 'HTML Document', date: '2026-09-18' },
                  { name: 'alogin.html', folder: 'hotspot/', size: '3.2 KB', type: 'HTML Document', date: '2026-09-18' },
                  { name: 'status.html', folder: 'hotspot/', size: '6.1 KB', type: 'HTML Document', date: '2026-09-18' },
                  { name: 'logout.html', folder: 'hotspot/', size: '2.8 KB', type: 'HTML Document', date: '2026-09-18' },
                  { name: 'md5.js', folder: 'hotspot/', size: '4.2 KB', type: 'JavaScript', date: '2026-09-18' },
                  { name: 'brand-logo.png', folder: 'hotspot/img/', size: '24.1 KB', type: 'PNG Image', date: '2026-09-18' },
                ].map((f) => (
                  <tr key={f.name}>
                    <td><strong className="code-pill font-mono">{f.name}</strong></td>
                    <td className="muted">{f.folder}</td>
                    <td>{f.size}</td>
                    <td>{f.type}</td>
                    <td className="muted">{f.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. Hotspot */}
      {tab === 'hotspot' && (
        <div className="panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Hotspot Server Profile &amp; Authentication Methods</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '18px' }}>
            Manage RouterOS Hotspot login mechanisms (HTTP PAP, HTTP CHAP, MAC Cookie, HTTPS).
          </p>

          <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Hotspot Server Name</label>
              <input type="text" value="orion-hotspot" disabled style={{ width: '100%', opacity: 0.7 }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>DNS Name (Redirect FQDN)</label>
              <input type="text" defaultValue="wifi.orion.hotspot" style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Enabled Login Methods</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked /> HTTP CHAP (Challenge)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked /> HTTP PAP (Plaintext)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked /> MAC Cookie (Seamless reconnect)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked /> Cookie Session
                </label>
              </div>
            </div>

            <button className="button primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }} onClick={() => setNotice('Hotspot server profile updated on MikroTik!')}>
              Save Hotspot Profile
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
