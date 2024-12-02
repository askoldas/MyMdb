import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/composite/Sidebar'
import { UserControls } from '@/composite/UserControls'
import '@/styles/composite/Layout.scss'

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <div className="layout-main">
          <UserControls />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
