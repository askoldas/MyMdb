import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMovieDetails,
  clearMovieDetails,
  addToFavorites,
  addToWatchlist,
  removeFromFavorites,
  removeFromWatchlist,
} from '@/redux/movies-slice'
import { ToggleButtonFavorites } from '@/ui/components/ToggleButtonFavorites'
import { ToggleButtonWatchlist } from '@/ui/components/ToggleButtonWatchlist'
import '@/styles/pages/movie-detail-page.scss'

export function MovieDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { details, loading, error, favorites, watchlist } = useSelector((state) => state.movies)
  const userId = useSelector((state) => state.auth.user?.uid)

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id))
    }

    return () => {
      dispatch(clearMovieDetails())
    }
  }, [dispatch, id])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!details) return <div className="no-details">No movie details available</div>

  const {
    title,
    genres = [],
    poster_path,
    release_date,
    runtime,
    vote_average,
    overview,
    production_companies = [],
    credits = {},
  } = details

  const formattedReleaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A'
  const formattedReleaseDate = release_date
    ? new Date(release_date).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A'

  const isFavorite = favorites.some((movie) => movie.id === details.id)
  const isInWatchlist = watchlist.some((movie) => movie.id === details.id)

  const handleToggleFavorite = () => {
    console.log(`Before Dispatch - Is Favorite: ${isFavorite}`)
    if (isFavorite) {
      dispatch(removeFromFavorites({ uid: userId, movieId: details.id }))
    } else {
      dispatch(addToFavorites({ uid: userId, movie: details }))
    }
    console.log(`After Dispatch - Is Favorite: ${isFavorite}`)
  }

  const handleToggleWatchlist = () => {
    console.log(`Before Dispatch - Is In Watchlist: ${isInWatchlist}`)
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ uid: userId, movieId: details.id }))
    } else {
      dispatch(addToWatchlist({ uid: userId, movie: details }))
    }
    console.log(`After Dispatch - Is In Watchlist: ${isInWatchlist}`)
  }

  const director = credits.crew?.find((person) => person.job === 'Director')?.name || 'N/A'
  const writers = credits.crew
    ?.filter((person) => person.job === 'Writer' || person.job === 'Screenplay')
    .map((person) => person.name) || []
  const cast = credits.cast?.slice(0, 5).map((actor) => actor.name) || []

  console.log('Current State:', { favorites, watchlist })

  return (
    <div className="movie-page">
      <div className="movie-header">
        <div className="poster">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
          <div className="poster-actions">
            <ToggleButtonFavorites
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
            <ToggleButtonWatchlist
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          </div>
        </div>
        <div className="info">
          <h1 className="title">{title}</h1>
          <p className="genres">{genres.map((genre) => genre.name).join(' • ')}</p>
          <div className="details">
            <span className="rating">⭐ {vote_average || 'N/A'}</span>
            <span className="runtime">{runtime ? `${runtime} min` : 'N/A'}</span>
            <span className="release">Released: {formattedReleaseDate}</span>
          </div>
          <p className="overview">{overview}</p>
        </div>
      </div>
      <div className="movie-meta">
        <div className="meta-section">
          <h3>Year</h3>
          <p>{formattedReleaseYear}</p>
        </div>
        <div className="meta-section">
          <h3>Director</h3>
          <p>{director}</p>
        </div>
        <div className="meta-section">
          <h3>Writers</h3>
          <p>{writers.length > 0 ? writers.join(', ') : 'N/A'}</p>
        </div>
        <div className="meta-section">
          <h3>Cast</h3>
          <p>{cast.length > 0 ? cast.join(', ') : 'N/A'}</p>
        </div>
        <div className="meta-section">
          <h3>Production</h3>
          <p>{production_companies.map((pc) => pc.name).join(', ') || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}
