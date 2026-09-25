import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'ff_visits'

const counterStyle = {
  fontSize: '0.85rem',
}

// Simulated visitor counter kept in sessionStorage under 'ff_visits'.
// First visit in a session seeds a random number between 4000 and 6000,
// every later mount adds 1.
export default function VisitorCounter() {
  const [count, setCount] = useState(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    let visits
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      const parsed = stored === null ? NaN : parseInt(stored, 10)
      visits = Number.isNaN(parsed) ? Math.floor(Math.random() * 2001) + 4000 : parsed + 1
      sessionStorage.setItem(STORAGE_KEY, String(visits))
    } catch {
      visits = Math.floor(Math.random() * 2001) + 4000
    }
    setCount(visits)
  }, [])

  if (count === null) return null

  return <span style={counterStyle}>Visitors: {count.toLocaleString('en-US')}</span>
}
