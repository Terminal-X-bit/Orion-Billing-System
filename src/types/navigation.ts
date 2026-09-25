export type NavEntityId =
  // Dashboard
  | 'Dashboard'
  // Favorites
  | 'Activation History'
  | 'Bandwidth Plans'
  | 'Auto Notifications / Reminders'
  | 'Old Setup (No PPPoE)'
  | 'FUP'
  | 'Tutorials'
  | 'Setup'
  | 'Starlink/Internet Issues'
  | 'Registration Info'
  | 'PPPOE Plans'
  | 'Print Vouchers'
  | 'Expired Bindings'
  | 'Default MikroTik Page'
  | 'Provision'
  | 'Connected Without Internet'
  | 'TV Plans'
  | 'Add New User'
  | 'All Vouchers'
  | 'Users'
  | 'Routers'
  | 'Access APs'
  | 'Ip Address'
  | 'User\'s Location'
  // Customers
  | 'Customers:AddNew'
  | 'Customers:Users'
  | 'Customers:Location'
  // Leads
  | 'Leads'
  // Activation
  | 'Activation:Activate'
  | 'Activation:Prepaid'
  | 'Activation:Active'
  | 'Activation:Expired'
  | 'Activation:Online'
  | 'Activation:Offline'
  | 'Activation:Roaming'
  | 'Activation:FUP'
  | 'Activation:GracePeriod'
  // Standalone actions
  | 'Compensate'
  | 'Disable Hotspot Server'
  // Data Usage
  | 'DataUsage:Daily'
  | 'DataUsage:Weekly'
  | 'DataUsage:Monthly'
  // Hotspot Vouchers
  | 'Vouchers:All'
  | 'Vouchers:Add'
  | 'Vouchers:Print'
  | 'Vouchers:Unused'
  | 'Vouchers:Used'
  | 'Vouchers:Customers'
  | 'Vouchers:Agents'
  | 'Vouchers:AgentSales'
  // Hotspot Binding
  | 'Binding:All'
  | 'Binding:Active'
  | 'Binding:Expired'
  | 'Binding:Bind'
  | 'Binding:CreateSpeeds'
  | 'Binding:TroubleshootTV'
  // Packages/Plans
  | 'Plans:Hotspot'
  | 'Plans:PPPOE'
  | 'Plans:StaticIP'
  | 'Plans:Bandwidth'
  | 'Plans:AdvancedBandwidth'
  | 'Plans:QoS'
  | 'Plans:Trials'
  | 'Plans:FUP'
  | 'Plans:Schedule'
  | 'Plans:TV'
  // Transactions
  | 'Transactions:Daily'
  | 'Transactions:Period'
  | 'Transactions:ActivationHistory'
  | 'Transactions:Graphs'
  | 'Transactions:IncomeOverview'
  | 'Transactions:STKPush'
  // Support
  | 'Support Ticket'
  // Notifications
  | 'Notifications:Single'
  | 'Notifications:Bulk'
  | 'Notifications:PlanSpecific'
  | 'Notifications:RouterSpecific'
  | 'Notifications:Schedule'
  | 'Notifications:Groups'
  | 'Notifications:History'
  // Network
  | 'Network:SelfInstall'
  | 'Network:ReplaceRouter'
  | 'Network:Routers'
  | 'Network:IPPool'
  | 'Network:Backups'
  | 'Network:Wireless'
  | 'Network:Bridge'
  | 'Network:IPAddress'
  | 'Network:Files'
  | 'Network:Hotspot'
  // System / Manage
  | 'Reports'
  | 'Logs'
  | 'Recycle Bin'
  | 'Settings'

export type SidebarItem = {
  id: string
  label: string
  icon?: string
  badge?: string
  badgeColor?: string
  isStarred?: boolean
  onClickNav?: string
}

export type SidebarGroup = {
  id: string
  title: string
  icon: string
  badge?: string
  badgeColor?: string
  isAccordion: boolean
  defaultExpanded?: boolean
  items: SidebarItem[]
}

export const DEFAULT_FAVORITE_IDS: string[] = [
  'Activation History',
  'Bandwidth Plans',
  'Auto Notifications / Reminders',
  'Old Setup (No PPPoE)',
  'FUP',
  'Tutorials',
  'Setup',
  'Starlink/Internet Issues',
  'Registration Info',
  'PPPOE Plans',
  'Print Vouchers',
  'Expired Bindings',
  'Default MikroTik Page',
  'Provision',
  'Connected Without Internet',
  'TV Plans',
  'Add New User',
  'All Vouchers',
  'Users',
  'Routers',
  'Access APs',
  'Ip Address',
  'User\'s Location',
]
