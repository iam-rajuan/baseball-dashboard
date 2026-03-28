import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PriceManagementModal } from '@/features/earnings/price-management-modal'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Table, type Column } from '@/components/ui/table'
import { earningService } from '@/services/earning-service'
import type { Earning } from '@/types/entities'
import { formatCurrency, formatDateTime } from '@/utils/format'

const pageSize = 10

export const EarningsPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const { data } = useQuery({
    queryKey: ['earnings'],
    queryFn: earningService.getAll,
  })

  const updateMutation = useMutation({
    mutationFn: (price: number) => earningService.updatePrice(price),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['earnings'] })
      setOpen(false)
    },
  })

  const rows = (data?.transactions ?? []).slice(
    (page - 1) * pageSize,
    page * pageSize,
  )
  const totalPages = Math.max(
    1,
    Math.ceil((data?.transactions.length ?? 0) / pageSize),
  )

  const columns: Column<Earning>[] = [
    {
      key: 'userEmail',
      header: 'User Email',
      render: (row) => (
        <span className="font-semibold text-brand-ink">{row.userEmail}</span>
      ),
    },
    {
      key: 'purchaseType',
      header: 'Purchase Type',
      render: (row) => (
        <span className="inline-flex rounded-full bg-[#f6d4c8] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#7d4a2b]">
          {row.purchaseType}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => (
        <span className="font-bold text-brand-orange">
          {formatCurrency(row.amount)}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Date/Time',
      render: (row) => (
        <span className="text-[#7b8292]">{formatDateTime(row.date)}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6 px-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[30px] font-medium text-brand-ink">Transactions</h1>
        <Button onClick={() => setOpen(true)}>Price Management</Button>
      </div>
      <Table columns={columns} rows={rows} />
      <div className="flex flex-col gap-4 rounded-b-[18px] bg-[#f7f4ef] px-6 py-4 text-sm text-[#686f80] sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {rows.length} of {data?.transactions.length ?? 0} categories
        </div>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
      <PriceManagementModal
        onClose={() => setOpen(false)}
        onSubmit={(price) => updateMutation.mutateAsync(price)}
        open={open}
        price={data?.fullUnlockPrice ?? 99.99}
      />
    </div>
  )
}
