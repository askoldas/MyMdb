import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMoviesService, fetchMovieDetailsService, fetchSearchMoviesService } from '@/services/movies'

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

const initialState = {
  list: [],
  details: null,
  searchResults: [],
  searchQuery: '',
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
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
  },
  extraReducers: (builder) => {
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
  },
})

export const { clearMovies, clearMovieDetails, clearSearchResults } = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
