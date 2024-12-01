import React from 'react';
import { NavItem } from '@/components/NavItem';
import HomeIcon from '@/assets/icons/Home.svg?react'; // Home icon
import MoviesIcon from '@/assets/icons/Movie.svg?react'; // Movies icon
import FavoritesIcon from '@/assets/icons/Favorites.svg?react'; // Favorites icon
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react'; // Watchlist icon
import StarIcon from '@/assets/icons/Star.svg?react'; // My Rated Movies icon
import '@/styles/App.scss';

export function Navbar() {
  return (
    <div className="navbar">
      <NavItem to="/" label="Home" Icon={HomeIcon} />
      <NavItem to="/movies" label="Movies" Icon={MoviesIcon} />
      <NavItem to="/favorites" label="Favorites" Icon={FavoritesIcon} />
      <NavItem to="/watchlist" label="Watchlist" Icon={WatchlistIcon} />
      <NavItem to="/rated" label="Rated" Icon={StarIcon} />
    </div>
  );
}
