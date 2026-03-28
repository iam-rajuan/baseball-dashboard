import { LogOut, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { sidebarLinks } from '@/constants/navigation'
import { useAuthStore } from '@/store/auth-store'
import { useDashboardStore } from '@/store/dashboard-store'
import { cn } from '@/utils/cn'
import { AcademyLogo } from './logo'

export const Sidebar = () => {
  const navigate = useNavigate()
  const { sidebarOpen, closeSidebar } = useDashboardStore()
  const logout = useAuthStore((state) => state.logout)

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-[#111f5a]/20 transition lg:hidden',
          sidebarOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        onClick={closeSidebar}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen w-[258px] flex-col rounded-r-[24px] border-r border-[#efe8da] bg-white px-5 py-6 shadow-panel transition lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:translate-x-0 lg:rounded-[28px] lg:border lg:px-6 lg:py-6',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-10 flex items-start justify-between">
          <AcademyLogo className="w-full justify-center" imageClassName="w-[118px]" />
          <button
            className="text-brand-navy lg:hidden"
            onClick={closeSidebar}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="space-y-3">
          {sidebarLinks.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-brand-ink transition hover:bg-[#fff6ef]',
                  isActive && 'bg-brand-orange text-white shadow-cta hover:bg-brand-orange',
                )
              }
              onClick={closeSidebar}
              to={to}
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-[#f25b4f] transition hover:bg-[#fff4f3]"
          onClick={() => {
            logout()
            navigate('/auth/login')
          }}
          type="button"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </aside>
    </>
  )
}
