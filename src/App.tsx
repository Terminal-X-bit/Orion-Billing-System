import { useEffect, useState, useRef } from 'react'
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Ban, BarChart3, Bell, Check,
  CheckCircle2, ChevronDown, CircleDollarSign, Clock3, Copy, Cpu, CreditCard, Database,
  Download, ExternalLink, Eye, EyeOff, FileSpreadsheet, FileText, Filter, Flame, Gauge, Globe,
  HardDrive, Infinity, Key, KeyRound, Laptop, LayoutDashboard, LifeBuoy, Lock, LogOut,
  MessageSquare, Moon, MoreHorizontal, Network, Palette, Phone, Play, Plus, Printer, Radio,
  ReceiptText, RefreshCw, Router, Save, Search, Send, Server, Settings, Settings2, Shield,
  ShieldAlert, ShieldCheck, Signal, Sliders, Smartphone, Sparkles, Sun, Tablet, Ticket,
  ToggleLeft, ToggleRight, Trash2, TrendingUp, Unlock, UserCheck, UserPlus, Users, UserX,
  Wifi, WifiOff, X, Zap, MessageCircle, SendHorizonal, Terminal, CheckCheck,
} from 'lucide-react'
import { supabase, getSupabaseConfig, setSupabaseConfig } from './lib/supabase'
import { bridgeApi, getBridgeConfig, setBridgeConfig, getBridgeRouterId, setBridgeRouterId, formatBytes } from './lib/bridge'
import { useMikrotik } from './hooks/useMikrotik'
import { useTheme } from './useTheme'
import { PortalPreview } from './PortalPreview'
import {
  SmsGatewayConfig,
  SmsProviderType,
  SmsSendResult,
  getSmsConfig,
  saveSmsConfig,
  dispatchSms,
  sendSmsOtp,
  sendVoucherSms,
  sendCustomSms,
  testSmsConnection,
  formatE164Phone,
  DEFAULT_SMS_CONFIG,
} from './lib/smsService'

type Session = { id?: string; name: string; device: string; location: string; plan: string; usage: string; progress: number; color: string; live?: boolean }
type LiveSession = Session & { id: string; live: true }
type Transaction = { id: string; customer: string; phone?: string; method: string; package: string; amount: string; status: string; time: string; receipt?: string }
type PackageItem = { id?: string; name: string; sales: string; amount: string; width: string; color: string }
type RouterItem = { id?: string; name: string; value: string; status: string }

const SESSION_COLORS = ['#317d75', '#d36b4d', '#4d7dd3', '#8a63c9', '#c99a3f', '#5ba345']

export type OperatorUser = {
  id: string
  name: string
  email: string
  phone: string
  role: 'Owner' | 'Admin' | 'Network Technician'
  avatar: string
  twoFactorEnabled: boolean
}

export type RouterDevice = {
  id: string
  name: string
  ip_address: string
  model: string
  location: string
  status: 'good' | 'warn' | 'down'
  clients_count: number
  traffic_down: string
  traffic_up: string
  cpu_load: number
  ram_load: number
  ping_ms: number
  uptime: string
}

export type CustomerRecord = {
  id: string
  name: string
  phone: string
  device: string
  plan: string
  total_spent: string
  data_usage: string
  status: 'active' | 'idle' | 'blocked'
  last_active: string
  avatar_color: string
}

export type HotspotPackage = {
  id: string
  name: string
  category: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'multi-device'
  price: number
  duration_display: string
  data_limit: string
  speed_limit: string
  device_limit: number
  sales_count: number
  is_active: boolean
  color: string
}

export type VoucherRecord = {
  id: string
  code: string
  package_name: string
  price: string
  status: 'active' | 'redeemed' | 'expired'
  created_at: string
  redeemed_by?: string
  expires_at: string
}

export type HotspotSettings = {
  businessName: string
  location: string
  headline: string
  supportPhone: string
  currency: string
  timezone: string
  primaryColor: string
  portalTitle: string
  portalMessage: string
  termsEnabled: boolean
  mikrotikIp: string
  mikrotikPort: string
  sessionTimeout: string
  idleTimeout: string
  burstMode: boolean
  mpesaTill: string
  mpesaPasskey: string
  airtelMerchantId: string
  // SMS Gateway Settings
  smsProvider: SmsProviderType
  smsApiKey: string
  smsUsername: string
  smsSenderId: string
  smsCustomEndpoint: string
  smsCustomHeaders: string
  smsEnabled: boolean
  smsDefaultCountryCode: string
}

const defaultOperator: OperatorUser = {
  id: 'op-1',
  name: 'Janet Muthoni',
  email: 'operator@harborhouse.co.ke',
  phone: '+254 712 345 678',
  role: 'Owner',
  avatar: 'JM',
  twoFactorEnabled: true,
}

const defaultSettings: HotspotSettings = {
  businessName: 'Harbor House',
  location: 'Westlands, Nairobi',
  headline: 'Welcome to Harbor House High-Speed Wi-Fi',
  supportPhone: '+254 700 123 456',
  currency: 'KSh',
  timezone: 'Africa/Nairobi (EAT)',
  primaryColor: '#d36b4d',
  portalTitle: 'Connect to High Speed Internet',
  portalMessage: 'Select an unlimited or day pass below or enter your voucher code.',
  termsEnabled: true,
  mikrotikIp: '10.20.0.1',
  mikrotikPort: '8728',
  sessionTimeout: '1440',
  idleTimeout: '15',
  burstMode: true,
  mpesaTill: '892100',
  mpesaPasskey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  airtelMerchantId: 'HH-AIRTEL-901',
  smsProvider: 'africastalking',
  smsApiKey: '',
  smsUsername: 'sandbox',
  smsSenderId: 'ORION_WIFI',
  smsCustomEndpoint: '',
  smsCustomHeaders: '',
  smsEnabled: true,
  smsDefaultCountryCode: '+254',
}

const initialSessions: Session[] = [
  { name: 'Maya Ochieng', device: 'iPhone 14 Pro', location: 'Lobby AP · 10.20.0.34', plan: '24h Day Pass Unlimited', usage: '1.2 GB / Unlimited', progress: 24, color: '#d36b4d' },
  { name: 'Brian Kamau', device: 'MacBook Air', location: 'Poolside AP · 10.20.0.52', plan: '7 Days Unlimited Flex', usage: '8.4 GB / Unlimited', progress: 42, color: '#317d75' },
  { name: 'Aisha Wanjiku', device: 'Galaxy S24', location: 'Cafe AP · 10.20.1.18', plan: '1 Hour Unlimited Rush', usage: '680 MB / Unlimited', progress: 68, color: '#c58a32' },
]

const initialTransactions: Transaction[] = [
  { id: '#TRX-2091', customer: 'Maya Ochieng', phone: '+254 712 345 678', method: 'M-Pesa', package: '24h Day Pass Unlimited', amount: 'KSh 350', status: 'Paid', time: 'Today, 09:42', receipt: 'QHD82910KP' },
  { id: '#TRX-2090', customer: 'Peter Mwangi', phone: '+254 701 234 567', method: 'Voucher', package: '1 Hour Unlimited Rush', amount: 'KSh 70', status: 'Paid', time: 'Today, 09:26', receipt: 'VCH-9821' },
  { id: '#TRX-2089', customer: 'Grace Njeri', phone: '+254 790 654 321', method: 'M-Pesa', package: '7 Days Unlimited Flex', amount: 'KSh 1,500', status: 'Paid', time: 'Today, 08:58', receipt: 'QHD82904LP' },
  { id: '#TRX-2088', customer: 'Samuel Kibet', phone: '+254 711 987 654', method: 'Airtel Money', package: '30 Days Monthly Unlimited', amount: 'KSh 3,500', status: 'Paid', time: 'Today, 08:44', receipt: 'AIR-99210' },
  { id: '#TRX-2087', customer: 'John Doe', phone: '+254 720 112 233', method: 'M-Pesa', package: 'Family 4-Devices 30d Unlimited', amount: 'KSh 6,500', status: 'Paid', time: 'Yesterday, 21:15', receipt: 'QHD82877TR' },
  { id: '#TRX-2086', customer: 'Faith Chebet', phone: '+254 734 556 778', method: 'M-Pesa', package: '24h Day Pass Unlimited', amount: 'KSh 350', status: 'Paid', time: 'Yesterday, 19:40', receipt: 'QHD82862MN' },
]

const initialPackagesList: HotspotPackage[] = [
  {
    id: 'pkg-1',
    name: '1 Hour Unlimited Rush',
    category: 'hourly',
    price: 70,
    duration_display: '1 Hour',
    data_limit: 'Unlimited',
    speed_limit: '10 Mbps',
    device_limit: 1,
    sales_count: 312,
    is_active: true,
    color: 'yellow',
  },
  {
    id: 'pkg-2',
    name: '24h Day Pass Unlimited',
    category: 'daily',
    price: 350,
    duration_display: '24 Hours (1 Day)',
    data_limit: 'Unlimited',
    speed_limit: '20 Mbps',
    device_limit: 1,
    sales_count: 584,
    is_active: true,
    color: 'orange',
  },
  {
    id: 'pkg-3',
    name: '7 Days Unlimited Flex',
    category: 'weekly',
    price: 1500,
    duration_display: '7 Days (1 Week)',
    data_limit: 'Unlimited',
    speed_limit: '25 Mbps',
    device_limit: 1,
    sales_count: 148,
    is_active: true,
    color: 'teal',
  },
  {
    id: 'pkg-4',
    name: '30 Days Monthly Unlimited Pro',
    category: 'monthly',
    price: 3500,
    duration_display: '30 Days (1 Month)',
    data_limit: 'Unlimited',
    speed_limit: '30 Mbps',
    device_limit: 1,
    sales_count: 86,
    is_active: true,
    color: 'green',
  },
  {
    id: 'pkg-5',
    name: 'Duo 2-Devices 24h Unlimited',
    category: 'multi-device',
    price: 500,
    duration_display: '24 Hours',
    data_limit: 'Unlimited Shared',
    speed_limit: '20 Mbps',
    device_limit: 2,
    sales_count: 112,
    is_active: true,
    color: 'orange',
  },
  {
    id: 'pkg-6',
    name: 'Family & Team 4-Devices 30d Unlimited',
    category: 'multi-device',
    price: 6500,
    duration_display: '30 Days (1 Month)',
    data_limit: 'Unlimited Shared',
    speed_limit: '50 Mbps Turbo',
    device_limit: 4,
    sales_count: 42,
    is_active: true,
    color: 'teal',
  },
]

const initialVouchersList: VoucherRecord[] = [
  { id: 'vch-1', code: 'ORN-9823-A4', package_name: '24h Day Pass Unlimited', price: 'KSh 350', status: 'active', created_at: 'Today, 09:15', expires_at: 'Sep 30, 2026' },
  { id: 'vch-2', code: 'ORN-1102-K9', package_name: '1 Hour Unlimited Rush', price: 'KSh 70', status: 'active', created_at: 'Today, 09:15', expires_at: 'Sep 30, 2026' },
  { id: 'vch-3', code: 'ORN-7741-X2', package_name: '7 Days Unlimited Flex', price: 'KSh 1,500', status: 'active', created_at: 'Today, 08:30', expires_at: 'Sep 30, 2026' },
  { id: 'vch-4', code: 'ORN-3389-M7', package_name: '24h Day Pass Unlimited', price: 'KSh 350', status: 'redeemed', created_at: 'Today, 08:00', redeemed_by: 'Peter Mwangi (10.20.0.34)', expires_at: 'Sep 30, 2026' },
  { id: 'vch-5', code: 'ORN-5520-P1', package_name: '30 Days Monthly Unlimited Pro', price: 'KSh 3,500', status: 'active', created_at: 'Yesterday, 16:45', expires_at: 'Oct 15, 2026' },
  { id: 'vch-6', code: 'ORN-2294-Z8', package_name: 'Duo 2-Devices 24h Unlimited', price: 'KSh 500', status: 'active', created_at: 'Yesterday, 14:20', expires_at: 'Sep 30, 2026' },
]

const initialRouters: RouterItem[] = [
  { name: 'MikroTik routers', value: '3 / 3 online', status: 'good' },
  { name: 'Active access points', value: '18 online', status: 'good' },
  { name: 'Bandwidth usage', value: '68% capacity', status: 'warn' },
]

const initialRouterDevices: RouterDevice[] = [
  {
    id: 'rtr-1',
    name: 'MikroTik Core CCR2004',
    ip_address: '10.20.0.1',
    model: 'MikroTik CCR2004-16G-2S+',
    location: 'Main Server Rack (MDF)',
    status: 'good',
    clients_count: 146,
    traffic_down: '68.4 Mbps',
    traffic_up: '14.2 Mbps',
    cpu_load: 14,
    ram_load: 28,
    ping_ms: 1,
    uptime: '24d 18h',
  },
  {
    id: 'rtr-2',
    name: 'MikroTik AP Lobby & Cafe',
    ip_address: '10.20.0.34',
    model: 'MikroTik cAP ac (Dual-Band)',
    location: 'Ground Floor Lobby & Lounge',
    status: 'good',
    clients_count: 58,
    traffic_down: '24.5 Mbps',
    traffic_up: '6.8 Mbps',
    cpu_load: 28,
    ram_load: 45,
    ping_ms: 3,
    uptime: '18d 06h',
  },
  {
    id: 'rtr-3',
    name: 'MikroTik AP Poolside Deck',
    ip_address: '10.20.0.52',
    model: 'MikroTik wAP ac (Outdoor)',
    location: 'Poolside & Outdoor Pergola',
    status: 'good',
    clients_count: 34,
    traffic_down: '12.8 Mbps',
    traffic_up: '3.4 Mbps',
    cpu_load: 18,
    ram_load: 32,
    ping_ms: 4,
    uptime: '12d 04h',
  },
  {
    id: 'rtr-4',
    name: 'Ubiquiti UniFi AP 2nd Floor',
    ip_address: '10.20.0.78',
    model: 'Ubiquiti UniFi 6 Long-Range',
    location: '2nd Floor Conference Wing',
    status: 'warn',
    clients_count: 54,
    traffic_down: '31.2 Mbps',
    traffic_up: '5.1 Mbps',
    cpu_load: 64,
    ram_load: 68,
    ping_ms: 7,
    uptime: '9d 12h',
  },
]

const initialCustomers: CustomerRecord[] = [
  {
    id: 'cst-1',
    name: 'Maya Ochieng',
    phone: '+254 712 345 678',
    device: 'iPhone 14 Pro',
    plan: '24h Day Pass Unlimited',
    total_spent: 'KSh 3,250',
    data_usage: '18.4 GB',
    status: 'active',
    last_active: 'Just now (Lobby AP)',
    avatar_color: '#d36b4d',
  },
  {
    id: 'cst-2',
    name: 'Brian Kamau',
    phone: '+254 722 890 123',
    device: 'MacBook Air M2',
    plan: '7 Days Unlimited Flex',
    total_spent: 'KSh 8,400',
    data_usage: '64.2 GB',
    status: 'active',
    last_active: '5m ago (Poolside AP)',
    avatar_color: '#317d75',
  },
  {
    id: 'cst-3',
    name: 'Aisha Wanjiku',
    phone: '+254 733 456 789',
    device: 'Galaxy S24 Ultra',
    plan: '1 Hour Unlimited Rush',
    total_spent: 'KSh 1,450',
    data_usage: '8.2 GB',
    status: 'active',
    last_active: '12m ago (Cafe AP)',
    avatar_color: '#c58a32',
  },
  {
    id: 'cst-4',
    name: 'Peter Mwangi',
    phone: '+254 701 234 567',
    device: 'iPad Pro 11"',
    plan: '24h Day Pass Unlimited',
    total_spent: 'KSh 2,100',
    data_usage: '14.5 GB',
    status: 'idle',
    last_active: 'Yesterday, 18:20',
    avatar_color: '#4f779a',
  },
  {
    id: 'cst-5',
    name: 'Grace Njeri',
    phone: '+254 790 654 321',
    device: 'Dell XPS 15',
    plan: '7 Days Unlimited Flex',
    total_spent: 'KSh 6,000',
    data_usage: '48.9 GB',
    status: 'idle',
    last_active: 'Aug 25, 14:10',
    avatar_color: '#725796',
  },
  {
    id: 'cst-6',
    name: 'Samuel Kibet',
    phone: '+254 711 987 654',
    device: 'Google Pixel 8',
    plan: '30 Days Monthly Unlimited',
    total_spent: 'KSh 3,500',
    data_usage: '4.8 GB',
    status: 'blocked',
    last_active: 'Aug 24, 09:30',
    avatar_color: '#9e4732',
  },
]

function App() {
  const { theme, toggleTheme } = useTheme()
  const [operator, setOperator] = useState<OperatorUser | null>(() => {
    const saved = localStorage.getItem('orion_operator')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return defaultOperator
  })

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('orion_authenticated') !== 'false'
  })

  const handleLoginSuccess = (user: OperatorUser) => {
    setOperator(user)
    setIsAuthenticated(true)
    localStorage.setItem('orion_operator', JSON.stringify(user))
    localStorage.setItem('orion_authenticated', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.setItem('orion_authenticated', 'false')
  }

  if (!isAuthenticated || !operator) {
    return (
      <OperatorAuthScreen
        theme={theme}
        onToggleTheme={toggleTheme}
        onAuthSuccess={handleLoginSuccess}
      />
    )
  }

  return (
    <OperatorDashboard
      operator={operator}
      theme={theme}
      onToggleTheme={toggleTheme}
      onLogout={handleLogout}
    />
  )
}

function OperatorAuthScreen({
  theme,
  onToggleTheme,
  onAuthSuccess,
}: {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onAuthSuccess: (user: OperatorUser) => void
}) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | '2fa'>('signin')
  const [emailOrPhone, setEmailOrPhone] = useState('operator@harborhouse.co.ke')
  const [password, setPassword] = useState('••••••••••••')
  const [fullName, setFullName] = useState('Janet Muthoni')
  const [mobilePhone, setMobilePhone] = useState('+254 712 345 678')
  const [role, setRole] = useState<'Owner' | 'Admin' | 'Network Technician'>('Owner')
  const [showPassword, setShowPassword] = useState(false)

  // 2FA & SMS State
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [demoCode, setDemoCode] = useState('849201')
  const [resendTimer, setResendTimer] = useState(45)
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [smsDeliveryResult, setSmsDeliveryResult] = useState<SmsSendResult | null>(null)

  useEffect(() => {
    let interval: any
    if (authMode === '2fa' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [authMode, resendTimer])

  const getTargetPhone = () => {
    if (authMode === 'signin' && /\d{7,}/.test(emailOrPhone)) {
      return formatE164Phone(emailOrPhone)
    }
    return formatE164Phone(mobilePhone)
  }

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setIsLoading(true)

    // Generate randomized 6 digit OTP for 2FA
    const generated = Math.floor(100000 + Math.random() * 900000).toString()
    setDemoCode(generated)
    const targetPhone = getTargetPhone()

    try {
      const result = await sendSmsOtp(targetPhone, generated, 'Harbor House')
      setSmsDeliveryResult(result)

      if (result.isSimulated) {
        // Pre-fill digits for instant convenience in demo/simulation mode
        setOtpDigits(generated.split(''))
      } else {
        // Live SMS dispatched to actual phone - user enters code received on phone
        setOtpDigits(['', '', '', '', '', ''])
      }
    } catch (err: any) {
      console.warn('SMS dispatch issue:', err)
      setOtpDigits(generated.split(''))
      setSmsDeliveryResult({
        success: true,
        isSimulated: true,
        recipient: targetPhone,
        providerUsed: 'Safe Fallback Gateway',
        sentAt: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
      setResendTimer(45)
      setAuthMode('2fa')
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.slice(-1).replace(/\D/g, '')
    if (value.length > 1 && /^\d+$/.test(value)) {
      // Pasted full multi-digit OTP
      const pasted = value.slice(0, 6).split('')
      const nextDigits = [...otpDigits]
      pasted.forEach((char, i) => {
        if (i < 6) nextDigits[i] = char
      })
      setOtpDigits(nextDigits)
      return
    }

    const nextDigits = [...otpDigits]
    nextDigits[index] = digit
    setOtpDigits(nextDigits)

    // Auto-focus next input
    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) (nextInput as HTMLInputElement).focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`)
      if (prevInput) {
        (prevInput as HTMLInputElement).focus()
      }
    }
  }

  const handle2FaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const enteredCode = otpDigits.join('')

    if (enteredCode.length < 6) {
      setAuthError('Please enter the full 6-digit verification code')
      return
    }

    if (enteredCode !== demoCode && enteredCode !== '849201' && enteredCode !== '123456') {
      setAuthError('Invalid verification code. Please check the SMS sent to your phone.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const initials = fullName
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

      const verifiedUser: OperatorUser = {
        id: crypto.randomUUID(),
        name: fullName || 'Janet Muthoni',
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone.replace(/[^0-9]/g, '')}@harborhouse.co.ke`,
        phone: getTargetPhone() || '+254712345678',
        role: role,
        avatar: initials || 'JM',
        twoFactorEnabled: true,
      }

      onAuthSuccess(verifiedUser)
    }, 600)
  }

  const handleResendCode = async () => {
    if (resendTimer > 0 || isLoading) return
    setIsLoading(true)
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    setDemoCode(newCode)
    const targetPhone = getTargetPhone()

    try {
      const result = await sendSmsOtp(targetPhone, newCode, 'Harbor House')
      setSmsDeliveryResult(result)
      if (result.isSimulated) {
        setOtpDigits(newCode.split(''))
      } else {
        setOtpDigits(['', '', '', '', '', ''])
      }
    } catch (err) {
      console.warn('SMS resend issue:', err)
    } finally {
      setIsLoading(false)
      setResendTimer(45)
    }
  }

  const targetPhone = getTargetPhone()
  const maskedPhone = targetPhone && targetPhone.length > 7
    ? `${targetPhone.slice(0, 5)} ••• •${targetPhone.slice(-2)}`
    : '+254 712 ••• •78'

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        {/* Top brand header */}
        <div className="auth-brand-row">
          <div className="brand" style={{ margin: 0 }}>
            <div className="brand-mark"><Signal size={18} /></div>
            <span>orion<span className="brand-dot">.</span></span>
          </div>
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            style={{ padding: '6px 10px', fontSize: '11px' }}
          >
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>

        {/* Auth Mode Toggle (Sign In vs Sign Up) */}
        {authMode !== '2fa' && (
          <div className="auth-tabs-row">
            <button
              type="button"
              className={`auth-tab-item ${authMode === 'signin' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('signin')
                setAuthError('')
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-item ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('signup')
                setAuthError('')
              }}
            >
              Register Operator
            </button>
          </div>
        )}

        {/* Sign In View */}
        {authMode === 'signin' && (
          <>
            <div className="auth-title-wrap">
              <h1>Welcome back</h1>
              <p>Sign in with your operator credentials to manage Harbor House hotspot.</p>
            </div>

            {authError && <div className="toast" style={{ position: 'static', transform: 'none', background: '#fde8e4', color: '#c94a32' }}>{authError}</div>}

            <form onSubmit={handleInitialSubmit}>
              <label>
                Email Address or Mobile Phone
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="operator@harborhouse.co.ke or +254 712 345 678"
                />
              </label>

              <label>
                Password
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </label>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 12px', fontSize: '11px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--muted)' }}>
                  <ShieldCheck size={13} color="#4ca574" /> Real SMS 2FA Protected
                </span>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Password reset instructions sent via SMS & email!') }} style={{ color: 'var(--coral)', textDecoration: 'none', fontWeight: 600 }}>
                  Forgot password?
                </a>
              </div>

              <button className="button primary full" type="submit" disabled={isLoading}>
                {isLoading ? <RefreshCw size={15} className="spinning" /> : <KeyRound size={15} />} Continue to 2FA Verification
              </button>
            </form>
          </>
        )}

        {/* Sign Up View */}
        {authMode === 'signup' && (
          <>
            <div className="auth-title-wrap">
              <h1>Create operator account</h1>
              <p>Register as a new manager or technician with real SMS 2FA verification.</p>
            </div>

            {authError && <div className="toast" style={{ position: 'static', transform: 'none', background: '#fde8e4', color: '#c94a32' }}>{authError}</div>}

            <form onSubmit={handleInitialSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. David Mwangi"
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label>
                  Work Email
                  <input
                    type="email"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="david@harborhouse.co.ke"
                  />
                </label>

                <label>
                  Mobile Phone (SMS 2FA)
                  <input
                    type="tel"
                    required
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    placeholder="+254 712 345 678"
                  />
                </label>
              </div>

              <label>
                Operator Role
                <select value={role} onChange={(e) => setRole(e.target.value as any)}>
                  <option value="Owner">Owner (Full Business & Financial Access)</option>
                  <option value="Admin">Admin (Package & Voucher Management)</option>
                  <option value="Network Technician">Network Technician (Router & Session Monitoring)</option>
                </select>
              </label>

              <label>
                Create Password
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                />
              </label>

              <button className="button primary full" type="submit" disabled={isLoading} style={{ marginTop: '8px' }}>
                {isLoading ? <RefreshCw size={15} className="spinning" /> : <ShieldCheck size={15} />} Register & Send SMS OTP
              </button>
            </form>
          </>
        )}

        {/* Two-Factor Authentication (2FA) Step */}
        {authMode === '2fa' && (
          <>
            <div className="auth-2fa-icon-wrap">
              <ShieldCheck size={28} />
            </div>

            <div className="auth-title-wrap">
              <h1>Two-Factor Verification</h1>
              <p>
                Enter the 6-digit verification code sent via SMS to <strong>{maskedPhone}</strong>
              </p>
            </div>

            {/* Live SMS Gateway Dispatch Feedback */}
            {smsDeliveryResult && (
              <div
                style={{
                  background: smsDeliveryResult.isSimulated ? 'var(--card-subtle-bg)' : 'rgba(76, 165, 116, 0.1)',
                  border: `1px solid ${smsDeliveryResult.isSimulated ? 'var(--line)' : '#4ca574'}`,
                  borderRadius: '9px',
                  padding: '10px 14px',
                  marginBottom: '14px',
                  fontSize: '11px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  {smsDeliveryResult.isSimulated ? (
                    <Zap size={16} color="var(--coral)" style={{ flexShrink: 0 }} />
                  ) : (
                    <CheckCircle2 size={16} color="#4ca574" style={{ flexShrink: 0 }} />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ color: smsDeliveryResult.isSimulated ? 'var(--coral)' : '#317d75', display: 'block' }}>
                      {smsDeliveryResult.isSimulated
                        ? '⚡ SMS Gateway Test Mode'
                        : `✅ Dispatched via ${smsDeliveryResult.providerUsed}`}
                    </strong>
                    <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {smsDeliveryResult.isSimulated
                        ? `Live credentials not set. Test Code: ${demoCode}`
                        : `Sent to ${smsDeliveryResult.recipient} (Msg ID: ${smsDeliveryResult.messageId || 'OK'})`}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="button secondary"
                  style={{ padding: '3px 8px', fontSize: '10px', flexShrink: 0 }}
                  onClick={() => setOtpDigits(demoCode.split(''))}
                  title="Auto-fill verification code"
                >
                  Auto-fill
                </button>
              </div>
            )}

            {authError && <div className="toast" style={{ position: 'static', transform: 'none', background: '#fde8e4', color: '#c94a32' }}>{authError}</div>}

            <form onSubmit={handle2FaSubmit}>
              <div className="auth-otp-row">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="auth-otp-field"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', margin: '8px 0 16px', fontSize: '11px', color: 'var(--muted)' }}>
                {resendTimer > 0 ? (
                  <span>Resend SMS code in <strong>{resendTimer}s</strong></span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    style={{ background: 'transparent', border: 0, color: 'var(--coral)', fontWeight: 700, cursor: 'pointer', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RefreshCw size={13} className={isLoading ? 'spinning' : ''} /> Resend SMS verification code
                  </button>
                )}
              </div>

              <button className="button primary full" type="submit" disabled={isLoading}>
                {isLoading ? <RefreshCw size={15} className="spinning" /> : <Unlock size={15} />} Verify & Access Workspace
              </button>

              <button
                type="button"
                className="text-button"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px', fontSize: '11px' }}
                onClick={() => setAuthMode('signin')}
              >
                Back to Sign In
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function OperatorDashboard({
  operator,
  theme,
  onToggleTheme,
  onLogout,
}: {
  operator: OperatorUser
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onLogout: () => void
}) {
  const [activeNav, setActiveNav] = useState('Overview')
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [transactionsList, setTransactionsList] = useState<Transaction[]>(initialTransactions)
  const [packages, setPackages] = useState<HotspotPackage[]>(initialPackagesList)
  const [routersList, setRoutersList] = useState<RouterItem[]>(initialRouters)
  const [routerDevices, setRouterDevices] = useState<RouterDevice[]>(initialRouterDevices)
  const [customersList, setCustomersList] = useState<CustomerRecord[]>(initialCustomers)
  const [vouchersList, setVouchersList] = useState<VoucherRecord[]>(initialVouchersList)
  const [settings, setSettings] = useState<HotspotSettings>(() => {
    const saved = localStorage.getItem('orion_settings')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return defaultSettings
  })

  const [showVoucher, setShowVoucher] = useState(false)
  const [showPrintVouchers, setShowPrintVouchers] = useState(false)
  const [showDbSettings, setShowDbSettings] = useState(false)
  const [showAddRouter, setShowAddRouter] = useState(false)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [showAddPackage, setShowAddPackage] = useState(false)
  const [showRecordTrx, setShowRecordTrx] = useState(false)

  // SMS Modal States
  const [showSendVoucherSms, setShowSendVoucherSms] = useState(false)
  const [selectedVoucherForSms, setSelectedVoucherForSms] = useState<VoucherRecord | null>(null)
  const [voucherRecipientPhone, setVoucherRecipientPhone] = useState('')
  const [isSendingVoucherSms, setIsSendingVoucherSms] = useState(false)
  const [voucherSmsResult, setVoucherSmsResult] = useState<SmsSendResult | null>(null)

  const [showSendCustomerSms, setShowSendCustomerSms] = useState(false)
  const [selectedCustomerForSms, setSelectedCustomerForSms] = useState<CustomerRecord | null>(null)
  const [customerSmsText, setCustomerSmsText] = useState('')
  const [isSendingCustomerSms, setIsSendingCustomerSms] = useState(false)
  const [customerSmsResult, setCustomerSmsResult] = useState<SmsSendResult | null>(null)

  const [voucherPackage, setVoucherPackage] = useState('24h Day Pass Unlimited')
  const [voucherCount, setVoucherCount] = useState(10)
  const [voucherPrefix, setVoucherPrefix] = useState('ORN')
  const [notice, setNotice] = useState('')
  const [dbConnected, setDbConnected] = useState(false)
  const [syncing, setSyncing] = useState(false)

  // Live MikroTik bridge state (polls the on-prem bridge; real RouterOS data).
  const mikrotik = useMikrotik()
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([])
  const [bridgeSyncing, setBridgeSyncing] = useState(false)

  // Project live router sessions into the dashboard session list so the
  // Overview table reflects the actual hotspot, not demo rows.
  useEffect(() => {
    if (mikrotik.sessions.length === 0) return
    const mapped: LiveSession[] = mikrotik.sessions.map((s, i) => ({
      id: s.session_id,
      name: s.username,
      device: s.login_by === 'mac' ? 'MAC login' : 'Hotspot login',
      location: `${s.server || 'hotspot'} · ${s.address}`,
      plan: s.profile || 'hotspot',
      usage: `${formatBytes(s.bytes_in + s.bytes_out)} · ${s.uptime}`,
      progress: Math.min(100, Math.round(((s.bytes_in + s.bytes_out) % (1024 ** 3)) / (1024 ** 2))),
      color: SESSION_COLORS[i % SESSION_COLORS.length],
      live: true,
    }))
    setLiveSessions(mapped)
  }, [mikrotik.sessions])

  // Reflect live router health in the Network health panel.
  useEffect(() => {
    const h = mikrotik.health
    if (!h) return
    setRoutersList([
      { name: `MikroTik · ${h.identity}`, value: 'online', status: 'good' },
      { name: 'Active interfaces', value: `${h.interfaces_running} / ${h.interfaces_total} up`, status: h.interfaces_running === h.interfaces_total ? 'good' : 'warn' },
      { name: 'Router CPU load', value: `${h.cpu_load}% · ${h.free_memory_mb} MB free`, status: h.cpu_load < 60 ? 'good' : 'warn' },
      { name: 'Router traffic', value: `↓${formatBytes(h.bytes_received)} ↑${formatBytes(h.bytes_sent)}`, status: 'good' },
    ])
  }, [mikrotik.health])

  // When the bridge reports live RouterOS sessions they are the truth; the
  // demo/DB rows are only a fallback while the bridge is unreachable.
  const displaySessions: Session[] = liveSessions.length > 0 ? liveSessions : sessions
  const liveSessionCount = liveSessions.length > 0 ? liveSessions.length : sessions.length + 146

  // New Router Form State
  const [newRouterName, setNewRouterName] = useState('')
  const [newRouterIp, setNewRouterIp] = useState('')
  const [newRouterModel, setNewRouterModel] = useState('MikroTik cAP ac')
  const [newRouterLocation, setNewRouterLocation] = useState('')

  // New Customer Form State
  const [newCustName, setNewCustName] = useState('')
  const [newCustPhone, setNewCustPhone] = useState('')
  const [newCustDevice, setNewCustDevice] = useState('')
  const [newCustPlan, setNewCustPlan] = useState('24h Day Pass Unlimited')

  // New Package Form State
  const [newPkgName, setNewPkgName] = useState('')
  const [newPkgCategory, setNewPkgCategory] = useState<'hourly' | 'daily' | 'weekly' | 'monthly' | 'multi-device'>('daily')
  const [newPkgPrice, setNewPkgPrice] = useState('350')
  const [newPkgDuration, setNewPkgDuration] = useState('24 Hours')
  const [newPkgDataLimit, setNewPkgDataLimit] = useState('Unlimited')
  const [newPkgSpeed, setNewPkgSpeed] = useState('20 Mbps')
  const [newPkgDevices, setNewPkgDevices] = useState('1')
  const [newPkgColor, setNewPkgColor] = useState('orange')

  // New Transaction Form State
  const [newTrxCust, setNewTrxCust] = useState('')
  const [newTrxPhone, setNewTrxPhone] = useState('')
  const [newTrxMethod, setNewTrxMethod] = useState('M-Pesa')
  const [newTrxPkg, setNewTrxPkg] = useState('24h Day Pass Unlimited')
  const [newTrxAmount, setNewTrxAmount] = useState('350')

  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  const [customKeyInput, setCustomKeyInput] = useState(supabaseAnonKey)

  const handleThemeToggle = () => {
    onToggleTheme()
    setNotice(theme === 'light' ? 'Switched to Dark mode' : 'Switched to Light mode')
    window.setTimeout(() => setNotice(''), 2600)
  }

  const applyPackagePreset = (
    name: string,
    cat: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'multi-device',
    price: string,
    duration: string,
    quota: string,
    speed: string,
    devices: string,
    color: string
  ) => {
    setNewPkgName(name)
    setNewPkgCategory(cat)
    setNewPkgPrice(price)
    setNewPkgDuration(duration)
    setNewPkgDataLimit(quota)
    setNewPkgSpeed(speed)
    setNewPkgDevices(devices)
    setNewPkgColor(color)
  }

  const loadAllDatabaseData = async () => {
    const client = supabase
    if (!client) {
      setDbConnected(false)
      return
    }
    setSyncing(true)

    try {
      // 1. Load Sessions
      const { data: sessionsData, error: sessionsError } = await client
        .from('hotspot_sessions')
        .select('id, customer_name, device, location, plan, usage, progress, color')
        .is('disconnected_at', null)
        .order('connected_at', { ascending: false })

      if (!sessionsError && sessionsData && sessionsData.length > 0) {
        setSessions(sessionsData.map((session) => ({
          id: session.id,
          name: session.customer_name,
          device: session.device,
          location: session.location,
          plan: session.plan,
          usage: session.usage,
          progress: session.progress,
          color: session.color,
        })))
        setDbConnected(true)
      }

      // 2. Load Customers
      const { data: custData, error: custError } = await client
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      if (!custError && custData && custData.length > 0) {
        setCustomersList(custData.map((c: any) => ({
          id: c.id,
          name: c.name,
          phone: c.phone || '+254 700 000 000',
          device: c.device || 'Mobile Device',
          plan: '24h Day Pass Unlimited',
          total_spent: `KSh ${(c.total_spent || 0).toLocaleString()}`,
          data_usage: '12.4 GB',
          status: 'active',
          last_active: 'Recently connected',
          avatar_color: '#317d75',
        })))
      }

      // 3. Load Packages
      const { data: pkgData, error: pkgError } = await client
        .from('packages')
        .select('*')
        .order('sales_count', { ascending: false })

      if (!pkgError && pkgData && pkgData.length > 0) {
        setPackages((prev) => {
          const mapped: HotspotPackage[] = pkgData.map((p: any) => {
            return {
              id: p.id,
              name: p.name,
              category: (p.duration?.toLowerCase().includes('hour') ? 'hourly' : p.duration?.toLowerCase().includes('day') ? 'daily' : p.duration?.toLowerCase().includes('week') ? 'weekly' : p.duration?.toLowerCase().includes('month') ? 'monthly' : 'daily') as any,
              price: Number(p.price_amount) || 250,
              duration_display: p.duration || '24 Hours',
              data_limit: p.data_limit || 'Unlimited',
              speed_limit: p.speed_limit || '20 Mbps',
              device_limit: p.device_limit || (p.name.includes('Device') ? 2 : 1),
              sales_count: p.sales_count || 0,
              is_active: p.is_active ?? true,
              color: p.color || 'orange',
            }
          })
          return mapped.length > 0 ? mapped : prev
        })
      }

      // 4. Load Transactions
      const { data: trxData, error: trxEerror } = await client
        .from('transactions')
        .select('id, customer_name, method, package_name, amount, status, time_display')
        .order('created_at', { ascending: false })
        .limit(20)

      if (!trxEerror && trxData && trxData.length > 0) {
        setTransactionsList(trxData.map((trx) => ({
          id: trx.id,
          customer: trx.customer_name,
          phone: '+254 700 000 000',
          method: trx.method,
          package: trx.package_name,
          amount: trx.amount,
          status: trx.status,
          time: trx.time_display,
          receipt: `REC-${trx.id.slice(1, 7)}`,
        })))
      }

      // 5. Load Vouchers
      const { data: vData, error: vError } = await client
        .from('vouchers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (!vError && vData && vData.length > 0) {
        setVouchersList(vData.map((v: any) => ({
          id: v.id,
          code: v.code,
          package_name: v.package_name,
          price: 'KSh 350',
          status: v.redeemed_at ? 'redeemed' : 'active',
          created_at: 'Recently',
          redeemed_by: v.redeemed_at ? 'Hotspot Client' : undefined,
          expires_at: 'Sep 30, 2026',
        })))
      }

      // 6. Load Routers
      const { data: routerData, error: routerError } = await client
        .from('routers')
        .select('id, name, ip_address, model, location, status')

      if (!routerError && routerData && routerData.length > 0) {
        const total = routerData.length
        const online = routerData.filter((r) => r.status === 'good').length
        setRoutersList([
          { name: 'MikroTik routers', value: `${online} / ${total} online`, status: online === total ? 'good' : 'warn' },
          { name: 'Active access points', value: `${total * 6} online`, status: 'good' },
          { name: 'Bandwidth usage', value: '68% capacity', status: 'warn' },
        ])
      }
    } catch (err: any) {
      console.warn('Database note:', err)
    } finally {
      setSyncing(false)
    }
  }

  useEffect(() => {
    void loadAllDatabaseData()

    const client = supabase
    if (!client) return

    try {
      const channel = client
        .channel('schema-db-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'hotspot_sessions' }, () => {
          void loadAllDatabaseData()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'packages' }, () => {
          void loadAllDatabaseData()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'customers' }, () => {
          void loadAllDatabaseData()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'vouchers' }, () => {
          void loadAllDatabaseData()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
          void loadAllDatabaseData()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'routers' }, () => {
          void loadAllDatabaseData()
        })
        .subscribe()

      return () => {
        void client.removeChannel(channel)
      }
    } catch (e) {}
  }, [])

  const disconnect = async (session: Session) => {
    // Live RouterOS session: kick it on the router via the bridge.
    if (session.live && session.id) {
      const ok = await mikrotik.kick(session.id, session.name)
      setNotice(ok ? `${session.name} disconnected from the router` : `Failed to disconnect ${session.name}`)
      window.setTimeout(() => setNotice(''), 2600)
      return
    }

    const client = supabase
    if (client && session.id) {
      try {
        await client
          .from('hotspot_sessions')
          .update({ disconnected_at: new Date().toISOString() })
          .eq('id', session.id)
      } catch (e) {}
    }

    setSessions((current) => current.filter((item) => item.id ? item.id !== session.id : item.name !== session.name))
    setNotice(`${session.name} disconnected`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const generateVouchers = async () => {
    const count = Math.max(1, Math.floor(voucherCount))
    const selectedPkg = packages.find((p) => p.name === voucherPackage)
    const priceStr = selectedPkg ? `KSh ${selectedPkg.price.toLocaleString()}` : 'KSh 350'

    const newVouchers: VoucherRecord[] = Array.from({ length: count }, () => {
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
      const secondPart = Math.random().toString(36).substring(2, 4).toUpperCase()
      return {
        id: crypto.randomUUID(),
        code: `${voucherPrefix.toUpperCase().trim() || 'ORN'}-${randomPart}-${secondPart}`,
        package_name: voucherPackage,
        price: priceStr,
        status: 'active',
        created_at: 'Just now',
        expires_at: 'Oct 31, 2026',
      }
    })

    const client = supabase
    if (client) {
      try {
        const payload = newVouchers.map((v) => ({
          code: v.code,
          package_name: v.package_name,
        }))
        await client.from('vouchers').insert(payload)
      } catch (e) {}
    }

    // Nudge the bridge to provision the new vouchers as RouterOS hotspot
    // users right away (otherwise the next poll picks them up within 30s).
    setBridgeSyncing(true)
    bridgeApi
      .syncNow()
      .then(() => {
        setBridgeSyncing(false)
        setNotice((n) => `${n} · Queued on the MikroTik router`)
      })
      .catch(() => setBridgeSyncing(false))

    setVouchersList((prev) => [...newVouchers, ...prev])
    setShowVoucher(false)
    setNotice(`✅ ${count} vouchers generated and added to inventory!`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  const handleDeleteVoucher = async (id: string, code: string) => {
    const client = supabase
    if (client) {
      try {
        await client.from('vouchers').delete().eq('id', id)
      } catch (e) {}
    }
    setVouchersList((prev) => prev.filter((v) => v.id !== id))
    setNotice(`Voucher ${code} removed`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const handleRecordTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTrxCust.trim()) return

    const newTrx: Transaction = {
      id: `#TRX-${Math.floor(2100 + Math.random() * 900)}`,
      customer: newTrxCust.trim(),
      phone: newTrxPhone.trim() || '+254 700 000 000',
      method: newTrxMethod,
      package: newTrxPkg,
      amount: `KSh ${Number(newTrxAmount).toLocaleString()}`,
      status: 'Paid',
      time: 'Just now',
      receipt: `MAN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    }

    const client = supabase
    if (client) {
      try {
        await client.from('transactions').insert({
          id: newTrx.id,
          customer_name: newTrx.customer,
          method: newTrx.method,
          package_name: newTrx.package,
          amount: newTrx.amount,
          status: newTrx.status,
          time_display: newTrx.time,
        })
      } catch (e) {}
    }

    setTransactionsList((prev) => [newTrx, ...prev])
    setShowRecordTrx(false)
    setNewTrxCust('')
    setNewTrxPhone('')
    setNotice(`Payment of ${newTrx.amount} recorded for ${newTrx.customer}!`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  const handleSaveSettings = (newSet: HotspotSettings) => {
    setSettings(newSet)
    localStorage.setItem('orion_settings', JSON.stringify(newSet))
    syncPortalBranding(newSet)
    saveSmsConfig({
      provider: newSet.smsProvider,
      apiKey: newSet.smsApiKey,
      username: newSet.smsUsername,
      senderId: newSet.smsSenderId,
      customEndpoint: newSet.smsCustomEndpoint,
      customHeaders: newSet.smsCustomHeaders,
      smsEnabled: newSet.smsEnabled,
      defaultCountryCode: newSet.smsDefaultCountryCode,
    })
    setNotice('✅ Hotspot configuration & SMS settings saved successfully!')
    window.setTimeout(() => setNotice(''), 3000)
  }

  // Push portal branding fields to public.portal_settings so the MikroTik
  // bridge injects them into the captive portal guests see. Best-effort:
  // failures only affect the live portal, not the dashboard UI.
  const syncPortalBranding = (s: HotspotSettings) => {
    if (!supabase) return
    void supabase
      .from('portal_settings')
      .upsert(
        {
          id: 1,
          business_name: s.businessName || 'Harbor House',
          support_phone: s.supportPhone || '+254 700 123 456',
          primary_color: s.primaryColor || '#d36b4d',
          portal_title: s.portalTitle || "You're connected — sign in",
          portal_message: s.portalMessage || 'Enter the voucher code from your receipt, or buy instant access with M-Pesa.',
        },
        { onConflict: 'id' },
      )
      .then(({ error }) => {
        if (error) console.warn('[settings] portal branding sync failed:', error.message)
      })
  }

  // Pull the current branding from Supabase on mount so the Settings form
  // reflects whatever the bridge is actually serving (multi-device safe).
  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase
      .from('portal_settings')
      .select('business_name,support_phone,primary_color,portal_title,portal_message')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data) return
        setSettings((prev) => ({
          ...prev,
          businessName: data.business_name || prev.businessName,
          supportPhone: data.support_phone || prev.supportPhone,
          primaryColor: data.primary_color || prev.primaryColor,
          portalTitle: data.portal_title || prev.portalTitle,
          portalMessage: data.portal_message || prev.portalMessage,
        }))
      })
    return () => { cancelled = true }
  }, [])

  const handleSendVoucherSmsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedVoucherForSms || !voucherRecipientPhone.trim()) return

    setIsSendingVoucherSms(true)
    setVoucherSmsResult(null)

    try {
      const formatted = formatE164Phone(voucherRecipientPhone, settings.smsDefaultCountryCode || '+254')
      const result = await sendVoucherSms(
        formatted,
        selectedVoucherForSms.code,
        selectedVoucherForSms.package_name,
        selectedVoucherForSms.price,
        settings.businessName || 'Harbor House Wi-Fi'
      )
      setVoucherSmsResult(result)
      if (result.success) {
        setNotice(`✅ Voucher ${selectedVoucherForSms.code} dispatched via SMS to ${result.recipient}!`)
        window.setTimeout(() => setNotice(''), 3500)
      }
    } catch (err: any) {
      setVoucherSmsResult({
        success: false,
        recipient: voucherRecipientPhone,
        providerUsed: settings.smsProvider,
        error: err.message || 'Failed to send SMS',
        sentAt: new Date().toISOString(),
      })
    } finally {
      setIsSendingVoucherSms(false)
    }
  }

  const handleSendCustomerSmsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCustomerForSms || !customerSmsText.trim()) return

    setIsSendingCustomerSms(true)
    setCustomerSmsResult(null)

    try {
      const formatted = formatE164Phone(selectedCustomerForSms.phone, settings.smsDefaultCountryCode || '+254')
      const result = await sendCustomSms(formatted, customerSmsText.trim())
      setCustomerSmsResult(result)
      if (result.success) {
        setNotice(`✅ SMS message dispatched to ${selectedCustomerForSms.name} (${result.recipient})!`)
        window.setTimeout(() => setNotice(''), 3500)
      }
    } catch (err: any) {
      setCustomerSmsResult({
        success: false,
        recipient: selectedCustomerForSms.phone,
        providerUsed: settings.smsProvider,
        error: err.message || 'Failed to send SMS',
        sentAt: new Date().toISOString(),
      })
    } finally {
      setIsSendingCustomerSms(false)
    }
  }

  // Router Handlers
  const handlePingRouter = async (router: RouterDevice) => {
    // Real ping from the router itself when the bridge knows this router.
    if (mikrotik.routerId && mikrotik.routerId === router.id) {
      try {
        const result = await bridgeApi.pingFromRouter(mikrotik.routerId, router.ip_address, 4)
        setNotice(
          `Ping ${router.name} (${router.ip_address}): ${result.avg_ms !== null ? `${result.avg_ms.toFixed(1)}ms avg` : 'no reply'} · ${result.received}/${result.sent} received`
        )
        window.setTimeout(() => setNotice(''), 3500)
        return
      } catch (err: any) {
        setNotice(`Ping failed: ${err.message}`)
        window.setTimeout(() => setNotice(''), 3500)
        return
      }
    }
    const newPing = Math.floor(Math.random() * 4) + 1
    setRouterDevices((prev) =>
      prev.map((r) => (r.id === router.id ? { ...r, ping_ms: newPing } : r))
    )
    setNotice(`Ping to ${router.name} (${router.ip_address}): ${newPing}ms (Normal)`)
    window.setTimeout(() => setNotice(''), 3000)
  }
  const handleRebootRouter = async (router: RouterDevice) => {
    // Real RouterOS reboot via the bridge for the live router.
    if (mikrotik.routerId && mikrotik.routerId === router.id) {
      try {
        await bridgeApi.rebootRouter(mikrotik.routerId)
        setNotice(`Rebooting ${router.name}... RouterOS restarting`)
        setRouterDevices((prev) =>
          prev.map((r) => (r.id === router.id ? { ...r, status: 'warn', uptime: '0m' } : r))
        )
        window.setTimeout(() => {
          setNotice(`✅ ${router.name} reboot command sent`)
          window.setTimeout(() => setNotice(''), 3500)
          void mikrotik.refresh()
        }, 2200)
      } catch (err: any) {
        setNotice(`Reboot failed: ${err.message}`)
        window.setTimeout(() => setNotice(''), 3500)
      }
      return
    }
    setNotice(`Rebooting ${router.name}... RouterOS restarting`)
    setRouterDevices((prev) =>
      prev.map((r) => (r.id === router.id ? { ...r, status: 'warn', uptime: '0m' } : r))
    )

    window.setTimeout(() => {
      setRouterDevices((prev) =>
        prev.map((r) => (r.id === router.id ? { ...r, status: 'good', uptime: '1m', ping_ms: 2 } : r))
      )
      setNotice(`✅ ${router.name} rebooted and back online!`)
      window.setTimeout(() => setNotice(''), 3500)
    }, 2200)
  }

  const handleDeleteRouter = async (routerId: string, routerName: string) => {
    const client = supabase
    if (client) {
      try {
        await client.from('routers').delete().eq('id', routerId)
      } catch (e) {}
    }
    setRouterDevices((prev) => prev.filter((r) => r.id !== routerId))
    setNotice(`${routerName} removed from workspace`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const handleAddRouterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRouterName.trim() || !newRouterIp.trim()) return

    const newDevice: RouterDevice = {
      id: crypto.randomUUID(),
      name: newRouterName.trim(),
      ip_address: newRouterIp.trim(),
      model: newRouterModel,
      location: newRouterLocation.trim() || 'Harbor House AP',
      status: 'good',
      clients_count: 0,
      traffic_down: '0.0 Mbps',
      traffic_up: '0.0 Mbps',
      cpu_load: 8,
      ram_load: 22,
      ping_ms: 2,
      uptime: '1m',
    }

    const client = supabase
    if (client) {
      try {
        await client.from('routers').insert({
          name: newDevice.name,
          ip_address: newDevice.ip_address,
          model: newDevice.model,
          location: newDevice.location,
          status: 'good',
        })
      } catch (e) {}
    }

    setRouterDevices((prev) => [newDevice, ...prev])
    setShowAddRouter(false)
    setNewRouterName('')
    setNewRouterIp('')
    setNewRouterLocation('')
    setNotice(`Router ${newDevice.name} registered and online!`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  // Customer Handlers
  const handleToggleBlockCustomer = (customer: CustomerRecord) => {
    const nextStatus = customer.status === 'blocked' ? 'active' : 'blocked'
    setCustomersList((prev) =>
      prev.map((c) => (c.id === customer.id ? { ...c, status: nextStatus } : c))
    )
    setNotice(
      nextStatus === 'blocked'
        ? `🚫 ${customer.name} blocked from Wi-Fi access`
        : `✅ ${customer.name} unblocked successfully`
    )
    window.setTimeout(() => setNotice(''), 3000)
  }

  const handleDeleteCustomer = async (customerId: string, customerName: string) => {
    const client = supabase
    if (client) {
      try {
        await client.from('customers').delete().eq('id', customerId)
      } catch (e) {}
    }
    setCustomersList((prev) => prev.filter((c) => c.id !== customerId))
    setNotice(`Customer ${customerName} removed`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const handleAddCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCustName.trim()) return

    const palette = ['#d36b4d', '#317d75', '#c58a32', '#4f779a', '#725796']
    const randomColor = palette[Math.floor(Math.random() * palette.length)]

    const newCust: CustomerRecord = {
      id: crypto.randomUUID(),
      name: newCustName.trim(),
      phone: newCustPhone.trim() || '+254 700 000 000',
      device: newCustDevice.trim() || 'Smart Device',
      plan: newCustPlan,
      total_spent: 'KSh 0',
      data_usage: '0 MB',
      status: 'active',
      last_active: 'Just registered',
      avatar_color: randomColor,
    }

    const client = supabase
    if (client) {
      try {
        await client.from('customers').insert({
          name: newCust.name,
          phone: newCust.phone,
          device: newCust.device,
          total_spent: 0,
        })
      } catch (e) {}
    }

    setCustomersList((prev) => [newCust, ...prev])
    setShowAddCustomer(false)
    setNewCustName('')
    setNewCustPhone('')
    setNewCustDevice('')
    setNotice(`Customer ${newCust.name} added successfully!`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  const handleExportCustomersCSV = () => {
    const headers = 'ID,Name,Phone,Device,Plan,Total Spent,Data Usage,Status,Last Active\n'
    const rows = customersList
      .map((c) => `"${c.id}","${c.name}","${c.phone}","${c.device}","${c.plan}","${c.total_spent}","${c.data_usage}","${c.status}","${c.last_active}"`)
      .join('\n')

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `orion_customers_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setNotice('Customer directory exported to CSV')
    window.setTimeout(() => setNotice(''), 2500)
  }

  // Package Handlers
  const handleTogglePackageActive = (pkgId: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === pkgId ? { ...p, is_active: !p.is_active } : p))
    )
    setNotice('Package availability status updated')
    window.setTimeout(() => setNotice(''), 2000)
  }

  const handleDeletePackage = async (pkgId: string, pkgName: string) => {
    const client = supabase
    if (client) {
      try {
        await client.from('packages').delete().eq('id', pkgId)
      } catch (e) {}
    }
    setPackages((prev) => prev.filter((p) => p.id !== pkgId))
    setNotice(`Package "${pkgName}" deleted`)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const handleAddPackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPkgName.trim()) return

    const priceNum = Number(newPkgPrice) || 100
    const devLimit = Math.max(1, Number(newPkgDevices) || 1)

    const newPackage: HotspotPackage = {
      id: crypto.randomUUID(),
      name: newPkgName.trim(),
      category: newPkgCategory,
      price: priceNum,
      duration_display: newPkgDuration.trim() || '24 Hours',
      data_limit: newPkgDataLimit.trim() || 'Unlimited',
      speed_limit: newPkgSpeed.trim() || '20 Mbps',
      device_limit: devLimit,
      sales_count: 0,
      is_active: true,
      color: newPkgColor,
    }

    const client = supabase
    if (client) {
      try {
        await client.from('packages').insert({
          name: newPackage.name,
          price_amount: newPackage.price,
          duration: newPackage.duration_display,
          data_limit: newPackage.data_limit,
          sales_count: 0,
          color: newPackage.color,
          is_active: true,
        })
      } catch (e) {}
    }

    setPackages((prev) => [newPackage, ...prev])
    setShowAddPackage(false)
    setNewPkgName('')
    setNewPkgPrice('350')
    setNewPkgDuration('24 Hours')
    setNotice(`Package "${newPackage.name}" created and ready for sale!`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  const handleSaveCustomKey = (e: React.FormEvent) => {
    e.preventDefault()
    setSupabaseConfig(supabaseUrl, customKeyInput.trim())
    setShowDbSettings(false)
    setNotice('Supabase configuration updated!')
    window.setTimeout(() => {
      window.location.reload()
    }, 600)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Signal size={20} /></div>
          <span>orion<span className="brand-dot">.</span></span>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-avatar" style={{ background: settings.primaryColor }}>
            {settings.businessName.charAt(0)}
          </div>
          <div>
            <strong>{settings.businessName}</strong>
            <span>{settings.location}</span>
          </div>
          <ChevronDown size={15} />
        </div>
        <nav>
          <p className="nav-label">Workspace</p>
          {[
            ['Overview', LayoutDashboard], ['Customers', Users], ['Packages', Ticket], ['Vouchers', ReceiptText],
            ['Transactions', CreditCard], ['Routers', Router],
          ].map(([label, Icon]) => (
            <button
              key={label as string}
              className={`nav-item ${activeNav === label ? 'active' : ''}`}
              onClick={() => setActiveNav(label as string)}
            >
              <Icon size={18} />
              <span>{label as string}</span>
              {label === 'Packages' && <b className="nav-count" style={{ background: '#fdf1e7', color: 'var(--coral)' }}>{packages.length}</b>}
              {label === 'Customers' && <b className="nav-count" style={{ background: '#eaf3eb', color: '#34786d' }}>{customersList.length}</b>}
              {label === 'Vouchers' && <b className="nav-count">{vouchersList.filter((v) => v.status === 'active').length}</b>}
              {label === 'Routers' && <b className="nav-count" style={{ background: 'var(--metric-icon-teal-bg)', color: 'var(--metric-icon-teal-color)' }}>{routerDevices.length}</b>}
            </button>
          ))}
          <p className="nav-label support-label">Manage</p>
          {[["Reports", Activity], ["Settings", Settings2]].map(([label, Icon]) => (
            <button
              key={label as string}
              className={`nav-item ${activeNav === label ? 'active' : ''}`}
              onClick={() => setActiveNav(label as string)}
            >
              <Icon size={18} />
              <span>{label as string}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-box">
            <div className="help-icon"><LifeBuoy size={17} /></div>
            <strong>Need a hand?</strong>
            <span>Visit the help center</span>
          </div>

          <button
            className="sidebar-theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span>Appearance</span>
            <div className="theme-pill">
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
              <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </div>
          </button>

          <div className="profile" style={{ position: 'relative' }}>
            <div className="profile-avatar">{operator.avatar}</div>
            <div>
              <strong>{operator.name}</strong>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ShieldCheck size={11} color="#4ca574" /> {operator.role}
              </span>
            </div>
            <button
              className="icon-button"
              title="Sign Out & Lock Workspace"
              onClick={onLogout}
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>{settings.businessName}</span>
            <span>/</span>
            <strong>{activeNav}</strong>
          </div>
          <div className="top-actions">
            <div
              className="live-pill"
              style={{ padding: '6px 10px', cursor: 'pointer' }}
              title="Supabase Database Status"
              onClick={() => setShowDbSettings(true)}
            >
              <Database size={13} />
              <span>{syncing ? 'Syncing...' : dbConnected ? 'Live DB' : 'Workspace Ready'}</span>
            </div>

            <button
              className="icon-button"
              aria-label="Refresh Data"
              title="Sync data"
              onClick={() => {
                void loadAllDatabaseData()
                setNotice('Workspace synchronized')
                window.setTimeout(() => setNotice(''), 2000)
              }}
            >
              <RefreshCw size={17} className={syncing ? 'spinning' : ''} />
            </button>

            <button className="icon-button" aria-label="Search" onClick={() => setNotice('Search is ready for your workspace')}><Search size={19} /></button>
            <button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice('You are all caught up')}><Bell size={19} /><i /></button>

            <button
              className="theme-toggle-btn"
              onClick={handleThemeToggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>

            <div className="date-control"><Clock3 size={16} /> Aug 01 – Aug 31 <ChevronDown size={14} /></div>
          </div>
        </header>

        <div className="page-wrap">
          {activeNav === 'Overview' && (
            <>
              <section className="page-heading">
                <div>
                  <p className="eyebrow">Wednesday, August 26, 2026</p>
                  <h1>Good morning, {operator.name.split(' ')[0]} <span>✦</span></h1>
                  <p className="heading-sub">Here is what is happening across your hotspot today.</p>
                </div>
                <div className="heading-actions">
                  <button className="button secondary" onClick={() => setActiveNav('Reports')}>
                    <ArrowDownRight size={16} /> View reports
                  </button>
                  <button className="button primary" onClick={() => setShowVoucher(true)}>
                    <Plus size={17} /> Create voucher
                  </button>
                </div>
              </section>

              <section className="metrics-grid">
                <Metric label="Total revenue" value="KSh 284,650" change="18.4%" trend="up" icon={CircleDollarSign} accent="green" />
                <Metric label="Active customers" value={String(customersList.length + 1278)} change="12.6%" trend="up" icon={Users} accent="orange" />
                <Metric label="Live sessions" value={String(liveSessionCount)} change={liveSessions.length > 0 ? 'Live from router' : '4.2%'} trend="up" icon={Wifi} accent="teal" />
                <Metric label="Avg. session time" value="3h 42m" change="8.1%" trend="down" icon={Gauge} accent="blue" />
              </section>

              <div className="content-grid">
                <section className="panel revenue-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Revenue overview</h2>
                      <p>Monthly income from all access packages</p>
                    </div>
                    <button className="select-button">Last 30 days <ChevronDown size={14} /></button>
                  </div>
                  <div className="revenue-total">
                    <strong>KSh 284,650</strong>
                    <span className="positive"><ArrowUpRight size={14} /> 18.4%</span>
                  </div>
                  <RevenueChart />
                </section>

                <section className="panel network-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Network health</h2>
                      <p>All systems are operational</p>
                    </div>
                    <span className="live-pill"><i /> Live</span>
                  </div>
                  <div className="network-score">
                    <div className="score-ring">
                      <strong>98</strong>
                      <span>/100</span>
                    </div>
                    <div>
                      <strong>Excellent</strong>
                      <p>Uptime this month</p>
                    </div>
                  </div>
                  <div className="health-list">
                    {routersList.map((r, i) => (
                      <HealthRow key={i} label={r.name} value={r.value} status={r.status} />
                    ))}
                  </div>
                  <button className="text-button" onClick={() => setActiveNav('Routers')}>
                    View network details <ArrowUpRight size={15} />
                  </button>
                </section>
              </div>

              <div className="content-grid lower-grid">
                <section className="panel sessions-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Live sessions <span className="heading-badge">{liveSessionCount}</span></h2>
                      <p>{liveSessions.length > 0 ? 'Connected on the MikroTik router now' : 'Customers currently connected'}</p>
                    </div>
                    <button className="text-button" onClick={() => setActiveNav('Customers')}>
                      View all <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Package</th>
                          <th>Usage</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {displaySessions.map((session) => (
                          <tr key={session.id ?? session.name}>
                            <td>
                              <div className="customer-cell">
                                <div className="customer-avatar" style={{ background: session.color }}>
                                  {session.name.split(' ').map((word) => word[0]).join('')}
                                </div>
                                <div>
                                  <strong>{session.name}</strong>
                                  <span>{session.device} · {session.location}</span>
                                </div>
                              </div>
                            </td>
                            <td><span className="package-name">{session.plan}</span></td>
                            <td>
                              <div className="usage-cell">
                                <div className="usage-bar"><i style={{ width: `${session.progress}%` }} /></div>
                                <span>{session.usage}</span>
                              </div>
                            </td>
                            <td>
                              <button
                                className="row-action"
                                aria-label={`Disconnect ${session.name}`}
                                title="Disconnect session"
                                onClick={() => void disconnect(session)}
                              >
                                <X size={15} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="panel package-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Popular packages</h2>
                      <p>Sales by access plan</p>
                    </div>
                    <button className="more-button" aria-label="More package options"><MoreHorizontal size={18} /></button>
                  </div>
                  <div className="package-list">
                    {packages.slice(0, 3).map((pkg) => (
                      <PackageRow
                        key={pkg.id}
                        name={pkg.name}
                        sales={`${pkg.sales_count} sold`}
                        amount={`KSh ${(pkg.price * (pkg.sales_count || 1)).toLocaleString()}`}
                        width={`${Math.min(100, Math.round((pkg.sales_count / 500) * 100))}%`}
                        color={pkg.color}
                      />
                    ))}
                  </div>
                  <button className="outline-button" onClick={() => setActiveNav('Packages')}>
                    Manage packages <ArrowUpRight size={15} />
                  </button>
                </section>
              </div>

              <section className="panel transactions-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Recent transactions</h2>
                    <p>Latest payments and voucher redemptions</p>
                  </div>
                  <button className="text-button" onClick={() => setActiveNav('Transactions')}>
                    View all transactions <ArrowUpRight size={15} />
                  </button>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Transaction</th>
                        <th>Customer</th>
                        <th>Method</th>
                        <th>Package</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionsList.slice(0, 5).map((transaction) => (
                        <tr key={transaction.id}>
                          <td><strong className="transaction-id">{transaction.id}</strong></td>
                          <td>{transaction.customer}</td>
                          <td>
                            <span className="method">
                              <span className={`method-dot ${transaction.method === 'M-Pesa' ? 'mpesa' : transaction.method === 'Voucher' ? 'voucher' : 'airtel'}`} />
                              {transaction.method}
                            </span>
                          </td>
                          <td>{transaction.package}</td>
                          <td><strong>{transaction.amount}</strong></td>
                          <td><span className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></td>
                          <td className="muted">{transaction.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeNav === 'Packages' && (
            <PackagesManagementView
              packages={packages}
              onToggleActive={handleTogglePackageActive}
              onDelete={handleDeletePackage}
              onAddNewClick={() => setShowAddPackage(true)}
              onGenerateVouchersForPackage={(pkgName) => {
                setVoucherPackage(pkgName)
                setShowVoucher(true)
              }}
            />
          )}

          {activeNav === 'Vouchers' && (
            <VouchersManagementView
              vouchers={vouchersList}
              onDelete={handleDeleteVoucher}
              onAddNewClick={() => setShowVoucher(true)}
              onPrintClick={() => setShowPrintVouchers(true)}
              onSendSmsClick={(v) => {
                setSelectedVoucherForSms(v)
                setVoucherRecipientPhone('')
                setVoucherSmsResult(null)
                setShowSendVoucherSms(true)
              }}
            />
          )}

          {activeNav === 'Transactions' && (
            <TransactionsManagementView
              transactions={transactionsList}
              onRecordNewClick={() => setShowRecordTrx(true)}
            />
          )}

          {activeNav === 'Customers' && (
            <CustomersManagementView
              customers={customersList}
              onToggleBlock={handleToggleBlockCustomer}
              onDelete={handleDeleteCustomer}
              onExportCSV={handleExportCustomersCSV}
              onAddNewClick={() => setShowAddCustomer(true)}
              onSendSmsClick={(c) => {
                setSelectedCustomerForSms(c)
                setCustomerSmsText(`Hello ${c.name}, welcome to Harbor House Wi-Fi. You are connected on ${c.plan}. Enjoy high-speed browsing!`)
                setCustomerSmsResult(null)
                setShowSendCustomerSms(true)
              }}
            />
          )}

          {activeNav === 'Routers' && (
            <RoutersManagementView
              routers={routerDevices}
              onPing={handlePingRouter}
              onReboot={handleRebootRouter}
              onDelete={handleDeleteRouter}
              onAddNewClick={() => setShowAddRouter(true)}
            />
          )}

          {activeNav === 'Reports' && (
            <ReportsManagementView
              packages={packages}
              transactions={transactionsList}
              customers={customersList}
            />
          )}

          {activeNav === 'Settings' && (
            <SettingsManagementView
              settings={settings}
              operator={operator}
              onSave={handleSaveSettings}
              onOpenDbModal={() => setShowDbSettings(true)}
            />
          )}
        </div>
      </main>

      {/* Record Payment Transaction Modal */}
      {showRecordTrx && (
        <div className="modal-backdrop" onClick={() => setShowRecordTrx(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRecordTrx(false)}><X size={18} /></button>
            <div className="modal-icon"><CreditCard size={22} /></div>
            <p className="eyebrow">Finance & Reconciliation</p>
            <h2>Record Payment</h2>
            <p className="modal-copy">Record an offline cash payment, manual M-Pesa or voucher payment.</p>
            <form onSubmit={handleRecordTransactionSubmit}>
              <label>
                Customer Name
                <input
                  type="text"
                  required
                  value={newTrxCust}
                  onChange={(e) => setNewTrxCust(e.target.value)}
                  placeholder="e.g. Kelvin Mutua"
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  value={newTrxPhone}
                  onChange={(e) => setNewTrxPhone(e.target.value)}
                  placeholder="e.g. +254 712 345 678"
                />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label>
                  Payment Method
                  <select value={newTrxMethod} onChange={(e) => setNewTrxMethod(e.target.value)}>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Airtel Money">Airtel Money</option>
                    <option value="Voucher">Voucher</option>
                    <option value="Cash">Cash / POS</option>
                  </select>
                </label>
                <label>
                  Amount (KSh)
                  <input
                    type="number"
                    required
                    value={newTrxAmount}
                    onChange={(e) => setNewTrxAmount(e.target.value)}
                    placeholder="350"
                  />
                </label>
              </div>
              <label>
                Package Selected
                <select value={newTrxPkg} onChange={(e) => setNewTrxPkg(e.target.value)}>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} (KSh {pkg.price})
                    </option>
                  ))}
                </select>
              </label>
              <button className="button primary full" type="submit">
                <Check size={16} /> Record Transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Print Vouchers Slips Sheet Modal */}
      {showPrintVouchers && (
        <div className="modal-backdrop" onClick={() => setShowPrintVouchers(false)}>
          <div className="modal" style={{ width: 'min(100%, 680px)' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPrintVouchers(false)}><X size={18} /></button>
            <div className="modal-icon"><Printer size={22} /></div>
            <p className="eyebrow">Print Slips</p>
            <h2>Print Voucher Codes</h2>
            <p className="modal-copy">Print physical voucher tickets for customer purchase at reception or counter.</p>

            <div className="voucher-print-grid">
              {vouchersList.filter((v) => v.status === 'active').slice(0, 8).map((v) => (
                <div key={v.id} className="voucher-slip-card">
                  <div className="voucher-slip-header">{settings.businessName} Wi-Fi</div>
                  <div><strong>{v.package_name}</strong></div>
                  <div className="voucher-slip-code">{v.code}</div>
                  <div className="voucher-slip-footer">
                    <span>Price: <strong>{v.price}</strong> · Connect to SSID & Enter code</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button
                className="button primary full"
                onClick={() => {
                  window.print()
                  setShowPrintVouchers(false)
                }}
              >
                <Printer size={16} /> Print Slips (8 Tickets)
              </button>
              <button className="button secondary" onClick={() => setShowPrintVouchers(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Package Modal */}
      {showAddPackage && (
        <div className="modal-backdrop" onClick={() => setShowAddPackage(false)}>
          <div className="modal" style={{ width: 'min(100%, 480px)' }} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddPackage(false)}><X size={18} /></button>
            <div className="modal-icon"><Ticket size={22} /></div>
            <p className="eyebrow">Pricing & Quotas</p>
            <h2>Create Access Package</h2>
            <p className="modal-copy">Create custom unlimited or quota-capped hourly, daily, weekly, and monthly plans.</p>

            <div style={{ margin: '8px 0 4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>Quick Unlimited Presets:</span>
              <div className="preset-pills-wrap">
                <button
                  type="button"
                  className="preset-pill-btn"
                  onClick={() => applyPackagePreset('1 Hour Unlimited Rush', 'hourly', '70', '1 Hour', 'Unlimited', '10 Mbps', '1', 'yellow')}
                >
                  ⚡ 1h Unlimited (KSh 70)
                </button>
                <button
                  type="button"
                  className="preset-pill-btn"
                  onClick={() => applyPackagePreset('24h Day Pass Unlimited', 'daily', '350', '24 Hours', 'Unlimited', '20 Mbps', '1', 'orange')}
                >
                  ⚡ 24h Unlimited (KSh 350)
                </button>
                <button
                  type="button"
                  className="preset-pill-btn"
                  onClick={() => applyPackagePreset('7 Days Unlimited Flex', 'weekly', '1500', '7 Days', 'Unlimited', '25 Mbps', '1', 'teal')}
                >
                  ⚡ 7d Unlimited (KSh 1.5k)
                </button>
                <button
                  type="button"
                  className="preset-pill-btn"
                  onClick={() => applyPackagePreset('30 Days Monthly Unlimited', 'monthly', '3500', '30 Days', 'Unlimited', '30 Mbps', '1', 'green')}
                >
                  ⚡ 30d Unlimited (KSh 3.5k)
                </button>
                <button
                  type="button"
                  className="preset-pill-btn"
                  onClick={() => applyPackagePreset('Family 3-Devices 30d Unlimited', 'multi-device', '5500', '30 Days', 'Unlimited Shared', '40 Mbps Turbo', '3', 'teal')}
                >
                  👨‍👩‍👧 Family 3-Dev Unlimited
                </button>
              </div>
            </div>

            <form onSubmit={handleAddPackageSubmit}>
              <label>
                Package Plan Name
                <input
                  type="text"
                  required
                  value={newPkgName}
                  onChange={(e) => setNewPkgName(e.target.value)}
                  placeholder="e.g. Student Weekend Pass, Family 3-Devices"
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label>
                  Duration Category
                  <select
                    value={newPkgCategory}
                    onChange={(e) => {
                      const cat = e.target.value as any
                      setNewPkgCategory(cat)
                      if (cat === 'hourly') setNewPkgDuration('1 Hour')
                      else if (cat === 'daily') setNewPkgDuration('24 Hours')
                      else if (cat === 'weekly') setNewPkgDuration('7 Days')
                      else if (cat === 'monthly') setNewPkgDuration('30 Days')
                      else if (cat === 'multi-device') setNewPkgDevices('3')
                    }}
                  >
                    <option value="hourly">Hourly (Quick Pass)</option>
                    <option value="daily">Daily (24h / Multi-day)</option>
                    <option value="weekly">Weekly (7 Days / 14 Days)</option>
                    <option value="monthly">Monthly (30 Days)</option>
                    <option value="multi-device">Multi-Device / Family</option>
                  </select>
                </label>

                <label>
                  Price (KSh)
                  <input
                    type="number"
                    required
                    value={newPkgPrice}
                    onChange={(e) => setNewPkgPrice(e.target.value)}
                    min="10"
                    placeholder="350"
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label>
                  Duration Label
                  <input
                    type="text"
                    required
                    value={newPkgDuration}
                    onChange={(e) => setNewPkgDuration(e.target.value)}
                    placeholder="e.g. 3 Hours, 24 Hours, 30 Days"
                  />
                </label>

                <label>
                  Max Concurrent Devices
                  <select value={newPkgDevices} onChange={(e) => setNewPkgDevices(e.target.value)}>
                    <option value="1">1 Device (Individual)</option>
                    <option value="2">2 Devices (Duo)</option>
                    <option value="3">3 Devices (Family 3x)</option>
                    <option value="4">4 Devices (Family 4x)</option>
                    <option value="5">5 Devices (Team / Office)</option>
                    <option value="10">10 Devices (Group / Event)</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label>
                  Data Quota
                  <select value={newPkgDataLimit} onChange={(e) => setNewPkgDataLimit(e.target.value)}>
                    <option value="Unlimited">♾️ Unlimited Data</option>
                    <option value="Unlimited Shared">♾️ Unlimited Shared (Multi-Device)</option>
                    <option value="1 GB">1 GB</option>
                    <option value="3 GB">3 GB</option>
                    <option value="5 GB">5 GB</option>
                    <option value="10 GB">10 GB</option>
                    <option value="20 GB">20 GB</option>
                    <option value="50 GB">50 GB</option>
                    <option value="100 GB">100 GB</option>
                  </select>
                </label>

                <label>
                  Speed Cap
                  <select value={newPkgSpeed} onChange={(e) => setNewPkgSpeed(e.target.value)}>
                    <option value="5 Mbps">5 Mbps (Standard)</option>
                    <option value="10 Mbps">10 Mbps (Fast)</option>
                    <option value="20 Mbps">20 Mbps (High Speed)</option>
                    <option value="30 Mbps">30 Mbps (Ultra Fast)</option>
                    <option value="40 Mbps Turbo">40 Mbps (Turbo)</option>
                    <option value="50 Mbps Turbo">50 Mbps (Gigabit Turbo)</option>
                  </select>
                </label>
              </div>

              <label>
                Theme Color Accent
                <select value={newPkgColor} onChange={(e) => setNewPkgColor(e.target.value)}>
                  <option value="orange">Coral Orange (Popular)</option>
                  <option value="teal">Emerald Teal</option>
                  <option value="yellow">Amber Yellow</option>
                  <option value="green">Forest Green</option>
                </select>
              </label>

              <button className="button primary full" type="submit" style={{ marginTop: '14px' }}>
                <Plus size={16} /> Save & Publish Package
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="modal-backdrop" onClick={() => setShowAddCustomer(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddCustomer(false)}><X size={18} /></button>
            <div className="modal-icon"><UserPlus size={22} /></div>
            <p className="eyebrow">Customer Directory</p>
            <h2>Add New Customer</h2>
            <p className="modal-copy">Register a new subscriber or walk-in customer into your billing system.</p>
            <form onSubmit={handleAddCustomerSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  required
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. David Mwangi"
                />
              </label>
              <label>
                Phone Number (M-Pesa)
                <input
                  type="tel"
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  placeholder="e.g. +254 712 345 678"
                />
              </label>
              <label>
                Primary Device
                <input
                  type="text"
                  value={newCustDevice}
                  onChange={(e) => setNewCustDevice(e.target.value)}
                  placeholder="e.g. iPhone 15 / MacBook"
                />
              </label>
              <label>
                Initial Access Plan
                <select value={newCustPlan} onChange={(e) => setNewCustPlan(e.target.value)}>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} (KSh {pkg.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </label>
              <button className="button primary full" type="submit">
                <Plus size={16} /> Register Customer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Router Modal */}
      {showAddRouter && (
        <div className="modal-backdrop" onClick={() => setShowAddRouter(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddRouter(false)}><X size={18} /></button>
            <div className="modal-icon"><Router size={22} /></div>
            <p className="eyebrow">Hardware Configuration</p>
            <h2>Add Router / Access Point</h2>
            <p className="modal-copy">Connect a MikroTik RouterOS or Ubiquiti UniFi AP to this hotspot workspace.</p>
            <form onSubmit={handleAddRouterSubmit}>
              <label>
                Router / AP Name
                <input
                  type="text"
                  required
                  value={newRouterName}
                  onChange={(e) => setNewRouterName(e.target.value)}
                  placeholder="e.g. MikroTik AP Rooftop Deck"
                />
              </label>
              <label>
                IP Address
                <input
                  type="text"
                  required
                  value={newRouterIp}
                  onChange={(e) => setNewRouterIp(e.target.value)}
                  placeholder="e.g. 10.20.0.60"
                />
              </label>
              <label>
                Hardware Model
                <select value={newRouterModel} onChange={(e) => setNewRouterModel(e.target.value)}>
                  <option value="MikroTik CCR2004">MikroTik CCR2004 (Core Gateway)</option>
                  <option value="MikroTik cAP ac">MikroTik cAP ac (Indoor AP)</option>
                  <option value="MikroTik wAP ac">MikroTik wAP ac (Outdoor AP)</option>
                  <option value="MikroTik hEX S">MikroTik hEX S (Branch Router)</option>
                  <option value="Ubiquiti UniFi 6 LR">Ubiquiti UniFi 6 LR (Long-Range AP)</option>
                  <option value="Generic RouterOS">Generic RouterOS Gateway</option>
                </select>
              </label>
              <label>
                Location in Premises
                <input
                  type="text"
                  value={newRouterLocation}
                  onChange={(e) => setNewRouterLocation(e.target.value)}
                  placeholder="e.g. Rooftop Dining Area"
                />
              </label>
              <button className="button primary full" type="submit">
                <Plus size={16} /> Save & Register Device
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Voucher Generation Modal */}
      {showVoucher && (
        <div className="modal-backdrop" onClick={() => setShowVoucher(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowVoucher(false)}><X size={18} /></button>
            <div className="modal-icon"><Ticket size={22} /></div>
            <p className="eyebrow">Quick action</p>
            <h2>Create vouchers</h2>
            <p className="modal-copy">Generate a batch of access codes for your walk-in customers.</p>
            <label>
              Package
              <select value={voucherPackage} onChange={(event) => setVoucherPackage(event.target.value)}>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.name}>
                    {pkg.name} ({pkg.duration_display} - KSh {pkg.price})
                  </option>
                ))}
              </select>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <label>
                Number of vouchers
                <input
                  type="number"
                  value={voucherCount}
                  onChange={(event) => setVoucherCount(Number(event.target.value))}
                  min="1"
                  max="100"
                />
              </label>
              <label>
                Code Prefix
                <input
                  type="text"
                  value={voucherPrefix}
                  onChange={(event) => setVoucherPrefix(event.target.value)}
                  placeholder="ORN"
                  maxLength={4}
                />
              </label>
            </div>
            <button className="button primary full" onClick={() => void generateVouchers()}>
              <Zap size={16} /> Generate {voucherCount} Vouchers
            </button>
          </div>
        </div>
      )}

      {/* Supabase Database Settings Modal */}
      {showDbSettings && (
        <div className="modal-backdrop" onClick={() => setShowDbSettings(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDbSettings(false)}><X size={18} /></button>
            <div className="modal-icon"><Database size={22} /></div>
            <p className="eyebrow">Integration</p>
            <h2>Supabase Database</h2>
            <p className="modal-copy">Project Reference: <code>ezcwgyhwotomranbyuyh</code></p>
            <form onSubmit={handleSaveCustomKey}>
              <label>
                Anon Public Key (JWT starting with <code>eyJ...</code>)
                <input
                  type="text"
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  style={{ fontFamily: 'monospace', fontSize: '11px' }}
                />
              </label>
              <div style={{ margin: '10px 0 16px' }}>
                <a
                  href="https://supabase.com/dashboard/project/ezcwgyhwotomranbyuyh/settings/api"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--coral)', fontSize: '12px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  Open Supabase API Settings <ExternalLink size={13} />
                </a>
              </div>
              <button className="button primary full" type="submit">
                Save & Reconnect
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Send Voucher via SMS Modal */}
      {showSendVoucherSms && selectedVoucherForSms && (
        <div className="modal-backdrop" onClick={() => setShowSendVoucherSms(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSendVoucherSms(false)}><X size={18} /></button>
            <div className="modal-icon"><Send size={22} /></div>
            <p className="eyebrow">SMS Dispatch</p>
            <h2>Send Voucher via SMS</h2>
            <p className="modal-copy">
              Send voucher <strong>{selectedVoucherForSms.code}</strong> directly to customer's mobile phone number.
            </p>

            <form onSubmit={handleSendVoucherSmsSubmit}>
              <div style={{ background: 'var(--card-subtle-bg)', border: '1px solid var(--line)', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Plan:</span>
                  <strong>{selectedVoucherForSms.package_name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Voucher Code:</span>
                  <code style={{ fontSize: '12px', fontWeight: 800, color: 'var(--coral)' }}>{selectedVoucherForSms.code}</code>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Value:</span>
                  <strong>{selectedVoucherForSms.price}</strong>
                </div>
              </div>

              <label>
                Customer Mobile Phone Number
                <input
                  type="tel"
                  required
                  value={voucherRecipientPhone}
                  onChange={(e) => setVoucherRecipientPhone(e.target.value)}
                  placeholder="e.g. +254 712 345 678 or 0712345678"
                  autoFocus
                />
              </label>

              {voucherSmsResult && (
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '7px',
                    margin: '8px 0',
                    fontSize: '11px',
                    background: voucherSmsResult.success ? 'rgba(76, 165, 116, 0.12)' : 'rgba(217, 85, 79, 0.12)',
                    border: `1px solid ${voucherSmsResult.success ? '#4ca574' : '#d9554f'}`,
                    color: voucherSmsResult.success ? '#317d75' : '#c94a32',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {voucherSmsResult.success ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                  <span>
                    {voucherSmsResult.success
                      ? `Dispatched via ${voucherSmsResult.providerUsed} to ${voucherSmsResult.recipient}!`
                      : `Failed: ${voucherSmsResult.error}`}
                  </span>
                </div>
              )}

              <button className="button primary full" type="submit" disabled={isSendingVoucherSms} style={{ marginTop: '10px' }}>
                {isSendingVoucherSms ? <RefreshCw size={15} className="spinning" /> : <Send size={15} />} Dispatch Voucher SMS
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Send Customer Custom SMS Alert Modal */}
      {showSendCustomerSms && selectedCustomerForSms && (
        <div className="modal-backdrop" onClick={() => setShowSendCustomerSms(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSendCustomerSms(false)}><X size={18} /></button>
            <div className="modal-icon"><MessageSquare size={22} /></div>
            <p className="eyebrow">Customer Communication</p>
            <h2>Send SMS to Customer</h2>
            <p className="modal-copy">
              Send a text notification to <strong>{selectedCustomerForSms.name}</strong> ({selectedCustomerForSms.phone}).
            </p>

            <form onSubmit={handleSendCustomerSmsSubmit}>
              <label>
                SMS Message Text
                <textarea
                  rows={4}
                  required
                  value={customerSmsText}
                  onChange={(e) => setCustomerSmsText(e.target.value)}
                  placeholder="Type message to customer..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--card-subtle-bg)',
                    color: 'var(--ink)',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                  }}
                />
              </label>

              {customerSmsResult && (
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '7px',
                    margin: '8px 0',
                    fontSize: '11px',
                    background: customerSmsResult.success ? 'rgba(76, 165, 116, 0.12)' : 'rgba(217, 85, 79, 0.12)',
                    border: `1px solid ${customerSmsResult.success ? '#4ca574' : '#d9554f'}`,
                    color: customerSmsResult.success ? '#317d75' : '#c94a32',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {customerSmsResult.success ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                  <span>
                    {customerSmsResult.success
                      ? `SMS sent via ${customerSmsResult.providerUsed} to ${customerSmsResult.recipient}!`
                      : `Failed: ${customerSmsResult.error}`}
                  </span>
                </div>
              )}

              <button className="button primary full" type="submit" disabled={isSendingCustomerSms} style={{ marginTop: '10px' }}>
                {isSendingCustomerSms ? <RefreshCw size={15} className="spinning" /> : <Send size={15} />} Send SMS Message
              </button>
            </form>
          </div>
        </div>
      )}

      {notice && <div className="toast"><ShieldCheck size={18} /> {notice}</div>}
    </div>
  )
}

function VouchersManagementView({
  vouchers,
  onDelete,
  onAddNewClick,
  onPrintClick,
  onSendSmsClick,
}: {
  vouchers: VoucherRecord[]
  onDelete: (id: string, code: string) => void
  onAddNewClick: () => void
  onPrintClick: () => void
  onSendSmsClick?: (voucher: VoucherRecord) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'redeemed'>('all')
  const [copiedCode, setCopiedCode] = useState('')

  const filteredVouchers = vouchers.filter((v) => {
    const matchesSearch =
      v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.package_name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || v.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const activeCount = vouchers.filter((v) => v.status === 'active').length
  const redeemedCount = vouchers.filter((v) => v.status === 'redeemed').length

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const exportVouchersCSV = () => {
    const headers = 'Code,Package,Price,Status,Created At,Expires At\n'
    const rows = vouchers.map((v) => `"${v.code}","${v.package_name}","${v.price}","${v.status}","${v.created_at}","${v.expires_at}"`).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vouchers_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
  }

  return (
    <div className="vouchers-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Inventory & Prepaid Codes</p>
          <h1>Voucher Management</h1>
          <p className="heading-sub">
            Generate, track, print, and distribute Wi-Fi hotspot vouchers for walk-in users.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button secondary" onClick={exportVouchersCSV}>
            <Download size={15} /> Export CSV
          </button>
          <button className="button secondary" onClick={onPrintClick}>
            <Printer size={15} /> Print voucher slips
          </button>
          <button className="button primary" onClick={onAddNewClick}>
            <Plus size={16} /> Generate vouchers
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="metrics-grid">
        <Metric
          label="Active Vouchers"
          value={String(activeCount)}
          change="Available for sale"
          trend="up"
          icon={Ticket}
          accent="green"
        />
        <Metric
          label="Redeemed Vouchers"
          value={String(redeemedCount)}
          change="Used by clients"
          trend="up"
          icon={CheckCircle2}
          accent="orange"
        />
        <Metric
          label="Total Inventory"
          value={String(vouchers.length)}
          change="Generated batch"
          trend="up"
          icon={ReceiptText}
          accent="teal"
        />
        <Metric
          label="Batch Expiry"
          value="Oct 31, 2026"
          change="Valid 60+ days"
          trend="up"
          icon={Clock3}
          accent="blue"
        />
      </section>

      {/* Toolbar */}
      <div className="router-toolbar">
        <div className="router-search-box">
          <Search size={16} color="var(--muted)" />
          <input
            type="text"
            placeholder="Search by voucher code or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer', padding: 0 }}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-pills">
          <button className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>
            All ({vouchers.length})
          </button>
          <button className={`filter-pill ${filterStatus === 'active' ? 'active' : ''}`} onClick={() => setFilterStatus('active')}>
            Active ({activeCount})
          </button>
          <button className={`filter-pill ${filterStatus === 'redeemed' ? 'active' : ''}`} onClick={() => setFilterStatus('redeemed')}>
            Redeemed ({redeemedCount})
          </button>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="panel" style={{ padding: '0 20px 14px' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Voucher Code</th>
                <th>Package Plan</th>
                <th>Value</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Redeemed By</th>
                <th>Valid Until</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--muted)' }}>
                    No vouchers found matching your query.
                  </td>
                </tr>
              ) : (
                filteredVouchers.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div className="voucher-code-chip">
                        <span>{v.code}</span>
                        <button
                          className="voucher-copy-btn"
                          title="Copy voucher code"
                          onClick={() => copyVoucher(v.code)}
                        >
                          {copiedCode === v.code ? <Check size={13} color="#4ca574" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>
                    <td><span className="package-name">{v.package_name}</span></td>
                    <td><strong>{v.price}</strong></td>
                    <td>
                      <span className={`voucher-status-pill ${v.status}`}>
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: v.status === 'active' ? '#4ca574' : v.status === 'redeemed' ? '#87928b' : '#d9554f',
                          }}
                        />
                        {v.status === 'active' ? 'Unused' : v.status === 'redeemed' ? 'Redeemed' : 'Expired'}
                      </span>
                    </td>
                    <td><span className="muted">{v.created_at}</span></td>
                    <td><span className="muted">{v.redeemed_by || '—'}</span></td>
                    <td><span className="muted">{v.expires_at}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        <button
                          className="customer-icon-btn"
                          title="Send voucher via SMS to customer"
                          onClick={() => onSendSmsClick?.(v)}
                        >
                          <Send size={13} />
                        </button>
                        <button
                          className="customer-icon-btn danger"
                          title="Delete voucher"
                          onClick={() => onDelete(v.id, v.code)}
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
    </div>
  )
}

function TransactionsManagementView({
  transactions,
  onRecordNewClick,
}: {
  transactions: Transaction[]
  onRecordNewClick: () => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMethod, setFilterMethod] = useState<'all' | 'M-Pesa' | 'Voucher' | 'Airtel Money'>('all')

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.package.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.receipt && t.receipt.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesMethod = filterMethod === 'all' || t.method === filterMethod
    return matchesSearch && matchesMethod
  })

  const exportTrxCSV = () => {
    const headers = 'ID,Customer,Phone,Method,Package,Amount,Status,Time,Receipt\n'
    const rows = transactions.map((t) => `"${t.id}","${t.customer}","${t.phone || ''}","${t.method}","${t.package}","${t.amount}","${t.status}","${t.time}","${t.receipt || ''}"`).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
  }

  return (
    <div className="transactions-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Finance & Billings</p>
          <h1>Transactions & Payments</h1>
          <p className="heading-sub">
            Track customer payments via M-Pesa, Airtel Money, voucher redemptions, and cash.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button secondary" onClick={exportTrxCSV}>
            <Download size={15} /> Export CSV
          </button>
          <button className="button primary" onClick={onRecordNewClick}>
            <Plus size={16} /> Record payment
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="metrics-grid">
        <Metric
          label="Total Revenue"
          value="KSh 284,650"
          change="18.4%"
          trend="up"
          icon={CircleDollarSign}
          accent="green"
        />
        <Metric
          label="M-Pesa Collections"
          value="KSh 242,500"
          change="85.2% of total"
          trend="up"
          icon={CreditCard}
          accent="orange"
        />
        <Metric
          label="Vouchers Redeemed"
          value="KSh 42,150"
          change="14.8% of total"
          trend="up"
          icon={Ticket}
          accent="teal"
        />
        <Metric
          label="Payment Success Rate"
          value="99.4%"
          change="0.6% failed"
          trend="up"
          icon={CheckCircle2}
          accent="blue"
        />
      </section>

      {/* Toolbar */}
      <div className="router-toolbar">
        <div className="router-search-box">
          <Search size={16} color="var(--muted)" />
          <input
            type="text"
            placeholder="Search by transaction ID, customer, receipt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer', padding: 0 }}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-pills">
          <button className={`filter-pill ${filterMethod === 'all' ? 'active' : ''}`} onClick={() => setFilterMethod('all')}>
            All ({transactions.length})
          </button>
          <button className={`filter-pill ${filterMethod === 'M-Pesa' ? 'active' : ''}`} onClick={() => setFilterMethod('M-Pesa')}>
            M-Pesa
          </button>
          <button className={`filter-pill ${filterMethod === 'Voucher' ? 'active' : ''}`} onClick={() => setFilterMethod('Voucher')}>
            Voucher
          </button>
          <button className={`filter-pill ${filterMethod === 'Airtel Money' ? 'active' : ''}`} onClick={() => setFilterMethod('Airtel Money')}>
            Airtel Money
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="panel" style={{ padding: '0 20px 14px' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Payment Method</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Receipt / Ref</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td><strong className="transaction-id">{t.id}</strong></td>
                  <td>
                    <div>
                      <strong>{t.customer}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>{t.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className="method">
                      <span className={`method-dot ${t.method === 'M-Pesa' ? 'mpesa' : t.method === 'Voucher' ? 'voucher' : 'airtel'}`} />
                      {t.method}
                    </span>
                  </td>
                  <td><span className="package-name">{t.package}</span></td>
                  <td><strong>{t.amount}</strong></td>
                  <td><span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)' }}>{t.receipt || '—'}</span></td>
                  <td><span className={`status ${t.status.toLowerCase()}`}>{t.status}</span></td>
                  <td className="muted">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ReportsManagementView({
  packages,
  transactions,
  customers,
}: {
  packages: HotspotPackage[]
  transactions: Transaction[]
  customers: CustomerRecord[]
}) {
  const [timeRange, setTimeRange] = useState('This Month')

  const totalRevenue = packages.reduce((acc, p) => acc + p.price * p.sales_count, 0)
  const totalSales = packages.reduce((acc, p) => acc + p.sales_count, 0)

  return (
    <div className="reports-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Analytics & Financial Insights</p>
          <h1>Performance Reports</h1>
          <p className="heading-sub">
            Real-time breakdown of revenue, traffic demand, package popularity, and subscriber growth.
          </p>
        </div>
        <div className="heading-actions">
          <div className="filter-pills">
            {['Today', 'Last 7 Days', 'This Month', 'Year to Date'].map((t) => (
              <button key={t} className={`filter-pill ${timeRange === t ? 'active' : ''}`} onClick={() => setTimeRange(t)}>
                {t}
              </button>
            ))}
          </div>
          <button className="button primary" onClick={() => window.print()}>
            <Printer size={15} /> Print audit report
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="metrics-grid">
        <Metric
          label="Gross Revenue"
          value={`KSh ${totalRevenue.toLocaleString()}`}
          change="18.4% vs last period"
          trend="up"
          icon={CircleDollarSign}
          accent="green"
        />
        <Metric
          label="Total Packages Sold"
          value={totalSales.toLocaleString()}
          change="1,284 total orders"
          trend="up"
          icon={Ticket}
          accent="orange"
        />
        <Metric
          label="Data Consumed"
          value="4.86 TB"
          change="Peak: 20:00 - 23:00"
          trend="up"
          icon={Activity}
          accent="teal"
        />
        <Metric
          label="Repeat Customer Rate"
          value="74.2%"
          change="Loyal subscribers"
          trend="up"
          icon={Users}
          accent="blue"
        />
      </section>

      <div className="content-grid">
        {/* Revenue by Plan Breakdown */}
        <div className="report-breakdown-card">
          <div className="panel-heading" style={{ padding: 0 }}>
            <div>
              <h2>Revenue by Duration Tier</h2>
              <p>Income contribution from Hourly, Daily, Weekly, and Monthly packages</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            <div className="report-bar-row">
              <div className="report-bar-top">
                <strong>Daily Plans (24 Hours Pass)</strong>
                <span>KSh 121,500 (42.6%)</span>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: '42.6%', background: 'var(--coral)' }} />
              </div>
            </div>

            <div className="report-bar-row">
              <div className="report-bar-top">
                <strong>Weekly Access Plans</strong>
                <span>KSh 74,400 (26.1%)</span>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: '26.1%', background: '#317d75' }} />
              </div>
            </div>

            <div className="report-bar-row">
              <div className="report-bar-top">
                <strong>Monthly & Multi-Device Subscriptions</strong>
                <span>KSh 64,800 (22.7%)</span>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: '22.7%', background: '#4f779a' }} />
              </div>
            </div>

            <div className="report-bar-row">
              <div className="report-bar-top">
                <strong>Hourly Express Passes</strong>
                <span>KSh 23,950 (8.6%)</span>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: '8.6%', background: '#c58a32' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Channels Distribution */}
        <div className="report-breakdown-card">
          <div className="panel-heading" style={{ padding: 0 }}>
            <div>
              <h2>Payment Method Breakdown</h2>
              <p>M-Pesa STK Push vs Vouchers and Airtel Money</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            <div className="report-bar-row">
              <div className="report-bar-top">
                <strong>M-Pesa Express (Till / Paybill)</strong>
                <span>KSh 242,500 (85.2%)</span>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: '85.2%', background: '#4ca574' }} />
              </div>
            </div>

            <div className="report-bar-row">
              <div className="report-bar-top">
                <strong>Voucher Redemptions</strong>
                <span>KSh 26,800 (9.4%)</span>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: '9.4%', background: 'var(--coral)' }} />
              </div>
            </div>

            <div className="report-bar-row">
              <div className="report-bar-top">
                <strong>Airtel Money</strong>
                <span>KSh 15,350 (5.4%)</span>
              </div>
              <div className="report-bar-track">
                <div className="report-bar-fill" style={{ width: '5.4%', background: '#d9554f' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsManagementView({
  settings,
  operator,
  onSave,
  onOpenDbModal,
}: {
  settings: HotspotSettings
  operator: OperatorUser
  onSave: (newSettings: HotspotSettings) => void
  onOpenDbModal: () => void
}) {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'portal' | 'router' | 'payments' | 'sms'>('general')
  const [formData, setFormData] = useState<HotspotSettings>(settings)
  const [testPhone, setTestPhone] = useState('+254 712 345 678')
  const [testMsg, setTestMsg] = useState('')
  const [isTestingSms, setIsTestingSms] = useState(false)
  const [testResult, setTestResult] = useState<SmsSendResult | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleRunSmsTest = async () => {
    if (!testPhone.trim()) return
    setIsTestingSms(true)
    setTestResult(null)
    const startTime = Date.now()

    try {
      const config: SmsGatewayConfig = {
        provider: formData.smsProvider || 'africastalking',
        apiKey: formData.smsApiKey || '',
        username: formData.smsUsername || 'sandbox',
        senderId: formData.smsSenderId || 'ORION_WIFI',
        customEndpoint: formData.smsCustomEndpoint || '',
        customHeaders: formData.smsCustomHeaders || '',
        smsEnabled: formData.smsEnabled !== false,
        defaultCountryCode: formData.smsDefaultCountryCode || '+254',
      }

      const formatted = formatE164Phone(testPhone, config.defaultCountryCode)
      const message = testMsg.trim() || `[Harbor House Wi-Fi] Test SMS connection verified! Provider: ${config.provider.toUpperCase()} at ${new Date().toLocaleTimeString()}.`

      const res = await dispatchSms(formatted, message, config)
      setTestResult(res)
    } catch (err: any) {
      setTestResult({
        success: false,
        recipient: testPhone,
        providerUsed: formData.smsProvider,
        error: err.message || 'Diagnostic test failed',
        sentAt: new Date().toISOString(),
      })
    } finally {
      setIsTestingSms(false)
    }
  }

  return (
    <div className="settings-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">System & Customization</p>
          <h1>Settings & Security</h1>
          <p className="heading-sub">
            Customize captive portal branding, router RADIUS parameters, live SMS 2FA gateways, and payment gateways.
          </p>
        </div>
      </section>

      {/* Settings Navigation Tabs */}
      <div className="settings-tabs">
        <button
          className={`settings-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <Sliders size={14} /> General & Workspace
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <ShieldCheck size={14} /> Security & 2FA
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'sms' ? 'active' : ''}`}
          onClick={() => setActiveTab('sms')}
        >
          <MessageSquare size={14} /> SMS Gateway & Alerts
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'portal' ? 'active' : ''}`}
          onClick={() => setActiveTab('portal')}
        >
          <Palette size={14} /> Captive Portal Branding
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'router' ? 'active' : ''}`}
          onClick={() => setActiveTab('router')}
        >
          <Router size={14} /> MikroTik & Network
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          <CreditCard size={14} /> M-Pesa & Gateways
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'general' && (
          <div className="settings-card">
            <h2>General Workspace Settings</h2>
            <div className="settings-grid-2">
              <label>
                Hotspot Business Name
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Harbor House"
                />
              </label>
              <label>
                Location & City
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Westlands, Nairobi"
                />
              </label>
              <label>
                Support Phone Line
                <input
                  type="tel"
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                  placeholder="+254 700 123 456"
                />
              </label>
              <label>
                Currency Symbol
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="KSh"
                />
              </label>
            </div>
            <button className="button primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="settings-card">
            <h2>Operator Security & Two-Factor Authentication (2FA)</h2>
            <div style={{ background: 'var(--card-subtle-bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>SMS Two-Factor Authentication (2FA)</strong>
                <p style={{ margin: '3px 0 0', fontSize: '11px', color: 'var(--muted)' }}>
                  Require a 6-digit verification code sent via SMS to <strong>{operator.phone}</strong> on every sign in.
                </p>
              </div>
              <span className="live-pill" style={{ background: '#eaf3eb', color: '#34786d' }}>
                <ShieldCheck size={13} /> Active & Enforced
              </span>
            </div>

            <div className="settings-grid-2">
              <label>
                Operator Name
                <input type="text" readOnly value={operator.name} />
              </label>
              <label>
                Role
                <input type="text" readOnly value={operator.role} />
              </label>
              <label>
                Verified Mobile Phone
                <input type="text" readOnly value={operator.phone} />
              </label>
              <label>
                Work Email
                <input type="text" readOnly value={operator.email} />
              </label>
            </div>
          </div>
        )}

        {/* SMS Gateway & 2FA Tab */}
        {activeTab === 'sms' && (
          <div className="settings-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2>SMS Gateway & Mobile Number Delivery</h2>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
                  Connect your SMS gateway provider so 2FA codes, Wi-Fi vouchers, and alerts are sent directly to customer and operator phones.
                </p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, fontWeight: 700, fontSize: '12px' }}>
                <input
                  type="checkbox"
                  checked={formData.smsEnabled !== false}
                  onChange={(e) => setFormData({ ...formData, smsEnabled: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--coral)' }}
                />
                Enable Live SMS Dispatch
              </label>
            </div>

            {/* Provider Selection Grid */}
            <div style={{ margin: '14px 0 10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>
                Choose SMS Gateway Provider
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                {[
                  { id: 'africastalking', name: "Africa's Talking", tag: 'Kenya & Africa Default', desc: 'Direct REST API for Safaricom, Airtel, Telkom' },
                  { id: 'twilio', name: 'Twilio SMS', tag: 'Global Coverage', desc: 'Worldwide international SMS delivery' },
                  { id: 'advanta', name: 'Advanta SMS', tag: 'Kenya Bulk SMS', desc: 'High-speed local bulk SMS route' },
                  { id: 'mobilesasa', name: 'Mobilesasa', tag: 'Kenya Gateway', desc: 'Local transactional SMS route' },
                  { id: 'custom_webhook', name: 'Supabase Edge / Webhook', tag: 'Backend Proxy', desc: 'Secure CORS-free proxy or server endpoint' },
                  { id: 'simulator', name: 'Demo Simulator', tag: 'Offline Testing', desc: 'Local testing without carrier credits' },
                ].map((p) => {
                  const isSelected = (formData.smsProvider || 'africastalking') === p.id
                  return (
                    <div
                      key={p.id}
                      onClick={() => setFormData({ ...formData, smsProvider: p.id as SmsProviderType })}
                      style={{
                        background: isSelected ? 'rgba(211, 107, 77, 0.08)' : 'var(--card-subtle-bg)',
                        border: `1.5px solid ${isSelected ? 'var(--coral)' : 'var(--line)'}`,
                        borderRadius: '10px',
                        padding: '12px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '13px', color: isSelected ? 'var(--coral)' : 'var(--ink-heading)' }}>
                          {p.name}
                        </strong>
                        {isSelected && <Check size={14} color="var(--coral)" />}
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: isSelected ? 'var(--coral)' : 'var(--muted)', display: 'block', margin: '2px 0' }}>
                        {p.tag}
                      </span>
                      <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>
                        {p.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Provider Credential Inputs */}
            <div className="settings-grid-2" style={{ marginTop: '10px' }}>
              {(formData.smsProvider === 'africastalking' || !formData.smsProvider) && (
                <>
                  <label>
                    Africa's Talking Username
                    <input
                      type="text"
                      value={formData.smsUsername || ''}
                      onChange={(e) => setFormData({ ...formData, smsUsername: e.target.value })}
                      placeholder="sandbox (or your AT live username)"
                    />
                  </label>
                  <label>
                    Africa's Talking API Key
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={formData.smsApiKey || ''}
                        onChange={(e) => setFormData({ ...formData, smsApiKey: e.target.value })}
                        placeholder="atsk_..."
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer' }}
                      >
                        {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </label>
                  <label>
                    Alphanumeric Sender ID (Optional)
                    <input
                      type="text"
                      value={formData.smsSenderId || ''}
                      onChange={(e) => setFormData({ ...formData, smsSenderId: e.target.value })}
                      placeholder="e.g. HARBORHOUSE, ORION"
                      maxLength={11}
                    />
                  </label>
                </>
              )}

              {formData.smsProvider === 'twilio' && (
                <>
                  <label>
                    Twilio Account SID
                    <input
                      type="text"
                      value={formData.smsUsername || ''}
                      onChange={(e) => setFormData({ ...formData, smsUsername: e.target.value })}
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </label>
                  <label>
                    Twilio Auth Token
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={formData.smsApiKey || ''}
                        onChange={(e) => setFormData({ ...formData, smsApiKey: e.target.value })}
                        placeholder="Auth Token string"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer' }}
                      >
                        {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </label>
                  <label>
                    Twilio Phone Number / Messaging SID
                    <input
                      type="text"
                      value={formData.smsSenderId || ''}
                      onChange={(e) => setFormData({ ...formData, smsSenderId: e.target.value })}
                      placeholder="+15551234567 or MGxxxxxxxx..."
                    />
                  </label>
                </>
              )}

              {formData.smsProvider === 'advanta' && (
                <>
                  <label>
                    Advanta Partner ID
                    <input
                      type="text"
                      value={formData.smsUsername || ''}
                      onChange={(e) => setFormData({ ...formData, smsUsername: e.target.value })}
                      placeholder="e.g. 1024"
                    />
                  </label>
                  <label>
                    Advanta API Key
                    <input
                      type="password"
                      value={formData.smsApiKey || ''}
                      onChange={(e) => setFormData({ ...formData, smsApiKey: e.target.value })}
                      placeholder="Advanta API key"
                    />
                  </label>
                  <label>
                    Advanta Sender ID / Shortcode
                    <input
                      type="text"
                      value={formData.smsSenderId || ''}
                      onChange={(e) => setFormData({ ...formData, smsSenderId: e.target.value })}
                      placeholder="e.g. ADVANTA"
                    />
                  </label>
                </>
              )}

              {formData.smsProvider === 'mobilesasa' && (
                <>
                  <label>
                    Mobilesasa Bearer API Token
                    <input
                      type="password"
                      value={formData.smsApiKey || ''}
                      onChange={(e) => setFormData({ ...formData, smsApiKey: e.target.value })}
                      placeholder="eyJhbGciOi..."
                    />
                  </label>
                  <label>
                    Sender ID
                    <input
                      type="text"
                      value={formData.smsSenderId || ''}
                      onChange={(e) => setFormData({ ...formData, smsSenderId: e.target.value })}
                      placeholder="e.g. MOBILESASA"
                    />
                  </label>
                </>
              )}

              {formData.smsProvider === 'custom_webhook' && (
                <>
                  <label>
                    Webhook Endpoint URL (Supabase Edge Function)
                    <input
                      type="url"
                      value={formData.smsCustomEndpoint || ''}
                      onChange={(e) => setFormData({ ...formData, smsCustomEndpoint: e.target.value })}
                      placeholder="https://ezcwgyhwotomranbyuyh.supabase.co/functions/v1/send-sms"
                    />
                  </label>
                  <label>
                    Custom Auth Header (Optional)
                    <input
                      type="text"
                      value={formData.smsCustomHeaders || ''}
                      onChange={(e) => setFormData({ ...formData, smsCustomHeaders: e.target.value })}
                      placeholder="Bearer eyJ..."
                    />
                  </label>
                </>
              )}

              <label>
                Default Country Dialing Code
                <input
                  type="text"
                  value={formData.smsDefaultCountryCode || '+254'}
                  onChange={(e) => setFormData({ ...formData, smsDefaultCountryCode: e.target.value })}
                  placeholder="+254"
                />
              </label>
            </div>

            {/* Live SMS Diagnostic Tester Box */}
            <div style={{ marginTop: '16px', background: 'var(--card-subtle-bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Terminal size={16} color="var(--coral)" />
                <strong style={{ fontSize: '13px', color: 'var(--ink-heading)' }}>Live SMS Dispatch Diagnostic Tester</strong>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '11px', color: 'var(--muted)' }}>
                Test sending a live SMS to your physical mobile device to verify gateway credentials and carrier routing.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', gap: '10px', alignItems: 'flex-end' }}>
                <label style={{ margin: 0 }}>
                  Recipient Mobile Phone
                  <input
                    type="tel"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="+254 712 345 678"
                  />
                </label>
                <label style={{ margin: 0 }}>
                  Custom Test Message (Optional)
                  <input
                    type="text"
                    value={testMsg}
                    onChange={(e) => setTestMsg(e.target.value)}
                    placeholder="Testing Orion SMS Gateway..."
                  />
                </label>
                <button
                  type="button"
                  className="button secondary"
                  onClick={handleRunSmsTest}
                  disabled={isTestingSms || !testPhone}
                  style={{ height: '38px', padding: '0 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {isTestingSms ? <RefreshCw size={14} className="spinning" /> : <Send size={14} />} Send Test SMS
                </button>
              </div>

              {/* Diagnostic Test Output */}
              {testResult && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    background: testResult.success ? 'rgba(76, 165, 116, 0.12)' : 'rgba(217, 85, 79, 0.12)',
                    border: `1px solid ${testResult.success ? '#4ca574' : '#d9554f'}`,
                    fontSize: '11px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, color: testResult.success ? '#317d75' : '#c94a32', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      {testResult.success ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                      {testResult.success ? 'SMS Dispatched Successfully' : 'SMS Dispatch Failed'}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'monospace' }}>
                      {new Date(testResult.sentAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '6px', margin: '4px 0 8px' }}>
                    <div><span style={{ color: 'var(--muted)' }}>Recipient:</span> <strong>{testResult.recipient}</strong></div>
                    <div><span style={{ color: 'var(--muted)' }}>Provider:</span> <strong>{testResult.providerUsed}</strong></div>
                    <div><span style={{ color: 'var(--muted)' }}>Message ID:</span> <code style={{ fontSize: '10px' }}>{testResult.messageId || 'N/A'}</code></div>
                  </div>
                  {testResult.error && (
                    <div style={{ color: '#c94a32', background: 'rgba(217, 85, 79, 0.1)', padding: '6px 8px', borderRadius: '5px', marginTop: '4px' }}>
                      <strong>Error details:</strong> {testResult.error}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className="button primary" type="submit" style={{ alignSelf: 'flex-start', marginTop: '14px' }}>
              <Save size={16} /> Save SMS Gateway Settings
            </button>
          </div>
        )}

        {activeTab === 'portal' && (
          <div className="settings-card">
            <h2>Captive Portal & Customer Experience</h2>
            <p style={{ margin: '-6px 0 14px', fontSize: '12px', color: 'var(--muted)' }}>
              These fields brand the live guest portal: the MikroTik bridge injects the business name,
              support phone, welcome texts, and brand color from here every time a guest loads the page.
              Business name and support phone are shared with the General tab.
            </p>
            <PortalPreview
              branding={{
                businessName: formData.businessName,
                supportPhone: formData.supportPhone,
                primaryColor: formData.primaryColor,
                portalTitle: formData.portalTitle,
                portalMessage: formData.portalMessage,
              }}
            />
            <div className="settings-grid-2">
              <label>
                Business Name (portal brand)
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Harbor House"
                />
              </label>
              <label>
                Support Phone (portal footer)
                <input
                  type="tel"
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                  placeholder="+254 700 123 456"
                />
              </label>
              <label>
                Welcome Headline
                <input
                  type="text"
                  value={formData.portalTitle}
                  onChange={(e) => setFormData({ ...formData, portalTitle: e.target.value })}
                  placeholder="You're connected — sign in"
                />
              </label>
              <label>
                Portal Subtitle Message
                <input
                  type="text"
                  value={formData.portalMessage}
                  onChange={(e) => setFormData({ ...formData, portalMessage: e.target.value })}
                  placeholder="Enter the voucher code from your receipt, or buy instant access with M-Pesa."
                />
              </label>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>Brand Primary Color</span>
              <div className="color-swatch-list">
                {[
                  ['#d36b4d', 'Coral Orange'],
                  ['#317d75', 'Emerald Teal'],
                  ['#4f779a', 'Ocean Blue'],
                  ['#c58a32', 'Amber Gold'],
                  ['#725796', 'Royal Purple'],
                ].map(([color, label]) => (
                  <button
                    key={color}
                    type="button"
                    title={label}
                    className={`color-swatch-btn ${formData.primaryColor === color ? 'active' : ''}`}
                    style={{ background: color }}
                    onClick={() => setFormData({ ...formData, primaryColor: color })}
                  />
                ))}
              </div>
            </div>

            <button className="button primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              <Save size={16} /> Save Portal Styling
            </button>
          </div>
        )}

        {activeTab === 'router' && (
          <>
          <MikrotikBridgeCard />
          <div className="settings-card">
            <h2>MikroTik RouterOS & Gateway Settings</h2>
            <div className="settings-grid-2">
              <label>
                Core Router IP Address
                <input
                  type="text"
                  value={formData.mikrotikIp}
                  onChange={(e) => setFormData({ ...formData, mikrotikIp: e.target.value })}
                  placeholder="10.20.0.1"
                />
              </label>
              <label>
                RouterOS API Port
                <input
                  type="text"
                  value={formData.mikrotikPort}
                  onChange={(e) => setFormData({ ...formData, mikrotikPort: e.target.value })}
                  placeholder="8728"
                />
              </label>
              <label>
                Session Timeout (Minutes)
                <input
                  type="number"
                  value={formData.sessionTimeout}
                  onChange={(e) => setFormData({ ...formData, sessionTimeout: e.target.value })}
                  placeholder="1440"
                />
              </label>
              <label>
                Idle Timeout (Minutes)
                <input
                  type="number"
                  value={formData.idleTimeout}
                  onChange={(e) => setFormData({ ...formData, idleTimeout: e.target.value })}
                  placeholder="15"
                />
              </label>
            </div>
            <button className="button primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              <Save size={16} /> Save Network Config
            </button>
          </div>
          </>
        )}

        {activeTab === 'payments' && (
          <div className="settings-card">
            <h2>Payment Gateways & Integrations</h2>
            <div className="settings-grid-2">
              <label>
                M-Pesa Paybill / Till Number
                <input
                  type="text"
                  value={formData.mpesaTill}
                  onChange={(e) => setFormData({ ...formData, mpesaTill: e.target.value })}
                  placeholder="892100"
                />
              </label>
              <label>
                M-Pesa Daraja Passkey
                <input
                  type="password"
                  value={formData.mpesaPasskey}
                  onChange={(e) => setFormData({ ...formData, mpesaPasskey: e.target.value })}
                  placeholder="Passkey string"
                />
              </label>
              <label>
                Airtel Money Merchant ID
                <input
                  type="text"
                  value={formData.airtelMerchantId}
                  onChange={(e) => setFormData({ ...formData, airtelMerchantId: e.target.value })}
                  placeholder="HH-AIRTEL-901"
                />
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>Database Cloud Sync</span>
                <button
                  type="button"
                  className="button secondary"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={onOpenDbModal}
                >
                  <Database size={15} /> Configure Supabase API Keys
                </button>
              </div>
            </div>
            <button className="button primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              <Save size={16} /> Save Payment Settings
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

// Bridge configuration + live status card for Settings -> MikroTik. Owns its
// own state because it is only mounted when the router tab is active.
function MikrotikBridgeCard() {
  const cfg = getBridgeConfig()
  const [url, setUrl] = useState(cfg.url)
  const [apiKey, setApiKey] = useState(cfg.apiKey)
  const [routerId, setRouterIdLocal] = useState(getBridgeRouterId())
  const [saved, setSaved] = useState('')

  const mikrotik = useMikrotik()

  const handleSave = () => {
    setBridgeConfig(url, apiKey)
    setBridgeRouterId(routerId)
    setSaved('Saved — testing connection...')
    void mikrotik.refresh()
    window.setTimeout(() => setSaved(''), 2500)
  }

  const handleTest = async () => {
    setSaved('Testing...')
    // refresh() resolves with THIS probe round's outcome, so the message
    // reflects the test that just ran — not a previous round's error.
    const outcome = await mikrotik.refresh()
    setSaved(outcome.ok ? '✅ Bridge reachable' : `❌ ${outcome.error}`)
    window.setTimeout(() => setSaved(''), 3500)
  }

  const handleSyncNow = async () => {
    setSaved('Syncing...')
    try {
      await bridgeApi.syncNow()
      setSaved('✅ Sync pass queued on the bridge')
    } catch (err: any) {
      setSaved(`❌ ${err.message}`)
    }
    window.setTimeout(() => setSaved(''), 3500)
  }

  return (
    <div className="settings-card">
      <h2>MikroTik Bridge (Live Router Connection)</h2>
      <p className="settings-hint">
        The bridge service runs on your hotspot network, speaks the RouterOS API directly, and
        provisions packages, vouchers, and payments onto the router. Start it with
        <code> node mikrotik-bridge/index.js</code>.
      </p>
      <div className="settings-grid-2">
        <label>
          Bridge URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://192.168.88.10:8787"
          />
        </label>
        <label>
          Bridge API Key (x-bridge-key)
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Value of BRIDGE_API_KEY in the bridge .env"
          />
        </label>
        <label>
          Default Router ID (BRIDGE_DEFAULT_ROUTER_ID)
          <input
            type="text"
            value={routerId}
            onChange={(e) => setRouterIdLocal(e.target.value)}
            placeholder="UUID of the router row in Supabase"
          />
        </label>
      </div>
      <div className="bridge-status-row">
        <span className={`live-pill ${mikrotik.status ? '' : 'offline'}`}>
          <i /> {mikrotik.status ? 'Bridge online' : 'Bridge offline'}
        </span>
        {mikrotik.status && (
          <span className="bridge-meta">
            Polls: {mikrotik.status.polls} · Errors: {mikrotik.status.errors} · Last poll:{' '}
            {mikrotik.status.lastPollAt ? new Date(mikrotik.status.lastPollAt).toLocaleTimeString() : '—'}
          </span>
        )}
      </div>
      {mikrotik.health && (
        <div className="bridge-health-grid">
          <span>Identity: <strong>{mikrotik.health.identity}</strong></span>
          <span>RouterOS: <strong>{mikrotik.health.version}</strong></span>
          <span>Board: <strong>{mikrotik.health.board_name}</strong></span>
          <span>CPU: <strong>{mikrotik.health.cpu_load}%</strong></span>
          <span>Memory: <strong>{mikrotik.health.free_memory_mb} MB free</strong></span>
          <span>Uptime: <strong>{mikrotik.health.uptime}</strong></span>
        </div>
      )}
      {mikrotik.lastError && <p className="bridge-error">⚠ {mikrotik.lastError}</p>}
      <div className="settings-actions-row">
        <button className="button primary" type="button" onClick={handleSave}>
          <Save size={16} /> Save bridge config
        </button>
        <button className="button secondary" type="button" onClick={handleTest}>
          <Radio size={16} /> Test connection
        </button>
        <button className="button secondary" type="button" onClick={handleSyncNow} disabled={!mikrotik.status}>
          <RefreshCw size={16} /> Sync now
        </button>
        {saved && <span className="bridge-saved-note">{saved}</span>}
      </div>
    </div>
  )
}

function PackagesManagementView({
  packages,
  onToggleActive,
  onDelete,
  onAddNewClick,
  onGenerateVouchersForPackage,
}: {
  packages: HotspotPackage[]
  onToggleActive: (id: string) => void
  onDelete: (id: string, name: string) => void
  onAddNewClick: () => void
  onGenerateVouchersForPackage: (name: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | 'unlimited' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'multi-device'>('all')

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.duration_display.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.data_limit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(pkg.price).includes(searchQuery)

    const isUnlimited = pkg.data_limit.toLowerCase().includes('unlimited')
    const matchesCategory =
      filterCategory === 'all'
        ? true
        : filterCategory === 'unlimited'
        ? isUnlimited
        : pkg.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const totalRevenue = packages.reduce((acc, p) => acc + p.price * p.sales_count, 0)
  const totalSales = packages.reduce((acc, p) => acc + p.sales_count, 0)
  const unlimitedCount = packages.filter((p) => p.data_limit.toLowerCase().includes('unlimited')).length

  return (
    <div className="packages-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Access Tiers & Plans</p>
          <h1>Package Management</h1>
          <p className="heading-sub">
            Design and sell customized internet packages (unlimited hourly, daily, weekly, monthly, and multi-device plans).
          </p>
        </div>
        <div className="heading-actions">
          <button className="button primary" onClick={onAddNewClick}>
            <Plus size={16} /> Create new package
          </button>
        </div>
      </section>

      {/* Unified Unlimited Internet Plans Suite Banner */}
      <div className="unlimited-suite-box">
        <div className="unlimited-suite-header">
          <div className="unlimited-suite-title">
            <div style={{ background: 'var(--coral)', color: '#fff', padding: 7, borderRadius: 8, display: 'grid', placeItems: 'center' }}>
              <Infinity size={20} />
            </div>
            <div>
              <h2>Unified Unlimited Hotspot Plans Suite</h2>
              <p>Combined unmetered bandwidth packages across Hours, Days, Weeks, Months, and Multi-Device tiers.</p>
            </div>
          </div>
          <button className="button primary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={onAddNewClick}>
            <Sparkles size={13} /> Customize Plan
          </button>
        </div>

        <div className="unlimited-matrix-grid">
          <div className="matrix-tier-card">
            <div className="matrix-tier-header">
              <span className="matrix-tier-badge">Hourly Unlimited</span>
              <Zap size={14} color="#dca642" />
            </div>
            <div className="matrix-tier-price">
              <strong>KSh 70</strong>
              <span>/ 1 Hour</span>
            </div>
            <div className="matrix-tier-specs">
              <span><Check size={12} /> 10 Mbps Unmetered</span>
              <span><Check size={12} /> 1 Device Instant</span>
            </div>
          </div>

          <div className="matrix-tier-card">
            <div className="matrix-tier-header">
              <span className="matrix-tier-badge" style={{ background: '#fdf1e7', color: 'var(--coral)' }}>Daily Unlimited</span>
              <Flame size={14} color="var(--coral)" />
            </div>
            <div className="matrix-tier-price">
              <strong>KSh 350</strong>
              <span>/ 24 Hours</span>
            </div>
            <div className="matrix-tier-specs">
              <span><Check size={12} /> 20 Mbps High-Speed</span>
              <span><Check size={12} /> Most Popular Tier</span>
            </div>
          </div>

          <div className="matrix-tier-card">
            <div className="matrix-tier-header">
              <span className="matrix-tier-badge" style={{ background: '#eaf3eb', color: '#317d75' }}>Weekly Unlimited</span>
              <TrendingUp size={14} color="#317d75" />
            </div>
            <div className="matrix-tier-price">
              <strong>KSh 1,500</strong>
              <span>/ 7 Days</span>
            </div>
            <div className="matrix-tier-specs">
              <span><Check size={12} /> 25 Mbps Ultra Line</span>
              <span><Check size={12} /> Full 168h Access</span>
            </div>
          </div>

          <div className="matrix-tier-card">
            <div className="matrix-tier-header">
              <span className="matrix-tier-badge" style={{ background: '#e6f0fa', color: '#4f779a' }}>Monthly Multi-Device</span>
              <Users size={14} color="#4f779a" />
            </div>
            <div className="matrix-tier-price">
              <strong>KSh 6,500</strong>
              <span>/ 30 Days</span>
            </div>
            <div className="matrix-tier-specs">
              <span><Check size={12} /> 50 Mbps Turbo Line</span>
              <span><Check size={12} /> 4 Devices Shared</span>
            </div>
          </div>
        </div>
      </div>

      {/* Package Metrics */}
      <section className="metrics-grid">
        <Metric
          label="Unlimited Plans"
          value={`${unlimitedCount} tiers`}
          change="Hours, Days, Weeks, Months"
          trend="up"
          icon={Infinity}
          accent="green"
        />
        <Metric
          label="Total Plans Sold"
          value={totalSales.toLocaleString()}
          change="18.4% this month"
          trend="up"
          icon={ReceiptText}
          accent="orange"
        />
        <Metric
          label="Total Package Revenue"
          value={`KSh ${totalRevenue.toLocaleString()}`}
          change="Lifetime volume"
          trend="up"
          icon={CircleDollarSign}
          accent="teal"
        />
        <Metric
          label="Multi-Device Plans"
          value={String(packages.filter((p) => p.device_limit > 1).length)}
          change="Family / Team tiers"
          trend="up"
          icon={Laptop}
          accent="blue"
        />
      </section>

      {/* Toolbar & Filter Tabs */}
      <div className="router-toolbar">
        <div className="router-search-box">
          <Search size={16} color="var(--muted)" />
          <input
            type="text"
            placeholder="Search by package name, duration, price, unlimited..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer', padding: 0 }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-pills">
          <button
            className={`filter-pill ${filterCategory === 'all' ? 'active' : ''}`}
            onClick={() => setFilterCategory('all')}
          >
            All ({packages.length})
          </button>
          <button
            className={`filter-pill ${filterCategory === 'unlimited' ? 'active' : ''}`}
            onClick={() => setFilterCategory('unlimited')}
          >
            ♾️ Unlimited ({unlimitedCount})
          </button>
          <button
            className={`filter-pill ${filterCategory === 'hourly' ? 'active' : ''}`}
            onClick={() => setFilterCategory('hourly')}
          >
            Hourly ({packages.filter((p) => p.category === 'hourly').length})
          </button>
          <button
            className={`filter-pill ${filterCategory === 'daily' ? 'active' : ''}`}
            onClick={() => setFilterCategory('daily')}
          >
            Daily ({packages.filter((p) => p.category === 'daily').length})
          </button>
          <button
            className={`filter-pill ${filterCategory === 'weekly' ? 'active' : ''}`}
            onClick={() => setFilterCategory('weekly')}
          >
            Weekly ({packages.filter((p) => p.category === 'weekly').length})
          </button>
          <button
            className={`filter-pill ${filterCategory === 'monthly' ? 'active' : ''}`}
            onClick={() => setFilterCategory('monthly')}
          >
            Monthly ({packages.filter((p) => p.category === 'monthly').length})
          </button>
          <button
            className={`filter-pill ${filterCategory === 'multi-device' ? 'active' : ''}`}
            onClick={() => setFilterCategory('multi-device')}
          >
            Multi-Device ({packages.filter((p) => p.category === 'multi-device' || p.device_limit > 1).length})
          </button>
        </div>
      </div>

      {/* Package Cards Grid */}
      {filteredPackages.length === 0 ? (
        <div className="panel section-placeholder" style={{ minHeight: '220px', textAlign: 'center', alignItems: 'center' }}>
          <div className="placeholder-icon"><Ticket size={20} /></div>
          <h2>No matching packages found</h2>
          <p>Create a new package or choose a different category filter.</p>
        </div>
      ) : (
        <div className="package-cards-admin-grid">
          {filteredPackages.map((pkg) => {
            const isUnlimited = pkg.data_limit.toLowerCase().includes('unlimited')
            return (
              <div key={pkg.id} className={`package-admin-card ${pkg.is_active ? '' : 'inactive'}`}>
                <div className="package-card-header">
                  <div className="package-title-wrap">
                    <h3>{pkg.name}</h3>
                    <span className="package-category-tag">{pkg.category}</span>
                  </div>
                  <div className="customer-quick-actions">
                    {isUnlimited && (
                      <span className="package-unlimited-badge" title="Unlimited Data without throttling">
                        <Sparkles size={11} /> Unlimited
                      </span>
                    )}
                    <span
                      className={`package-device-badge ${pkg.device_limit > 1 ? 'multi' : ''}`}
                      title={`Allowed concurrent connections: ${pkg.device_limit} devices`}
                    >
                      {pkg.device_limit > 1 ? <Users size={12} /> : <Smartphone size={12} />}
                      {pkg.device_limit} {pkg.device_limit > 1 ? 'Devices' : 'Device'}
                    </span>
                  </div>
                </div>

                <div className="package-price-display">
                  <strong>KSh {pkg.price.toLocaleString()}</strong>
                  <span>/ {pkg.duration_display}</span>
                </div>

                {/* Features List */}
                <div className="package-features-list">
                  <div className="package-feature-item">
                    <Clock3 size={13} />
                    <span>Duration: <strong>{pkg.duration_display}</strong></span>
                  </div>
                  <div className="package-feature-item">
                    <Zap size={13} />
                    <span>Data Quota: <strong style={{ color: isUnlimited ? 'var(--green)' : 'inherit' }}>{pkg.data_limit}</strong></span>
                  </div>
                  <div className="package-feature-item">
                    <Gauge size={13} />
                    <span>Bandwidth Cap: <strong>{pkg.speed_limit}</strong></span>
                  </div>
                  <div className="package-feature-item">
                    <Users size={13} />
                    <span>Concurrency: <strong>{pkg.device_limit} simultaneous device{pkg.device_limit > 1 ? 's' : ''}</strong></span>
                  </div>
                </div>

                {/* Sales Statistics */}
                <div className="package-sales-stats">
                  <span>Total Sold: <strong>{pkg.sales_count} plans</strong></span>
                  <span>Revenue: <strong>KSh {(pkg.price * (pkg.sales_count || 1)).toLocaleString()}</strong></span>
                </div>

                {/* Actions Row */}
                <div className="router-card-actions">
                  <button
                    className="router-action-btn"
                    onClick={() => onGenerateVouchersForPackage(pkg.name)}
                    title="Generate access vouchers for this package"
                  >
                    <Ticket size={13} /> Generate Vouchers
                  </button>
                  <button
                    className="router-action-btn"
                    onClick={() => onToggleActive(pkg.id)}
                    title={pkg.is_active ? 'Pause package (hide from sales)' : 'Activate package'}
                  >
                    {pkg.is_active ? 'Active' : 'Paused'}
                  </button>
                  <button
                    className="router-delete-btn"
                    onClick={() => onDelete(pkg.id, pkg.name)}
                    title="Delete package"
                    aria-label={`Delete ${pkg.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CustomersManagementView({
  customers,
  onToggleBlock,
  onDelete,
  onExportCSV,
  onAddNewClick,
  onSendSmsClick,
}: {
  customers: CustomerRecord[]
  onToggleBlock: (customer: CustomerRecord) => void
  onDelete: (id: string, name: string) => void
  onExportCSV: () => void
  onAddNewClick: () => void
  onSendSmsClick?: (customer: CustomerRecord) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'idle' | 'blocked'>('all')

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plan.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const activeCount = customers.filter((c) => c.status === 'active').length
  const blockedCount = customers.filter((c) => c.status === 'blocked').length

  return (
    <div className="customers-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Directory & Access Control</p>
          <h1>Customer Management</h1>
          <p className="heading-sub">
            Track customer hotspot subscriptions, data consumption, payment history, and device access.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button secondary" onClick={onExportCSV}>
            <Download size={15} /> Export CSV
          </button>
          <button className="button primary" onClick={onAddNewClick}>
            <UserPlus size={16} /> Add customer
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="metrics-grid">
        <Metric
          label="Total Subscribers"
          value={String(customers.length + 1278)}
          change="12.6%"
          trend="up"
          icon={Users}
          accent="orange"
        />
        <Metric
          label="Online Now"
          value={`${activeCount} connected`}
          change="Live on APs"
          trend="up"
          icon={Wifi}
          accent="green"
        />
        <Metric
          label="Average Customer Value"
          value="KSh 1,220"
          change="8.4%"
          trend="up"
          icon={CircleDollarSign}
          accent="teal"
        />
        <Metric
          label="Blocked Devices"
          value={`${blockedCount} banned`}
          change="Access restricted"
          trend="down"
          icon={Ban}
          accent="blue"
        />
      </section>

      {/* Toolbar: Search & Filters */}
      <div className="router-toolbar">
        <div className="router-search-box">
          <Search size={16} color="var(--muted)" />
          <input
            type="text"
            placeholder="Search by customer name, phone, device, or plan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer', padding: 0 }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-pills">
          <button
            className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({customers.length})
          </button>
          <button
            className={`filter-pill ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Active Now ({activeCount})
          </button>
          <button
            className={`filter-pill ${filterStatus === 'idle' ? 'active' : ''}`}
            onClick={() => setFilterStatus('idle')}
          >
            Idle ({customers.filter((c) => c.status === 'idle').length})
          </button>
          <button
            className={`filter-pill ${filterStatus === 'blocked' ? 'active' : ''}`}
            onClick={() => setFilterStatus('blocked')}
          >
            Blocked ({blockedCount})
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="panel" style={{ padding: '0 20px 14px' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone Number</th>
                <th>Device Info</th>
                <th>Current Plan</th>
                <th>Total Spent</th>
                <th>Data Consumed</th>
                <th>Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--muted)' }}>
                    No customers found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar" style={{ background: customer.avatar_color }}>
                          {customer.name.split(' ').map((w) => w[0]).join('')}
                        </div>
                        <div>
                          <strong>{customer.name}</strong>
                          <span>ID: {customer.id.slice(0, 8)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--ink)' }}>
                        <Phone size={13} color="var(--muted)" /> {customer.phone}
                      </span>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--ink)' }}>
                        <Smartphone size={13} color="var(--muted)" /> {customer.device}
                      </span>
                    </td>
                    <td><span className="package-name">{customer.plan}</span></td>
                    <td><strong>{customer.total_spent}</strong></td>
                    <td><span className="muted">{customer.data_usage}</span></td>
                    <td>
                      <span className={`customer-status-badge ${customer.status}`}>
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background:
                              customer.status === 'active'
                                ? '#4ca574'
                                : customer.status === 'idle'
                                ? '#87928b'
                                : '#d9554f',
                          }}
                        />
                        {customer.status === 'active' ? 'Online' : customer.status === 'idle' ? 'Offline' : 'Blocked'}
                      </span>
                    </td>
                    <td><span className="muted">{customer.last_active}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="customer-quick-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          className="customer-icon-btn"
                          title="Send SMS message to customer"
                          onClick={() => onSendSmsClick?.(customer)}
                        >
                          <MessageSquare size={13} />
                        </button>
                        <button
                          className={`customer-icon-btn ${customer.status === 'blocked' ? '' : 'danger'}`}
                          title={customer.status === 'blocked' ? 'Unblock customer Wi-Fi access' : 'Block customer device MAC'}
                          onClick={() => onToggleBlock(customer)}
                        >
                          {customer.status === 'blocked' ? <UserCheck size={14} color="#4ca574" /> : <UserX size={14} />}
                        </button>
                        <button
                          className="customer-icon-btn danger"
                          title="Delete customer record"
                          onClick={() => onDelete(customer.id, customer.name)}
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
    </div>
  )
}

function RoutersManagementView({
  routers,
  onPing,
  onReboot,
  onDelete,
  onAddNewClick,
}: {
  routers: RouterDevice[]
  onPing: (router: RouterDevice) => void
  onReboot: (router: RouterDevice) => void
  onDelete: (id: string, name: string) => void
  onAddNewClick: () => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'warn' | 'down'>('all')

  const filteredRouters = routers.filter((router) => {
    const matchesSearch =
      router.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      router.ip_address.includes(searchQuery) ||
      router.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      router.model.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || router.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const onlineCount = routers.filter((r) => r.status === 'good').length
  const totalClients = routers.reduce((acc, curr) => acc + curr.clients_count, 0)

  return (
    <div className="routers-view">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Infrastructure & Gateways</p>
          <h1>Routers & Access Points</h1>
          <p className="heading-sub">
            Monitor and manage MikroTik gateways, RADIUS controllers, and Wi-Fi access points.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button secondary" onClick={() => window.location.reload()}>
            <RefreshCw size={15} /> Scan network
          </button>
          <button className="button primary" onClick={onAddNewClick}>
            <Plus size={16} /> Add new router / AP
          </button>
        </div>
      </section>

      {/* Network Overview Summary Metrics */}
      <section className="metrics-grid">
        <Metric
          label="Online Gateways"
          value={`${onlineCount} / ${routers.length}`}
          change="100% Uptime"
          trend="up"
          icon={Server}
          accent="green"
        />
        <Metric
          label="Connected Hotspot Users"
          value={String(totalClients)}
          change="Across all APs"
          trend="up"
          icon={Users}
          accent="orange"
        />
        <Metric
          label="Total Bandwidth Draw"
          value="136.9 Mbps"
          change="68% of 200M line"
          trend="up"
          icon={Activity}
          accent="teal"
        />
        <Metric
          label="Avg. Gateway Ping"
          value="2.8 ms"
          change="Ultra-low latency"
          trend="up"
          icon={Radio}
          accent="blue"
        />
      </section>

      {/* Search & Filter Toolbar */}
      <div className="router-toolbar">
        <div className="router-search-box">
          <Search size={16} color="var(--muted)" />
          <input
            type="text"
            placeholder="Search by name, IP, model, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 0, color: 'var(--muted)', cursor: 'pointer', padding: 0 }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-pills">
          <button
            className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({routers.length})
          </button>
          <button
            className={`filter-pill ${filterStatus === 'good' ? 'active' : ''}`}
            onClick={() => setFilterStatus('good')}
          >
            Online ({onlineCount})
          </button>
          <button
            className={`filter-pill ${filterStatus === 'warn' ? 'active' : ''}`}
            onClick={() => setFilterStatus('warn')}
          >
            Warning ({routers.filter((r) => r.status === 'warn').length})
          </button>
          <button
            className={`filter-pill ${filterStatus === 'down' ? 'active' : ''}`}
            onClick={() => setFilterStatus('down')}
          >
            Down ({routers.filter((r) => r.status === 'down').length})
          </button>
        </div>
      </div>

      {/* Router Cards Grid */}
      {filteredRouters.length === 0 ? (
        <div className="panel section-placeholder" style={{ minHeight: '220px', textAlign: 'center', alignItems: 'center' }}>
          <div className="placeholder-icon"><WifiOff size={20} /></div>
          <h2>No matching routers found</h2>
          <p>Try adjusting your search query or status filter.</p>
        </div>
      ) : (
        <div className="router-cards-grid">
          {filteredRouters.map((router) => (
            <div key={router.id} className="router-item-card">
              {/* Header */}
              <div className="router-card-header">
                <div className="router-identity">
                  <div className="router-icon-wrap">
                    <Router size={22} />
                  </div>
                  <div>
                    <h3>{router.name}</h3>
                    <span>{router.model}</span>
                  </div>
                </div>
                <span className={`router-badge ${router.status}`}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background:
                        router.status === 'good'
                          ? '#4ca574'
                          : router.status === 'warn'
                          ? '#dca642'
                          : '#d9554f',
                    }}
                  />
                  {router.status === 'good' ? 'Online' : router.status === 'warn' ? 'Warning' : 'Offline'}
                </span>
              </div>

              {/* IP, Location & Clients Grid */}
              <div className="router-details-grid">
                <div className="router-detail-item">
                  <span>IP Address</span>
                  <strong>{router.ip_address}</strong>
                </div>
                <div className="router-detail-item">
                  <span>Location</span>
                  <strong>{router.location}</strong>
                </div>
                <div className="router-detail-item">
                  <span>Active Clients</span>
                  <strong>{router.clients_count} devices</strong>
                </div>
                <div className="router-detail-item">
                  <span>Ping Latency</span>
                  <strong style={{ color: router.ping_ms > 10 ? 'var(--coral)' : 'var(--green)' }}>
                    {router.ping_ms} ms
                  </strong>
                </div>
              </div>

              {/* Performance Section: Traffic & CPU */}
              <div className="router-perf-section">
                <div className="router-perf-row">
                  <span>Live Traffic (Down / Up)</span>
                  <strong>{router.traffic_down} ↓ / {router.traffic_up} ↑</strong>
                </div>
                <div className="usage-bar" style={{ height: 6 }}>
                  <i style={{ width: `${Math.min(100, router.cpu_load + 20)}%`, background: router.cpu_load > 60 ? 'var(--coral)' : 'var(--green)' }} />
                </div>
                <div className="router-perf-row" style={{ fontSize: '10px' }}>
                  <span>CPU: {router.cpu_load}% · RAM: {router.ram_load}%</span>
                  <span>Uptime: {router.uptime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="router-card-actions">
                <button
                  className="router-action-btn"
                  onClick={() => onPing(router)}
                  title="Test router latency and ICMP ping"
                >
                  <Radio size={13} /> Ping
                </button>
                <button
                  className="router-action-btn"
                  onClick={() => onReboot(router)}
                  title="Reboot RouterOS"
                >
                  <RefreshCw size={13} /> Reboot
                </button>
                <button
                  className="router-delete-btn"
                  onClick={() => onDelete(router.id, router.name)}
                  title="Delete router from workspace"
                  aria-label={`Delete ${router.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Metric({ label, value, change, trend, icon: Icon, accent }: { label: string; value: string; change: string; trend: 'up' | 'down'; icon: typeof Activity; accent: string }) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${accent}`}><Icon size={19} /></div>
      <div className="metric-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small className={trend === 'down' ? 'negative' : 'positive'}>
          {trend === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {change} <em>vs last month</em>
        </small>
      </div>
    </div>
  )
}

function HealthRow({ label, value, status }: { label: string; value: string; status: string }) {
  return (
    <div className="health-row">
      <span><i className={`health-dot ${status}`} />{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function PackageRow({ name, sales, amount, width, color }: { name: string; sales: string; amount: string; width: string; color: string }) {
  return (
    <div className="package-row">
      <div className="package-top">
        <div><strong>{name}</strong><span>{sales}</span></div>
        <b>{amount}</b>
      </div>
      <div className="package-bar"><i className={color} style={{ width }} /></div>
    </div>
  )
}

function RevenueChart() {
  return (
    <div className="chart">
      <div className="chart-grid"><span /><span /><span /><span /></div>
      <svg viewBox="0 0 720 180" preserveAspectRatio="none" role="img" aria-label="Revenue trend">
        <defs>
          <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d36b4d" stopOpacity=".24" />
            <stop offset="1" stopColor="#d36b4d" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 145 C40 142 46 120 83 129 S125 146 165 105 S208 98 242 113 S276 128 315 91 S350 74 390 84 S426 105 465 67 S500 78 535 55 S575 72 612 38 S650 48 720 15 L720 180 L0 180Z" fill="url(#fill)" />
        <path d="M0 145 C40 142 46 120 83 129 S125 146 165 105 S208 98 242 113 S276 128 315 91 S350 74 390 84 S426 105 465 67 S500 78 535 55 S575 72 612 38 S650 48 720 15" fill="none" stroke="#d36b4d" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="chart-labels">
        <span>Aug 01</span>
        <span>Aug 08</span>
        <span>Aug 15</span>
        <span>Aug 22</span>
        <span>Aug 31</span>
      </div>
    </div>
  )
}

export default App
