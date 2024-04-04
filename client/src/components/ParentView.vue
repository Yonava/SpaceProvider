<script setup lang="ts">
import RoomList from './RoomList.vue';
import { useRooms } from '../stores/rooms';
import { newRoom, type GPSCoord } from '../rooms';

const { saveRoom, setCurrentRoom } = useRooms();

const getCoords = () => new Promise<GPSCoord>((resolve) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  });
});

const createRoom = async () => {
  const room = newRoom();
  room.gps_coords = await getCoords();
  const postedRoom = await saveRoom(room);
  if (!postedRoom) {
    console.warn('Failed to create room');
    return;
  }
  setCurrentRoom(postedRoom);
}
</script>

<template>
  <div class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <h1>
        Rooms
      </h1>
      <v-btn
        @click.stop="createRoom"
        color="green"
        icon
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div class="py-2">
      <RoomList />
    </div>
  </div>
</template>
