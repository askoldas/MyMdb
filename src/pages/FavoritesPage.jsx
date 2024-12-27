import { useUserCollections } from '@/hooks/useUserCollections'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Page } from '@/pages/Page'

export function FavoritesPage() {
  const { favorites, watchlist, loading, error } = useUserCollections()

  if (loading) return <Page><p>Loading favorites...</p></Page>
  if (error) return <Page><p>Error loading favorites: {error}</p></Page>
  if (!favorites || favorites.length === 0) return <Page><p>No favorites found</p></Page>

  return (
    <Page>
      <MoviesList
        movies={favorites}
        favorites={favorites}
        watchlist={watchlist}
      />
    </Page>
  )
}
