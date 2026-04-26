import { api, unwrap, unwrapPaginated } from '@/services/api'
import type { Drill } from '@/types/entities'

export type DrillPayload = Pick<
  Drill,
  'name' | 'categoryId' | 'description' | 'cover' | 'accessLevel'
> & {
  id?: string
}

export type DrillRow = Drill & { categoryName: string }
export type DrillQuery = {
  page?: number
  limit?: number
  categoryId?: string
  accessLevel?: 'all' | 'free' | 'premium' | 'locked'
  search?: string
}

const normalizeAccessLevel = (value: string) =>
  (value.charAt(0).toUpperCase() + value.slice(1)) as Drill['accessLevel']

const toStringValue = (value: unknown) => (typeof value === 'string' ? value : '')

const mapDrill = (item: Record<string, unknown>): DrillRow => ({
  id: String(item.id),
  name: toStringValue(item.name),
  categoryId: toStringValue(item.categoryId),
  description: toStringValue(item.description),
  cover: toStringValue(item.cover || item.coverUrl || item.coverPhotoUrl),
  coverUrl: toStringValue(item.coverUrl),
  coverPhoto: toStringValue(item.coverPhoto),
  coverPhotoUrl: toStringValue(item.coverPhotoUrl),
  imageUrl: toStringValue(item.imageUrl),
  accessLevel: normalizeAccessLevel(String(item.accessLevel)),
  createdAt: toStringValue(item.createdAt),
  categoryName: toStringValue(item.categoryName),
})

export const drillService = {
  getAll: async (): Promise<DrillRow[]> =>
    unwrap(api.get('/drills')).then((items) =>
      (items as Record<string, unknown>[]).map(mapDrill),
    ),
  getPage: async (query: DrillQuery) =>
    unwrapPaginated<Record<string, unknown>>(
      api.get('/drills', { params: query }),
    ).then((result) => ({
      items: result.items.map(mapDrill),
      pagination: result.pagination,
    })),
  save: async (payload: DrillPayload): Promise<unknown> => {
    const body = {
      name: payload.name,
      categoryId: payload.categoryId,
      description: payload.description,
      cover: payload.cover,
      accessLevel: payload.accessLevel.toLowerCase(),
    }
    const request = payload.id
      ? api.patch(`/drills/${payload.id}`, body)
      : api.post('/drills', body)

    return unwrap(request)
  },
  remove: async (id: string): Promise<void> => unwrap(api.delete(`/drills/${id}`)),
}
