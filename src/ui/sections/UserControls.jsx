import React, { useState } from 'react'
import { UserBadge } from '@/ui/components/UserBadge'
import { Search } from '@/ui/components/Search'
import { FilterButton } from '@/ui/components/ButtonIconFilter'
import { FilterBar } from '@/ui/sections/FilterBar' // Import the FilterBar component
import '@/styles/sections/user-controls.scss'

export function UserControls() {
  const [isFilterBarOpen, setFilterBarOpen] = useState(false) // State to manage FilterBar visibility

  const handleSearch = (query) => {
    console.log('Search query:', query)
  }

  const toggleFilterBar = () => {
    setFilterBarOpen((prev) => !prev) // Toggle the visibility of the FilterBar
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
            <FilterButton onClick={toggleFilterBar} /> {/* Pass the toggle function */}
          </div>
        </div>
      </div>
      <FilterBar isOpen={isFilterBarOpen} onClose={toggleFilterBar} /> {/* Render FilterBar based on state */}
    </>
  )
}
