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
  genres = [], // Default to an empty array
  isFavorite,
  isInWatchlist,
}) {
  const userId = useSelector((state) => state.auth.user?.uid)

  // Prepare full movie details
  const movieDetails = {
    id,
    title: title || 'Untitled',
    poster_path: poster,
    genres,
  }

  return (
    <div className="card">
      <Link to={`/movies/${id}`} className="card-clickable-area">
        <div className="card-poster">
          <img src={poster || 'placeholder.jpg'} alt={title || 'Untitled'} className="card-image" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{title || 'Untitled'}</h3>
          <p className="card-genres">
            {genres.length > 0 ? genres.join(' • ') : 'No genres available'}
          </p>
        </div>
      </Link>
      <div className="card-actions">
        <ButtonAddToCart
          userId={userId}
          movieDetails={movieDetails} // Pass full movie details
          type="secondary"
          size="medium"
        />
        <ToggleButtonFavorites
          isFavorite={isFavorite}
          movieDetails={movieDetails} // Pass full movie details
          userId={userId}
        />
        <ToggleButtonWatchlist
          isInWatchlist={isInWatchlist}
          movieDetails={movieDetails} // Pass full movie details
          userId={userId}
        />
      </div>
    </div>
  )
}
