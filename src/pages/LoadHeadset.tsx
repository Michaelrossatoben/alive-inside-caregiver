import { useEffect, useState } from 'react'
import {
  HEADSET_STEPS,
  RESOURCE_LINKS,
  TROUBLESHOOT_FAQ,
} from '../data/headsetChecklist'
import { loadChecklist, saveChecklist } from '../utils/storage'

export default function LoadHeadset() {
  const [done, setDone] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setDone(loadChecklist())
  }, [])

  function toggle(id: string) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      saveChecklist(next)
      return next
    })
  }

  return (
    <div>
      <header className="page-header">
        <h1>Load Headset</h1>
        <p>
          Checklist for the Alive Inside Memory Player / Healing Headset —
          personalized music, loaded with care.
        </p>
      </header>

      <ol className="checklist">
        {HEADSET_STEPS.map((step, i) => (
          <li key={step.id}>
            <button
              type="button"
              className={`check-toggle ${done[step.id] ? 'done' : ''}`}
              aria-pressed={!!done[step.id]}
              aria-label={done[step.id] ? `Mark ${step.title} incomplete` : `Mark ${step.title} done`}
              onClick={() => toggle(step.id)}
            >
              ✓
            </button>
            <span className="check-num" aria-hidden="true">
              {i + 1}
            </span>
            <div className="check-body">
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="card troubleshoot">
        <h2 style={{ fontSize: '1.15rem' }}>Troubleshoot</h2>
        {TROUBLESHOOT_FAQ.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>

      <section className="card">
        <h2 style={{ fontSize: '1.15rem' }}>Links &amp; resources</h2>
        <ul className="resource-list">
          {RESOURCE_LINKS.map((r) => (
            <li key={r.href}>
              <a href={r.href} target="_blank" rel="noopener noreferrer">
                <span>
                  {r.label}
                  <span className="res-desc">{r.desc}</span>
                </span>
              </a>
            </li>
          ))}
          <li>
            <a href="mailto:info@aliveinside.org">
              <span>
                Email Alive Inside
                <span className="res-desc">info@aliveinside.org</span>
              </span>
            </a>
          </li>
        </ul>
      </section>

      <div className="bogo-note">
        <strong>Buy one, give one.</strong> Supporting Alive Inside headsets helps
        put personalized music into the hands of elders and caregivers who need it.
        Shop:{' '}
        <a
          href="https://bealiveinside.myshopify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          bealiveinside.myshopify.com
        </a>
      </div>
    </div>
  )
}
