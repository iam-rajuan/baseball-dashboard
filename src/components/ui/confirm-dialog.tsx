import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  isPending?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  isPending = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => (
  <Modal
    className="max-w-[440px]"
    footer={
      <div className="flex gap-3">
        <Button
          className="h-11 flex-1 rounded-xl"
          disabled={isPending}
          onClick={onCancel}
          type="button"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          className="h-11 flex-1 rounded-xl bg-red-600 text-white hover:bg-red-700"
          disabled={isPending}
          onClick={onConfirm}
          type="button"
        >
          {isPending ? 'Deleting...' : confirmLabel}
        </Button>
      </div>
    }
    onClose={isPending ? () => undefined : onCancel}
    open={open}
    title={title}
  >
    <div className="flex gap-4 rounded-2xl bg-red-50 px-4 py-4 text-red-700">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
        <AlertTriangle className="size-5" />
      </span>
      <p className="text-sm leading-6">{description}</p>
    </div>
  </Modal>
)
