import { ToggleButtonFavorites } from '@/ui/components/ToggleButtonFavorites'
import { ToggleButtonWatchlist } from '@/ui/components/ToggleButtonWatchlist'
import { ButtonAddToCart } from '@/ui/components/ButtonAddToCart'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
  const userId = useSelector((state) => state.auth.user?.uid)

  return (
    <div className="card">
      {/* Poster */}
      <div className="card-poster">
        <Link to={`/movies/${id}`} className="card-link">
          <img src={poster} alt={title} className="card-image" />
        </Link>
        <div className="card-hover-actions">
          <ButtonAddToCart
            userId={userId}
            movieDetails={{ id, title }}
            type="primary" // Set the button to primary style
            size="large" // Ensure the button is large
          />
        </div>
      </div>

      {/* Content */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-genres">
          {genres && genres.length > 0 ? genres.join(' • ') : 'No genres available'}
        </p>
      </div>

      {/* Actions */}
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
