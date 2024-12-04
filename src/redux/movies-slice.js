import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchMoviesService,
  fetchMovieDetailsService,
  fetchSearchMoviesService,
} from '@/services/movies'
import {
  addToFirestoreCollection,
  removeFromFirestoreCollection,
  fetchFirestoreCollection,
} from '@/utils/firestore-client'

// Existing functionality
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ page = 1, sortBy = 'popularity.desc', filters = {} }, { rejectWithValue }) => {
    try {
      const movies = await fetchMoviesService({ page, sortBy, filters })
      return { ...movies, currentPage: page }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      const movieDetails = await fetchMovieDetailsService(movieId)
      return movieDetails
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchSearchMovies = createAsyncThunk(
  'movies/fetchSearchMovies',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const movies = await fetchSearchMoviesService({ query, page })
      return { ...movies, query, currentPage: page }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Favorites and Watchlist functionality
export const fetchFavorites = createAsyncThunk(
  'movies/fetchFavorites',
  async (uid, { rejectWithValue }) => {
    try {
      return await fetchFirestoreCollection(uid, 'favorites')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchWatchlist = createAsyncThunk(
  'movies/fetchWatchlist',
  async (uid, { rejectWithValue }) => {
    try {
      return await fetchFirestoreCollection(uid, 'watchlist')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addToFavorites = createAsyncThunk(
  'movies/addToFavorites',
  async ({ uid, movie }, { rejectWithValue }) => {
    try {
      return await addToFirestoreCollection(uid, 'favorites', movie)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addToWatchlist = createAsyncThunk(
  'movies/addToWatchlist',
  async ({ uid, movie }, { rejectWithValue }) => {
    try {
      return await addToFirestoreCollection(uid, 'watchlist', movie)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeFromFavorites = createAsyncThunk(
  'movies/removeFromFavorites',
  async ({ uid, movieId }, { rejectWithValue }) => {
    try {
      return await removeFromFirestoreCollection(uid, 'favorites', movieId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeFromWatchlist = createAsyncThunk(
  'movies/removeFromWatchlist',
  async ({ uid, movieId }, { rejectWithValue }) => {
    try {
      return await removeFromFirestoreCollection(uid, 'watchlist', movieId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  list: [],
  details: null,
  searchResults: [],
  searchQuery: '',
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
  favorites: [], // Stores user's favorite movies
  watchlist: [], // Stores user's watchlist movies
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.list = []
      state.page = 1
      state.totalPages = 0
      state.error = null
    },
    clearMovieDetails: (state) => {
      state.details = null
    },
    clearSearchResults: (state) => {
      state.searchResults = []
      state.searchQuery = ''
      state.error = null
    },
    clearFavorites: (state) => {
      state.favorites = []
    }, // Clear favorites state
    clearWatchlist: (state) => {
      state.watchlist = []
    }, // Clear watchlist state
  },
  extraReducers: (builder) => {
    // Original thunks
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.results
        state.page = action.payload.currentPage
        state.totalPages = action.payload.total_pages
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false
        state.details = action.payload
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.searchResults = action.payload.results
        state.searchQuery = action.payload.query
        state.page = action.payload.currentPage
        state.totalPages = action.payload.total_pages
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Favorites handling
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload)
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((movie) => movie.id !== action.payload)
      })

      // Watchlist handling
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.watchlist.push(action.payload)
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlist = state.watchlist.filter((movie) => movie.id !== action.payload)
      })
  },
})

export const {
  clearMovies,
  clearMovieDetails,
  clearSearchResults,
  clearFavorites,
  clearWatchlist,
} = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
