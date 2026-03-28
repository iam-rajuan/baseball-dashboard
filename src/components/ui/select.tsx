import type { SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, label, error, ...props }, ref) => (
    <label className="block space-y-2">
      {label ? (
        <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#505666]">
          {label}
        </span>
      ) : null}
      <span className="relative block">
        <select
          ref={ref}
          className={cn(
            'h-12 w-full appearance-none rounded-xl border border-[#d5d7dd] bg-[#f2efee] px-4 pr-11 text-sm text-brand-ink outline-none transition focus:border-brand-navy',
            error && 'border-red-400',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#73798b]" />
      </span>
      {error ? (
        <span className="block text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  ),
)

Select.displayName = 'Select'
