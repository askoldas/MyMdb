import { useRequireAuth } from '@/hooks/useRequireAuth'
import { NavItem } from '@/ui/elements/NavItem'
import HomeIcon from '@/assets/icons/Home.svg?react'
import MoviesIcon from '@/assets/icons/Movie.svg?react'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'
import StarIcon from '@/assets/icons/Star.svg?react'
import '@/styles/components/navigation.scss'

export function Navigation({ closeMenu }) {
  const { requireAuth } = useRequireAuth()

  const handleProtectedNavigation = (e, path) => {
    e.preventDefault()
    console.log(`[Navigation] Protected navigation triggered for: ${path}`) // Debug log
    requireAuth(() => {
      console.log(`[Navigation] Navigating to ${path}`) // Log successful navigation
      if (closeMenu) closeMenu()
      window.location.href = path
    })
  }

  return (
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
  )
}
