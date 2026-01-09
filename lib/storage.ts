const HISTORY_KEY = 'tracking-hub-history'
const MAX_HISTORY = 20

export interface HistoryItem {
  id: string
  url: string
  source: string
  medium: string
  campaign: string
  content?: string
  term?: string
  createdAt: string
}

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(HISTORY_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function addToHistory(item: Omit<HistoryItem, 'id' | 'createdAt'>): void {
  if (typeof window === 'undefined') return

  const history = getHistory()

  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  // Add to beginning, remove duplicates by URL
  const filtered = history.filter(h => h.url !== item.url)
  const updated = [newItem, ...filtered].slice(0, MAX_HISTORY)

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

export function removeFromHistory(id: string): void {
  if (typeof window === 'undefined') return

  const history = getHistory()
  const updated = history.filter(h => h.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(HISTORY_KEY)
}

// Theme
const THEME_KEY = 'tracking-hub-theme'

export type Theme = 'light' | 'dark'

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  } catch {
    return 'dark'
  }
}

export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(THEME_KEY, theme)
}
