import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchOverlay from './SearchOverlay'
import logo from '../assets/images/brand/logo.png'
import '../styles/navbar.css'

const navItems = [
  { label: 'Market Directory', to: '/directory' },
  { label: 'Produce Guide', to: '/produce' },
  { label: 'Seasonal Picks', to: '/seasonal' },
  { label: 'About', to: '/about' },
]

const linkClass = ({ isActive }) => (isActive ? 'navbar-link is-active' : 'navbar-link')
const panelLinkClass = ({ isActive }) =>
  isActive ? 'navbar-panel-link is-active' : 'navbar-panel-link'

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  )
}

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((value) => !value), [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="FreshFind logo" />
            FreshFind
          </Link>

          <nav aria-label="Main">
            <ul className="navbar-links">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <div className="navbar-icons">
              <button
                type="button"
                className="navbar-icon-btn"
                onClick={openSearch}
                aria-label="Open search"
              >
                <SearchIcon />
              </button>

              <Link to="/bookmarks" className="navbar-icon-btn" aria-label="Bookmarks">
                <BookmarkIcon />
                <span className="navbar-badge">0</span>
              </Link>
            </div>

            <button type="button" className="navbar-pill navbar-login">
              Login
            </button>

            <Link to="/directory" className="navbar-pill navbar-cta">
              Find a Market
            </Link>

            <button
              type="button"
              className="navbar-burger"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="navbar-panel"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="navbar-panel" className="navbar-panel">
            <nav aria-label="Mobile">
              <ul className="navbar-panel-links">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={panelLinkClass} onClick={closeMenu}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="navbar-panel-actions">
              <button type="button" className="navbar-pill navbar-login">
                Login
              </button>
              <Link to="/directory" className="navbar-pill navbar-cta" onClick={closeMenu}>
                Find a Market
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  )
}
