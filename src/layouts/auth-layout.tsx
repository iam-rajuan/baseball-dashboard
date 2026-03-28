import { Outlet } from 'react-router-dom'
import { AcademyLogo } from '@/components/shared/logo'

export const AuthLayout = () => (
  <div className="app-shell flex min-h-screen items-center justify-center p-6">
    <div className="w-full max-w-[705px] rounded-[28px] bg-brand-navy px-7 py-10 shadow-soft sm:px-12 sm:py-14">
      <div className="mb-10 flex justify-center">
        <AcademyLogo imageClassName="w-[150px]" />
      </div>
      <Outlet />
    </div>
  </div>
)
