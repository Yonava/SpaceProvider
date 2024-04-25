import axios from 'axios'
import type { Room, PostedRoom } from './rooms'

const ProdURI = 'https://spaceprovider.up.railway.app/admin/api/'
const DevURI = 'http://localhost:3000/admin/api/'

const URI = location.hostname === 'localhost' ? DevURI : ProdURI

const getRooms = async () => {
  console.log(URI)
  const { data } = await axios.get<PostedRoom[]>(URI)
  console.log(data)
  return data
}

const getRoom = async (_id: string) => {
  const { data } = await axios.get<PostedRoom>(`${URI}${_id}`)
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

const deleteRoom = async (_id: string) => {
  const { data } = await axios.delete<{ message: 'Room deleted' }>(`${URI}${_id}`)
  return data
}

export {
  getRooms,
  getRoom,
  postRoom,
  updateRoom,
  deleteRoom
}