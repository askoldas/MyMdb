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

      {/* Buttons for Testing */}
      <div className="sidebar-buttons">
        <button className="button button--primary">Primary</button>
        <button className="button button--primary" disabled>
          Primary Disabled
        </button>
        <button className="button button--secondary">Secondary</button>
        <button className="button button--secondary" disabled>
          Secondary Disabled
        </button>
      </div>

      <div className="sidebar-footer">© All Rights Reserved</div>
    </div>
  )
}
