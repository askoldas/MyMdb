import { NavLink } from 'react-router-dom';

export function NavItem({ to, label, Icon }) {
    return (
        <NavLink to={to} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <img src={Icon} alt={`${label} icon`} className="nav-item-icon" />
            <span>{label}</span>
        </NavLink>
    );
}
