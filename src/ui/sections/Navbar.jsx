import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/ui/components/Navigation';
import logo from '@/assets/pixema.svg';
import '@/styles/sections/navbar.scss';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false); // Collapse the menu
  };

  return (
    <div className="navbar">
      {/* Mobile Stripe with Logo and Menu Toggle */}
      <div className="navbar-stripe">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Pixema Logo" />
        </Link>
        <button className="menu-icon" onClick={toggleMenu} aria-expanded={menuOpen}>
          ☰
        </button>
      </div>

      {/* Navigation Links and Footer */}
      <div className={`navbar-content ${menuOpen ? 'visible' : ''}`}>
        <Navigation onNavItemClick={closeMenu} />
        <div className="navbar-footer">© All Rights Reserved</div>
      </div>
    </div>
  );
}
