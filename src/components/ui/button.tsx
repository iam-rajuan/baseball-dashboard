import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/utils/cn'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'navy'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
  }
>

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
      variant === 'primary' &&
        'bg-brand-orange text-white shadow-cta hover:bg-[#d85f06] active:translate-y-px',
      variant === 'secondary' &&
        'border border-brand-line bg-white text-brand-ink hover:bg-brand-muted',
      variant === 'ghost' && 'text-brand-ink hover:bg-brand-muted',
      variant === 'navy' &&
        'bg-brand-navy text-white shadow-panel hover:bg-[#0d1846] active:translate-y-px',
      size === 'sm' && 'h-10 px-4 text-sm',
      size === 'md' && 'h-12 px-5 text-sm',
      size === 'lg' && 'h-14 px-6 text-base',
      fullWidth && 'w-full',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
