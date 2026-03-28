import { ImagePlus, UploadCloud } from 'lucide-react'
import { cn } from '@/utils/cn'

type FileUploadProps = {
  label?: string
  helperText?: string
  value?: string
  onChange: (value: string) => void
  compact?: boolean
}

export const FileUpload = ({
  label,
  helperText = 'Recommended size: 800x600',
  value,
  onChange,
  compact = false,
}: FileUploadProps) => (
  <div className="space-y-2">
    {label ? (
      <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#505666]">
        {label}
      </span>
    ) : null}
    <button
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d6d8de] bg-[#f2efee] text-center transition hover:border-brand-orange',
        compact ? 'h-[88px]' : 'h-[118px]',
      )}
      onClick={() => onChange(`mock-upload-${Date.now()}.png`)}
      type="button"
    >
      {compact ? (
        <ImagePlus className="mb-2 size-5 text-[#7c8293]" />
      ) : (
        <UploadCloud className="mb-2 size-5 text-[#7c8293]" />
      )}
      <span className="text-sm font-medium text-brand-navy">
        {value ? value : 'Click to upload or drag and drop'}
      </span>
      <span className="mt-1 text-xs text-[#98a0b1]">{helperText}</span>
    </button>
  </div>
)
