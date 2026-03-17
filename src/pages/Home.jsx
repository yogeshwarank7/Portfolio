import { Link } from 'react-router-dom'
import { profile } from '../content/profile.js'
import '../styles/homePage.css'

export function Home() {
  const hi = 'Hi'
  const name = `I’m ${profile.name}`
  const role = profile.role

  return (
    <div className="homeStage" role="main" aria-label="Home">
      <div className="homeFx" aria-hidden="true" />

      <div className="homeCenter">
        <h1 className="homeTitle">
          <span className="homeTitleRow">
            <span className="homeHi">{hi}</span>
            <span className="homeComma">,</span>
            <span className="homeSpacer" />
            <span className="homeName">{name}</span>
          </span>
          <span className="homeTitleRow">
            <span className="homeRole">{role}</span>
          </span>
        </h1>

        <div className="homeActions">
          <Link className="btn btnPrimary" to="/projects">
            View Projects
          </Link>
          <Link className="btn" to="/about">
            About
          </Link>
          <Link className="btn" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}

