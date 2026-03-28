import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  labelClassName?: string
  endAdornment?: ReactNode
  endAdornmentProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      labelClassName,
      endAdornment,
      endAdornmentProps,
      ...props
    },
    ref,
  ) => (
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
      <span className="relative block">
        <input
          ref={ref}
          className={cn(
            'h-12 w-full rounded-xl border border-[#d5d7dd] bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-[#a7adbb] focus:border-brand-navy',
            endAdornment && 'pr-20',
            error && 'border-red-400',
            className,
          )}
          {...props}
        />
        {endAdornment ? (
          <button
            className="absolute inset-y-0 right-4 my-auto inline-flex h-9 items-center justify-center text-sm font-semibold text-brand-navy/75 transition hover:text-brand-navy"
            tabIndex={-1}
            type="button"
            {...endAdornmentProps}
          >
            {endAdornment}
          </button>
        ) : null}
      </span>
      {error ? (
        <span className="block text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  ),
)

Input.displayName = 'Input'
