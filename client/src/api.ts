import axios from 'axios'
import type { Room, PostedRoom } from './rooms'

const URI = '/'

const getRooms = async () => {
  const { data } = await axios.get<Room[]>(URI)
  return data
}

const getRoom = async (mongoId: string) => {
  const { data } = await axios.get<Room>(`${URI}${mongoId}`)
  return data
}

const postRoom = async <T extends Room>(room: T) => {
  const { data } = await axios.post<PostedRoom<T>>(URI, room)
  return data
}

const updateRoom = async <T extends PostedRoom>(room: T) => {
  const { data } = await axios.put<T>(`${URI}${room._id}`, room)
  return data
}

const deleteRoom = async (mongoId: string) => {
  const { data } = await axios.delete<{ message: 'Room deleted' }>(`${URI}${mongoId}`)
  return data
}

export {
  getRooms,
  getRoom,
  postRoom,
  updateRoom,
  deleteRoom
}