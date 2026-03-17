import { NavLink, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { IconClose, IconMenu, IconMoon, IconSun } from './Icons.jsx'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import '../styles/nav.css'
import LOGO from '../assets/logoim.jpeg'

function ReactMark(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
      </g>
    </svg>
  )
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar({ name = 'Yogeshwaran K', role = 'Frontend Developer' }) {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 900px)')

  const close = () => setMobileOpen(false)
  const themeLabel = useMemo(
    () => (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'),
    [theme],
  )

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const mobileScrollTo = (id) => {
    close()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }

  return (
    <>
      <header className="navWrap" role="banner">
        <div className="container navInner">
          
          <Link
            className="brand"
            to="/"
            aria-label={`${name} portfolio`}
            onClick={(e) => {
              if (!isMobile) return
              e.preventDefault()
              mobileScrollTo('top')
            }}
          >
            <span className="logoMark" aria-hidden="true" />
            <span className="brandText">
              
              <span className="brandName">
                {/* <span className="reactLogo" aria-hidden="true">
                  <ReactMark />
                </span> */}
                {name}
              </span>
              <span className="brandRole">{role}</span>
            </span>
          </Link>

          <nav className="navLinks" aria-label="Primary">
            {links.map((l) => {
              if (isMobile) {
                const id =
                  l.to === '/'
                    ? 'top'
                    : l.to === '/about'
                      ? 'about'
                      : l.to === '/projects'
                        ? 'projects'
                        : l.to === '/skills'
                          ? 'skills'
                          : 'contact'
                return (
                  <button key={l.to} type="button" className="navLink" onClick={() => mobileScrollTo(id)}>
                    {l.label}
                  </button>
                )
              }

              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => `navLink ${isActive ? 'navLinkActive' : ''}`}
                >
                  {l.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="navActions">
            <button className="iconBtn" type="button" onClick={toggleTheme} aria-label={themeLabel}>
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
            <button
              className="iconBtn burger"
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <div className="mobileMenuBackdrop" onClick={close} role="presentation" />
          <div className="mobileMenu" role="dialog" aria-modal="true" aria-label="Mobile menu">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span className="pill">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    boxShadow: '0 0 0 6px rgba(167, 139, 250, 0.12)',
                  }}
                  aria-hidden="true"
                />
                Menu
              </span>
              <button className="iconBtn" type="button" onClick={close} aria-label="Close menu">
                <IconClose />
              </button>
            </div>
            <div className="mobileGrid" aria-label="Mobile navigation links">
              {links.map((l) => {
                const id =
                  l.to === '/'
                    ? 'top'
                    : l.to === '/about'
                      ? 'about'
                      : l.to === '/projects'
                        ? 'projects'
                        : l.to === '/skills'
                          ? 'skills'
                          : 'contact'

                return (
                  <button key={l.to} type="button" className="mobileLink" onClick={() => mobileScrollTo(id)}>
                    {l.label}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

