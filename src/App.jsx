import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './redux/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { initializeUser } from '@/redux/auth-slice'
import './styles/App.scss'

function AppContent() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  useEffect(() => {
    // Initialize user session on app load
    dispatch(initializeUser())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  return <RouterProvider router={router} />
}

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
