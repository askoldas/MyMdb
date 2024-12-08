import { Navigation } from '@/ui/components/Navigation'
import logo from '@/assets/pixema.svg'
import '@/styles/sections/sidebar.scss'

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Pixema Logo" />
      </div>

      <div className="sidebar-links">
        <Navigation />
      </div>

      <div className="sidebar-footer">© All Rights Reserved</div>
    </div>
  )
}
