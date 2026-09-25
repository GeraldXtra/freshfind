import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'ff_visits'

export default function VisitorCounter({ className }) {
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

  return <span className={className}>Visitors: {count.toLocaleString('en-US')}</span>
}
