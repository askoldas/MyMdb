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
}) {
  const userId = useSelector((state) => state.auth.user?.uid)

  return (
    <div className="card">
      <div className="card-poster">
        <Link to={`/movies/${id}`} className="card-link">
          <img src={poster} alt={title} className="card-image" />
        </Link>
        <div className="card-hover-actions">
          <ButtonAddToCart
            userId={userId}
            movieId={id}
            title={title}
            type="primary"
            size="large"
          />
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">
          <Link to={`/movies/${id}`}>{title}</Link>
        </h3>
        <p className="card-genres">
          {genres && genres.length > 0 ? genres.join(' • ') : 'No genres available'}
        </p>
      </div>
      <div className="card-actions">
        <ToggleButtonFavorites
          isFavorite={isFavorite}
          movieId={id}
          userId={userId}
        />
        <ToggleButtonWatchlist
          isInWatchlist={isInWatchlist}
          movieId={id}
          userId={userId}
        />
      </div>
    </div>
  )
}
