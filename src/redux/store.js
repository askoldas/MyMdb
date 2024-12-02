import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from './movies-slice'
import { authReducer } from './auth-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  }
})
