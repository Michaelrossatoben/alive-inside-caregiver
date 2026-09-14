const TIPS_KEY = 'aic-saved-tips'
const CHECKLIST_KEY = 'aic-headset-checklist'

export type SavedTip = {
  id: string
  text: string
  savedAt: string
}

export function loadTips(): SavedTip[] {
  try {
    const raw = localStorage.getItem(TIPS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SavedTip[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveTip(text: string): SavedTip[] {
  const tips = loadTips()
  const tip: SavedTip = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: text.slice(0, 2000),
    savedAt: new Date().toISOString(),
  }
  const next = [tip, ...tips].slice(0, 50)
  localStorage.setItem(TIPS_KEY, JSON.stringify(next))
  return next
}

export function removeTip(id: string): SavedTip[] {
  const next = loadTips().filter((t) => t.id !== id)
  localStorage.setItem(TIPS_KEY, JSON.stringify(next))
  return next
}

export function loadChecklist(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, boolean>
  } catch {
    return {}
  }
}

export function saveChecklist(state: Record<string, boolean>) {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state))
}
