import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/auth-slice'
import { UserBadge } from '@/ui/components/UserBadge'
import { Navbar } from '@/ui/components/Navbar'
import { Button } from '@/ui/elements/Button'
import logo from '@/assets/pixema.svg'
import '@/styles/sections/sidebar.scss'

export function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('Logout clicked!');
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Pixema Logo" />
      </div>

      <div className="sidebar-links">
        <Navbar />
      </div>

      <div className="sidebar-footer">© All Rights Reserved</div>
    </div>
  );
}
