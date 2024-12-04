import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from '@/ui/elements/Dropdown'
import { GenreSelection } from '@/ui/components/GenreSelection'
import { FilterRatingRange } from '@/ui/components/FilterRatingRange'
import { FilterYearRange } from '@/ui/components/FilterYearRange'
import { applyFilters, clearFilters, closeFilterBar } from '@/redux/filter-slice'
import '@/styles/sections/filter-bar.scss'

export function FilterBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate() // Use navigate to change routes
  const { appliedFilters, isOpen } = useSelector((state) => state.filter)

  // Set up local state for filters including genres, rating, and year ranges
  const [sortBy, setSortBy] = useState(appliedFilters.sortBy)
  const [genres, setGenres] = useState(appliedFilters.genres)
  const [ratingRange, setRatingRange] = useState(appliedFilters.ratingRange)
  const [yearRange, setYearRange] = useState(appliedFilters.yearRange)

  const sortingOptions = [
    { value: 'popularity.desc', label: 'Popularity (High to Low)' },
    { value: 'popularity.asc', label: 'Popularity (Low to High)' },
    { value: 'vote_average.desc', label: 'Rating (High to Low)' },
    { value: 'vote_average.asc', label: 'Rating (Low to High)' },
    { value: 'release_date.desc', label: 'Release Date (Newest First)' },
    { value: 'release_date.asc', label: 'Release Date (Oldest First)' },
    { value: 'original_title.asc', label: 'Title (A-Z)' },
    { value: 'original_title.desc', label: 'Title (Z-A)' },
  ]

  if (!isOpen) return null

  const handleApply = () => {
    const filters = {
      sortBy,
      genres,
      ratingRange,
      yearRange,
    }

    // Dispatch the filters to Redux and close the filter bar
    dispatch(applyFilters(filters))
    dispatch(closeFilterBar())

    // Navigate to the Movies page after applying filters
    navigate('/movies') // Directs to the movies page
  }

  const handleClear = () => {
    // Reset all filters to initial state
    setGenres([])  // Reset genres to empty
    setRatingRange({ from: null, to: null })  // Reset rating range
    setYearRange({ from: null, to: null })  // Reset year range
    dispatch(clearFilters())  // Clear the filters in Redux
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar__header">
        <h2>Filters</h2>
        <button className="filter-bar__close" onClick={() => dispatch(closeFilterBar())}>
          &times;
        </button>
      </div>
      <div className="filter-bar__body">
        <Dropdown
          label="Sort By"
          options={sortingOptions}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
        />
        <GenreSelection value={genres} onChange={setGenres} /> {/* Genre selection */}
        <FilterRatingRange value={ratingRange} onChange={setRatingRange} /> {/* Rating range filter */}
        <FilterYearRange value={yearRange} onChange={setYearRange} /> {/* Year range filter */}
      </div>
      <div className="filter-bar__footer">
        <button className="filter-bar__clear" onClick={handleClear}>
          Clear Filter
        </button>
        <button className="filter-bar__apply" onClick={handleApply}>
          Show Results
        </button>
      </div>
    </div>
  )
}
