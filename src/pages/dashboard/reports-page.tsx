import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Eye, Search } from 'lucide-react'
import { ReportDetailsModal } from '@/features/reports/report-details-modal'
import { Pagination } from '@/components/ui/pagination'
import { Select } from '@/components/ui/select'
import { Table, type Column } from '@/components/ui/table'
import { cityOptions } from '@/constants/options'
import { reportService } from '@/services/report-service'
import type { Report } from '@/types/entities'
import { formatDate } from '@/utils/format'

const pageSize = 10

export const ReportsPage = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [city, setCity] = useState('All')
  const [page, setPage] = useState(1)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const { data = [] } = useQuery({
    queryKey: ['reports'],
    queryFn: reportService.getAll,
  })

  const filtered = useMemo(() => {
    return data.filter((report) => {
      const matchesSearch =
        !search ||
        report.user.toLowerCase().includes(search.toLowerCase()) ||
        report.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status === 'All' || report.status === status
      const matchesCity = city === 'All' || report.city === city

      return matchesSearch && matchesStatus && matchesCity
    })
  }, [city, data, search, status])

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

  const columns: Column<Report>[] = [
    {
      key: 'id',
      header: 'S.ID',
      render: () => <span>01</span>,
    },
    {
      key: 'name',
      header: 'Full Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            alt={row.user}
            className="size-9 rounded-full object-cover"
            src="https://placehold.co/64x64/e4e7ef/111f5a?text=RF"
          />
          <span className="font-semibold text-brand-navy">{row.user}</span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (row) => <span>{row.email}</span>,
    },
    {
      key: 'createdAt',
      header: 'Joined Date',
      render: (row) => (
        <span className="font-semibold text-brand-navy">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (row) => (
        <button
          className="text-brand-navy"
          onClick={() => setSelectedReport(row)}
          type="button"
        >
          <Eye className="size-5" />
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6 px-1">
      <h1 className="text-[30px] font-medium text-brand-ink">
        Report Management
      </h1>
      <div className="dashboard-panel grid gap-3 p-3 lg:grid-cols-4">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#a4adbc]" />
          <input
            className="h-12 w-full rounded-xl border border-[#e6e0d5] bg-white pl-11 pr-4 text-sm outline-none"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email..."
            value={search}
          />
        </label>
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="All">Status: All</option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
        </Select>
        <Select value={city} onChange={(event) => setCity(event.target.value)}>
          {cityOptions.map((item) => (
            <option key={item} value={item}>
              City: {item}
            </option>
          ))}
        </Select>
        <Select defaultValue="points">
          <option value="points">Points Range</option>
          <option value="0-100">0-100</option>
          <option value="100-500">100-500</option>
        </Select>
      </div>
      <Table columns={columns} rows={rows} />
      <div className="flex flex-col gap-4 rounded-b-[18px] border border-t-0 border-[#ebe7e0] bg-white px-6 py-4 text-sm text-[#686f80] sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {rows.length} of {filtered.length} results
        </div>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
      <ReportDetailsModal
        onClose={() => setSelectedReport(null)}
        open={Boolean(selectedReport)}
        report={selectedReport}
      />
    </div>
  )
}
