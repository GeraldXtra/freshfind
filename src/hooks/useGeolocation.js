import { useCallback, useState } from 'react'

export default function useGeolocation() {
  const [status, setStatus] = useState('idle')
  const [coords, setCoords] = useState(null)

  const request = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('unsupported')
      return
    }

    setCoords(null)
    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setStatus('granted')
      },
      () => {
        setStatus('denied')
      },
    )
  }, [])

  return { status, coords, request }
}
