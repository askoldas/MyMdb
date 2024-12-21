import { Outlet } from 'react-router-dom'
import { Navbar } from '@/ui/sections/Navbar'
import { UserControls } from '@/ui/sections/UserControls'
import '@/styles/sections/layout.scss'

export function Layout() {
  return (
    <div className="layout">
      <Navbar />
      
      <div className="main">
      {/* <UserControls /> */}
          <Outlet />
      </div>
    </div>
  )
}

