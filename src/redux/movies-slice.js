import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPopularMovies as fetchPopularMoviesAPI } from '../services/movies'

// Async action to fetch movies
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const validatedPage = Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1
      const movies = await fetchPopularMoviesAPI({ page: validatedPage })
      return { ...movies, currentPage: validatedPage } // Add currentPage for easy access
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      return rejectWithValue(error.message)
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearMovies: (state) => {
      state.list = []
      state.page = 1
      state.totalPages = 0
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
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
  },
})

export const { clearMovies } = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
