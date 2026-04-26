import type { PropsWithChildren, ReactNode } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

type ModalProps = PropsWithChildren<{
  open: boolean
  onClose: () => void
  title: string
  description?: string
  className?: string
  footer?: ReactNode
}>

export const Modal = ({
  open,
  onClose,
  title,
  description,
  className,
  footer,
  children,
}: ModalProps) => (
  <Dialog open={open} onClose={onClose} className="relative z-50">
    <div
      className="fixed inset-0 bg-[#111f5a]/20 backdrop-blur-[1px]"
      aria-hidden="true"
    />
    <div className="fixed inset-0 p-4">
      <div className="flex min-h-full items-center justify-center">
        <DialogPanel
          className={cn(
            'flex max-h-[calc(100vh-32px)] w-[min(720px,calc(100vw-32px))] flex-col overflow-hidden rounded-[22px] bg-white shadow-soft',
            className,
          )}
        >
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-7 py-6 [scrollbar-gutter:stable]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[20px] font-bold text-brand-ink">
                  {title}
                </h2>
                {description ? (
                  <p className="mt-1 text-sm text-brand-body">{description}</p>
                ) : null}
              </div>
              <button
                className="rounded-full p-1 text-[#5d6373] transition hover:bg-brand-muted"
                onClick={onClose}
                type="button"
              >
                <X className="size-5" />
              </button>
            </div>
            {children}
          </div>
          {footer ? (
            <div className="shrink-0 border-t border-brand-muted px-7 py-5">
              {footer}
            </div>
          ) : null}
        </DialogPanel>
      </div>
    </div>
  </Dialog>
)
