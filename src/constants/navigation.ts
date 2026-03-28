import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  BarChart3,
  FolderKanban,
  Settings,
  ShieldCheck,
} from 'lucide-react'

export type SidebarLink = {
  label: string
  to: string
  icon: LucideIcon
}

export const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', to: '/dashboard', icon: BarChart3 },
  { label: 'Earning', to: '/earnings', icon: Banknote },
  { label: 'Drill Library', to: '/drills', icon: FolderKanban },
  { label: 'Reports', to: '/reports', icon: ShieldCheck },
  { label: 'Create Admin', to: '/create-admin', icon: ShieldCheck },
  { label: 'Settings', to: '/settings', icon: Settings },
]
