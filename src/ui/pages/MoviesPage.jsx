import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopularMovies } from '@/redux/movies-slice'
import { GENRE_MAP } from '@/config/genres'
import { Card } from '@/ui/components/Card'
import { Pagination } from '@/ui/components/Pagination'
import '@/styles/pages/movies-page.scss'


export function MoviesPage() {
  const dispatch = useDispatch()
  const { list: movies, loading, error, page, totalPages } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchPopularMovies(page)) // Fetch movies for the current page
  }, [dispatch, page])

  const handlePageChange = (newPage) => {
    dispatch(fetchPopularMovies(newPage)) // Update movies for the selected page
  }

  if (loading) return <p>Loading movies...</p>
  if (error) return <p>Error loading movies: {error}</p>

  return (
    <div>
      <h1>Movies Page</h1>
      <div className="movies-grid">
        {movies.map((movie) => {
          const genres = movie.genre_ids?.map((id) => GENRE_MAP[id]) || []
          return (
            <Card
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              genres={genres}
            />
          )
        })}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
