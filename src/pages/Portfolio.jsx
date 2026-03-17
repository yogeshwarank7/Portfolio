import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from '../components/Reveal.jsx'
import { profile } from '../content/profile.js'
import { projects } from '../content/projects.js'
import { skills } from '../content/skills.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { IconClose } from '../components/Icons.jsx'
import { motion } from 'framer-motion'
import '../styles/home.css'
import '../styles/about.css'
import '../styles/cards.css'
import '../styles/skills.css'
import '../styles/contact.css'

function scrollToSection(containerEl, id, { reduced } = {}) {
  if (!containerEl || !id) return
  const el = containerEl.querySelector(`#${CSS.escape(id)}`)
  if (!el) return
  el.scrollIntoView({
    behavior: reduced ? 'auto' : 'smooth',
    block: 'start',
    inline: 'nearest',
  })
}

function SocialIcon({ label }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true }
  if (label.toLowerCase() === 'github') {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.35-1.17-3.35-1.17-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.9 0-1.08.39-1.96 1.03-2.65-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.69 1.03 1.57 1.03 2.65 0 3.81-2.33 4.65-4.55 4.9.36.3.68.9.68 1.83v2.71c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        />
      </svg>
    )
  }
  if (label.toLowerCase() === 'linkedin') {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.62-1.86 3.33-1.86 3.56 0 4.22 2.35 4.22 5.41v6.34ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
        />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path
        fill="currentColor"
        d="M12 7.3c1.6 0 1.8 0 2.4.04.56.03.87.12 1.07.2.27.1.46.22.66.42.2.2.33.39.42.66.08.2.17.5.2 1.07.04.6.04.8.04 2.4s0 1.8-.04 2.4c-.03.56-.12.87-.2 1.07-.1.27-.22.46-.42.66-.2.2-.39.33-.66.42-.2.08-.5.17-1.07.2-.6.04-.8.04-2.4.04s-1.8 0-2.4-.04c-.56-.03-.87-.12-1.07-.2a1.8 1.8 0 0 1-.66-.42 1.8 1.8 0 0 1-.42-.66c-.08-.2-.17-.5-.2-1.07C7.3 13.8 7.3 13.6 7.3 12s0-1.8.04-2.4c.03-.56.12-.87.2-1.07.1-.27.22-.46.42-.66.2-.2.39-.33.66-.42.2-.08.5-.17 1.07-.2.6-.04.8-.04 2.4-.04Zm0-1.3c-1.63 0-1.84 0-2.48.04-.64.03-1.08.13-1.46.28-.4.16-.73.37-1.07.71-.34.34-.55.68-.71 1.07-.15.38-.25.82-.28 1.46C6 10.16 6 10.37 6 12s0 1.84.04 2.48c.03.64.13 1.08.28 1.46.16.4.37.73.71 1.07.34.34.68.55 1.07.71.38.15.82.25 1.46.28.64.04.85.04 2.48.04s1.84 0 2.48-.04c.64-.03 1.08-.13 1.46-.28.4-.16.73-.37 1.07-.71.34-.34.55-.68.71-1.07.15-.38.25-.82.28-1.46.04-.64.04-.85.04-2.48s0-1.84-.04-2.48c-.03-.64-.13-1.08-.28-1.46a3.1 3.1 0 0 0-.71-1.07 3.1 3.1 0 0 0-1.07-.71c-.38-.15-.82-.25-1.46-.28C13.84 6 13.63 6 12 6Zm0 3.51A2.49 2.49 0 1 0 12 14.5a2.49 2.49 0 0 0 0-4.99Zm0 4.11a1.62 1.62 0 1 1 0-3.24 1.62 1.62 0 0 1 0 3.24Zm3.17-4.68a.58.58 0 1 0 0 1.16.58.58 0 0 0 0-1.16Z"
      />
    </svg>
  )
}

export function Portfolio({ initialSection }) {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 900px)')
  const scrollerRef = useRef(null)

  const heroTitle = `Hi, I’m ${profile.name}, a ${profile.role}`
  const aboutText =
    'I build responsive, high-performance web applications using HTML5, CSS3, JavaScript, and React.js, with a focus on clean architecture and maintainable code. My work emphasizes smooth user experience, efficient state management, and reliable API integration, with deployments handled through GitHub, Netlify, and Vercel.'

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const emailHref = useMemo(() => `mailto:${profile.email}`, [])

  useEffect(() => {
    if (!isMobile) return
    const id = initialSection || 'top'
    scrollToSection(scrollerRef.current, id, { reduced })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const heroSection = (
    <section id="top" className="boxSection">
      {isMobile ? (
        <div style={{ minHeight: '70svh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="h1 mHeroTitle" style={{ margin: 0, textAlign: 'center', lineHeight: 1.08 }}>
            <span className="mHeroHi">Hi</span>
            <span className="mHeroComma">,</span>
            <span className="mHeroSpacer" aria-hidden="true" />
            <span className="mHeroName">I'm {profile.name}</span>
            <br />
            <span className="mHeroRole">{profile.role}</span>
          </h1>
        </div>
      ) : (
        <div className="heroGrid">
          <div className="glass heroCard">
            <span className="pill">Frontend / React Development</span>
            <h1 className="h1 heroTitle" style={{ marginTop: 16 }}>
              <span className="heroTitleText">{heroTitle}</span>
            </h1>
            <div className="ctaRow">
              <Link className="btn btnPrimary" to="/projects">
                View Projects
              </Link>
              <Link className="btn" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )

  const aboutSection = (
    <section id="about" className="boxSection aboutCenter">
      {isMobile ? (
        <>
          <h2 className="h2">What You Can Expect</h2>
          <p className="muted prose aboutLead" style={{ maxWidth: '86ch', lineHeight: 1.85 }}>
            {aboutText}
          </p>
        </>
      ) : (
        <Reveal>
          <h2 className="h2">What You Can Expect</h2>
          <p className="muted prose aboutLead" style={{ maxWidth: '86ch', lineHeight: 1.85 }}>
            {aboutText}
          </p>
        </Reveal>
      )}
      <br/>
      <div className="aboutGrid" style={{ marginTop: 18 }}>
        {isMobile ? (
          <div className="glass aboutCard">
            <h3 className="cardTitle" style={{ margin: 0 }}>
              Tech focus
            </h3>
            <p className="aboutText prose">
              React components, clean CSS (Flex/Grid), and smooth animations for a high-end feel. I aim for consistent
              spacing, strong contrast, and an intuitive flow on every screen size.
            </p>
            <div className="kpiRow">
              <span className="pill">HTML5</span>
              <span className="pill">CSS3</span>
              <span className="pill">Bootstrap</span>
              <span className="pill">JavaScript</span>
              <span className="pill">React</span>
            </div>
          </div>
        ) : (
          <Reveal className="glass aboutCard">
          <h3 className="cardTitle" style={{ margin: 0 }}>
            Tech focus
          </h3>
          <p className="aboutText prose">
            React components, clean CSS (Flex/Grid), and smooth animations for a high-end feel. I aim for consistent
            spacing, strong contrast, and an intuitive flow on every screen size.
          </p>
          <div className="kpiRow">
            <span className="pill">HTML5</span>
            <span className="pill">CSS3</span>
            <span className="pill">Bootstrap</span>
            <span className="pill">JavaScript</span>
            <span className="pill">React</span>
          </div>
          </Reveal>
        )}

        {isMobile ? (
          <div className="glass aboutCard">
            <h3 className="cardTitle" style={{ margin: 0 }}>
              Delivery
            </h3>
            <p className="aboutText prose">
              Real deployments with GitHub + Netlify/Vercel, so projects are easy to access and demonstrate real-world
              usability.
            </p>
            <div className="kpiRow">
              <span className="pill">Git</span>
              <span className="pill">GitHub</span>
              <span className="pill">Netlify</span>
              <span className="pill">Vercel</span>
            </div>
          </div>
        ) : (
          <Reveal className="glass aboutCard">
          <h3 className="cardTitle" style={{ margin: 0 }}>
            Delivery
          </h3>
          <p className="aboutText prose">
            Real deployments with GitHub + Netlify/Vercel, so projects are easy to access and demonstrate real-world
            usability.
          </p>
          <div className="kpiRow">
            <span className="pill">Git</span>
            <span className="pill">GitHub</span>
            <span className="pill">Netlify</span>
            <span className="pill">Vercel</span>
          </div>
          </Reveal>
        )}
      </div>
    </section>
  )

  const projectsSection = (
    <section id="projects" className="boxSection sectionHeadCentered">
      {isMobile ? <h2 className="h2">Projects</h2> : <Reveal><h2 className="h2">Projects</h2></Reveal>}

      <div className="grid2" style={{ marginTop: 18 }}>
        {projects.map((p) => {
          const CardWrap = isMobile ? 'div' : Reveal
          const cardProps = isMobile
            ? { className: 'glass card' }
            : { className: 'glass card' }

          return (
            <CardWrap key={p.slug} {...cardProps}>
              <div className="cardTop">
                <h3 className="cardTitle">{p.title}</h3>
                <span className="cardDate">{p.date}</span>
              </div>
              <p className="cardDesc prose">{p.description}</p>
              <div className="cardBottom">
                <div className="tagRow" aria-label="Project tags">
                  {p.tags?.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
                <a className="cardLink" href={p.href} target="_blank" rel="noreferrer">
                  View
                </a>
              </div>
            </CardWrap>
          )
        })}
      </div>
    </section>
  )

  const skillsSection = (
    <section id="skills" className="boxSection sectionHeadCentered">
      {isMobile ? <h2 className="h2">Skills</h2> : <Reveal><h2 className="h2">Skills</h2></Reveal>}

      <div className="skillsGrid" style={{ marginTop: 18 }}>
        {skills.map((s) =>
          isMobile ? (
            <div key={s.label} className="skillCard">
              <p className="skillName">{s.label}</p>
              <p className="skillGroup">{s.group}</p>
            </div>
          ) : (
            <Reveal key={s.label}>
              <div className="skillCard">
                <p className="skillName">{s.label}</p>
                <p className="skillGroup">{s.group}</p>
              </div>
            </Reveal>
          ),
        )}
      </div>
    </section>
  )

  const contactSection = (
    <section id="contact" className="boxSection sectionHeadCentered">
      {isMobile ? <h2 className="h2">Contact</h2> : <Reveal><h2 className="h2">Contact</h2></Reveal>}

      <div className="contactGrid" style={{ marginTop: 18 }}>
        <Reveal className="glass contactCard">
          <h3 className="cardTitle" style={{ margin: 0 }}>
            Email
          </h3>
          <p className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
            <a className="cardLink link" href={emailHref}>
              {profile.email}
            </a>
          </p>
          <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btnPrimary" type="button" onClick={() => setOpen(true)}>
              Quick message
            </button>
          </div>
        </Reveal>

        <Reveal className="glass contactCard">
          <h3 className="cardTitle" style={{ margin: 0 ,textAlign:'center'}}>
            Socials
          </h3>
          <p className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
            Click any icon to open 
          </p>
          <div className="socialRow" aria-label="Social links">
            {profile.socials.map((s) => (
              <a key={s.label} className="socialBtn" href={s.href} target="_blank" rel="noreferrer">
                <span className="socialIcon" aria-hidden="true">
                  <SocialIcon label={s.label} />
                </span>
                <span style={{ fontWeight: 650 }}>{s.label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )

  const sectionKey = initialSection || (location.pathname === '/' ? 'top' : location.pathname.replace('/', ''))
  const sectionForDesktop =
    sectionKey === 'projects'
      ? projectsSection
      : sectionKey === 'skills'
        ? skillsSection
        : sectionKey === 'contact'
          ? contactSection
          : sectionKey === 'about'
            ? aboutSection
            : heroSection

  return (
    <div className="stage">
      <div className="container">
        <div className="mainBox glass" aria-label="Main portfolio container">
          {isMobile ? (
            <div className="mainScroller" ref={scrollerRef}>
              {heroSection}
              {aboutSection}
              {projectsSection}
              {skillsSection}
              {contactSection}
            </div>
          ) : (
            <div className="desktopSection">
              <motion.div
                key={sectionKey}
                initial={reduced ? false : { opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={reduced ? undefined : { duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%' }}
              >
                {sectionForDesktop}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {open ? (
        <div className="popup" role="dialog" aria-modal="true" aria-label="Quick message popup">
          <div className="popupBackdrop" onClick={() => setOpen(false)} role="presentation" />
          <div className="glass popupCard popupCardElevated">
            <div className="popupHeader">
              <div>
                <h3 className="cardTitle" style={{ margin: 0 }}>
                  Send a message
                </h3>
                <p className="muted" style={{ marginTop: 6, fontSize: 13, lineHeight: 1.5 }}>
                  This opens your email client with a pre-filled draft.
                </p>
              </div>
              <button className="iconBtn" type="button" onClick={() => setOpen(false)} aria-label="Close popup">
                <IconClose />
              </button>
            </div>

            <input
              className="input"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <input
              className="input"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            <textarea
              className="input"
              rows={5}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12, flexWrap: 'wrap' }}>
              <button className="btn" type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <a
                className="btn btnPrimary popupPrimary"
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  `Portfolio enquiry — ${form.name || 'Hello'}`,
                )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`}
                onClick={() => setOpen(false)}
              >
                Open email draft
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

