import { get } from '@/utils/client'

export const fetchPopularMovies = async ({ page }) => {
  try {
    const validatedPage = Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1
    const response = await get('/movie/popular', { params: { page: validatedPage, language: 'en-US' } })
    return response.data
  } catch (error) {
    console.error('Error fetching popular movies:', error.message)
    throw new Error('Failed to fetch popular movies. Please try again later.')
  }
}
