import axios from 'axios'
import type { Room } from './rooms'

const URI = '/'

const getRooms = async () => {
  const { data } = await axios.get<Room[]>(URI)
  return data
}

const getRoom = async (mongoId: string) => {
  const { data } = await axios.get<Room>(`${URI}${mongoId}`)
  return data
}

const postRoom = async (room: Room) => {
  const { data } = await axios.post<Room>(URI, room)
  return data
}

const updateRoom = async (room: Room) => {
  const { data } = await axios.put<Room>(`${URI}${room._id}`, room)
  return data
}

const deleteRoom = async (room: Room) => {
  const { data } = await axios.delete<{ message: 'Room deleted' }>(`${URI}${room._id}`)
  return data
}

export {
  getRooms,
  getRoom,
  postRoom,
  updateRoom,
  deleteRoom
}