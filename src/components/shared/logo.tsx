import logoUrl from '@/assets/marietta-baseball-academy-logo.svg'
import { cn } from '@/utils/cn'

type AcademyLogoProps = {
  className?: string
  imageClassName?: string
}

export const AcademyLogo = ({
  className,
  imageClassName,
}: AcademyLogoProps) => (
  <div className={cn('flex items-center justify-center', className)}>
    <img
      alt="Marietta Baseball Academy"
      className={cn('h-auto w-[128px]', imageClassName)}
      draggable={false}
      src={logoUrl}
    />
  </div>
)
