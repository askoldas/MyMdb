import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth-slice';
import { UserBadge } from '@/components/UserBadge';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/Button'; // Import the Button component
import logo from '@/assets/pixema.svg';
import '@/styles/composite/Sidebar.scss';

export function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('Logout clicked!'); // Debugging button click
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Pixema Logo" />
      </div>

      <div className="sidebar-links">
        <Navbar />
        <UserBadge userName="Test User" />
        <Button type="danger" size="large" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="sidebar-footer">© All Rights Reserved</div>
    </div>
  );
}
