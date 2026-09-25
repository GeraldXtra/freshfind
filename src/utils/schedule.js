export const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const DAY_LABELS = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

export const DAY_FULL = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

const WEEK_FROM_MONDAY = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function minutesOfDay(date) {
  return date.getHours() * 60 + date.getMinutes()
}

function dayKeyOf(date) {
  return DAY_KEYS[date.getDay()]
}

function entryFor(schedule, dayKey) {
  if (!schedule) return null
  return schedule[dayKey] || null
}

export function formatTime(time) {
  const [hoursText, minutesText = '00'] = time.split(':')
  const hours = Number(hoursText)
  const suffix = hours >= 12 ? 'pm' : 'am'
  const displayHour = hours % 12 === 0 ? 12 : hours % 12
  return Number(minutesText) === 0
    ? `${displayHour}${suffix}`
    : `${displayHour}:${minutesText}${suffix}`
}

function hoursText(entry) {
  return `${formatTime(entry.open)}–${formatTime(entry.close)}`
}

function rangeText(days) {
  const first = DAY_LABELS[days[0]]
  const last = DAY_LABELS[days[days.length - 1]]
  return days.length === 1 ? first : `${first}–${last}`
}

function consecutiveRuns(schedule) {
  const runs = []
  let current = null

  WEEK_FROM_MONDAY.forEach((dayKey) => {
    const entry = entryFor(schedule, dayKey)
    if (!entry) {
      current = null
      return
    }
    const hours = hoursText(entry)
    if (current && current.hours === hours) {
      current.days.push(dayKey)
      return
    }
    current = { hours, days: [dayKey] }
    runs.push(current)
  })

  return runs
}

export function hoursLabel(schedule) {
  const runs = consecutiveRuns(schedule)
  if (runs.length === 0) return 'Closed'

  const byHours = []
  runs.forEach((run) => {
    const existing = byHours.find((group) => group.hours === run.hours)
    if (existing) {
      existing.ranges.push(rangeText(run.days))
    } else {
      byHours.push({ hours: run.hours, ranges: [rangeText(run.days)] })
    }
  })

  return byHours.map((group) => `${group.ranges.join(' & ')} · ${group.hours}`).join(', ')
}

export function todayHours(schedule, now = new Date()) {
  return entryFor(schedule, dayKeyOf(now))
}

export function isOpenNow(schedule, now = new Date()) {
  const entry = todayHours(schedule, now)
  if (!entry) return false
  const minutes = minutesOfDay(now)
  return minutes >= toMinutes(entry.open) && minutes < toMinutes(entry.close)
}

export function nextOpening(schedule, now = new Date()) {
  const todayIndex = now.getDay()
  const minutes = minutesOfDay(now)

  for (let offset = 0; offset <= 7; offset += 1) {
    const dayKey = DAY_KEYS[(todayIndex + offset) % 7]
    const entry = entryFor(schedule, dayKey)
    if (!entry) continue
    if (offset === 0 && minutes >= toMinutes(entry.open)) continue
    return {
      dayKey,
      dayLabel: DAY_LABELS[dayKey],
      dayFull: DAY_FULL[dayKey],
      open: entry.open,
      isToday: offset === 0,
      isTomorrow: offset === 1,
    }
  }

  return null
}

export function openBadge(schedule, now = new Date()) {
  if (isOpenNow(schedule, now)) {
    return { open: true, text: 'OPEN NOW' }
  }

  const next = nextOpening(schedule, now)
  if (!next) return { open: false, text: 'CLOSED', next: null }

  let text = `OPENS ${next.dayLabel.toUpperCase()}`
  if (next.isToday) text = 'OPENS TODAY'
  if (next.isTomorrow) text = 'OPENS TOMORROW'

  return { open: false, text, next }
}
