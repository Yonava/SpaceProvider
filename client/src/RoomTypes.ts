export type RoomLabel = 'OUTLETS' | 'NO_OUTLETS' | 'ACCESSIBLE' | 'BAD_TEMP' | 'LOCKED' | 'WHITEBOARD' | 'CHALKBOARD' | 'COMPUTERS' | 'WINDOWS' | 'TRAFFIC_LEVEL' | 'QUIET_AREA'

// more buildings to be added later
export type Building = 'LIB' | 'ILC' | 'ISB' | 'WOO' | 'LGRT' | 'LGRC' | 'ENG1' | 'ENG2' | 'MRL1' | 'MRL2' | 'HERT' | 'BART' | 'WIT'

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
  last_edited: Date
}
