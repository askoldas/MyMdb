import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/ui/sections/Sidebar'
import '@/styles/sections/layout.scss'

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  )
}
