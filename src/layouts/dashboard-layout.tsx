import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shared/sidebar'
import { Topbar } from '@/components/shared/topbar'

export const DashboardLayout = () => (
  <div className="app-shell px-3 py-3 lg:px-5 lg:py-5">
    <div className="mx-auto flex max-w-[1440px] gap-5">
      <Sidebar />
      <div className="min-w-0 flex-1 lg:pl-[280px]">
        <div className="space-y-6">
          <Topbar />
          <main className="min-h-[calc(100vh-120px)]">{<Outlet />}</main>
        </div>
      </div>
    </div>
  </div>
)
