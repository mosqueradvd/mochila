import apiClient from './base'

export const getAll = async () => {
  const response = await apiClient.get('/api/projects')
  return response.data
}

export const getOne = async (id) => {
  const response = await apiClient.get(`/api/projects/${id}`)
  return response.data
}

export const create = async (data) => {
  const response = await apiClient.post('/api/projects', data)

  return response.data
}

export const update = async ({ id, data }) => {
  const response = await apiClient.post(`/api/projects/${id}`, data)

  return response.data
}

export const updateProjectStatus = async ({ id, projectStatus }) => {
  const response = await apiClient.post(`/api/projects/status/${id}`, { projectStatus })

  return response.data
}
