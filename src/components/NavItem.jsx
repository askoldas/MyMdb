import { NavLink } from 'react-router-dom'

export function NavItem({ to, label, Icon }) {
    return (
      <NavLink to={to} className="nav-item">
        <Icon className="nav-item-icon" /> {/* Render the SVG as a React component */}
        <span>{label}</span>
      </NavLink>
    );
  }
  