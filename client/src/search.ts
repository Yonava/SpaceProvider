import type { PostedRoom, Room } from "./rooms";

type RoomField = keyof PostedRoom
const EXCLUDED_ROOM_FIELDS = ['_id', 'images', 'gps_coords', 'last_edited'] satisfies RoomField[]

const roomFilter = (query: string) => <T extends Room>(room: PostedRoom<T>) => {

  const validRoomContents = Object
    .entries(room)
    .filter(([key]) => !EXCLUDED_ROOM_FIELDS.includes(key as any))
    .map(([_, value]) => value)
    .map(val => Array.isArray(val) ? val.join(' ') : val)
    .map(val => val.toString().toLowerCase().trim())

  const { building, room: roomNumber } = room

  const roomCodeFormats = [
    `${building} ${roomNumber}`,
    `${building}-${roomNumber}`,
    `${building}${roomNumber}`
  ] as const

  const roomCodeInSearchString = roomCodeFormats.some(roomCode => roomCode.toLowerCase().includes(query))
  if (roomCodeInSearchString) return true

  return validRoomContents.some(content => content.includes(query))
}

export const search = <T extends Room>(rooms: PostedRoom<T>[], queryString: string) => {
  const query = queryString.toLowerCase().trim()
  const f = roomFilter(query)
  return rooms.filter(f);
}