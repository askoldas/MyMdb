import { NavLink } from 'react-router-dom';
import '@/styles/App.scss';
import HomeIcon from '@/assets/icons/Home.svg';

export function NavItem({ to, label, Icon }) {
    return (
        <NavLink to={to} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <img src={Icon} alt={`${label} icon`} className="nav-item-icon" />
            <span>{label}</span>
        </NavLink>
    );
}

export function Navbar() {
    return (
        <div className="navbar">
            <NavItem to="/" label="Home" Icon={HomeIcon} />
            <NavItem to="/movies" label="Movies" Icon={HomeIcon} />
            <NavItem to="/login" label="Login" Icon={HomeIcon} />
        </div>
    );
}
