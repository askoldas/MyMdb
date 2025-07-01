import '@/styles/components/movie-meta.scss'

export function MovieMeta({ director, writers = [], cast = [], productionCompanies = [] }) {
    return (
      <div className="movie-meta">
        <div>
          <h3>Director</h3>
          <p>{director || 'N/A'}</p>
        </div>
        <div>
          <h3>Writers</h3>
          <p>{writers.length > 0 ? writers.join(', ') : 'N/A'}</p>
        </div>
        <div>
          <h3>Cast</h3>
          <p>{cast.length > 0 ? cast.join(', ') : 'N/A'}</p>
        </div>
        <div>
          <h3>Production</h3>
          <p>{productionCompanies.length > 0 ? productionCompanies.join(', ') : 'N/A'}</p>
        </div>
      </div>
    )
  }
  