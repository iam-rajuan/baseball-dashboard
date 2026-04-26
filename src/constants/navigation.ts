import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  BarChart3,
  ChevronRight,
  FolderKanban,
  Settings,
  ShieldCheck,
  Spline,
} from 'lucide-react'

export type SidebarLink = {
  label: string
  icon: LucideIcon
  to?: string
  children?: Array<{
    label: string
    to: string
    icon?: LucideIcon
  }>
}

export const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', to: '/dashboard', icon: BarChart3 },
  { label: 'Earning', to: '/earnings', icon: Banknote },
  {
    label: 'Drills',
    icon: FolderKanban,
    children: [
      { label: 'Drill Category', to: '/drills/categories', icon: ChevronRight },
      { label: 'Drill Library', to: '/drills', icon: ChevronRight },
    ],
  },
  { label: 'Situations', to: '/situations', icon: Spline },
  { label: 'Reports', to: '/reports', icon: ShieldCheck },
  // Hidden for now. Keep the page available in code for future re-enable.
  // { label: 'Create Admin', to: '/create-admin', icon: ShieldCheck },
  { label: 'Settings', to: '/settings', icon: Settings },
]
