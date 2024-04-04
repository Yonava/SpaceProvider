export const labels = [
  'OUTLETS',
  'NO_OUTLETS',
  'ACCESSIBLE',
  'BAD_TEMP',
  'LOCKED',
  'WHITEBOARD',
  'CHALKBOARD',
  'COMPUTERS',
  'WINDOWS',
  'TRAFFIC_LEVEL',
  'QUIET_AREA'
] as const

export const buildings = [
  'LIB',
  'ILC',
  'ISB',
  'WOO',
  'LGRT',
  'LGRC',
  'ENG1',
  'ENG2',
  'MRL1',
  'MRL2',
  'HERT',
  'BART',
  'WIT'
] as const

export type RoomLabel = typeof labels[number]

export type Building = typeof buildings[number]

export type GPSCoord = {
  lat: number,
  lon: number
}

export type Room = {
  building: Building,
  room: string,
  access_notes: string,
  images: string[],
  gps_coords: GPSCoord,
  labels: RoomLabel[],
  capacity: number,
  last_edited: Date,
  _id: string
}
