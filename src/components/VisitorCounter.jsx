import { useEffect, useRef, useState } from 'react'
import useClock from '../hooks/useClock'

const STORAGE_KEY = 'ff_visits'
const START = Date.UTC(2026, 8, 20)
const START_VISITORS = 1250
const SECONDS_PER_VISITOR = 45

function simulatedVisitors(now) {
  const lagosMs = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  )
  const seconds = Math.max(0, (lagosMs - START) / 1000)
  return START_VISITORS + Math.floor(seconds / SECONDS_PER_VISITOR)
}

export default function VisitorCounter({ className }) {
  const now = useClock()
  const [loads, setLoads] = useState(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    let visits
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      const parsed = stored === null ? NaN : parseInt(stored, 10)
      visits = Number.isNaN(parsed) ? 1 : parsed + 1
      sessionStorage.setItem(STORAGE_KEY, String(visits))
    } catch {
      visits = 1
    }
    setLoads(visits)
  }, [])

  if (loads === null) return null

  const count = simulatedVisitors(now) + loads

  return <span className={className}>Visitors: {count.toLocaleString('en-US')}</span>
}
