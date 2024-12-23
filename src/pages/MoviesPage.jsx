import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from '@/redux/movies-slice'
import {
  fetchFavorites,
  fetchWatchlist,
  clearUserCollections,
} from '@/redux/user-collections-slice'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Pagination } from '@/ui/components/Pagination'
import { Page } from '@/pages/Page'
import { Preloader } from '@/ui/components/Preloader'
import '@/styles/pages/movies-page.scss'

export function MoviesPage() {
  const dispatch = useDispatch()

  const {
    list: movies,
    loading,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.movies)

  const { favorites, watchlist } = useSelector((state) => state.userCollections)

  const { sortBy, genres, yearRange, ratingRange } = useSelector((state) => state.filter.appliedFilters)
  const userId = useSelector((state) => state.auth.user?.uid)

  useEffect(() => {
    dispatch(fetchMovies({ page, sortBy, filters: { genres, yearRange, ratingRange } }))

    if (userId) {
      dispatch(fetchFavorites(userId))
      dispatch(fetchWatchlist(userId))
    } else {
      dispatch(clearUserCollections())
    }
  }, [dispatch, page, sortBy, genres, yearRange, ratingRange, userId])

  const handlePageChange = (newPage) => {
    dispatch(fetchMovies({ page: newPage, sortBy, filters: { genres, yearRange, ratingRange } }))
  }

  if (loading) return <Page><Preloader /></Page>
  if (error) return <Page><p>Error loading movies: {error}</p></Page>

  return (
    <Page>
      <div className="movies-page">
        <MoviesList
          movies={movies}
          favorites={favorites}
          watchlist={watchlist}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Page>
  )
}
