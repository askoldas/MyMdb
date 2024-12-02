import '@/styles/components/card.scss'

export function Card({ loading, title, poster, genres }) {
  if (loading) {
    return (
      <div className="card card--loading">
        <div className="card-skeleton-image" />
        <div className="card-skeleton-title" />
      </div>
    )
  }

  return (
    <div className="card">
      <img src={poster} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-genres">
          {genres && genres.length > 0 ? genres.join(' • ') : 'No genres available'}
        </p>
      </div>
    </div>
  )
}
