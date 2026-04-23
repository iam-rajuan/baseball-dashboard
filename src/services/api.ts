import axios from 'axios'

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/v1',
})

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('mba-dashboard-token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Request failed'

    return Promise.reject(new Error(message))
  },
)

export type ApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
}

export const unwrap = async <T>(request: Promise<{ data: ApiEnvelope<T> }>) => {
  const response = await request
  return response.data.data
}
