import { get } from '@/utils/client'
import { tmdbEndpoints } from '@/config/TmdbApi'

export const fetchPopularMoviesService = async ({ page }) => {
  try {
    const validatedPage = Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1
    const response = await get(tmdbEndpoints.movies.popular, {
      params: { page: validatedPage, language: 'en-US' },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching popular movies:', error.message)
    throw new Error('Failed to fetch popular movies. Please try again later.')
  }
}

export const fetchMovieDetailsService = async (movieId) => {
  try {
    if (!movieId) throw new Error('Movie ID is required')
    const response = await get(tmdbEndpoints.movies.details(movieId), {
      params: { append_to_response: 'credits', language: 'en-US' },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error.message)
    throw new Error('Failed to fetch movie details. Please try again later.')
  }
}

export const fetchSearchMoviesService = async ({ query, page }) => {
  try {
    if (!query) throw new Error('Search query is required')
    const validatedPage = Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1
    const response = await get(tmdbEndpoints.search.movies, {
      params: { query, page: validatedPage, language: 'en-US' },
    })
    return response.data
  } catch (error) {
    console.error('Error searching movies:', error.message)
    throw new Error('Failed to search for movies. Please try again later.')
  }
}
