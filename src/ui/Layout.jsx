import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/ui/sections/Navbar'
import { AuthModal } from '@/ui/modals/AuthModal'
import '@/styles/sections/layout.scss'

export function Layout() {
  return (
    <div className="layout">
      <aside className="navbar-section">
        <Navbar />
      </aside>
      <main className="content-section">
        <Outlet />
      </main>
      <AuthModal />
    </div>
  )
}
