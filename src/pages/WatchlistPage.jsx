import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWatchlist } from '@/redux/user-collections-slice'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Page } from '@/pages/Page'
import { Preloader } from '@/ui/components/Preloader'

export function WatchlistPage() {
  const dispatch = useDispatch()
  const { watchlist, favorites, loading, error } = useSelector((state) => state.userCollections)
  const userId = useSelector((state) => state.auth.user?.uid)

  useEffect(() => {
    if (userId) {
      dispatch(fetchWatchlist(userId))
    }
  }, [dispatch, userId])

  if (loading) return <Page><Preloader /></Page>
  if (error) return <Page><p>Error loading watchlist: {error}</p></Page>
  if (!watchlist || watchlist.length === 0) return <Page><p>No movies in your watchlist</p></Page>

  return (
    <Page>
      <MoviesList
        movies={watchlist}
        favorites={favorites}
        watchlist={watchlist}
      />
    </Page>
  )
}
