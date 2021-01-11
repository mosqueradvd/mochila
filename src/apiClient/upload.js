import API from 'apiClient/base'
import axios from 'axios'

export const getSignedUrl = params => API.get('/api/upload/new', { params }).then((response) => response.data)

export const uploadFile = async ({ filePrefix, file, onProgress }) => {
  const { signedUrl, unsignedUrl } = await getSignedUrl({
    fileName: `${filePrefix}-${file.name}`,
    contentType: file.type
  })

  const options = {
    headers: {
      'content-Type': file.type
    },
    timeout: 30000,
    onUploadProgress (progressEvent) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      onProgress(percentCompleted)
    }
  }

  await axios.put(signedUrl, file, options)

  return unsignedUrl
}
