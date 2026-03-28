import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const settingsLinks = [
  { label: 'Change Password', to: '/settings/change-password' },
  { label: 'Privacy Policy', to: '/settings/privacy-policy' },
  { label: 'Terms & Conditions', to: '/settings/terms' },
  { label: 'About Us', to: '/settings/about' },
]

export const SettingsPage = () => (
  <div className="space-y-6 px-1">
    <h1 className="text-[30px] font-medium text-brand-ink">Settings</h1>
    <div className="dashboard-panel space-y-0 px-7 py-6">
      {settingsLinks.map((item) => (
        <Link
          key={item.to}
          className="flex items-center justify-between border-b border-brand-line py-5 text-[20px] font-medium text-brand-ink last:border-b-0"
          to={item.to}
        >
          {item.label}
          <ChevronRight className="size-5" />
        </Link>
      ))}
    </div>
  </div>
)
