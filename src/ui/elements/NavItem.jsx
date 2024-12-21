import { NavLink } from 'react-router-dom';

export function NavItem({ to, label, Icon, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(); // Trigger the onClick function, e.g., close the menu
    }
    // Allow default navigation behavior
  };

  return (
    <NavLink to={to} className="nav-item" onClick={handleClick}>
      {Icon && <Icon className="nav-item-icon" />}
      <span>{label}</span>
    </NavLink>
  );
}
