
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
  "WORC", // Worcester Dining Hall
  "WHEEL", // Wheeler Hall
  "TOTM", // Totman Gym
  "TOBN", // Tobin Hall
  "THOM", // Thompson Hall
  "THCH", // Thatcher House
  "STUDENTUN", // Student Union
  "STK", // Stockbridge Hall
  "SOM", // School of Management
  "SKIN", // Skinner Hall
  "SC", // South College
  "SAB", // Studio Arts Building
  "REG", // Research & Educ Greenhouse
  "RANDUPPR", // Rand Upper Lobby
  "RANDSTAGE", // Rand Stage
  "PAIG", // Paige Laboratory
  "NAH", // New Africa House
  "MRST", // Marston Hall
  "MOR4", // Morrill IV
  "MOR3", // Morrill III
  "MOR2", // Morrill II
  "MOR1", // Morrill I
  "MOR", // Morrill
  "MONT", // Montague House
  "MELV", // Melville Hall
  "MARC", // Marcus Hall
  "MAH", // Mahar Auditorium
  "MACH", // Machmer Hall
  "LYON", // Mary Lyon House
  "LSL", // Life Sciences Lab
  "LIB", // WEB DuBois Library
  "LGRT", // Lederle Graduate Research Tower
  "LGRC", // Lederle Graduate Research Center
  "ISB", // Integrated Sciences Building
  "ILC", // Integrative Learning Center
  "HOLD", // Holdsworth Hall
  "HICKPOOL", // Curry Hicks Phys. Ed Bldg Pool
  "HERT", // Herter Hall
  "HASA", // Hasbrouck Laboratory addn.
  "HAS", // Hasbrouck Laboratory
  "GUN", // Gunness Hall
  "GSMN", // Goessmann Hall addn.
  "GP", // George Parks Bldg
  "GORM", // Gorman House
  "GORDNHALL", // Gordon Hall
  "GOES", // Goessmann Hal
  "FURC", // Furcolo Hall
  "FREN", // French Hall
  "FLIN", // Flint Laboratory
  "FERN", // Fernald Hall
  "EMER", // Emerson Hall
  "ELM", // Elm Hall/House
  "ELABII", // Engineering Lab II
  "ELAB", // Engineering Lab
  "DWGT", // Dwight House
  "DRA", // Draper Hall
  "DKSN", // Dickinson Hall
  "DB", // Design Building
  "CURTTHEAT", // Curtain Theater
  "CNTE", // Conte Polymer Res Ctr
  "CMPS", // Computer Science Building
  "CHNWPLNT", // Chenoweth Pilot Plant
  "CHNW", // Chenoweth Lab
  "CHEN", // Chenoweth Lab addn.
  "CC", // Campus Center
  "BOYD", // Boyden Gym
  "BOWD", // Bowditch Hall
  "BFLD", // Butterfield House
  "BCABZSN", // Bromery Center Bezanson Hall
  "BCA", // Bromery Center for Arts
  "BART", // Bartlett Hall
  "ARND", // Arnold Hall
  "AEBN", // Ag. Engineering Bldg
  "AEBCXB", // Ag. Engin. Bldg Annex B
  "AEBC", // Ag. Engin. Central
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
  thumbnail: string,
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
  thumbnail: '',
  gps_coords: {
    type: 'Point',
    coordinates: [0, 0]
  },
  labels: [],
  capacity: 0,
  last_edited: new Date(),
})

export const serializeRoom = (obj: Record<any, any>) => JSON.stringify(obj);