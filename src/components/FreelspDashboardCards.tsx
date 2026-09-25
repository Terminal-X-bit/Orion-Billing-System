import React from 'react'
import {
  ShoppingBag, BarChart3, Users, Wifi, GitFork, Radio, Eye, EyeOff,
  ChevronDown, RefreshCw, CheckCircle2, XCircle, Router
} from 'lucide-react'

export type FreelspDashboardCardsProps = {
  selectedRouter: string
  onSelectRouter: (router: string) => void
  privacyMode: boolean
  onTogglePrivacy: () => void
  incomeToday: number | string
  incomeMonth: number | string
  activeCount: number
  expiredCount: number
  totalUsersCount: number
  hotspotOnlineCount: number
  pppoeOnlineCount: number
  staticOnlineCount: number
  totalOnlineCount: number
  onNavigate: (nav: string) => void
  onRefreshOnline: () => void
  isRefreshingOnline?: boolean
}

export function FreelspDashboardCards({
  selectedRouter,
  onSelectRouter,
  privacyMode,
  onTogglePrivacy,
  incomeToday,
  incomeMonth,
  activeCount,
  expiredCount,
  totalUsersCount,
  hotspotOnlineCount,
  pppoeOnlineCount,
  staticOnlineCount,
  totalOnlineCount,
  onNavigate,
  onRefreshOnline,
  isRefreshingOnline = false,
}: FreelspDashboardCardsProps) {
  const routerList = [
    { id: 'demo46', label: 'demo46', green: 0, blue: 2, red: 0, status: 'offline', lastSeen: 'Sep 11, 06:26', model: 'RB3011UiAS' },
    { id: 'demo47', label: 'demo47', green: 0, blue: 0, red: 0, status: 'offline', lastSeen: 'Sep 03, 16:26', model: 'hEX RB750Gr3' },
    { id: 'demo48', label: 'demo48', green: 0, blue: 0, red: 2, status: 'offline', lastSeen: 'Sep 08, 18:41', model: 'CCR1009-7G-1C-1S+' },
    { id: 'demo49-AMATECH', label: 'demo49-AMATECH', green: 1, blue: 0, red: 1, status: 'online', uptime: '14d 6h 32m', model: 'RB3011UiAS' },
  ]

  return (
    <div className="freelsp-dashboard-container">
      {/* Router View Selector matching Screenshot 1 */}
      <div className="router-view-header-strip">
        <div className="router-view-title">
          <Router size={16} />
          <strong>Router View</strong>
        </div>
        <div className="router-view-select-wrap">
          <select
            value={selectedRouter}
            onChange={(e) => onSelectRouter(e.target.value)}
            className="router-select-dropdown"
          >
            <option value="All Routers - System Wide">All Routers - System Wide</option>
            {routerList.map((r) => (
              <option key={r.id} value={r.id}>{r.label} ({r.status})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mini Router Tiles matching Screenshot 1 */}
      <div className="router-tiles-grid">
        {routerList.map((r) => (
          <div
            key={r.id}
            className={`router-mini-card ${selectedRouter === r.id ? 'selected' : ''}`}
            onClick={() => onSelectRouter(r.id)}
          >
            <div className="card-label">{r.label}</div>
            <div className="card-dots">
              <span className="dot dot-green">● {r.green}</span>
              <span className="dot dot-blue">● {r.blue}</span>
              <span className="dot dot-red">● {r.red}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: 4 Colored Metric Cards (Blue, Green, Orange, Red) matching Screenshot 1 */}
      <div className="freelsp-metrics-row">
        {/* 1. Blue: Income Today */}
        <div className="metric-freelsp card-blue">
          <div className="card-top">
            <div className="metric-number">
              {privacyMode ? '****' : incomeToday}
            </div>
            <ShoppingBag size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>INCOME TODAY</span>
            <button className="eye-btn" onClick={onTogglePrivacy} title="Toggle privacy mode">
              {privacyMode ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Transactions:Daily')}>
            View Reports →
          </button>
        </div>

        {/* 2. Green: Income This Month */}
        <div className="metric-freelsp card-green">
          <div className="card-top">
            <div className="metric-number">
              {privacyMode ? '****' : incomeMonth}
            </div>
            <BarChart3 size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>INCOME THIS MONTH</span>
            <button className="eye-btn" onClick={onTogglePrivacy} title="Toggle privacy mode">
              {privacyMode ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Transactions:IncomeOverview')}>
            View Reports →
          </button>
        </div>

        {/* 3. Orange: Active / Expired */}
        <div className="metric-freelsp card-orange">
          <div className="card-top">
            <div className="metric-number">{activeCount}/{expiredCount}</div>
            <Users size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>ACTIVE/EXPIRED</span>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Activation:Active')}>
            View All →
          </button>
        </div>

        {/* 4. Red: Total Users */}
        <div className="metric-freelsp card-red">
          <div className="card-top">
            <div className="metric-number">{totalUsersCount}</div>
            <Users size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>TOTAL USERS</span>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Customers:Users')}>
            View All →
          </button>
        </div>
      </div>

      {/* Row 2: 4 Online User Metric Cards (Cyan, Purple, Teal, Brown) matching Screenshot 2 */}
      <div className="freelsp-metrics-row">
        {/* 5. Cyan: Hotspot Online */}
        <div className="metric-freelsp card-cyan">
          <div className="card-top">
            <div className="metric-number">{hotspotOnlineCount}</div>
            <Wifi size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>HOTSPOT ONLINE USERS</span>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Activation:Online')}>
            View All →
          </button>
        </div>

        {/* 6. Purple: PPPoE Online */}
        <div className="metric-freelsp card-purple">
          <div className="card-top">
            <div className="metric-number">{pppoeOnlineCount}</div>
            <GitFork size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>PPPOE ONLINE USERS</span>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Plans:PPPOE')}>
            View All →
          </button>
        </div>

        {/* 7. Teal: Static Online */}
        <div className="metric-freelsp card-teal">
          <div className="card-top">
            <div className="metric-number">{staticOnlineCount}</div>
            <Radio size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>STATIC ONLINE USERS</span>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Plans:StaticIP')}>
            View All →
          </button>
        </div>

        {/* 8. Brown-Orange: Total Online */}
        <div className="metric-freelsp card-brown">
          <div className="card-top">
            <div className="metric-number">{totalOnlineCount}</div>
            <Users size={28} className="card-icon" />
          </div>
          <div className="metric-label-row">
            <span>TOTAL ONLINE USERS</span>
          </div>
          <button className="card-footer-link" onClick={() => onNavigate('Activation:Online')}>
            View All →
          </button>
        </div>
      </div>

      {/* Refresh Online Users button bar matching Screenshot 2 */}
      <div className="online-refresh-strip">
        <button
          className="btn-refresh-online"
          onClick={onRefreshOnline}
          disabled={isRefreshingOnline}
        >
          <RefreshCw size={14} className={isRefreshingOnline ? 'spinning' : ''} />
          Refresh Online Users
        </button>
      </div>

      {/* M-Pesa STK Push Service status bar matching Screenshot 2 */}
      <div className="stk-service-banner">
        <span className="live-dot" />
        <strong>M-Pesa STK Push Service</strong>
        <span className="stk-subtext">— Live · Safaricom is working</span>
      </div>

      {/* Router Status Section matching Screenshot 2 */}
      <div className="freelsp-router-status-section">
        <div className="section-head">
          <div className="title">
            <Router size={17} />
            <strong>Router Status</strong>
          </div>
          <div className="status-badges">
            <span className="badge-online">✓ 1 Online</span>
            <span className="badge-offline">✗ 3 Offline</span>
          </div>
        </div>

        <div className="router-status-cards-grid">
          {routerList.map((r) => (
            <div key={r.id} className={`router-status-card ${r.status}`}>
              <div className="card-content">
                <div className="router-header">
                  <strong>{r.label}</strong>
                  {r.status === 'online' ? (
                    <span className="icon-status-online">✓</span>
                  ) : (
                    <span className="icon-status-offline">✗</span>
                  )}
                </div>
                <div className="router-detail">
                  {r.status === 'online' ? (
                    <>Online · Up: {r.uptime}</>
                  ) : (
                    <>Offline · Last: {r.lastSeen}</>
                  )}
                </div>
                {r.model && <div className="router-model">{r.model}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
