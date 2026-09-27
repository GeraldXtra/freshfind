import useClock from '../hooks/useClock'

export default function LiveClock({ className }) {
  const now = useClock()
  const day = now.toLocaleDateString('en-US', { weekday: 'short' })
  const month = now.toLocaleDateString('en-US', { month: 'short' })
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })

  return (
    <span className={className}>
      {day} {now.getDate()} {month} · {time} WAT
    </span>
  )
}
