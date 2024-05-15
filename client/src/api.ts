import axios from 'axios'
import type { Room, PostedRoom } from './rooms'

const ProdURI = 'https://spaceprovider.up.railway.app/admin/api/'
const DevURI = 'http://localhost:3000/admin/api/'

const URI = location.hostname === 'localhost' ? DevURI : ProdURI

const getRooms = async () => {
  const { data } = await axios.get<PostedRoom[]>(URI)
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

const updateRoom = async <T extends PostedRoom>(room: T, excludeImages: boolean = true) => {
  const { images, ...roomNoImages } = room
  const { data } = await axios.put<T>(`${URI}${room._id}`, 
    excludeImages ? roomNoImages : { images })
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