import { api, unwrap } from '@/services/api'
import type { UploadProviderStatus } from '@/types/entities'

type UploadResult = {
  fileUrl: string
  key: string
  provider: 'local' | 's3'
  mode: 'server' | 'presigned'
}

export const uploadService = {
  getProviderStatus: async (): Promise<UploadProviderStatus> =>
    unwrap(api.get('/uploads/provider')),
  uploadFile: async (file: File, folder = 'general') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const result = await unwrap<UploadResult>(
      api.post('/uploads/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    )

    return result.fileUrl
  },
}
