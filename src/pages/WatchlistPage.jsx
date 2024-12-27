import { useUserCollections } from '@/hooks/useUserCollections'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Page } from '@/pages/Page'
import { Preloader } from '@/ui/components/Preloader'

export function WatchlistPage() {
  const { watchlist, favorites, loading, error } = useUserCollections()

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
