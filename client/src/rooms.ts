
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
  'WIT',
] as const

export type RoomLabel = typeof labels[number]

export type Building = typeof buildings[number]

export type GPSCoord = [number, number]
export type GPSData = {
  type: 'Point',
  coordinates: GPSCoord
}


export type Room = {
  building: Building,
  room: string,
  access_notes: string,
  images: string[],
  gps_coords: GPSData,
  labels: RoomLabel[],
  capacity: number,
  last_edited: Date,
}

export type PostedRoom<T extends Room = Room> = T & { _id: string }

export const newRoom = (building: Building): Room => ({
  building,
  room: '',
  access_notes: '',
  images: [],
  gps_coords: {
    type: 'Point',
    coordinates: [0, 0]
  },
  labels: [],
  capacity: 0,
  last_edited: new Date(),
})

export const serializeRoom = (obj: Record<any, any>) => JSON.stringify(obj);