import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { MoviesPage } from '@/pages/MoviesPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { WatchlistPage } from '@/pages/WatchlistPage'
import { RatedPage } from '@/pages/RatedPage'
import { MovieDetailPage } from '@/pages/MovieDetailPage'
import { CartPage } from '@/pages/CartPage'
import { Layout } from '@/ui/Layout'
import { ErrorPage } from '@/pages/ErrorPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SearchResultsPage } from '@/pages/SearchResultsPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/movies',
        element: <MoviesPage />,
      },
      {
        path: '/movies/:id',
        element: <MovieDetailPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/watchlist',
        element: <WatchlistPage />,
      },
      {
        path: '/rated',
        element: <RatedPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/search',
        element: <SearchResultsPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
])
