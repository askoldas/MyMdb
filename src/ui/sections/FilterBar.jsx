import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, clearFilters, closeFilterBar } from '@/redux/filter-slice'
import '@/styles/sections/filter-bar.scss'

export function FilterBar() {
  const dispatch = useDispatch()
  const { appliedFilters, isOpen } = useSelector((state) => state.filter)

  if (!isOpen) return null

  const handleApply = () => {
    const filters = {
      sortBy: 'rating', // Example: Collect filter values
      genres: ['Action', 'Drama'],
      yearRange: { from: 2000, to: 2023 },
      ratingRange: { from: 7, to: 10 },
    }
    dispatch(applyFilters(filters))
    dispatch(closeFilterBar())
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
        {/* Filter options go here */}
      </div>
      <div className="filter-bar__footer">
        <button className="filter-bar__clear" onClick={() => dispatch(clearFilters())}>
          Clear Filter
        </button>
        <button className="filter-bar__apply" onClick={handleApply}>
          Show Results
        </button>
      </div>
    </div>
  )
}
