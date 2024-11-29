import axios from 'axios'

// Create Axios instance with base configuration
const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 2000, // Timeout after 2 seconds
})

// Add Bearer Token and Debugging with Interceptors
client.interceptors.request.use((config) => {
  const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN
  console.log('Bearer Token:', bearerToken) // Debug log
  if (bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`
  } else {
    console.error('Bearer Token is missing!')
  }
  console.log('Authorization Header:', config.headers.Authorization) // Debug log
  console.log('URL:', config.baseURL + config.url) // Debug log
  console.log('Params:', config.params || 'No Params') // Debug log
  return config
}, (error) => {
  console.error('Request Error:', error)
  return Promise.reject(error)
})

// Export HTTP methods for use in the app
const get = client.get
const post = client.post
const put = client.put
const patch = client.patch
const del = client.delete

export { get, post, put, patch, del }
