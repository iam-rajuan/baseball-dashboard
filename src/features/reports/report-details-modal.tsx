import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import type { Report } from '@/types/entities'

type ReportDetailsModalProps = {
  open: boolean
  onClose: () => void
  report: Report | null
  onStatusChange?: (status: 'open' | 'resolved') => void
}

export const ReportDetailsModal = ({
  open,
  onClose,
  report,
  onStatusChange,
}: ReportDetailsModalProps) => (
  <Modal
    className="max-w-[560px]"
    onClose={onClose}
    open={open}
    title="Report Details"
  >
    {report ? (
      <div className="space-y-6 text-sm text-brand-body">
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#666d7e]">
            Name
          </div>
          <div className="text-base font-semibold text-brand-ink">
            {report.user}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#666d7e]">
              Email
            </div>
            <div>{report.email}</div>
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#666d7e]">
              Phone
            </div>
            <div>{report.phone}</div>
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#666d7e]">
            Message details
          </div>
          <p className="rounded-2xl bg-[#f7f4ef] p-4 leading-7">
            {report.message}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() =>
              onStatusChange?.(
                report.status === 'Resolved' ? 'open' : 'resolved',
              )
            }
            type="button"
          >
            {report.status === 'Resolved' ? 'Reopen Report' : 'Mark Resolved'}
          </Button>
        </div>
      </div>
    ) : null}
  </Modal>
)
