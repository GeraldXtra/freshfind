import { useEffect, useState } from 'react'
import { lagosNow } from '../utils/time'

export default function useClock() {
  const [now, setNow] = useState(() => lagosNow())

  useEffect(() => {
    const id = setInterval(() => setNow(lagosNow()), 1000)
    return () => clearInterval(id)
  }, [])

  return now
}
