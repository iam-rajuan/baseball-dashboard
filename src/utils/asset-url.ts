import { env } from '@/config/env'

export const resolveAssetUrl = (value?: string | null) => {
  const url = value?.trim()
  if (!url) return ''

  if (
    /^(https?:)?\/\//i.test(url) ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url
  }

  if (url.startsWith('/')) {
    return `${env.apiOrigin}${url}`
  }

  return url
}
