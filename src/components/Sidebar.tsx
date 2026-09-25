import React, { useState, useEffect } from 'react'
import {
  Gauge, LayoutDashboard, Star, Users, UserPlus, MapPin, Filter, Zap,
  Scale, Power, PieChart, ReceiptText, Ticket, Wifi, WifiOff, Sliders,
  Tv, Package, CreditCard, LifeBuoy, MessageSquare, Network, Server,
  Radio, FileText, Settings, Activity, History, Trash2, ChevronDown,
  ChevronRight, ChevronLeft, Search, ShieldCheck, Sun, Moon, LogOut, ArrowUpRight,
  Database, RefreshCw, Smartphone, Send, Clock, BookOpen, AlertOctagon,
  ExternalLink, Calendar, HelpCircle, HardDrive
} from 'lucide-react'
import { DEFAULT_FAVORITE_IDS } from '../types/navigation'

export type SidebarProps = {
  activeNav: string
  onSelectNav: (navId: string) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onLogout: () => void
  businessName: string
  location: string
  primaryColor?: string
  operatorName: string
  operatorRole: string
  smsActive?: boolean
  smsProvider?: string
  totalVouchersCount?: number
  totalCustomersCount?: number
  totalRoutersCount?: number
  totalLogsCount?: number
  totalRecycleCount?: number
  isOpen?: boolean
  onToggleOpen?: () => void
  onOpenCompensate?: () => void
  onOpenDisableHotspot?: () => void
}

export function Sidebar({
  activeNav,
  onSelectNav,
  theme,
  onToggleTheme,
  onLogout,
  businessName,
  location,
  primaryColor = '#34786d',
  operatorName,
  operatorRole,
  smsActive = false,
  smsProvider = 'simulator',
  totalVouchersCount = 0,
  totalCustomersCount = 0,
  totalRoutersCount = 0,
  totalLogsCount = 0,
  totalRecycleCount = 0,
  isOpen = true,
  onToggleOpen,
  onOpenCompensate,
  onOpenDisableHotspot,
}: SidebarProps) {
  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('orion_starred_favorites')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return DEFAULT_FAVORITE_IDS
  })

  // Accordion expanded states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('orion_sidebar_expanded')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return {
      Favorites: true,
      Customers: true,
      Activation: true,
      DataUsage: false,
      HotspotVouchers: true,
      HotspotBinding: false,
      PackagesPlans: true,
      Transactions: false,
      Notifications: false,
      Network: false,
      Manage: false,
    }
  })

  const [sidebarFilter, setSidebarFilter] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('orion_starred_favorites', JSON.stringify(favorites))
    } catch (e) {}
  }, [favorites])

  useEffect(() => {
    try {
      localStorage.setItem('orion_sidebar_expanded', JSON.stringify(expandedSections))
    } catch (e) {}
  }, [expandedSections])

  const toggleAccordion = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }))
  }

  const toggleFavorite = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation()
    setFavorites((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId)
      } else {
        return [...prev, itemId]
      }
    })
  }

  const isStarred = (id: string) => favorites.includes(id)

  // Map favorite label to destination nav ID
  const resolveNavTarget = (favName: string): string => {
    switch (favName) {
      case 'Activation History': return 'Transactions:ActivationHistory'
      case 'Bandwidth Plans': return 'Plans:Bandwidth'
      case 'Auto Notifications / Reminders': return 'Notifications:Schedule'
      case 'Old Setup (No PPPoE)': return 'Diagnostics:OldSetup'
      case 'FUP': return 'Plans:FUP'
      case 'Tutorials': return 'Diagnostics:Tutorials'
      case 'Setup': return 'Settings'
      case 'Starlink/Internet Issues': return 'Diagnostics:Starlink'
      case 'Registration Info': return 'Diagnostics:Registration'
      case 'PPPOE Plans': return 'Plans:PPPOE'
      case 'Print Vouchers': return 'Vouchers:Print'
      case 'Expired Bindings': return 'Binding:Expired'
      case 'Default MikroTik Page': return 'Diagnostics:DefaultPage'
      case 'Provision': return 'Network:SelfInstall'
      case 'Connected Without Internet': return 'Diagnostics:NoInternet'
      case 'TV Plans': return 'Plans:TV'
      case 'Add New User': return 'Customers:AddNew'
      case 'All Vouchers': return 'Vouchers:All'
      case 'Users': return 'Customers:Users'
      case 'Routers': return 'Network:Routers'
      case 'Access APs': return 'Network:Wireless'
      case 'Ip Address': return 'Network:IPAddress'
      case "User's Location": return 'Customers:Location'
      default: return favName
    }
  }

  return (
    <aside className={`freelsp-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      {/* Top Branding matching Screenshots */}
      <div className="sidebar-brand-header">
        <div className="brand-logo-area">
          <div className="brand-icon-box">
            <SignalWaveIcon />
          </div>
          <span className="brand-name">{businessName || 'demo'}</span>
        </div>
        {onToggleOpen && (
          <button className="sidebar-toggle-btn" onClick={onToggleOpen} title="Toggle Sidebar">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Quick Search inside Sidebar */}
      <div className="sidebar-search-box">
        <Search size={14} className="sidebar-search-icon" />
        <input
          type="text"
          placeholder="Filter menu..."
          value={sidebarFilter}
          onChange={(e) => setSidebarFilter(e.target.value)}
        />
        {sidebarFilter && (
          <button className="sidebar-search-clear" onClick={() => setSidebarFilter('')}>×</button>
        )}
      </div>

      {/* Scrollable Navigation Menu */}
      <div className="sidebar-scrollable-nav">
        {/* 1. Dashboard (Single top item) */}
        <button
          className={`sidebar-nav-btn ${activeNav === 'Dashboard' || activeNav === 'Overview' ? 'active' : ''}`}
          onClick={() => onSelectNav('Dashboard')}
        >
          <Gauge size={17} className="nav-lead-icon" />
          <span className="nav-text">Dashboard</span>
        </button>

        {/* 2. Favorites (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.Favorites ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('Favorites')}
          >
            <div className="header-left">
              <Star size={16} className="nav-lead-icon star-active" />
              <span>Favorites</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.Favorites ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.Favorites && (
            <div className="sidebar-sub-menu">
              {favorites.map((fav) => {
                const targetNav = resolveNavTarget(fav)
                const isActive = activeNav === targetNav || activeNav === fav
                return (
                  <div
                    key={fav}
                    className={`sidebar-sub-item ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectNav(targetNav)}
                  >
                    <Star size={12} className="star-icon favorited" />
                    <span className="sub-item-text">{fav}</span>
                    <button
                      className="star-toggle-action"
                      title="Remove from favorites"
                      onClick={(e) => toggleFavorite(e, fav)}
                    >
                      ★
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* 3. Customers [Badge: New] */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.Customers ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('Customers')}
          >
            <div className="header-left">
              <Users size={16} className="nav-lead-icon" />
              <span>Customers</span>
              <span className="badge-new">New</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.Customers ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.Customers && (
            <div className="sidebar-sub-menu">
              <div
                className={`sidebar-sub-item ${activeNav === 'Customers:AddNew' ? 'active' : ''}`}
                onClick={() => onSelectNav('Customers:AddNew')}
              >
                <UserPlus size={13} className="sub-icon" />
                <span className="sub-item-text">Add New User</span>
                <span
                  className={`star-toggle-action ${isStarred('Add New User') ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(e, 'Add New User')}
                >
                  ★
                </span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Customers:Users' || activeNav === 'Customers' ? 'active' : ''}`}
                onClick={() => onSelectNav('Customers:Users')}
              >
                <Users size={13} className="sub-icon" />
                <span className="sub-item-text">Users</span>
                <span
                  className={`star-toggle-action ${isStarred('Users') ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(e, 'Users')}
                >
                  ★
                </span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Customers:Location' ? 'active' : ''}`}
                onClick={() => onSelectNav('Customers:Location')}
              >
                <MapPin size={13} className="sub-icon" />
                <span className="sub-item-text">User's Location</span>
                <span
                  className={`star-toggle-action ${isStarred("User's Location") ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(e, "User's Location")}
                >
                  ★
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Leads [Badge: New] */}
        <button
          className={`sidebar-nav-btn ${activeNav === 'Leads' ? 'active' : ''}`}
          onClick={() => onSelectNav('Leads')}
        >
          <Filter size={16} className="nav-lead-icon" />
          <span className="nav-text">Leads</span>
          <span className="badge-new">New</span>
        </button>

        {/* 5. Activation (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.Activation ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('Activation')}
          >
            <div className="header-left">
              <Zap size={16} className="nav-lead-icon" />
              <span>Activation</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.Activation ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.Activation && (
            <div className="sidebar-sub-menu">
              {[
                ['Activate User', 'Activation:Activate'],
                ['Prepaid Users', 'Activation:Prepaid'],
                ['Active Users', 'Activation:Active'],
                ['Expired Users', 'Activation:Expired'],
                ['Online Users', 'Activation:Online'],
                ['Offline Users', 'Activation:Offline'],
                ['Roaming Users', 'Activation:Roaming'],
                ['FUP Users', 'Activation:FUP'],
                ['Grace Period Users', 'Activation:GracePeriod'],
              ].map(([label, navId]) => (
                <div
                  key={label}
                  className={`sidebar-sub-item ${activeNav === navId ? 'active' : ''}`}
                  onClick={() => onSelectNav(navId)}
                >
                  <span className="sub-dot" />
                  <span className="sub-item-text">{label}</span>
                  <span
                    className={`star-toggle-action ${isStarred(label) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(e, label)}
                  >
                    ★
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. Compensate (Single Item) */}
        <button
          className={`sidebar-nav-btn ${activeNav === 'Compensate' ? 'active' : ''}`}
          onClick={() => {
            if (onOpenCompensate) onOpenCompensate()
            else onSelectNav('Compensate')
          }}
        >
          <Scale size={16} className="nav-lead-icon" />
          <span className="nav-text">Compensate</span>
        </button>

        {/* 7. Disable Hotspot Server (Single Item) */}
        <button
          className={`sidebar-nav-btn ${activeNav === 'Disable Hotspot Server' ? 'active' : ''}`}
          onClick={() => {
            if (onOpenDisableHotspot) onOpenDisableHotspot()
            else onSelectNav('Disable Hotspot Server')
          }}
        >
          <Power size={16} className="nav-lead-icon" />
          <span className="nav-text">Disable Hotspot Server</span>
        </button>

        {/* 8. Data Usage (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.DataUsage ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('DataUsage')}
          >
            <div className="header-left">
              <PieChart size={16} className="nav-lead-icon" />
              <span>Data Usage</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.DataUsage ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.DataUsage && (
            <div className="sidebar-sub-menu">
              <div
                className={`sidebar-sub-item ${activeNav === 'DataUsage:Daily' ? 'active' : ''}`}
                onClick={() => onSelectNav('DataUsage:Daily')}
              >
                <Calendar size={13} className="sub-icon" />
                <span className="sub-item-text">Daily Usage</span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'DataUsage:Weekly' ? 'active' : ''}`}
                onClick={() => onSelectNav('DataUsage:Weekly')}
              >
                <Calendar size={13} className="sub-icon" />
                <span className="sub-item-text">Weekly Usage</span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'DataUsage:Monthly' ? 'active' : ''}`}
                onClick={() => onSelectNav('DataUsage:Monthly')}
              >
                <Calendar size={13} className="sub-icon" />
                <span className="sub-item-text">Monthly Usage</span>
              </div>
            </div>
          )}
        </div>

        {/* 9. Hotspot Vouchers (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.HotspotVouchers ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('HotspotVouchers')}
          >
            <div className="header-left">
              <ReceiptText size={16} className="nav-lead-icon" />
              <span>Hotspot Vouchers</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.HotspotVouchers ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.HotspotVouchers && (
            <div className="sidebar-sub-menu">
              {[
                ['All Vouchers', 'Vouchers:All'],
                ['Add Vouchers', 'Vouchers:Add'],
                ['Print Vouchers', 'Vouchers:Print'],
                ['Unused Vouchers', 'Vouchers:Unused'],
                ['Used Vouchers', 'Vouchers:Used'],
                ['Voucher Customers', 'Vouchers:Customers'],
                ['Voucher Agents', 'Vouchers:Agents'],
                ['Agent Sales Report', 'Vouchers:AgentSales'],
              ].map(([label, navId]) => (
                <div
                  key={label}
                  className={`sidebar-sub-item ${activeNav === navId ? 'active' : ''}`}
                  onClick={() => onSelectNav(navId)}
                >
                  <span className="sub-dot" />
                  <span className="sub-item-text">{label}</span>
                  <span
                    className={`star-toggle-action ${isStarred(label) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(e, label)}
                  >
                    ★
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 10. Hotspot Binding (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.HotspotBinding ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('HotspotBinding')}
          >
            <div className="header-left">
              <Wifi size={16} className="nav-lead-icon" />
              <span>Hotspot Binding</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.HotspotBinding ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.HotspotBinding && (
            <div className="sidebar-sub-menu">
              <div
                className={`sidebar-sub-item ${activeNav === 'Binding:All' ? 'active' : ''}`}
                onClick={() => onSelectNav('Binding:All')}
              >
                <span className="sub-dot" />
                <span className="sub-item-text">All Bindings</span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Binding:Active' ? 'active' : ''}`}
                onClick={() => onSelectNav('Binding:Active')}
              >
                <span className="sub-dot" />
                <span className="sub-item-text">Active Bindings</span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Binding:Expired' ? 'active' : ''}`}
                onClick={() => onSelectNav('Binding:Expired')}
              >
                <span className="sub-dot" />
                <span className="sub-item-text">Expired Bindings</span>
                <span
                  className={`star-toggle-action ${isStarred('Expired Bindings') ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(e, 'Expired Bindings')}
                >
                  ★
                </span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Binding:Bind' ? 'active' : ''}`}
                onClick={() => onSelectNav('Binding:Bind')}
              >
                <span className="sub-dot" />
                <span className="sub-item-text">Bind a User/Device</span>
              </div>
            </div>
          )}
        </div>

        {/* 11. Create Binding Speeds */}
        <button
          className={`sidebar-nav-btn ${activeNav === 'Binding:CreateSpeeds' ? 'active' : ''}`}
          onClick={() => onSelectNav('Binding:CreateSpeeds')}
        >
          <Sliders size={16} className="nav-lead-icon" />
          <span className="nav-text">Create Binding Speeds</span>
        </button>

        {/* 12. Troubleshoot TV Binding */}
        <button
          className={`sidebar-nav-btn ${activeNav === 'Binding:TroubleshootTV' ? 'active' : ''}`}
          onClick={() => onSelectNav('Binding:TroubleshootTV')}
        >
          <Tv size={16} className="nav-lead-icon" />
          <span className="nav-text">Troubleshoot TV Binding</span>
        </button>

        {/* 13. Packages/Plans [Badge: New] (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.PackagesPlans ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('PackagesPlans')}
          >
            <div className="header-left">
              <Package size={16} className="nav-lead-icon" />
              <span>Packages/Plans</span>
              <span className="badge-new">New</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.PackagesPlans ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.PackagesPlans && (
            <div className="sidebar-sub-menu">
              {[
                ['Hotspot Plans', 'Plans:Hotspot', true],
                ['PPPOE Plans', 'Plans:PPPOE', false],
                ['Static ip plans', 'Plans:StaticIP', false],
                ['Bandwidth Plans', 'Plans:Bandwidth', false],
                ['Advanced Bandwidth', 'Plans:AdvancedBandwidth', false],
                ['Quality of Service', 'Plans:QoS', false],
                ['Hotspot Trials', 'Plans:Trials', false],
                ['FUP', 'Plans:FUP', false],
                ['Schedule Plans', 'Plans:Schedule', false],
                ['TV Plans', 'Plans:TV', false],
              ].map(([label, navId, isNew]) => (
                <div
                  key={label as string}
                  className={`sidebar-sub-item ${activeNav === navId ? 'active' : ''}`}
                  onClick={() => onSelectNav(navId as string)}
                >
                  <span className="sub-dot" />
                  <span className="sub-item-text">{label as string}</span>
                  {isNew && <span className="badge-new sub-badge">New</span>}
                  <span
                    className={`star-toggle-action ${isStarred(label as string) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(e, label as string)}
                  >
                    ★
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 14. Transactions (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.Transactions ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('Transactions')}
          >
            <div className="header-left">
              <CreditCard size={16} className="nav-lead-icon" />
              <span>Transactions</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.Transactions ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.Transactions && (
            <div className="sidebar-sub-menu">
              {[
                ['Daily Transactions', 'Transactions:Daily'],
                ['Period Transactions', 'Transactions:Period'],
                ['Activation History', 'Transactions:ActivationHistory'],
                ['Comparisons/Graphs', 'Transactions:Graphs'],
                ['Income Overview', 'Transactions:IncomeOverview'],
                ['STK Push Result', 'Transactions:STKPush'],
              ].map(([label, navId]) => (
                <div
                  key={label}
                  className={`sidebar-sub-item ${activeNav === navId ? 'active' : ''}`}
                  onClick={() => onSelectNav(navId)}
                >
                  <span className="sub-dot" />
                  <span className="sub-item-text">{label}</span>
                  <span
                    className={`star-toggle-action ${isStarred(label) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(e, label)}
                  >
                    ★
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 15. Support Ticket (Single item) */}
        <button
          className={`sidebar-nav-btn ${activeNav === 'Support Ticket' ? 'active' : ''}`}
          onClick={() => onSelectNav('Support Ticket')}
        >
          <LifeBuoy size={16} className="nav-lead-icon" />
          <span className="nav-text">Support Ticket</span>
        </button>

        {/* 16. Notifications (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.Notifications ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('Notifications')}
          >
            <div className="header-left">
              <MessageSquare size={16} className="nav-lead-icon" />
              <span>Notifications</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.Notifications ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.Notifications && (
            <div className="sidebar-sub-menu">
              {[
                ['Single User', 'Notifications:Single'],
                ['Bulk Send', 'Notifications:Bulk'],
                ['Plan Specific', 'Notifications:PlanSpecific'],
                ['Router Specific', 'Notifications:RouterSpecific'],
                ['Schedule SMS', 'Notifications:Schedule'],
                ['Sms Groups', 'Notifications:Groups'],
                ['SMS History', 'Notifications:History'],
              ].map(([label, navId]) => (
                <div
                  key={label}
                  className={`sidebar-sub-item ${activeNav === navId ? 'active' : ''}`}
                  onClick={() => onSelectNav(navId)}
                >
                  <span className="sub-dot" />
                  <span className="sub-item-text">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 17. Network (Accordion) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.Network ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('Network')}
          >
            <div className="header-left">
              <Network size={16} className="nav-lead-icon" />
              <span>Network</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.Network ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.Network && (
            <div className="sidebar-sub-menu">
              {[
                ['Self Install', 'Network:SelfInstall'],
                ['Replace Router', 'Network:ReplaceRouter'],
                ['Routers', 'Network:Routers'],
                ['IP Pool', 'Network:IPPool'],
                ['Router Backups', 'Network:Backups'],
                ['Wireless Settings', 'Network:Wireless'],
                ['Bridge', 'Network:Bridge'],
                ['Ip Address', 'Network:IPAddress'],
                ['Files', 'Network:Files'],
                ['Hotspot', 'Network:Hotspot'],
              ].map(([label, navId]) => (
                <div
                  key={label}
                  className={`sidebar-sub-item ${activeNav === navId ? 'active' : ''}`}
                  onClick={() => onSelectNav(navId)}
                >
                  <span className="sub-dot" />
                  <span className="sub-item-text">{label}</span>
                  <span
                    className={`star-toggle-action ${isStarred(label) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(e, label)}
                  >
                    ★
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 18. Additional Administration (Reports, Logs, Recycle Bin, Settings) */}
        <div className="sidebar-accordion-group">
          <div
            className={`sidebar-accordion-header ${expandedSections.Manage ? 'expanded' : ''}`}
            onClick={() => toggleAccordion('Manage')}
          >
            <div className="header-left">
              <Settings size={16} className="nav-lead-icon" />
              <span>Manage & System</span>
            </div>
            <span className="accordion-arrow">
              {expandedSections.Manage ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>

          {expandedSections.Manage && (
            <div className="sidebar-sub-menu">
              <div
                className={`sidebar-sub-item ${activeNav === 'Reports' ? 'active' : ''}`}
                onClick={() => onSelectNav('Reports')}
              >
                <Activity size={13} className="sub-icon" />
                <span className="sub-item-text">Reports</span>
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Logs' ? 'active' : ''}`}
                onClick={() => onSelectNav('Logs')}
              >
                <History size={13} className="sub-icon" />
                <span className="sub-item-text">Activity Logs</span>
                {totalLogsCount > 0 && <span className="nav-count">{totalLogsCount}</span>}
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Recycle Bin' ? 'active' : ''}`}
                onClick={() => onSelectNav('Recycle Bin')}
              >
                <Trash2 size={13} className="sub-icon" />
                <span className="sub-item-text">Recycle Bin</span>
                {totalRecycleCount > 0 && <span className="nav-count">{totalRecycleCount}</span>}
              </div>
              <div
                className={`sidebar-sub-item ${activeNav === 'Settings' ? 'active' : ''}`}
                onClick={() => onSelectNav('Settings')}
              >
                <Settings size={13} className="sub-icon" />
                <span className="sub-item-text">Settings & Setup</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Footer with Software Info matching Screenshot 5 */}
      <div className="sidebar-freelsp-footer">
        <div className="freelsp-footer-text">
          Billing Software by <strong>FreelspRadius</strong>
          <br />
          Theme by <strong>AdminLTE</strong>
        </div>
      </div>
    </aside>
  )
}

function SignalWaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  )
}
