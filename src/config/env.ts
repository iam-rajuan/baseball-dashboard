const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const getRequiredEnv = (key: keyof ImportMetaEnv) => {
  const value = import.meta.env[key]?.trim()

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

const getOptionalEnv = (key: keyof ImportMetaEnv) => {
  const value = import.meta.env[key]?.trim()
  return value ? trimTrailingSlash(value) : undefined
}

const getUrlOrigin = (value: string, key: keyof ImportMetaEnv) => {
  try {
    return new URL(value).origin
  } catch {
    throw new Error(`Invalid URL configured for ${key}`)
  }
}

const apiBaseUrl = trimTrailingSlash(getRequiredEnv('VITE_API_BASE_URL'))
const apiOrigin = getUrlOrigin(apiBaseUrl, 'VITE_API_BASE_URL')
const backendBaseUrl = getOptionalEnv('VITE_BACKEND_BASE_URL') ?? apiOrigin
const uploadsBaseUrl =
  getOptionalEnv('VITE_UPLOADS_BASE_URL') ?? `${backendBaseUrl}/uploads`

export const env = {
  apiBaseUrl,
  backendBaseUrl,
  uploadsBaseUrl,
  apiOrigin,
  backendOrigin: getUrlOrigin(backendBaseUrl, 'VITE_BACKEND_BASE_URL'),
} as const
