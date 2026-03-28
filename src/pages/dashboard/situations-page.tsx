import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { SituationFormModal } from '@/features/situations/situation-form-modal'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { situationService } from '@/services/situation-service'
import type { Situation } from '@/types/entities'
import { formatDate } from '@/utils/format'

const pageSize = 8

export const SituationsPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)

  const { data = [] } = useQuery({
    queryKey: ['situations'],
    queryFn: situationService.getAll,
  })

  const saveMutation = useMutation({
    mutationFn: situationService.save,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['situations'] })
      setOpen(false)
    },
  })

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [data])

  const rows = sorted.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))

  return (
    <div className="space-y-6 px-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[30px] font-medium text-brand-ink">Situations</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Situation
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {rows.map((item, index) => (
          <SituationCard
            key={item.id}
            item={item}
            sequence={(page - 1) * pageSize + index + 1}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 rounded-b-[18px] bg-[#f7f4ef] px-6 py-4 text-sm text-[#686f80] sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {rows.length} of {sorted.length} situations
        </div>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
      <SituationFormModal
        onClose={() => setOpen(false)}
        onSubmit={(values) => saveMutation.mutateAsync(values)}
        open={open}
      />
    </div>
  )
}

const SituationCard = ({
  item,
  sequence,
}: {
  item: Situation
  sequence: number
}) => (
  <article className="dashboard-panel overflow-hidden p-4">
    <div
      className="h-[168px] rounded-[20px] bg-cover bg-center"
      style={{ backgroundImage: `url(${item.image})` }}
    />
    <div className="mt-4 space-y-1">
      <h2 className="text-[22px] font-bold text-brand-ink">{item.title}</h2>
      <div className="text-sm font-semibold text-brand-navy">
        Situation {String(sequence).padStart(2, '0')}
      </div>
      <div className="text-sm text-brand-body">
        Uploaded {formatDate(item.createdAt)}
      </div>
    </div>
  </article>
)
