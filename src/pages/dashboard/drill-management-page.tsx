import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DrillFormModal } from '@/features/drills/drill-form-modal'
import { AccessBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Select } from '@/components/ui/select'
import { Table, type Column } from '@/components/ui/table'
import { categoryService } from '@/services/category-service'
import { drillService } from '@/services/drill-service'
import type { Drill } from '@/types/entities'
import { formatDate } from '@/utils/format'

type DrillRow = Drill & { categoryName: string }

const pageSize = 6

export const DrillManagementPage = () => {
  const queryClient = useQueryClient()
  const [categoryId, setCategoryId] = useState('all')
  const [status, setStatus] = useState<'All' | 'Free' | 'Locked'>('All')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Drill | null>(null)

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
    placeholderData: (previousData) => previousData,
  })

  const accessLevel =
    status === 'All'
      ? 'all'
      : status === 'Locked'
        ? 'locked'
        : status.toLowerCase()

  const { data: drillPage } = useQuery({
    queryKey: ['drills', page, categoryId, accessLevel],
    queryFn: () =>
      drillService.getPage({
        page,
        limit: pageSize,
        categoryId,
        accessLevel: accessLevel as 'all' | 'free' | 'locked',
      }),
    placeholderData: (previousData) => previousData,
  })

  const saveMutation = useMutation({
    mutationFn: (values: Omit<Drill, 'id' | 'createdAt'> & { id?: string }) =>
      drillService.save(values),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['drills'] }),
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
      ])
      setOpen(false)
      setEditing(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => drillService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['drills'] })
    },
  })

  const rows = drillPage?.items ?? []
  const totalPages = drillPage?.pagination.totalPages ?? 1
  const total = drillPage?.pagination.total ?? 0

  const columns: Column<DrillRow>[] = [
    {
      key: 'name',
      header: 'Drill Name',
      render: (row) => (
        <span className="font-semibold text-brand-ink">{row.name}</span>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (row) => <span>{row.categoryName}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <AccessBadge value={row.accessLevel} />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (row) => <span>{formatDate(row.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-3 text-[#9aa1b1]">
          <button
            onClick={() => {
              setEditing(row)
              setOpen(true)
            }}
            type="button"
          >
            <Pencil className="size-4" />
          </button>
          <button onClick={() => deleteMutation.mutate(row.id)} type="button">
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 px-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[30px] font-medium text-brand-ink">Drills</h1>
        <div className="flex gap-3">
          <Link
            className="inline-flex h-12 items-center rounded-2xl border border-brand-line px-4 text-sm font-semibold text-brand-ink"
            to="/drills/categories"
          >
            Manage Categories
          </Link>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add New Drills
          </Button>
        </div>
      </div>
      <div className="grid gap-4 rounded-[20px] bg-white p-4 shadow-panel md:grid-cols-2">
        <Select
          value={categoryId}
          onChange={(event) => {
            setCategoryId(event.target.value)
            setPage(1)
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value as 'All' | 'Free' | 'Locked')
            setPage(1)
          }}
        >
          <option value="All">All</option>
          <option value="Free">Free</option>
          <option value="Locked">Locked</option>
        </Select>
      </div>
      <Table columns={columns} rows={rows} />
      <div className="flex flex-col gap-4 rounded-b-[18px] bg-[#f7f4ef] px-6 py-4 text-sm text-[#686f80] sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {rows.length} of {total} drills
        </div>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
      <DrillFormModal
        categories={categories}
        initialData={editing}
        onClose={() => {
          setOpen(false)
          setEditing(null)
        }}
        onSubmit={(values) =>
          saveMutation.mutateAsync({ ...values, id: editing?.id })
        }
        open={open}
      />
    </div>
  )
}
