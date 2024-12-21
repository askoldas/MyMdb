import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/ui/sections/Sidebar'
import { UserControls } from '@/ui/sections/UserControls'
import '@/styles/sections/layout.scss'

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      
      <div className="main">
      {/* <UserControls /> */}
          <Outlet />
      </div>
    </div>
  )
}

