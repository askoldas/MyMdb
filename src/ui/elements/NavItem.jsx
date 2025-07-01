import { NavLink } from 'react-router-dom'

export function NavItem({ to, label, Icon, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <NavLink to={to} className="nav-item" onClick={handleClick}>
      {Icon && <Icon className="nav-item-icon" />}
      <span>{label}</span>
    </NavLink>
  )
}