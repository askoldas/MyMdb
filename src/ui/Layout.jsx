import { Outlet } from 'react-router-dom';
import { Navbar } from '@/ui/sections/Navbar';
import '@/styles/sections/layout.scss';

export function Layout() {
  return (
    <div className="layout">
      {/* Fixed Navbar */}
      <aside className="navbar-section">
        <Navbar />
      </aside>

      {/* Main Content */}
      <main className="content-section">
        <Outlet />
      </main>
    </div>
  );
}
