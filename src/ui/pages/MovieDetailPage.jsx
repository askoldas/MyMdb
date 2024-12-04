import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieDetails, clearMovieDetails } from '@/redux/movies-slice'
import '@/styles/pages/movie-detail-page.scss'

export function MovieDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { details, loading, error } = useSelector((state) => state.movies)

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
    credits = {}, // Extract credits from details
  } = details

  const formattedReleaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A'
  const formattedReleaseDate = release_date
    ? new Date(release_date).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A'

  // Extract Director
  const director = credits.crew?.find((person) => person.job === 'Director')?.name || 'N/A'

  // Extract Writers
  const writers = credits.crew
    ?.filter((person) => person.job === 'Writer' || person.job === 'Screenplay')
    .map((person) => person.name) || []

  // Extract Cast
  const cast = credits.cast?.slice(0, 5).map((actor) => actor.name) || [] 

  return (
    <div className="movie-page">
      <div className="movie-header">
        <div className="poster">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
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
