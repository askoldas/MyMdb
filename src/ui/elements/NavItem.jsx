import { NavLink } from 'react-router-dom'

export function NavItem({ to, label, Icon }) {
    return (
      <NavLink to={to} className="nav-item">
        <Icon className="nav-item-icon" />
        <span>{label}</span>
      </NavLink>
    )
  }
  