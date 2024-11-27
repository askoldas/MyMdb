import axios from 'axios'
import { baseURL, apiKey } from '../config/api'

const client = axios.create({
  baseURL,
  timeout: 2000,
  withCredentials: false
})

// Add API key to all requests
client.interceptors.request.use((config) => {
  if (config.params) {
    config.params.api_key = apiKey
  } else {
    config.params = { api_key: apiKey }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

const get = client.get
const post = client.post
const put = client.put
const patch = client.patch
const del = client.delete

export { get, post, put, patch, del }
