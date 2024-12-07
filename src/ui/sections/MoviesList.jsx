import { Card } from '@/ui/components/Card'
import { GENRE_MAP } from '@/config/genres'
import '@/styles/sections/movies-list.scss'

export function MoviesList({ movies = [], favorites = [], watchlist = [], onToggleFavorite, onToggleWatchlist }) {
  const isInWatchlist = (movieId) => watchlist.some((movie) => Number(movie.id) === Number(movieId))
  const isFavorite = (movieId) => favorites.some((movie) => Number(movie.id) === Number(movieId))

  if (!movies || movies.length === 0) {
    return <p className="movies-list-empty">No movies available</p>
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          genres={movie.genre_ids?.map((id) => GENRE_MAP[id] || 'Unknown') || []}
          isFavorite={isFavorite(movie.id)}
          isInWatchlist={isInWatchlist(movie.id)}
          onToggleFavorite={() => onToggleFavorite(movie)}
          onToggleWatchlist={() => onToggleWatchlist(movie)}
        />
      ))}
    </div>
  )
}
