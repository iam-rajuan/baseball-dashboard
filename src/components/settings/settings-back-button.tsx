import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

const SETTINGS_ROUTE = '/settings'

type SettingsRouteState = {
  from?: string
}

export const SettingsBackButton = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as SettingsRouteState | null

  const handleBack = () => {
    if (state?.from === SETTINGS_ROUTE && window.history.state?.idx > 0) {
      navigate(-1)
      return
    }

    navigate(SETTINGS_ROUTE)
  }

  return (
    <Button
      aria-label="Back to Settings"
      className="h-11 cursor-pointer select-none gap-2 rounded-xl border-[#c9cede] bg-white px-4 text-sm font-semibold text-brand-navy shadow-sm hover:border-brand-navy hover:bg-[#faf8f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy active:translate-y-px"
      onClick={handleBack}
      size="sm"
      type="button"
      variant="secondary"
    >
      <ArrowLeft className="size-4" />
      <span className="pointer-events-none">Back to Settings</span>
    </Button>
  )
}
