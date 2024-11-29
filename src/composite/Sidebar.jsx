import { UserBadge } from '@/components/UserBadge'
import { Navbar } from '@/components/Navbar'
import logo from '@/assets/pixema.svg'
import '@/styles/App.scss'

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Pixema Logo" />
      </div>

      <div className="sidebar-links">
        <Navbar />
        <UserBadge userName="" />
      </div>

      <div className="sidebar-footer">© All Rights Reserved</div>
    </div>
  )
}
