import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavItem } from '@/ui/elements/NavItem'
import { AuthModal } from '@/ui/modals/AuthModal'
import HomeIcon from '@/assets/icons/Home.svg?react'
import MoviesIcon from '@/assets/icons/Movie.svg?react'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'
import StarIcon from '@/assets/icons/Star.svg?react'
import '@/styles/components/navigation.scss'

export function Navigation() {
  const user = useSelector((state) => state.auth.user)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)

  const handleProtectedNavigation = (e) => {
    if (!user) {
      e.preventDefault()
      setAuthModalOpen(true)
    }
  }

  return (
    <>
      <div className="nav-list">
        <NavItem to="/" label="Home" Icon={HomeIcon} />
        <NavItem to="/movies" label="Movies" Icon={MoviesIcon} />
        <NavItem
          to="/favorites"
          label="Favorites"
          Icon={FavoritesIcon}
          onClick={user ? undefined : handleProtectedNavigation}
        />
        <NavItem
          to="/watchlist"
          label="Watchlist"
          Icon={WatchlistIcon}
          onClick={user ? undefined : handleProtectedNavigation}
        />
        <NavItem
          to="/rated"
          label="Rated"
          Icon={StarIcon}
          onClick={user ? undefined : handleProtectedNavigation}
        />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
