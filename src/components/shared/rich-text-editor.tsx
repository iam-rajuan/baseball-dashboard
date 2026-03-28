import type { TextareaHTMLAttributes } from 'react'
import { ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type RichTextEditorProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  title: string
  helper?: string
}

export const RichTextEditor = ({
  title,
  helper,
  ...props
}: RichTextEditorProps) => (
  <div className="space-y-5">
    <h2 className="text-[17px] font-medium text-brand-ink">{title}</h2>
    <div className="rounded-[20px] bg-white px-6 py-6 shadow-panel">
      <textarea
        className="min-h-[260px] w-full resize-none border-0 bg-transparent text-[15px] leading-8 text-brand-body outline-none"
        {...props}
      />
      <div className="mt-4 flex flex-col gap-4 border-t border-[#efe8da] pt-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#f2efee] text-[#7f8796]">
            <ImagePlus className="size-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-brand-ink">
              Upload your image
            </div>
            <div className="text-xs text-[#98a0b1]">
              {helper ?? 'jpg/png • Max. 5MB'}
            </div>
          </div>
          <Button className="rounded-xl px-5" size="sm" variant="navy">
            Upload
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6c7282]">
          <span className="rounded border border-brand-line px-2 py-1">12</span>
          <span className="rounded border border-brand-line px-2 py-1">B</span>
          <span className="rounded border border-brand-line px-2 py-1">I</span>
          <span className="rounded border border-brand-line px-2 py-1">U</span>
          <span className="rounded border border-brand-line px-2 py-1">≡</span>
          <span className="rounded border border-brand-line px-2 py-1">☰</span>
        </div>
      </div>
    </div>
  </div>
)
