export function marketImage(name) {
  return new URL(`../assets/images/markets/${name}.png`, import.meta.url).href
}

export function produceImage(name) {
  return new URL(`../assets/images/produce/${name}.png`, import.meta.url).href
}

export function pageImage(name) {
  return new URL(`../assets/images/pages/${name}.png`, import.meta.url).href
}
