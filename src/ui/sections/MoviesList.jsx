import { Card } from '@/ui/components/Card'
import { GENRE_MAP } from '@/config/genres'
import '@/styles/sections/movies-list.scss'

export function MoviesList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className="movies-list-empty">No movies available</p>
  }

  const mapGenres = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return ['No genres available']
    return genreIds.map((id) => GENRE_MAP[id] || 'Unknown')
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          title={movie.title}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          genres={mapGenres(movie.genre_ids)}
        />
      ))}
    </div>
  )
}
