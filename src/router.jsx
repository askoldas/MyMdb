import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MoviesPage } from './pages/MoviesPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { WatchlistPage } from './pages/WatchlistPage'
import { RatedPage } from './pages/RatedPage'
import { Layout } from './composite/Layout'
import { ErrorPage } from './pages/ErrorPage'

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
