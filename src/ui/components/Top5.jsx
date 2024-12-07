import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesService } from '@/services/movies'
import { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } from '@/redux/user-collections-slice'
import { GENRE_MAP } from '@/config/genres'
import { Card } from '@/ui/components/Card'
import '@/styles/components/top5.scss'

export function Top5({ genre }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const { favorites, watchlist } = useSelector((state) => state.userCollections)
  const userId = useSelector((state) => state.auth.user?.uid)

  useEffect(() => {
    const fetchTopMovies = async () => {
      const genreId = Object.keys(GENRE_MAP).find((key) => GENRE_MAP[key] === genre)
      if (!genreId) {
        setError(`Invalid genre: ${genre}`)
        setLoading(false)
        return
      }

      try {
        const { results } = await fetchMoviesService({
          page: 1,
          sortBy: 'vote_average.desc',
          filters: { genres: [{ id: parseInt(genreId, 10) }] },
        })
        setMovies(results.slice(0, 5))
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTopMovies()
  }, [genre])

  const handleToggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFromFavorites({ uid: userId, movieId: movie.id }))
    } else {
      dispatch(addToFavorites({ uid: userId, movie }))
    }
  }

  const handleToggleWatchlist = (movie) => {
    if (watchlist.some((item) => item.id === movie.id)) {
      dispatch(removeFromWatchlist({ uid: userId, movieId: movie.id }))
    } else {
      dispatch(addToWatchlist({ uid: userId, movie }))
    }
  }

  if (loading) return <div className="top5-loading">Loading {genre} movies...</div>
  if (error) return <div className="top5-error">Error loading {genre} movies: {error}</div>

  return (
    <div className="top5">
      <h2 className="top5-title">Top 5 {genre} Movies</h2>
      <div className="top5-list">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            genres={movie.genre_ids}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            isInWatchlist={watchlist.some((item) => item.id === movie.id)}
            onToggleFavorite={() => handleToggleFavorite(movie)}
            onToggleWatchlist={() => handleToggleWatchlist(movie)}
          />
        ))}
      </div>
    </div>
  )
}
