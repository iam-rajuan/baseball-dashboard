import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'

type StatsCardProps = {
  title: string
  value: string
  icon: LucideIcon
  dark?: boolean
  accent?: string
  loading?: boolean
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  dark = false,
  accent,
  loading = false,
}: StatsCardProps) => (
  <Card
    className={cn(
      'relative min-h-[182px] overflow-hidden rounded-[24px] px-6 py-7 xl:min-h-[190px] xl:px-7 xl:py-8',
      dark ? 'bg-brand-navy text-white' : 'bg-white',
    )}
  >
    <div
      className={cn(
        'flex size-12 items-center justify-center rounded-2xl text-white',
        dark ? 'bg-white/12' : 'bg-brand-navy',
      )}
    >
      <Icon className="size-5" />
    </div>
    {accent ? (
      <div className="absolute right-6 top-8 text-xs font-semibold text-brand-orange xl:right-7">
        {accent}
      </div>
    ) : null}
    <div
      className={cn(
        'mt-8 text-[11px] font-semibold uppercase tracking-[0.24em]',
        dark ? 'text-white/65' : 'text-[#596071]',
      )}
    >
      {title}
    </div>
    <div
      className={cn(
        'mt-4 text-[24px] font-extrabold xl:text-[28px]',
        dark ? 'text-white' : 'text-brand-ink',
      )}
    >
      {loading ? (
        <span
          className={cn(
            'block h-8 w-24 rounded-lg',
            dark ? 'bg-white/18' : 'bg-[#e8e2d7]',
          )}
        />
      ) : (
        value
      )}
    </div>
  </Card>
)
