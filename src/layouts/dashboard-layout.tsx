import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shared/sidebar'
import { Topbar } from '@/components/shared/topbar'

export const DashboardLayout = () => (
  <div className="app-shell px-2 py-3 sm:px-3 lg:px-4 lg:py-4 xl:px-5">
    <div className="mx-auto flex w-full max-w-[1860px] gap-3 lg:gap-4 xl:gap-5">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="space-y-5 lg:space-y-6">
          <Topbar />
          <main className="min-h-[calc(100vh-120px)]">{<Outlet />}</main>
        </div>
      </div>
    </div>
  </div>
)
