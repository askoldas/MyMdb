import { get } from '../utils/client'

export const fetchPopularMovies = async ({ page }) => {
  const validatedPage = Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1
  console.log('Page sent to API:', validatedPage)
  const response = await get('/movie/popular', { params: { page: validatedPage, language: 'en-US' } })
  return response.data
}
