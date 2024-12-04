import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from './movies-slice'
import { authReducer } from './auth-slice'
import { filterReducer } from './filter-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    filter: filterReducer,
  }
})
