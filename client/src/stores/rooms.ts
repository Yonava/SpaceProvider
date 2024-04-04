import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { getRooms, postRoom, updateRoom } from '../api'
import type { Room, PostedRoom } from '../rooms'

export const useRooms = defineStore('rooms', () => {

  const rooms = ref<PostedRoom[]>([])
  const currentRoom = ref<Room | PostedRoom | null>(null)

  const filterQuery = ref('')

  const displayedRooms = computed(() => {
    const query = filterQuery.value.toLowerCase()
    return rooms.value.filter(room => {
      const roomFields = Object.values(room).map(val => String(val).toLowerCase())
      return roomFields.some(field => field.includes(query))
    });
  });

  const fetchRooms = async () => {
    rooms.value = await getRooms()
  }

  const saveRoom = async (room: Room | PostedRoom) => {
    if ('_id' in room) {
      try {
        const res = await updateRoom(room)
        rooms.value.unshift(res)
      } catch (err) {
        // location.reload()
        console.error(err)
      }
      return
    }

    try {
      const res = await postRoom(room)
      rooms.value.unshift(res)
    } catch (err) {
      // location.reload()
      console.error(err)
    }
  }

  onMounted(fetchRooms)

  return {
    filterQuery,
    displayedRooms,
    rooms,
    currentRoom,
    saveRoom
  }
})