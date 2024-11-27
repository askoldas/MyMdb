import { get } from '../utilities/client'

const MoviesEndpoint = '/movie/popular'
const movieDetailsEndpoint = '/movie/'

export const fetchMovies = async (params = {}) => {
  try {
    const response = await get(MoviesEndpoint, { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await get(`${movieDetailsEndpoint}${movieId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
