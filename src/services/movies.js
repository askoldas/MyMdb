import { get } from '@/utils/client'
import { tmdbEndpoints } from '@/config/TmdbApi'

export const fetchMoviesService = async ({ page, sortBy = 'popularity.desc', filters = {} }) => {
  try {
    const validatedPage = Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1

    // Prepare params object for the API request
    const params = {
      page: validatedPage,
      language: 'en-US',
      sort_by: sortBy,
      // Fix genre filter to send a comma-separated string of genre IDs
      with_genres: filters.genres?.map(genre => genre.id).join(',') || undefined,
      'vote_average.gte': filters.ratingRange?.from || undefined,
      'vote_average.lte': filters.ratingRange?.to || undefined,
      // Fix year range filter by checking if from and to year exist
      'primary_release_date.gte': filters.yearRange?.from ? `${filters.yearRange.from}-01-01` : undefined,
      'primary_release_date.lte': filters.yearRange?.to ? `${filters.yearRange.to}-12-31` : undefined,
    }

    const response = await get(tmdbEndpoints.discover.movies, { params })
    return response.data
  } catch (error) {
    console.error('Error fetching movies:', error.message)
    throw new Error('Failed to fetch movies. Please try again later.')
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
