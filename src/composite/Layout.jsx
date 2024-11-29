import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import '@/styles/App.scss'

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Outlet />
      </div>
    </div>
  )
}
