import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopularMovies } from '@/redux/movies-slice'
import { GENRE_MAP } from '@/config/genres'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Pagination } from '@/ui/components/Pagination'
import { Page } from '@/ui/pages/Page'
import '@/styles/pages/movies-page.scss'

export function MoviesPage() {
  const dispatch = useDispatch()
  const { list: movies, loading, error, page, totalPages } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchPopularMovies(page))
  }, [dispatch, page])

  const handlePageChange = (newPage) => {
    dispatch(fetchPopularMovies(newPage))
  }

  if (loading) return <Page><p>Loading movies...</p></Page>
  if (error) return <Page><p>Error loading movies: {error}</p></Page>

  return (
    <Page>
      <div className="movies-page">
        <MoviesList
          movies={movies}
          getGenres={(genreIds) => genreIds?.map((id) => GENRE_MAP[id]) || []}
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
