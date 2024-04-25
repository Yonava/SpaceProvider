import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { getRooms, getRoom, postRoom, updateRoom, deleteRoom } from '../api'
import type { Room, PostedRoom } from '../rooms'
import { serializeRoom } from '../rooms'
import { search } from '../search'

export const useRooms = defineStore('rooms', () => {

  const rooms = ref<PostedRoom[]>([])
  const loadingRooms = ref(false)
  const currentRoom = ref<PostedRoom | null>(null)
  const serializedCurrentRoom = ref('')
  const loadingInLatestRoomData = ref(false)

  const setCurrentRoom = async (room: PostedRoom | null) => {
    if (!room) {
      currentRoom.value = null
      serializedCurrentRoom.value = ''
      return
    }

    currentRoom.value = room

    loadingInLatestRoomData.value = true
    try {
      const latestDataForRoom = await getRoom(room._id)
      Object.assign(room, latestDataForRoom)
    } catch {
      console.error('failed to fetch latest room data')
    }
    serializedCurrentRoom.value = serializeRoom(room)
    loadingInLatestRoomData.value = false
  }

  const filterQuery = ref('')
  const displayedRooms = computed(() => search(rooms.value, filterQuery.value));

  const fetchRooms = async () => {
    loadingRooms.value = true
    rooms.value = await getRooms()
    loadingRooms.value = false
  }

  const saveRoom = async (room: Room | PostedRoom) => {

    const currentRoomEdited = serializeRoom(room) !== serializedCurrentRoom.value
    if (!currentRoomEdited) {
      console.log('no changes')
      return
    }

    room.last_edited = new Date()

    if ('_id' in room) {
      try {
        return await updateRoom(room)
      } catch (err) {
        console.log('failed to update')
        console.error(err)
      }
    }

    try {
      const res = await postRoom(room)
      rooms.value.unshift(res)
      return res
    } catch (err) {
      console.error(err)
    }
  }

  const removeRoom = async (_id: string) => {
    try {
      await deleteRoom(_id)
      rooms.value = rooms.value.filter(room => room._id !== _id)
      setCurrentRoom(null)
    } catch (err) {
      console.error(err)
    }
  }

  onMounted(async () => {
    await fetchRooms()
    const urlParams = new URLSearchParams(window.location.search)
    const roomId = urlParams.get('room')
    if (!roomId) return
    const [building, room] = roomId.split('-')
    const roomToOpen = rooms.value.find(r => r.building === building && r.room === room)
    if (!roomToOpen) return
    setCurrentRoom(roomToOpen)
  })

  return {
    filterQuery,
    displayedRooms,
    rooms,
    currentRoom,
    setCurrentRoom,
    saveRoom,
    removeRoom,
    fetchRooms,
    loadingRooms,
    loadingInLatestRoomData
  }
})