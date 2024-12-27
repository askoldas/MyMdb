import { useUserCollections } from '@/hooks/useUserCollections'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Page } from '@/pages/Page'

export function WatchlistPage() {
  const { watchlist, favorites, error } = useUserCollections()

  if (error) return <Page><p>Error loading watchlist: {error}</p></Page>
  if (!watchlist || watchlist.length === 0) return <Page><p>No movies in your watchlist</p></Page>

  return (
    <Page>
      <h1>Watchlist</h1>
      <MoviesList
        movies={watchlist}
        favorites={favorites}
        watchlist={watchlist}
      />
    </Page>
  )
}
