const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const getRequiredEnv = (key: keyof ImportMetaEnv) => {
  const value = import.meta.env[key]?.trim()

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

const getUrlOrigin = (value: string, key: keyof ImportMetaEnv) => {
  try {
    return new URL(value).origin
  } catch {
    throw new Error(`Invalid URL configured for ${key}`)
  }
}

const apiBaseUrl = trimTrailingSlash(getRequiredEnv('VITE_API_BASE_URL'))
const backendBaseUrl = trimTrailingSlash(getRequiredEnv('VITE_BACKEND_BASE_URL'))
const uploadsBaseUrl = trimTrailingSlash(getRequiredEnv('VITE_UPLOADS_BASE_URL'))

export const env = {
  apiBaseUrl,
  backendBaseUrl,
  uploadsBaseUrl,
  apiOrigin: getUrlOrigin(apiBaseUrl, 'VITE_API_BASE_URL'),
  backendOrigin: getUrlOrigin(backendBaseUrl, 'VITE_BACKEND_BASE_URL'),
} as const
