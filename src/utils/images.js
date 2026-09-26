export function marketImage(name) {
  return new URL(`../assets/images/markets/${name}.webp`, import.meta.url).href
}

export function produceImage(name) {
  return new URL(`../assets/images/produce/${name}.webp`, import.meta.url).href
}

export function pageImage(name) {
  return new URL(`../assets/images/pages/${name}.webp`, import.meta.url).href
}
