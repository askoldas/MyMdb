import { NavLink } from 'react-router-dom'

export function NavItem({ to, label, Icon, onClick }) {
  return (
    <NavLink to={to} className="nav-item" onClick={onClick}>
      {Icon && <Icon className="nav-item-icon" />}
      <span>{label}</span>
    </NavLink>
  )
}
