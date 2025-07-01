import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchUserCollectionMovies,
  addMovieToUserCollection,
  removeMovieFromUserCollection,
} from '@/services/user-collections'

// Fetch favorites from the user's collection
export const fetchFavorites = createAsyncThunk(
  'userCollections/fetchFavorites',
  async (uid, { rejectWithValue }) => {
    try {
      return await fetchUserCollectionMovies(uid, 'favorites')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Add a movie to favorites
export const addToFavorites = createAsyncThunk(
  'userCollections/addToFavorites',
  async ({ uid, movie }, { rejectWithValue }) => {
    try {
      return await addMovieToUserCollection(uid, 'favorites', movie)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Remove a movie from favorites
export const removeFromFavorites = createAsyncThunk(
  'userCollections/removeFromFavorites',
  async ({ uid, movieId }, { rejectWithValue }) => {
    try {
      return await removeMovieFromUserCollection(uid, 'favorites', movieId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Fetch watchlist from the user's collection
export const fetchWatchlist = createAsyncThunk(
  'userCollections/fetchWatchlist',
  async (uid, { rejectWithValue }) => {
    try {
      return await fetchUserCollectionMovies(uid, 'watchlist')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Add a movie to the watchlist
export const addToWatchlist = createAsyncThunk(
  'userCollections/addToWatchlist',
  async ({ uid, movie }, { rejectWithValue }) => {
    try {
      return await addMovieToUserCollection(uid, 'watchlist', movie)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Remove a movie from the watchlist
export const removeFromWatchlist = createAsyncThunk(
  'userCollections/removeFromWatchlist',
  async ({ uid, movieId }, { rejectWithValue }) => {
    try {
      return await removeMovieFromUserCollection(uid, 'watchlist', movieId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  favorites: [],
  watchlist: [],
  loading: false,
  error: null,
}

const userCollectionsSlice = createSlice({
  name: 'userCollections',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = []
    },
    clearWatchlist: (state) => {
      state.watchlist = []
    },
    clearUserCollections: (state) => {
      state.favorites = []
      state.watchlist = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.favorites = action.payload
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false
        state.watchlist = action.payload
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload)
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((movie) => movie.id !== action.payload)
      })

      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.watchlist.push(action.payload)
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlist = state.watchlist.filter((movie) => movie.id !== action.payload)
      })
  },
})

export const { clearFavorites, clearWatchlist, clearUserCollections } = userCollectionsSlice.actions
export const userCollectionsReducer = userCollectionsSlice.reducer
