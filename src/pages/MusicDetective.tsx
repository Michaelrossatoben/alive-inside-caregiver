import { useMemo, useState } from 'react'
import {
  DEMO_PROFILES,
  emptyAnswers,
  type InterviewAnswers,
  type PlaylistTrack,
} from '../data/demoProfiles'
import {
  generatePlaylist,
  playlistAsText,
  spotifySearchUrl,
} from '../utils/playlist'

const STEPS = [
  { key: 'who', title: 'Who are they?' },
  { key: 'music', title: 'Their music' },
  { key: 'life', title: 'Life story' },
  { key: 'playlist', title: 'Playlist' },
] as const

export default function MusicDetective() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<InterviewAnswers>(emptyAnswers)
  const [tracks, setTracks] = useState<PlaylistTrack[]>([])
  const [toast, setToast] = useState('')

  const progress = useMemo(() => STEPS.map((_, i) => i), [])

  function update<K extends keyof InterviewAnswers>(key: K, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }))
  }

  function loadDemo(id: string) {
    const demo = DEMO_PROFILES.find((d) => d.id === id)
    if (!demo) return
    setAnswers({ ...demo.answers })
    setStep(0)
    setToast(`Loaded ${demo.label}'s profile`)
    setTimeout(() => setToast(''), 2000)
  }

  function buildPlaylist() {
    const list = generatePlaylist(answers)
    setTracks(list)
    setStep(3)
  }

  function editTrack(id: string, title: string) {
    setTracks((list) =>
      list.map((t) =>
        t.id === id ? { ...t, title, searchQuery: title } : t,
      ),
    )
  }

  function removeTrack(id: string) {
    setTracks((list) => list.filter((t) => t.id !== id))
  }

  async function copyText() {
    const text = playlistAsText(tracks, answers.elderName)
    try {
      await navigator.clipboard.writeText(text)
      setToast('Playlist copied')
    } catch {
      setToast('Copy failed — select text manually')
    }
    setTimeout(() => setToast(''), 2000)
  }

  return (
    <div>
      <header className="page-header">
        <h1>Music Detective</h1>
        <p>
          Find specific life-story songs — not “anything from the 1940s.”
          Specificity wakes identity.
        </p>
      </header>

      <div className="card">
        <h2 style={{ fontSize: '1.1rem' }}>Try a demo profile</h2>
        <div className="demo-profiles">
          {DEMO_PROFILES.map((d) => (
            <button
              key={d.id}
              type="button"
              className="demo-btn"
              onClick={() => loadDemo(d.id)}
            >
              <strong>{d.label}</strong>
              <span>{d.blurb}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="wizard-progress" aria-hidden="true">
        {progress.map((i) => (
          <div
            key={i}
            className={`step-dot ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}
          />
        ))}
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: 0 }}>
        Step {step + 1} of {STEPS.length}: {STEPS[step].title}
      </p>

      {step === 0 && (
        <div className="card">
          <div className="form-group">
            <label htmlFor="elderName">Elder’s name</label>
            <input
              id="elderName"
              value={answers.elderName}
              onChange={(e) => update('elderName', e.target.value)}
              placeholder="e.g. Dorothy"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDecade">Birth decade</label>
            <select
              id="birthDecade"
              value={answers.birthDecade}
              onChange={(e) => update('birthDecade', e.target.value)}
            >
              <option value="">Select…</option>
              {['1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s'].map(
                (d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ),
              )}
            </select>
            <p className="hint">Decade is a clue — not the playlist.</p>
          </div>
          <div className="form-group">
            <label htmlFor="hometown">Hometown / where they grew up</label>
            <input
              id="hometown"
              value={answers.hometown}
              onChange={(e) => update('hometown', e.target.value)}
              placeholder="City, region, country"
            />
          </div>
          <div className="form-group">
            <label htmlFor="moodGoal">Mood goal for listening</label>
            <select
              id="moodGoal"
              value={answers.moodGoal}
              onChange={(e) => update('moodGoal', e.target.value)}
            >
              {[
                'calm & connection',
                'joy & reminiscence',
                'energy & family connection',
                'peace & spiritual comfort',
                'ease before bathing / ADLs',
                'ease sundowning',
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="wizard-actions">
            <button type="button" className="btn btn-primary btn-block" onClick={() => setStep(1)}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <div className="form-group">
            <label htmlFor="artists">Favorite artists</label>
            <textarea
              id="artists"
              value={answers.artists}
              onChange={(e) => update('artists', e.target.value)}
              placeholder="Comma-separated — be specific"
            />
          </div>
          <div className="form-group">
            <label htmlFor="songs">Specific songs they loved</label>
            <textarea
              id="songs"
              value={answers.songs}
              onChange={(e) => update('songs', e.target.value)}
              placeholder="Titles matter more than eras"
            />
            <p className="hint">Ask siblings, old friends, church mates, coworkers.</p>
          </div>
          <div className="form-group">
            <label htmlFor="dances">Dances they knew</label>
            <input
              id="dances"
              value={answers.dances}
              onChange={(e) => update('dances', e.target.value)}
              placeholder="e.g. Lindy Hop, salsa, waltz"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hymns">Hymns / spiritual songs</label>
            <textarea
              id="hymns"
              value={answers.hymns}
              onChange={(e) => update('hymns', e.target.value)}
              placeholder="Amazing Grace, How Great Thou Art…"
            />
          </div>
          <div className="form-group">
            <label htmlFor="weddingSong">Wedding song</label>
            <input
              id="weddingSong"
              value={answers.weddingSong}
              onChange={(e) => update('weddingSong', e.target.value)}
              placeholder="First dance or ceremony song"
            />
          </div>
          <div className="wizard-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setStep(0)}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <div className="form-group">
            <label htmlFor="jobs">Jobs / work life</label>
            <textarea
              id="jobs"
              value={answers.jobs}
              onChange={(e) => update('jobs', e.target.value)}
              placeholder="What did they do? What played at work?"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hobbies">Hobbies & joys</label>
            <textarea
              id="hobbies"
              value={answers.hobbies}
              onChange={(e) => update('hobbies', e.target.value)}
              placeholder="Choir, radio shows, gardening, sports…"
            />
          </div>
          <div className="wizard-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={buildPlaylist}>
              Build playlist
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="card">
            <h2 style={{ fontSize: '1.2rem' }}>
              Suggested playlist
              {answers.elderName ? ` for ${answers.elderName}` : ''}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
              Preferred personalized music &gt; generic decade playlists. Edit
              titles, open Spotify search, then load DRM-free files onto a Healing
              Headset.
            </p>
            <div className="wizard-actions" style={{ marginTop: '0.75rem' }}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStep(2)}>
                Edit answers
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => void copyText()}>
                Copy as text
              </button>
            </div>
          </div>

          {tracks.length === 0 && (
            <p className="card">Add more details and rebuild — specificity helps.</p>
          )}

          {tracks.map((t) => (
            <div key={t.id} className="playlist-item">
              <label className="sr-only" htmlFor={`track-${t.id}`}>
                Song title
              </label>
              <input
                id={`track-${t.id}`}
                className="song-title"
                value={t.title}
                onChange={(e) => editTrack(t.id, e.target.value)}
              />
              <p className="song-why">{t.why}</p>
              <div className="song-actions">
                <a
                  className="btn btn-secondary btn-sm"
                  href={spotifySearchUrl(t.searchQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search Spotify
                </a>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => removeTrack(t.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="card">
            <h3 style={{ fontSize: '1.05rem' }}>Go deeper with AIF</h3>
            <div className="external-links">
              <a href="https://www.aifapp.com/" target="_blank" rel="noopener noreferrer">
                AIF App — aifapp.com
              </a>
              <a
                href="https://www.aifapp.com/how-it-works"
                target="_blank"
                rel="noopener noreferrer"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}
