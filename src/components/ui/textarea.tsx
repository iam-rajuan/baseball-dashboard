import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => (
    <label className="block space-y-2">
      {label ? (
        <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#505666]">
          {label}
        </span>
      ) : null}
      <textarea
        ref={ref}
        className={cn(
          'min-h-[132px] w-full rounded-xl border border-[#d5d7dd] bg-[#f2efee] px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-[#a7adbb] focus:border-brand-navy',
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

Textarea.displayName = 'Textarea'
