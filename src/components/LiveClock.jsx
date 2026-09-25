import useClock from '../hooks/useClock'

export default function LiveClock({ className }) {
  const now = useClock()
  const day = now.toLocaleDateString('en-US', { weekday: 'short' })
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <span className={className}>
      {day} · {time}
    </span>
  )
}
