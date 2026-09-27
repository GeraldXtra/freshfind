const lagosFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Africa/Lagos',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hourCycle: 'h23',
})

export function lagosNow(date = new Date()) {
  const parts = {}
  lagosFormat.formatToParts(date).forEach(({ type, value }) => {
    parts[type] = Number(value)
  })
  return new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)
}
