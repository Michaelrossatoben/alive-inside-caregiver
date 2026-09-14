import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/coach', label: 'Coach', icon: '💬', end: false },
  { to: '/music', label: 'Music', icon: '🎵', end: false },
  { to: '/headset', label: 'Headset', icon: '🎧', end: false },
]

export default function Layout() {
  return (
    <div className="app-shell">
      <main className="page">
        <Outlet />
      </main>
      <nav className="bottom-nav" aria-label="Main">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <span className="nav-icon" aria-hidden="true">
              {l.icon}
            </span>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
