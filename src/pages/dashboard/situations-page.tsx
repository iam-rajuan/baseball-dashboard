import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { SituationFormModal } from '@/features/situations/situation-form-modal'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { StableImage } from '@/components/ui/stable-image'
import { situationService } from '@/services/situation-service'
import type { Situation } from '@/types/entities'
import { formatDate } from '@/utils/format'

const pageSize = 8

export const SituationsPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Situation | null>(null)

  const { data } = useQuery({
    queryKey: ['situations', page],
    queryFn: () => situationService.getPage({ page, limit: pageSize }),
    placeholderData: (previousData) => previousData,
  })

  const saveMutation = useMutation({
    mutationFn: situationService.save,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['situations'] })
      setOpen(false)
      setEditing(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => situationService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['situations'] })
    },
  })

  const rows = data?.items ?? []
  const totalPages = data?.pagination.totalPages ?? 1
  const total = data?.pagination.total ?? 0

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
            onDelete={() => deleteMutation.mutate(item.id)}
            onEdit={() => {
              setEditing(item)
              setOpen(true)
            }}
            sequence={(page - 1) * pageSize + index + 1}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 rounded-b-[18px] bg-[#f7f4ef] px-6 py-4 text-sm text-[#686f80] sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {rows.length} of {total} situations
        </div>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
      <SituationFormModal
        onClose={() => {
          setOpen(false)
          setEditing(null)
        }}
        initialData={editing}
        onSubmit={(values) =>
          saveMutation.mutateAsync({ ...values, id: editing?.id })
        }
        open={open}
      />
    </div>
  )
}

const SituationCard = ({
  item,
  onDelete,
  onEdit,
  sequence,
}: {
  item: Situation
  onDelete: () => void
  onEdit: () => void
  sequence: number
}) => (
  <article className="dashboard-panel overflow-hidden p-4">
    <StableImage
      alt={item.title}
      className="h-[168px] rounded-[20px]"
      fallback={<span className="block h-full w-full animate-pulse bg-[#ece9e7]" />}
      src={item.image}
    />
    <div className="mt-4 space-y-1">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[22px] font-bold text-brand-ink">{item.title}</h2>
        <div className="flex items-center gap-2 text-[#9aa1b1]">
          <button onClick={onEdit} type="button">
            <Pencil className="size-4" />
          </button>
          <button onClick={onDelete} type="button">
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
      <div className="text-sm font-semibold text-brand-navy">
        Situation {String(sequence).padStart(2, '0')}
      </div>
      <div className="text-sm text-brand-body">
        Uploaded {formatDate(item.createdAt)}
      </div>
    </div>
  </article>
)
