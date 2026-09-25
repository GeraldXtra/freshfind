export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function currentMonth(now = new Date()) {
  return now.getMonth() + 1
}

export function inSeason(item, month = currentMonth()) {
  return Array.isArray(item?.season) && item.season.includes(month)
}

function contiguousRanges(months) {
  const ranges = []
  months.forEach((month) => {
    const last = ranges[ranges.length - 1]
    if (last && last.end === month - 1) {
      last.end = month
    } else {
      ranges.push({ start: month, end: month })
    }
  })
  return ranges
}

function mergeAcrossNewYear(ranges) {
  if (ranges.length < 2) return ranges
  const first = ranges[0]
  const last = ranges[ranges.length - 1]
  if (first.start !== 1 || last.end !== 12) return ranges
  return [...ranges.slice(1, -1), { start: last.start, end: first.end }]
}

function rangeText(range) {
  const start = MONTHS[range.start - 1]
  const end = MONTHS[range.end - 1]
  return range.start === range.end ? start : `${start}–${end}`
}

export function seasonLabel(months) {
  const unique = [...new Set(months || [])]
    .filter((month) => month >= 1 && month <= 12)
    .sort((a, b) => a - b)

  if (unique.length === 0) return ''
  if (unique.length === 12) return 'All year'

  return mergeAcrossNewYear(contiguousRanges(unique)).map(rangeText).join(', ')
}
