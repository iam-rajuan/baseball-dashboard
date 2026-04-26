import { useId, useRef, useState } from 'react'
import { ImagePlus, Trash2, UploadCloud } from 'lucide-react'
import { StableImage } from '@/components/ui/stable-image'
import { cn } from '@/utils/cn'
import { uploadService } from '@/services/upload-service'

type FileUploadProps = {
  label?: string
  helperText?: string
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
  compact?: boolean
  className?: string
  helperClassName?: string
  triggerText?: string
  folder?: string
}

export const FileUpload = ({
  label,
  helperText = 'Recommended size: 800x600',
  value,
  onChange,
  disabled = false,
  compact = false,
  className,
  helperClassName,
  triggerText = 'Click to upload or drag and drop',
  folder = 'general',
}: FileUploadProps) => {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasPreview = Boolean(value)

  const handleFile = async (file?: File | null) => {
    if (!file || disabled || isUploading) return
    try {
      setError(null)
      setIsUploading(true)
      const fileUrl = await uploadService.uploadFile(file, folder)
      onChange(fileUrl)
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : 'Upload failed',
      )
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
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
        disabled={disabled || isUploading}
        type="file"
      />
      <button
        className={cn(
          'relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#d6d8de] bg-[#f2efee] text-center transition hover:border-brand-orange',
          compact ? 'h-[88px]' : 'h-[118px]',
          isDragging && 'border-brand-orange bg-[#fff6ef]',
          disabled && 'cursor-not-allowed opacity-70 hover:border-[#d6d8de]',
          className,
        )}
        disabled={disabled || isUploading}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          setIsDragging(false)
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          void handleFile(event.dataTransfer.files?.[0])
        }}
        type="button"
      >
        {hasPreview ? (
          <>
            <StableImage
              alt="Upload preview"
              className="absolute inset-0 h-full w-full"
              src={value}
            />
            <span className="absolute inset-0 bg-brand-navy/18" />
            <span className="relative rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-navy shadow-soft">
              {isUploading ? 'Uploading...' : 'Change Image'}
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
              {isUploading ? 'Uploading...' : triggerText}
            </span>
          </>
        )}
      </button>
      {hasPreview ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-brand-line bg-white px-4 text-sm font-semibold text-brand-navy transition hover:bg-brand-muted disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled || isUploading}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            Change Image
          </button>
          <button
            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-red-100 bg-white px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled || isUploading}
            onClick={() => onChange('')}
            type="button"
          >
            <Trash2 className="mr-2 size-4" />
            Delete Image
          </button>
        </div>
      ) : null}
      <span className={cn('mt-1 block text-xs text-[#98a0b1]', helperClassName)}>
        {error ?? helperText}
      </span>
    </div>
  )
}
