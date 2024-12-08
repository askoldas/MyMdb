import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist,
} from '@/redux/user-collections-slice'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Page } from '@/pages/Page'

export function FavoritesPage() {
  const dispatch = useDispatch()
  const { favorites, watchlist, loading, error } = useSelector((state) => state.userCollections)
  const userId = useSelector((state) => state.auth.user?.uid)

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId))
    }
  }, [dispatch, userId])

  const handleToggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFromFavorites({ uid: userId, movieId: movie.id }))
    } else {
      dispatch(addToFavorites({ uid: userId, movie }))
    }
  }

  const handleToggleWatchlist = (movie) => {
    if (watchlist.some((item) => item.id === movie.id)) {
      dispatch(removeFromWatchlist({ uid: userId, movieId: movie.id }))
    } else {
      dispatch(addToWatchlist({ uid: userId, movie }))
    }
  }

  if (loading) return <Page><p>Loading favorites...</p></Page>
  if (error) return <Page><p>Error loading favorites: {error}</p></Page>
  if (!favorites || favorites.length === 0) return <Page><p>No favorites found</p></Page>

  return (
    <Page>
      <MoviesList
        movies={favorites}
        favorites={favorites}
        watchlist={watchlist}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
      />
    </Page>
  )
}
