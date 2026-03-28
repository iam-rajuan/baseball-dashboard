import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/utils/cn'

export const Card = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div className={cn('dashboard-panel', className)} {...props}>
    {children}
  </div>
)
