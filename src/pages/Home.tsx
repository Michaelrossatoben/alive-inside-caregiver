import { Link } from 'react-router-dom'

const ctas = [
  {
    to: '/coach',
    icon: '💬',
    title: 'Talk to Coach',
    desc: 'Calm, practical dementia caregiving support',
  },
  {
    to: '/music',
    icon: '🔎',
    title: 'Find Music',
    desc: 'Music Detective — specific songs that wake identity',
  },
  {
    to: '/headset',
    icon: '🎧',
    title: 'Load Headset',
    desc: 'Checklist for Memory Player / Healing Headset',
  },
  {
    to: 'https://aliveinside.org/posts/108208/watch-the-movie',
    icon: '🎬',
    title: 'Watch Film',
    desc: 'The Alive Inside documentary',
    external: true,
  },
  {
    to: 'https://bealiveinside.myshopify.com/',
    icon: '🧡',
    title: 'Get a Headset',
    desc: 'Shop Alive Inside Healing Headsets',
    external: true,
  },
]

export default function Home() {
  return (
    <div>
      <header className="hero">
        <div className="hero-logo">
          <img
            src={`${import.meta.env.BASE_URL}alive-inside-logo.png`}
            alt="Alive Inside"
            width={96}
            height={96}
          />
        </div>
        <h1>Caregiver</h1>
        <p className="tagline">
          Music can wake identity. Caregivers deserve support. Practical tools for
          families walking the dementia journey — with hope, specificity, and
          compassion.
        </p>
      </header>

      <div className="cta-grid">
        {ctas.map((c) =>
          c.external ? (
            <a
              key={c.title}
              className="cta-card"
              href={c.to}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cta-icon" aria-hidden="true">
                {c.icon}
              </span>
              <span className="cta-text">
                <strong>{c.title}</strong>
                <span>{c.desc}</span>
              </span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ) : (
            <Link key={c.title} className="cta-card" to={c.to}>
              <span className="cta-icon" aria-hidden="true">
                {c.icon}
              </span>
              <span className="cta-text">
                <strong>{c.title}</strong>
                <span>{c.desc}</span>
              </span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ),
        )}
      </div>

      <p className="shop-note">
        Buy one, give one — when you support Alive Inside headsets, you help
        bring personalized music to elders who need it.{' '}
        <a href="https://aliveinside.org" target="_blank" rel="noopener noreferrer">
          aliveinside.org
        </a>
      </p>
    </div>
  )
}
