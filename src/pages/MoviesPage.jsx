import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from '@/redux/movies-slice'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Pagination } from '@/ui/components/Pagination'
import { Page } from '@/pages/Page'
import '@/styles/pages/movies-page.scss'

export function MoviesPage() {
  const dispatch = useDispatch()

  const { list: movies, page, totalPages } = useSelector(state => state.movies)
  const { sortBy, genres, yearRange, ratingRange } = useSelector(state => state.filter.appliedFilters)
  const { favorites, watchlist } = useSelector(state => state.userCollections)

  useEffect(() => {
    dispatch(fetchMovies({ page, sortBy, filters: { genres, yearRange, ratingRange } }))
  }, [dispatch, page, sortBy, genres, yearRange, ratingRange])

  const handlePageChange = newPage => {
    dispatch(fetchMovies({ page: newPage, sortBy, filters: { genres, yearRange, ratingRange } }))
  }

  return (
    <Page>
      <h1>Movies</h1>
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
