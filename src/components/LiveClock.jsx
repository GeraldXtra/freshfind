import useClock from '../hooks/useClock'

const clockStyle = {
  fontSize: 'var(--text-xs)',
  color: 'var(--color-text-muted)',
  whiteSpace: 'nowrap',
}

// Renders the live time like "Fri · 10:24 AM", ticking every second.
export default function LiveClock() {
  const now = useClock()
  const day = now.toLocaleDateString('en-US', { weekday: 'short' })
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <span style={clockStyle}>
      {day} · {time}
    </span>
  )
}
