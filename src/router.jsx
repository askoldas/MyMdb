import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/ui/pages/HomePage'
import { MoviesPage } from '@/ui/pages/MoviesPage'
import { FavoritesPage } from '@/ui/pages/FavoritesPage'
import { WatchlistPage } from '@/ui/pages/WatchlistPage'
import { RatedPage } from '@/ui/pages/RatedPage'
import { MovieDetailPage } from '@/ui/pages/MovieDetailPage'
import { Layout } from '@/ui/sections/Layout'
import { ErrorPage } from '@/ui/pages/ErrorPage'

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
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
])
