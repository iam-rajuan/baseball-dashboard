import { api, unwrap } from '@/services/api'

type PresignResult = {
  uploadUrl: string
  fileUrl: string
  key: string
}

export const uploadService = {
  uploadFile: async (file: File, folder = 'general') => {
    const presign = await unwrap<PresignResult>(
      api.post('/uploads/presign', {
        fileName: file.name,
        contentType: file.type,
        folder,
      }),
    )

    await fetch(presign.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    return presign.fileUrl
  },
}
