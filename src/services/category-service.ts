import { api, unwrap, unwrapPaginated } from '@/services/api'
import type { Category } from '@/types/entities'

export type CategoryPayload = Omit<Category, 'id' | 'totalDrills'> & {
  id?: string
}

export type CategoryQuery = {
  page?: number
  limit?: number
  accessLevel?: 'all' | 'free' | 'premium' | 'locked'
  search?: string
}

const normalizeAccessLevel = (value: string) =>
  (value.charAt(0).toUpperCase() + value.slice(1)) as Category['accessLevel']

const mapCategory = (item: Record<string, unknown>): Category => ({
  id: String(item.id),
  name: String(item.name),
  subtitle: String(item.subtitle),
  cover: String(item.cover),
  icon: String(item.icon),
  accessLevel: normalizeAccessLevel(String(item.accessLevel)),
  totalDrills: Number(item.totalDrills),
})

export const categoryService = {
  getAll: async (): Promise<Category[]> =>
    unwrap(api.get('/drill-categories')).then((items) =>
      (items as Record<string, unknown>[]).map(mapCategory),
    ),
  getPage: async (query: CategoryQuery) =>
    unwrapPaginated<Record<string, unknown>>(
      api.get('/drill-categories', { params: query }),
    ).then((result) => ({
      items: result.items.map(mapCategory),
      pagination: result.pagination,
    })),
  save: async (payload: CategoryPayload): Promise<Category> => {
    const request = payload.id
      ? api.patch(`/drill-categories/${payload.id}`, {
          ...payload,
          accessLevel: payload.accessLevel.toLowerCase(),
        })
      : api.post('/drill-categories', {
          ...payload,
          accessLevel: payload.accessLevel.toLowerCase(),
        })

    return unwrap(request)
  },
  remove: async (id: string): Promise<void> =>
    unwrap(api.delete(`/drill-categories/${id}`)),
}
