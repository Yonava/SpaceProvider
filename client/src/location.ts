import type { GPSCoord } from './rooms'

export const getCoords = () => new Promise<GPSCoord>((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      resolve([position.coords.latitude, position.coords.longitude])
    },
    (error) => {
      reject(error)
    }
  )
})

export const getDistanceInMeters = (coords1: GPSCoord, coords2: GPSCoord) => {
  const R = 6371e3;
  const φ1 = coords1[0] * Math.PI / 180;
  const φ2 = coords2[0] * Math.PI / 180;
  const Δφ = (coords2[0]-coords1[0]) * Math.PI / 180;
  const Δλ = (coords2[1]-coords1[1]) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return Math.round(R * c);
}