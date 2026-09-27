import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ff_bookmarks'
const EMPTY_STATE = { markets: [], produce: [], notes: {} }

const BookmarksContext = createContext(null)

function listKey(type) {
  return type === 'market' ? 'markets' : 'produce'
}

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    const parsed = JSON.parse(raw)
    return {
      markets: Array.isArray(parsed.markets) ? parsed.markets : [],
      produce: Array.isArray(parsed.produce) ? parsed.produce : [],
      notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
    }
  } catch {
    return EMPTY_STATE
  }
}

function saveState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

function withoutNote(notes, id) {
  const next = { ...notes }
  delete next[id]
  return next
}

export function BookmarksProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const isSaved = useCallback((type, id) => state[listKey(type)].includes(id), [state])

  const remove = useCallback((type, id) => {
    setState((prev) => {
      const key = listKey(type)
      return {
        ...prev,
        [key]: prev[key].filter((item) => item !== id),
        notes: withoutNote(prev.notes, id),
      }
    })
  }, [])

  const toggle = useCallback((type, id) => {
    setState((prev) => {
      const key = listKey(type)
      if (prev[key].includes(id)) {
        return {
          ...prev,
          [key]: prev[key].filter((item) => item !== id),
          notes: withoutNote(prev.notes, id),
        }
      }
      return { ...prev, [key]: [...prev[key], id] }
    })
  }, [])

  const setNote = useCallback((id, text) => {
    setState((prev) => {
      const trimmed = typeof text === 'string' ? text : ''
      if (trimmed === '') return { ...prev, notes: withoutNote(prev.notes, id) }
      return { ...prev, notes: { ...prev.notes, [id]: trimmed } }
    })
  }, [])

  const getNote = useCallback((id) => state.notes[id] || '', [state])

  const clearAll = useCallback(() => setState(EMPTY_STATE), [])

  const value = useMemo(
    () => ({
      markets: state.markets,
      produce: state.produce,
      notes: state.notes,
      count: state.markets.length + state.produce.length,
      isSaved,
      toggle,
      remove,
      setNote,
      getNote,
      clearAll,
    }),
    [state, isSaved, toggle, remove, setNote, getNote, clearAll],
  )

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>
}

export function useBookmarks() {
  const value = useContext(BookmarksContext)
  if (!value) {
    throw new Error('useBookmarks must be used inside BookmarksProvider')
  }
  return value
}
