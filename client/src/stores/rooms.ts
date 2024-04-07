import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { getRooms, postRoom, updateRoom, deleteRoom } from '../api'
import type { Room, PostedRoom } from '../rooms'

export const useRooms = defineStore('rooms', () => {

  const rooms = ref<PostedRoom[]>([])
  const loadingRooms = ref(false)
  const currentRoom = ref<PostedRoom | null>(null)

  const setCurrentRoom = (room: PostedRoom | null) => {
    currentRoom.value = room
  }

  const filterQuery = ref('')

  const displayedRooms = computed(() => {
    const query = filterQuery.value.toLowerCase()
    return rooms.value.filter(room => {
      const roomFields = Object.values(room).map(val => String(val).toLowerCase())
      const { building, room: roomNumber } = room
      const specialCases = [
        `${building} ${roomNumber}`,
        `${building}-${roomNumber}`,
        `${building}${roomNumber}`
      ].map(val => val.toLowerCase())
      return roomFields.some(field => field.includes(query)) || specialCases.some(field => field.includes(query))
    });
  });

  const fetchRooms = async () => {
    loadingRooms.value = true
    rooms.value = await getRooms()
    loadingRooms.value = false
  }

  const saveRoom = async (room: Room | PostedRoom) => {

    room.last_edited = new Date()

    if ('_id' in room) {
      try {
        return await updateRoom(room)
      } catch (err) {
        console.log('failed to update')
        // location.reload()
        console.error(err)
      }
    }

    try {
      const res = await postRoom(room)
      rooms.value.unshift(res)
      return res
    } catch (err) {
      // location.reload()
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

  onMounted(fetchRooms)

  return {
    filterQuery,
    displayedRooms,
    rooms,
    currentRoom,
    setCurrentRoom,
    saveRoom,
    removeRoom,
    fetchRooms,
    loadingRooms
  }
})