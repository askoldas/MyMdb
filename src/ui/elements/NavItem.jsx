import { NavLink } from 'react-router-dom'

export function NavItem({ to, label, Icon, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      console.log(`[NavItem] Triggering onClick for: ${label}`) // Debug log
      onClick(e) // Call the provided onClick handler
    }
  }

  return (
    <NavLink to={to} className="nav-item" onClick={handleClick}>
      {Icon && <Icon className="nav-item-icon" />}
      <span>{label}</span>
    </NavLink>
  )
}
