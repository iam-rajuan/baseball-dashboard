import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Sidebar } from '@/components/shared/sidebar'
import { Topbar } from '@/components/shared/topbar'
import { adminService } from '@/services/admin-service'
import { useAdminStore } from '@/store/admin-store'

export const DashboardLayout = () => {
  const setProfile = useAdminStore((state) => state.setProfile)

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminService.getProfile,
  })

  useEffect(() => {
    if (profile) {
      setProfile(profile)
    }
  }, [profile, setProfile])

  return (
    <div className="app-shell px-2 py-3 sm:px-3 lg:px-4 lg:py-4 xl:px-5">
      <div className="mx-auto flex w-full max-w-[1860px] gap-3 lg:gap-4 xl:gap-5">
        <Sidebar />
        <div className="min-w-0 flex-1 lg:pl-1 xl:pl-2">
          <div className="space-y-5 lg:space-y-6">
            <Topbar />
            <main className="min-h-[calc(100vh-120px)]">{<Outlet />}</main>
          </div>
        </div>
      </div>
    </div>
  )
}
