import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { uploadService } from '@/services/upload-service'

const settingsLinks = [
  { label: 'Change Password', to: '/settings/change-password' },
  { label: 'Privacy Policy', to: '/settings/privacy-policy' },
  { label: 'Terms & Conditions', to: '/settings/terms' },
  { label: 'About Us', to: '/settings/about' },
]

export const SettingsPage = () => {
  const { data: uploadProvider } = useQuery({
    queryKey: ['upload-provider-status'],
    queryFn: uploadService.getProviderStatus,
  })

  return (
    <div className="space-y-6 px-1">
      <h1 className="text-[30px] font-medium text-brand-ink">Settings</h1>

      {uploadProvider ? (
        <div className="dashboard-panel space-y-4 px-7 py-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d97ab]">
              Upload Storage
            </div>
            <div className="mt-2 text-[22px] font-medium text-brand-ink">
              {uploadProvider.provider === 'local'
                ? 'Cloudways / Server Storage'
                : 'AWS S3 Storage'}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-[#f6f3ee] px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8d97ab]">
                Active Mode
              </div>
              <div className="mt-1 text-base font-medium text-brand-ink">
                {uploadProvider.activeMode}
              </div>
            </div>
            <div className="rounded-2xl bg-[#f6f3ee] px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8d97ab]">
                Presigned Uploads
              </div>
              <div className="mt-1 text-base font-medium text-brand-ink">
                {uploadProvider.supportsPresignedUploads ? 'Supported' : 'Not supported'}
              </div>
            </div>
            <div className="rounded-2xl bg-[#f6f3ee] px-4 py-4 md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8d97ab]">
                Public Asset Base
              </div>
              <div className="mt-1 break-all text-sm font-medium text-brand-ink">
                {uploadProvider.localUploadsBasePath
                  ? `${uploadProvider.appBaseUrl}${uploadProvider.localUploadsBasePath}`
                  : uploadProvider.appBaseUrl}
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
}
