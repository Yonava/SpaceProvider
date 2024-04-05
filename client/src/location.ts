import type { GPSCoord } from './rooms'

export const getCoords = () => new Promise<GPSCoord>((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    },
    (error) => {
      reject(error)
    }
  )
})

export const getDistanceInMeters = (coords1: GPSCoord, coords2: GPSCoord) => {
  const R = 6371e3;
  const φ1 = coords1.lat * Math.PI / 180;
  const φ2 = coords2.lat * Math.PI / 180;
  const Δφ = (coords2.lat-coords1.lat) * Math.PI / 180;
  const Δλ = (coords2.lon-coords1.lon) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return Math.round(R * c);
}