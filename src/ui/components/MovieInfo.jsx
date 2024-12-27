import StarIcon from '@/assets/icons/Star.svg?react'
import '@/styles/components/movie-info.scss'

export function MovieInfo({ title, genres, runtime, voteAverage, releaseDate, overview }) {
  const formattedReleaseDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A'

  return (
    <div className="movie-info">
      <h1 className="title">{title}</h1>
      <p className="genres">{genres.map((genre) => genre.name).join(' • ')}</p>
      <div className="details">
        <span className="rating">
          <StarIcon className="star-icon" /> {voteAverage || 'N/A'}
        </span>
        <span className="runtime">{runtime ? `${runtime} min` : 'N/A'}</span>
        <span className="release">Released: {formattedReleaseDate}</span>
      </div>
      <p className="overview">{overview}</p>
    </div>
  )
}
