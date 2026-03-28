import type { AccessLevel } from '@/types/entities'
import { cn } from '@/utils/cn'

type BadgeProps = {
  value: AccessLevel
}

export const AccessBadge = ({ value }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex min-w-[82px] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide',
      value === 'Free'
        ? 'bg-[#d9f7e2] text-[#2f9f5d]'
        : 'bg-brand-peach text-[#7d4a2b]',
    )}
  >
    {value}
  </span>
)
