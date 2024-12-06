import React from 'react'
import { ToggleButton } from '@/ui/elements/ToggleButton'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'

export function ToggleButtonWatchlist({ isInWatchlist, onToggleWatchlist }) {
  return (
    <ToggleButton
      isActive={isInWatchlist}
      onToggle={onToggleWatchlist}
      label="Toggle Watchlist"
      Icon={WatchlistIcon}
    />
  )
}
