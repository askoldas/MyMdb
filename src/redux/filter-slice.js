import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  appliedFilters: {
    sortBy: 'popularity.desc',
    genres: [],
    yearRange: { from: null, to: null },
    ratingRange: { from: null, to: null },
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilterBar: (state) => {
      state.isOpen = !state.isOpen
    },
    openFilterBar: (state) => {
      state.isOpen = true
    },
    closeFilterBar: (state) => {
      state.isOpen = false
    },
    applyFilters: (state, action) => {
      state.appliedFilters = { ...state.appliedFilters, ...action.payload }
    },
    clearFilters: (state) => {
      state.appliedFilters = initialState.appliedFilters
    },
    updateSortBy: (state, action) => {
      state.appliedFilters.sortBy = action.payload
    },
  },
})

export const {
  toggleFilterBar,
  openFilterBar,
  closeFilterBar,
  applyFilters,
  clearFilters,
  updateSortBy,
} = filterSlice.actions
export const filterReducer = filterSlice.reducer
