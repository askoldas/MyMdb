import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 2000,
})

client.interceptors.request.use((config) => {
  const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN
  console.log('Bearer Token:', bearerToken)
  if (bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`
  } else {
    console.error('Bearer Token is missing!')
  }
  console.log('Authorization Header:', config.headers.Authorization)
  console.log('URL:', config.baseURL + config.url)
  console.log('Params:', config.params || 'No Params')
  return config
}, (error) => {
  console.error('Request Error:', error)
  return Promise.reject(error)
})

const get = client.get
const post = client.post
const put = client.put
const patch = client.patch
const del = client.delete

export { get, post, put, patch, del }
