import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from './movies-slice'
import { authReducer } from './auth-slice'
import { filterReducer } from './filter-slice'
import { userCollectionsReducer } from './user-collections-slice'
import { cartReducer } from './cart-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    filter: filterReducer,
    userCollections: userCollectionsReducer,
    cart: cartReducer,
  }
})
