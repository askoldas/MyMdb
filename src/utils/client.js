import axios from 'axios';
import { tmdbBaseURL } from '@/config/TmdbApi.js';

const client = axios.create({
  baseURL: tmdbBaseURL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 2000,
});

client.interceptors.request.use(
  (config) => {
    const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    } else {
      console.warn('Bearer Token is missing. Ensure VITE_TMDB_BEARER_TOKEN is set in the environment variables.');
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error.message);
    return Promise.reject(error);
  }
);

const get = client.get;
const post = client.post;
const put = client.put;
const patch = client.patch;
const deleteRequest = client.delete;

export { get, post, put, patch, deleteRequest };
