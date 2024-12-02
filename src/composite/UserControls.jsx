import React from 'react'
import { UserBadge } from '@/components/UserBadge'
import { FilterButton } from '@/composite/FilterButton'
import { Input } from '@/components/Input'
import '@/styles/composite/user-controls.scss'

export function UserControls() {
  return (
    <div className="user-controls">
      <div className="user-controls-search">
        <Input
          placeholder="Search..."
          value=""
          onChange={(value) => console.log('Search Input:', value)} // Placeholder handler
        />
      </div>
      <FilterButton />
      <UserBadge />
    </div>
  )
}
