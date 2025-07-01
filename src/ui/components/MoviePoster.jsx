import { ToggleButtonFavorites } from '@/ui/components/ToggleButtonFavorites'
import { ToggleButtonWatchlist } from '@/ui/components/ToggleButtonWatchlist'
import '@/styles/components/movie-poster.scss'

export function MoviePoster({ posterPath, title, isFavorite, isInWatchlist, details, userId }) {
  return (
    <div className="movie-poster">
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <div className="poster-actions">
        <ToggleButtonFavorites isFavorite={isFavorite} movieDetails={details} userId={userId} />
        <ToggleButtonWatchlist isInWatchlist={isInWatchlist} movieDetails={details} userId={userId} />
      </div>
    </div>
  )
}
