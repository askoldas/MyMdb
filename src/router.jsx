import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { MoviesPage } from './pages/MoviesPage';
import { FavoritesPage } from './pages/FavoritesPage'; // Import FavoritesPage
import { WatchlistPage } from './pages/WatchlistPage'; // Import WatchlistPage
import { RatedPage } from './pages/RatedPage'; // Import RatedPage
import { Layout } from './composite/Layout';
import { ErrorPage } from './pages/ErrorPage';

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
        element: <FavoritesPage />, // Favorites route
      },
      {
        path: '/watchlist',
        element: <WatchlistPage />, // Watchlist route
      },
      {
        path: '/rated',
        element: <RatedPage />, // Rated Movies route
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
