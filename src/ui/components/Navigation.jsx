import React from 'react'
import { NavItem } from '@/ui/elements/NavItem'
import HomeIcon from '@/assets/icons/Home.svg?react'
import MoviesIcon from '@/assets/icons/Movie.svg?react'
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'
import StarIcon from '@/assets/icons/Star.svg?react'
import '@/styles/components/navbar.scss'

export function Navigation() {
  return (
    <div className="navbar">
      <NavItem to="/" label="Home" Icon={HomeIcon} />
      <NavItem to="/movies" label="Movies" Icon={MoviesIcon} />
      <NavItem to="/favorites" label="Favorites" Icon={FavoritesIcon} />
      <NavItem to="/watchlist" label="Watchlist" Icon={WatchlistIcon} />
      <NavItem to="/rated" label="Rated" Icon={StarIcon} />
    </div>
  )
}
