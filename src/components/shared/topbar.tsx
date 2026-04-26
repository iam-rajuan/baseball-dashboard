import { Bell, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StableImage } from '@/components/ui/stable-image'
import { useAdminStore } from '@/store/admin-store'
import { useAuthStore } from '@/store/auth-store'

export const Topbar = () => {
  const user = useAuthStore((state) => state.user)
  const profile = useAdminStore((state) => state.profile)
  const displayName = profile?.name ?? user?.name
  const profileImage = profile?.image ?? ''

  return (
    <header className="dashboard-panel sticky top-3 z-20 flex items-center justify-between gap-4 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/88 sm:px-4 lg:top-4 xl:px-5 xl:py-3.5">
      <div className="min-w-0">
        <div className="truncate text-[15px] font-bold text-brand-navy">
          {displayName ? `Welcome,${displayName}` : 'Welcome'}
        </div>
        <div className="text-[13px] text-[#657084]">Have a nice day!</div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          className="flex size-12 items-center justify-center rounded-full border border-[#c9cede] text-brand-navy transition hover:border-brand-navy hover:bg-[#faf8f3]"
          to="/notifications"
        >
          <Bell className="size-5" />
        </Link>
        <Link
          className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-[#c9cede] text-brand-navy transition hover:border-brand-navy hover:bg-[#faf8f3]"
          to="/profile"
        >
          <StableImage
            alt={displayName ? `${displayName} profile photo` : 'Admin profile'}
            className="size-full rounded-full"
            fallback={<UserCircle2 className="size-6" />}
            src={profileImage}
          />
        </Link>
      </div>
    </header>
  )
}
