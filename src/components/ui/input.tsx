import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  labelClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, labelClassName, ...props }, ref) => (
    <label className="block space-y-2">
      {label ? (
        <span
          className={cn(
            'block text-sm font-semibold text-brand-navy',
            labelClassName,
          )}
        >
          {label}
        </span>
      ) : null}
      <input
        ref={ref}
        className={cn(
          'h-12 w-full rounded-xl border border-[#d5d7dd] bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-[#a7adbb] focus:border-brand-navy',
          error && 'border-red-400',
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="block text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  ),
)

Input.displayName = 'Input'
