export type AccessLevel = 'Free' | 'Premium'

export type Category = {
  id: string
  name: string
  subtitle: string
  cover: string
  icon: string
  accessLevel: AccessLevel
  totalDrills: number
}

export type Drill = {
  id: string
  name: string
  categoryId: string
  description: string
  cover: string
  accessLevel: AccessLevel
  createdAt: string
}

export type Report = {
  id: string
  user: string
  email: string
  phone: string
  city: string
  status: 'Open' | 'Resolved'
  message: string
  createdAt: string
}

export type Earning = {
  id: string
  userEmail: string
  purchaseType: string
  amount: number
  date: string
}

export type AdminUser = {
  id: string
  name: string
  email: string
  role: string
  image: string
  contactNo: string
}

export type SettingsContent = {
  privacyPolicy: string
  terms: string
  aboutUs: string
}

export type NotificationItem = {
  id: string
  title: string
  description: string
  createdAt: string
  isUnread: boolean
}

export type DashboardOverview = {
  totalPurchases: number
  monthlyRevenue: number
  categoryCount: number
  recentActivity: Earning[]
}
