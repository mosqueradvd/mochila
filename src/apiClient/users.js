import apiClient from './base'

export const getAll = async () => {
  const response = await apiClient.get('/api/users')
  return response.data
}

export const getOne = async (id) => {
  const response = await apiClient.get(`/api/users/${id}`)
  return response.data
}

export const create = async (data) => {
  const response = await apiClient.post('/api/users', data)
  return response.data
}

export const update = async ({ id, data }) => {
  const response = await apiClient.post(`/api/users/${id}`, data)
  return response.data
}

export const updateUserStatus = async ({ id, data }) => {
  const response = await apiClient.post(`/api/users/status/${id}`, data)
  return response.data
}
