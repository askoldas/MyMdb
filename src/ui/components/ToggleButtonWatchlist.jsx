import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ToggleButton } from '@/ui/elements/ToggleButton'
import { AuthModal } from '@/ui/modals/AuthModal'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'

export function ToggleButtonWatchlist({ isInWatchlist, onToggleWatchlist }) {
  const user = useSelector((state) => state.auth.user)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)

  const handleToggle = () => {
    if (user) {
      onToggleWatchlist()
    } else {
      setAuthModalOpen(true)
    }
  }

  return (
    <>
      <ToggleButton
        isActive={isInWatchlist}
        onToggle={handleToggle}
        label="Toggle Watchlist"
        Icon={WatchlistIcon}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
