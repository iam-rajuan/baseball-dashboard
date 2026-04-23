import { api, unwrap } from '@/services/api'
import type { Situation } from '@/types/entities'

export type SituationPayload = Omit<Situation, 'id' | 'createdAt'> & {
  id?: string
}

export const situationService = {
  getAll: async (): Promise<Situation[]> =>
    unwrap(api.get('/situations')).then((items) =>
      (items as Record<string, unknown>[]).map((item) => ({
        id: String(item.id),
        title: String(item.title),
        image: String(item.image),
        displayOrder: Number(item.displayOrder),
        featured: Boolean(item.featured),
        createdAt: String(item.createdAt),
      })),
    ),
  save: async (payload: SituationPayload): Promise<unknown> => {
    const request = payload.id
      ? api.patch(`/situations/${payload.id}`, payload)
      : api.post('/situations', payload)

    return unwrap(request)
  },
}
