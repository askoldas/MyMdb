import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { MoviesPage } from './pages/MoviesPage'
import { LogIn } from './pages/LogIn'
import { Layout } from './composite/Layout'
import { ErrorPage } from './pages/ErrorPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/movies',
        element: <MoviesPage />
      },
      {
        path: '/login',
        element: <LogIn />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])
