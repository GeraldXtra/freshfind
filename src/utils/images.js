export function marketImage(name, size) {
  const file = size === "sm" ? `${name}-sm` : name
  return new URL(`../assets/images/markets/${file}.webp`, import.meta.url).href
}

export function produceImage(name) {
  return new URL(`../assets/images/produce/${name}.webp`, import.meta.url).href
}

export function pageImage(name, size) {
  const file = size === "sm" ? `${name}-sm` : name
  return new URL(`../assets/images/pages/${file}.webp`, import.meta.url).href
}
