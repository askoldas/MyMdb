import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from './movies-slice'

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    movies: moviesReducer,
  }
})
