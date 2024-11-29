import { NavItem } from '@/components/NavItem'
import HomeIcon from '@/assets/icons/Home.svg?react'
import MoviesIcon from '@/assets/icons/Trends.svg?react'
import LoginIcon from '@/assets/icons/Setting.svg?react'
import '@/styles/App.scss'

export function Navbar() {
  return (
    <div className="navbar">
      <NavItem to="/" label="Home" Icon={HomeIcon} />
      <NavItem to="/movies" label="Movies" Icon={MoviesIcon} />
      <NavItem to="/login" label="Login" Icon={LoginIcon} />
    </div>
  )
}
