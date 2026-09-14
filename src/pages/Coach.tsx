import { useEffect, useRef, useState } from 'react'
import {
  CRISIS_MESSAGE,
  STARTER_CHIPS,
  WELCOME_MESSAGE,
  detectCrisis,
} from '../data/coachResponses'
import { getCoachReply } from '../utils/openai'
import { loadTips, removeTip, saveTip, type SavedTip } from '../utils/storage'

type Msg = {
  id: string
  role: 'coach' | 'user'
  text: string
}

export default function Coach() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'welcome', role: 'coach', text: WELCOME_MESSAGE },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [crisis, setCrisis] = useState(false)
  const [tips, setTips] = useState<SavedTip[]>([])
  const [toast, setToast] = useState('')
  const [showChips, setShowChips] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTips(loadTips())
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, crisis, busy])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy || crisis) return

    setShowChips(false)
    setInput('')
    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: 'user', text: trimmed },
    ])

    if (detectCrisis(trimmed)) {
      setCrisis(true)
      setMessages((m) => [
        ...m,
        { id: `c-${Date.now()}`, role: 'coach', text: CRISIS_MESSAGE },
      ])
      return
    }

    setBusy(true)
    try {
      const reply = await getCoachReply(trimmed)
      setMessages((m) => [
        ...m,
        { id: `c-${Date.now()}`, role: 'coach', text: reply },
      ])
    } finally {
      setBusy(false)
    }
  }

  function onSaveTip(text: string) {
    const next = saveTip(text)
    setTips(next)
    setToast('Tip saved')
    setTimeout(() => setToast(''), 2000)
  }

  function onRemoveTip(id: string) {
    setTips(removeTip(id))
  }

  return (
    <div>
      <header className="page-header">
        <h1>Dementia Coach</h1>
        <p>Calm · hopeful · practical — Alive Inside voice</p>
      </header>

      <p className="coach-disclaimer">
        Medical disclaimer: This coach is not a doctor and does not provide
        diagnosis or prescriptions. For medical decisions, contact a clinician.
      </p>

      {crisis && (
        <div className="crisis-banner" role="alert">
          <h2>Please get help now</h2>
          <p>
            Call or text <a href="tel:988">988</a> (Suicide &amp; Crisis Lifeline).
            If there is immediate danger, call <a href="tel:911">911</a>.
          </p>
          <p>Coaching is paused for safety.</p>
        </div>
      )}

      {!crisis && showChips && (
        <div className="starter-chips" aria-label="Starter prompts">
          {STARTER_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              className="chip"
              disabled={busy}
              onClick={() => send(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <div className="chat-log" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`bubble ${msg.role}`}>
            {msg.text}
            {msg.role === 'coach' && msg.id !== 'welcome' && !crisis && (
              <div>
                <button
                  type="button"
                  className="save-tip"
                  onClick={() => onSaveTip(msg.text)}
                >
                  ☆ Save tip
                </button>
              </div>
            )}
          </div>
        ))}
        {busy && (
          <div className="bubble coach" aria-busy="true">
            Thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {!crisis && (
        <form
          className="chat-compose"
          onSubmit={(e) => {
            e.preventDefault()
            void send(input)
          }}
        >
          <label className="sr-only" htmlFor="coach-input">
            Message the coach
          </label>
          <textarea
            id="coach-input"
            rows={1}
            placeholder="What's hard today?"
            value={input}
            disabled={busy}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void send(input)
              }
            }}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={busy || !input.trim()}
            aria-label="Send"
          >
            ↑
          </button>
        </form>
      )}

      {tips.length > 0 && (
        <section className="saved-tips" aria-label="Saved tips">
          <h2>Saved tips</h2>
          <ul>
            {tips.map((t) => (
              <li key={t.id}>
                <span>
                  {t.text.slice(0, 280)}
                  {t.text.length > 280 ? '…' : ''}
                </span>
                <button type="button" onClick={() => onRemoveTip(t.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}
