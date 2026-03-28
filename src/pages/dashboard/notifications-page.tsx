import { useQuery } from '@tanstack/react-query'
import { BellRing } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { notificationService } from '@/services/notification-service'

export const NotificationsPage = () => {
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.getAll,
  })

  return (
    <div className="space-y-6 px-1">
      <h1 className="text-[32px] font-semibold text-brand-ink">
        All Notifications
      </h1>
      <div className="space-y-4">
        {data?.map((item) => (
          <Card key={item.id} className="flex items-start gap-4 px-5 py-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-brand-navy text-white">
              <BellRing className="size-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="text-lg font-semibold text-brand-ink">
                  {item.title}
                </div>
                <div className="text-sm text-[#8b93a3]">Fri, 12:30pm</div>
              </div>
              <p className="mt-2 text-sm leading-7 text-brand-body">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
