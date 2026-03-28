import { Bell, Menu, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { useDashboardStore } from '@/store/dashboard-store'

export const Topbar = () => {
  const user = useAuthStore((state) => state.user)
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar)

  return (
    <header className="dashboard-panel flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <button
        className="text-brand-navy lg:hidden"
        onClick={toggleSidebar}
        type="button"
      >
        <Menu className="size-7" />
      </button>
      <div className="hidden items-center gap-4 lg:flex">
        <button
          className="text-brand-navy"
          onClick={toggleSidebar}
          type="button"
        >
          <Menu className="size-7" />
        </button>
        <div>
          <div className="text-[14px] font-bold text-brand-navy">
            Welcome,{user?.name ?? 'James'}
          </div>
          <div className="text-xs text-[#657084]">Have a nice day!</div>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          className="flex size-12 items-center justify-center rounded-full border border-[#c9cede] text-brand-navy"
          to="/notifications"
        >
          <Bell className="size-5" />
        </Link>
        <Link
          className="flex size-12 items-center justify-center rounded-full border border-[#c9cede] text-brand-navy"
          to="/profile"
        >
          <UserCircle2 className="size-6" />
        </Link>
      </div>
    </header>
  )
}
