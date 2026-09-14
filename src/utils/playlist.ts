import type { InterviewAnswers, PlaylistTrack } from '../data/demoProfiles'

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function splitList(raw: string): string[] {
  return raw
    .split(/[,;/\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function spotifySearchUrl(query: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`
}

export function generatePlaylist(a: InterviewAnswers): PlaylistTrack[] {
  const tracks: PlaylistTrack[] = []
  const name = a.elderName.trim() || 'your loved one'
  const decade = a.birthDecade.trim()
  const town = a.hometown.trim()

  const songs = splitList(a.songs)
  songs.forEach((song) => {
    tracks.push({
      id: uid(),
      title: song,
      why: `Named specifically for ${name} — life-story songs beat generic ${decade || 'decade'} playlists.`,
      searchQuery: song,
    })
  })

  if (a.weddingSong.trim()) {
    tracks.push({
      id: uid(),
      title: a.weddingSong.trim(),
      why: `Wedding / love song tied to ${name}'s story — powerful identity music.`,
      searchQuery: a.weddingSong.trim(),
    })
  }

  splitList(a.hymns).forEach((hymn) => {
    tracks.push({
      id: uid(),
      title: hymn,
      why: `Spiritual / hymn connection for ${name}${a.moodGoal ? ` · mood goal: ${a.moodGoal}` : ''}.`,
      searchQuery: hymn,
    })
  })

  splitList(a.artists).slice(0, 4).forEach((artist) => {
    const already = tracks.some((t) =>
      t.title.toLowerCase().includes(artist.toLowerCase().split(' ')[0] || ''),
    )
    if (already) return
    const q =
      decade && !songs.length
        ? `${artist} ${decade}`
        : `${artist} best known songs`
    tracks.push({
      id: uid(),
      title: `${artist} — signature songs`,
      why: `Artist ${name} loved${town ? ` (roots: ${town})` : ''}. Search their most personal tracks, not random hits.`,
      searchQuery: q,
    })
  })

  if (a.dances.trim()) {
    tracks.push({
      id: uid(),
      title: `Dance music: ${splitList(a.dances)[0]}`,
      why: `Movement memory — dances ${name} knew can awaken joy and body memory.`,
      searchQuery: `${a.dances} ${decade}`.trim(),
    })
  }

  if (a.jobs.trim()) {
    tracks.push({
      id: uid(),
      title: `Work-era favorites (${splitList(a.jobs)[0]})`,
      why: `Songs from working years often unlock stories. Ask coworkers/family what played on the job radio.`,
      searchQuery: `${decade} ${splitList(a.jobs)[0]} popular songs`.trim(),
    })
  }

  if (a.hobbies.trim()) {
    const hobby = splitList(a.hobbies)[0]
    tracks.push({
      id: uid(),
      title: `Hobby soundtrack: ${hobby}`,
      why: `Hobbies shape identity. Pair listening with a related photo or object when possible.`,
      searchQuery: `${hobby} songs ${decade}`.trim(),
    })
  }

  if (tracks.length < 3 && decade) {
    tracks.push({
      id: uid(),
      title: `Deep cuts from ${name}'s youth (${decade})`,
      why: `Only as a starting point — replace with specific songs as you learn them. Specificity awakens identity.`,
      searchQuery: `${decade} popular songs ${town}`.trim(),
    })
  }

  // Dedupe by title
  const seen = new Set<string>()
  return tracks.filter((t) => {
    const key = t.title.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function playlistAsText(tracks: PlaylistTrack[], elderName: string): string {
  const header = `Alive Inside playlist for ${elderName || 'my loved one'}\n` +
    `(Preferred personalized music — not a generic decade mix)\n\n`
  const body = tracks
    .map(
      (t, i) =>
        `${i + 1}. ${t.title}\n   Why: ${t.why}\n   Spotify: ${spotifySearchUrl(t.searchQuery)}`,
    )
    .join('\n\n')
  return header + body
}
