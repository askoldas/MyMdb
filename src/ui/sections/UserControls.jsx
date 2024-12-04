import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserBadge } from '@/ui/components/UserBadge'
import { Search } from '@/ui/components/Search'
import { FilterButton } from '@/ui/components/ButtonIconFilter'
import { FilterBar } from '@/ui/sections/FilterBar'
import { toggleFilterBar } from '@/redux/filter-slice'
import '@/styles/sections/user-controls.scss'

export function UserControls() {
  const dispatch = useDispatch()
  const isFilterBarOpen = useSelector((state) => state.filter.isOpen)

  const handleSearch = (query) => {
    console.log('Search query:', query)
  }

  const handleFilterClick = () => {
    dispatch(toggleFilterBar())
  }

  return (
    <>
      <div className="user-controls">
        <UserBadge />
        <div className="user-controls__actions">
          <div className="user-controls__search">
            <Search onSearch={handleSearch} />
          </div>
          <div className="user-controls__filter">
            <FilterButton onClick={handleFilterClick} />
          </div>
        </div>
      </div>
      <FilterBar isOpen={isFilterBarOpen} onClose={handleFilterClick} />
    </>
  )
}
