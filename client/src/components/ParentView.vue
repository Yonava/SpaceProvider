<script setup lang="ts">
import RoomList from './RoomList.vue';
import { useRooms } from '../stores/rooms';
import { newRoom } from '../rooms';

const createRoom = () => {
  const room = newRoom('WOO');
  useRooms().saveRoom(room);
}
</script>

<template>
  <div class="pa-4">
    <div>
      <h1>
        Rooms
      </h1>
      <v-btn
        @click.stop="createRoom"
        color="blue"
      >
        Create Room
      </v-btn>
    </div>
    <div>
      <RoomList />
    </div>
  </div>
</template>
