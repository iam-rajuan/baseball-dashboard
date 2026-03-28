import { useQuery } from '@tanstack/react-query'
import { Banknote, FolderKanban, ShoppingCart } from 'lucide-react'
import { PageTitle } from '@/components/shared/page-title'
import { StatsCard } from '@/components/shared/stats-card'
import { Table, type Column } from '@/components/ui/table'
import { dashboardService } from '@/services/dashboard-service'
import type { Earning } from '@/types/entities'
import { formatCurrency, formatDateTime, formatNumber } from '@/utils/format'

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
      <span className="inline-flex rounded-full bg-[#f1f4f8] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#75809b]">
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

export const DashboardOverviewPage = () => {
  const { data } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: dashboardService.getOverview,
  })

  return (
    <div className="space-y-8 px-1">
      <PageTitle
        description="Real-time performance metrics and operational analytics for the Southeast's premier developmental facility. Tracking growth since 2012."
        eyebrow="Dashboard Overview"
        title="Marietta Baseball Academy"
      />
      <div className="grid gap-5 xl:grid-cols-3">
        <StatsCard
          icon={FolderKanban}
          title="Drill Categories"
          value={formatNumber(data?.categoryCount ?? 0)}
        />
        <StatsCard
          accent="Live •"
          icon={ShoppingCart}
          title="Total Purchases"
          value={formatNumber(data?.totalPurchases ?? 0)}
        />
        <StatsCard
          dark
          icon={Banknote}
          title="Monthly Revenue"
          value={formatCurrency(data?.monthlyRevenue ?? 0)}
        />
      </div>
      <section className="space-y-4">
        <div className="section-kicker">Recent Activity</div>
        <Table columns={columns} rows={data?.recentActivity ?? []} />
      </section>
    </div>
  )
}
