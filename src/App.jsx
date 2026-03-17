import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/Footer.jsx'
import { profile } from './content/profile.js'
import { Home } from './pages/Home.jsx'
import { Portfolio } from './pages/Portfolio.jsx'
import { useMediaQuery } from './hooks/useMediaQuery.js'
import './styles/app.css'

function NotFound() {
  return (
    <div className="section">
      <div className="container">
        <h2 className="h2">Page not found</h2>
        <p className="muted" style={{ marginTop: 10 }}>
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 900px)')

  return (
    <div className="app">
      <Navbar name={profile.name} role={profile.role} />

      <main className="main" role="main">
        <div className="page" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={isMobile ? <Portfolio /> : <Home />} />
            <Route path="/about" element={<Portfolio initialSection="about" />} />
            <Route path="/projects" element={<Portfolio initialSection="projects" />} />
            <Route path="/skills" element={<Portfolio initialSection="skills" />} />
            <Route path="/contact" element={<Portfolio initialSection="contact" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}

