export function mapEmbedUrl(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
}

export function directionsUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

export function whatsappShareUrl(text) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function xShareUrl(text) {
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}`
}

export function facebookShareUrl(url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}
