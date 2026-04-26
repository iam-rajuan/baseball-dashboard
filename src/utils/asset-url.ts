import { env } from '@/config/env'

const hasProtocol = (value: string) =>
  /^(https?:)?\/\//i.test(value) ||
  value.startsWith('data:') ||
  value.startsWith('blob:')

export const isImageReference = (value?: string | null) => {
  const url = value?.trim()
  if (!url) return false

  return (
    hasProtocol(url) ||
    url.startsWith('/uploads') ||
    url.startsWith('uploads/') ||
    /(^|\/)[^/]+\.(avif|gif|jpe?g|png|webp|svg)$/i.test(url)
  )
}

export const getImageUrl = (value?: string | null) => {
  const url = value?.trim()
  if (!url) return ''

  if (hasProtocol(url)) {
    return url
  }

  if (url.startsWith('/uploads')) {
    return `${env.backendBaseUrl}${url}`
  }

  if (url.startsWith('uploads/')) {
    return `${env.backendBaseUrl}/${url}`
  }

  if (url.startsWith('/')) {
    return `${env.backendBaseUrl}${url}`
  }

  return `${env.uploadsBaseUrl}/${url}`
}

export const resolveAssetUrl = getImageUrl
