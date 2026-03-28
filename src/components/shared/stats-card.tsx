import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'

type StatsCardProps = {
  title: string
  value: string
  icon: LucideIcon
  dark?: boolean
  accent?: string
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  dark = false,
  accent,
}: StatsCardProps) => (
  <Card
    className={cn(
      'relative min-h-[158px] overflow-hidden px-6 py-7',
      dark ? 'bg-brand-navy text-white' : 'bg-white',
    )}
  >
    <div className="flex size-11 items-center justify-center rounded-xl bg-brand-navy text-white">
      <Icon className="size-5" />
    </div>
    {accent ? (
      <div className="absolute right-6 top-7 text-xs font-semibold text-brand-orange">
        {accent}
      </div>
    ) : null}
    <div
      className={cn(
        'mt-6 text-[11px] font-semibold uppercase tracking-[0.2em]',
        dark ? 'text-white/65' : 'text-[#596071]',
      )}
    >
      {title}
    </div>
    <div
      className={cn(
        'mt-3 text-[24px] font-extrabold',
        dark ? 'text-white' : 'text-brand-ink',
      )}
    >
      {value}
    </div>
  </Card>
)
