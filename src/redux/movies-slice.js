import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPopularMoviesService, fetchMovieDetailsService } from '@/services/movies'

// Fetch popular movies thunk
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const validatedPage = Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1
      const movies = await fetchPopularMoviesService({ page: validatedPage })
      return { ...movies, currentPage: validatedPage }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Fetch movie details thunk
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      if (!movieId) throw new Error('Movie ID is required')
      const movieDetails = await fetchMovieDetailsService(movieId)
      return movieDetails
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  list: [],
  details: null,
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
  },
  extraReducers: (builder) => {
    builder
      // Fetch popular movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.results
        state.page = action.payload.currentPage
        state.totalPages = action.payload.total_pages
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch movie details
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
  },
})

export const { clearMovies, clearMovieDetails } = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
