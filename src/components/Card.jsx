import '@/styles/App.scss'

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
      <h3 className="card-title">{title}</h3>
      <ul className="card-genres">
        {genres && genres.length > 0 ? (
          genres.map((genre, index) => (
            <li key={index} className="card-genre">
              {genre}
            </li>
          ))
        ) : (
          <li className="card-genre">No genres available</li>
        )}
      </ul>
    </div>
  )
}
