<script setup lang="ts">
import RoomList from './RoomList.vue';
import { useRooms } from '../stores/rooms';
import { newRoom } from '../rooms';

const { saveRoom, setCurrentRoom } = useRooms();

const createRoom = async () => {
  const room = newRoom('WOO');
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
      <!-- drop down menu of buildings -->
      <v-btn
        @click.stop="createRoom"
        color="green"
        icon
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div>
      <RoomList />
    </div>
  </div>
</template>
