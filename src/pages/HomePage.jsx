import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/ui/elements/Button'
import { MoviesList } from '@/ui/sections/MoviesList'
import { useUserCollections } from '@/hooks/useUserCollections'
import { fetchMoviesService } from '@/services/movies'
import { Page } from '@/pages/Page'
import { tmdbEndpoints } from '@/config/TmdbApi'
import '@/styles/pages/home-page.scss'

export function HomePage() {
  const navigate = useNavigate()

  const [popularMovies, setPopularMovies] = React.useState([])
  const [topRatedMovies, setTopRatedMovies] = React.useState([])
  const [upcomingMovies, setUpcomingMovies] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { favorites, watchlist } = useUserCollections()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const popular = await fetchMoviesService({
          endpoint: tmdbEndpoints.movies.popular,
          page: 1
        })
        const topRated = await fetchMoviesService({
          endpoint: tmdbEndpoints.movies.topRated,
          page: 1
        })
        const upcoming = await fetchMoviesService({
          endpoint: tmdbEndpoints.movies.upcoming,
          page: 1
        })

        setPopularMovies(popular.results.slice(0, 10))
        setTopRatedMovies(topRated.results.slice(0, 10))
        setUpcomingMovies(upcoming.results.slice(0, 10))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Page className="home-page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to MyMdb</h1>
        <p className="home-subtitle">Discover your favorite movies</p>
        <Button type="primary" size="large" onClick={() => navigate('/movies')}>
          Explore
        </Button>
      </div>

      <div className="user-controls-spacer"></div>
      <div className="content-offset"></div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="movies-sections">
          <div className="movies-section">
            <h2>Popular Movies</h2>
            <MoviesList
              movies={popularMovies}
              favorites={favorites}
              watchlist={watchlist}
            />
          </div>

          <div className="movies-section">
            <h2>Top Rated Movies</h2>
            <MoviesList
              movies={topRatedMovies}
              favorites={favorites}
              watchlist={watchlist}
            />
          </div>

          <div className="movies-section">
            <h2>Upcoming Movies</h2>
            <MoviesList
              movies={upcomingMovies}
              favorites={favorites}
              watchlist={watchlist}
            />
          </div>
        </div>
      )}
    </Page>
  )
}
