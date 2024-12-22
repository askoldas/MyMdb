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

export function Navigation({ closeMenu }) {
  const user = useSelector((state) => state.auth.user)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)

  const handleProtectedNavigation = (e, path) => {
    e.preventDefault()
    if (user) {
      console.log(`Navigating to ${path}`)
      if (closeMenu) closeMenu() // Collapse menu if authenticated
      window.location.href = path // Navigate to the page
    } else {
      setAuthModalOpen(true) // Open the Auth Modal
    }
  }

  return (
    <>
      <div className="nav-list">
        <NavItem to="/" label="Home" Icon={HomeIcon} onClick={closeMenu} />
        <NavItem to="/movies" label="Movies" Icon={MoviesIcon} onClick={closeMenu} />
        <NavItem
          to="/favorites"
          label="Favorites"
          Icon={FavoritesIcon}
          onClick={(e) => handleProtectedNavigation(e, '/favorites')}
        />
        <NavItem
          to="/watchlist"
          label="Watchlist"
          Icon={WatchlistIcon}
          onClick={(e) => handleProtectedNavigation(e, '/watchlist')}
        />
        <NavItem
          to="/rated"
          label="Rated"
          Icon={StarIcon}
          onClick={(e) => handleProtectedNavigation(e, '/rated')}
        />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
