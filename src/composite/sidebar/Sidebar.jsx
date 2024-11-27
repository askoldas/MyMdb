import React from 'react'
import './Sidebar.scss'
import logo from '../../assets/pixema.svg'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Pixema Logo" />
      </div>

      <div className="sidebar-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => (isActive ? 'active' : '')}>
          Movies
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
          Login
        </NavLink>
      </div>

      <div className="sidebar-footer">© All Rights Reserved</div>
    </div>
  )
}
