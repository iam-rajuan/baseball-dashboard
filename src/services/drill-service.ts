import { api, unwrap } from '@/services/api'
import type { Drill } from '@/types/entities'

export type DrillPayload = Omit<Drill, 'id' | 'createdAt'> & {
  id?: string
}

export type DrillRow = Drill & { categoryName: string }

const normalizeAccessLevel = (value: string) =>
  (value.charAt(0).toUpperCase() + value.slice(1)) as Drill['accessLevel']

export const drillService = {
  getAll: async (): Promise<DrillRow[]> =>
    unwrap(api.get('/drills')).then((items) =>
      (items as Record<string, unknown>[]).map((item) => ({
        id: String(item.id),
        name: String(item.name),
        categoryId: String(item.categoryId),
        description: String(item.description),
        cover: String(item.cover),
        accessLevel: normalizeAccessLevel(String(item.accessLevel)),
        createdAt: String(item.createdAt),
        categoryName: String(item.categoryName ?? ''),
      })),
    ),
  save: async (payload: DrillPayload): Promise<unknown> => {
    const request = payload.id
      ? api.patch(`/drills/${payload.id}`, {
          ...payload,
          accessLevel: payload.accessLevel.toLowerCase(),
        })
      : api.post('/drills', {
          ...payload,
          accessLevel: payload.accessLevel.toLowerCase(),
        })

    return unwrap(request)
  },
  remove: async (id: string): Promise<void> => unwrap(api.delete(`/drills/${id}`)),
}
