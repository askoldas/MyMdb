import { ToggleButtonFavorites } from '@/ui/components/ToggleButtonFavorites'
import { ToggleButtonWatchlist } from '@/ui/components/ToggleButtonWatchlist'
import { Link } from 'react-router-dom'
import '@/styles/components/card.scss'

export function Card({
  id,
  title,
  poster,
  genres,
  isFavorite,
  isInWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
}) {
  return (
    <div className="card">
      <Link to={`/movies/${id}`} className="card-link">
        <img src={poster} alt={title} className="card-image" />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-genres">
            {genres && genres.length > 0 ? genres.join(' • ') : 'No genres available'}
          </p>
        </div>
      </Link>
      <div className="card-actions">
        <ToggleButtonFavorites
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
        <ToggleButtonWatchlist
          isInWatchlist={isInWatchlist}
          onToggleWatchlist={onToggleWatchlist}
        />
      </div>
    </div>
  )
}
