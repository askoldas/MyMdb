import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './composite/layout/Layout'
import { HomePage } from './pages/HomePage'
import { LogIn } from './pages/LogIn'
import { Movies } from './pages/Movies'
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
        element: <Movies />
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


