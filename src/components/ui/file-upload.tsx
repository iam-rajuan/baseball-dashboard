import { useId, useRef } from 'react'
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
}: FileUploadProps) => {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const hasPreview = Boolean(value)

  const handleFile = async (file?: File | null) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      {label ? (
        <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#505666]">
          {label}
        </span>
      ) : null}
      <input
        ref={inputRef}
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        id={inputId}
        onChange={(event) => handleFile(event.target.files?.[0])}
        type="file"
      />
      <button
        className={cn(
          'relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#d6d8de] bg-[#f2efee] text-center transition hover:border-brand-orange',
          compact ? 'h-[88px]' : 'h-[118px]',
        )}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        {hasPreview ? (
          <>
            <img
              alt="Upload preview"
              className="absolute inset-0 h-full w-full object-cover"
              src={value}
            />
            <span className="absolute inset-0 bg-brand-navy/18" />
            <span className="relative rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-navy shadow-soft">
              Change Image
            </span>
          </>
        ) : (
          <>
            {compact ? (
              <ImagePlus className="mb-2 size-5 text-[#7c8293]" />
            ) : (
              <UploadCloud className="mb-2 size-5 text-[#7c8293]" />
            )}
            <span className="text-sm font-medium text-brand-navy">
              Click to upload or drag and drop
            </span>
          </>
        )}
      </button>
      <span className="mt-1 block text-xs text-[#98a0b1]">{helperText}</span>
    </div>
  )
}
