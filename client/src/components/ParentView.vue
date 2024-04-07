<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import RoomList from './RoomList.vue';
import { useRooms } from '../stores/rooms';
import { newRoom } from '../rooms';
import { getCoords, getDistanceInMeters } from '../location';

const { saveRoom, setCurrentRoom } = useRooms();
const { filterQuery } = storeToRefs(useRooms());

const addLoading = ref(false);

const createRoom = async () => {
  const { rooms } = useRooms();
  addLoading.value = true;
  const currentCoords = await getCoords();
  const sortedRooms = rooms.slice().sort((a, b) => {
    const distA = getDistanceInMeters(currentCoords, a.gps_coords);
    const distB = getDistanceInMeters(currentCoords, b.gps_coords);
    return distA - distB;
  });
  const room = newRoom(sortedRooms[0]?.building ?? '');
  room.gps_coords = await getCoords();
  const postedRoom = await saveRoom(room);
  if (!postedRoom) {
    console.warn('Failed to create room');
    return;
  }
  setCurrentRoom(postedRoom);
  addLoading.value = false;
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
        :loading="addLoading"
        color="green"
        icon
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>

      <v-text-field
        v-model="filterQuery"
        label="Search"
        outlined
        dense
        hide-details
      ></v-text-field>

    </div>
    <div class="py-2">
      <RoomList />
    </div>
  </div>
</template>
