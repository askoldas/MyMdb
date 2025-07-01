import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieDetails, clearMovieDetails } from '@/redux/movies-slice'
import { Page } from '@/pages/Page'
import { MoviePoster } from '@/ui/components/MoviePoster'
import { MovieInfo } from '@/ui/components/MovieInfo'
import { MovieMeta } from '@/ui/components/MovieMeta'
import { ButtonAddToCart } from '@/ui/components/ButtonAddToCart'
import '@/styles/pages/movie-detail-page.scss'

export function MovieDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { details, loading, error } = useSelector((state) => state.movies)
  const { favorites, watchlist } = useSelector((state) => state.userCollections)
  const userId = useSelector((state) => state.auth.user?.uid)

  useEffect(() => {
    if (id) dispatch(fetchMovieDetails(id))
    return () => dispatch(clearMovieDetails())
  }, [dispatch, id])

  if (!details) return <Page loading={loading} error={error}>No movie details available</Page>

  return (
    <Page loading={loading} error={error}>
      <div className="movie-page">
        <div className="movie-page__poster">
          <MoviePoster
            posterPath={details.poster_path}
            title={details.title}
            isFavorite={favorites.some((movie) => movie.id === details.id)}
            isInWatchlist={watchlist.some((movie) => movie.id === details.id)}
            details={details}
            userId={userId}
          />
        </div>
        <div className="movie-page__details">
          <MovieInfo
            title={details.title}
            genres={details.genres}
            runtime={details.runtime}
            voteAverage={details.vote_average}
            releaseDate={details.release_date}
            overview={details.overview}
          />
          <MovieMeta
            director={details.credits.crew?.find((person) => person.job === 'Director')?.name}
            writers={details.credits.crew?.filter((person) => person.job === 'Writer' || person.job === 'Screenplay').map((person) => person.name)}
            cast={details.credits.cast?.slice(0, 5).map((actor) => actor.name)}
            productionCompanies={details.production_companies.map((pc) => pc.name)}
          />
          <ButtonAddToCart userId={userId} movieDetails={details} />
        </div>
      </div>
    </Page>
  )
}
