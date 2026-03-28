import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1,
  )

  return (
    <div className="flex items-center gap-2">
      <button
        className="flex size-8 items-center justify-center rounded-lg border border-brand-line bg-white text-[#7d8394]"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        type="button"
      >
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={cn(
            'flex size-8 items-center justify-center rounded-lg text-sm font-semibold',
            page === currentPage
              ? 'bg-brand-navy text-white'
              : 'border border-brand-line bg-white text-brand-ink',
          )}
          onClick={() => onPageChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}
      {totalPages > 3 ? (
        <span className="px-1 text-sm text-[#757b8b]">...</span>
      ) : null}
      {totalPages > 3 ? (
        <button
          className="flex size-8 items-center justify-center rounded-lg border border-brand-line bg-white text-sm font-semibold text-brand-ink"
          onClick={() => onPageChange(totalPages)}
          type="button"
        >
          {totalPages}
        </button>
      ) : null}
      <button
        className="flex size-8 items-center justify-center rounded-lg border border-brand-line bg-white text-[#7d8394]"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        type="button"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
