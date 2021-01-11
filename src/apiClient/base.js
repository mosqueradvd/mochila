import axios from 'axios'
import humps from 'humps'

const axiosConfig = {
  withCredentials: true,
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
}

const apiClient = axios.create(axiosConfig)

export default apiClient
