import apiClient from './base'

export const getAll = async () => {
  const response = await apiClient.get('/api/organizations')
  return response.data
}

export const getOne = async (id) => {
  const response = await apiClient.get(`/api/organizations/${id}`)
  return response.data
}

export const create = async (data) => {
  const response = await apiClient.post('/api/organizations', data)

  return response.data
}

export const update = async ({ id, data }) => {
  const response = await apiClient.post(`/api/organizations/${id}`, data)

  return response.data
}
