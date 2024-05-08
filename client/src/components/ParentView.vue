<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import RoomList from './RoomList.vue';
import { useRooms } from '../stores/rooms';
import { newRoom } from '../rooms';
import { getCoords, getDistanceInMeters } from '../location';
import { getOfficialCapacity } from '../capacities';

const { saveRoom, setCurrentRoom } = useRooms();
const { filterQuery, displayedRooms, loadingRooms } = storeToRefs(useRooms());

const roomListLabel = computed(() => {
  if (displayedRooms.value.length === 0 && filterQuery.value) {
    return `no rooms match "${filterQuery.value}"`;
  } else if (displayedRooms.value.length === 1) {
    return 'showing 1 room';
  } else {
    return `showing ${displayedRooms.value.length} rooms`;
  }
});

const addLoading = ref(false);

const createRoom = async () => {
  const { rooms } = useRooms();
  addLoading.value = true;
  const currentCoords = await getCoords();
  const sortedRooms = rooms.slice().sort((a, b) => {
    const distA = getDistanceInMeters(currentCoords, a.gps_coords.coordinates);
    const distB = getDistanceInMeters(currentCoords, b.gps_coords.coordinates);
    return distA - distB;
  });
  const room = newRoom(sortedRooms[0]?.building ?? '');
  room.gps_coords.coordinates = await getCoords();
  const postedRoom = await saveRoom(room);
  if (!postedRoom) {
    console.warn('Failed to create room');
    return;
  }
  setCurrentRoom(postedRoom);
  addLoading.value = false;
}

const updateAllCapacities = async() => {
  const { rooms } = useRooms();
  for (const room of rooms.slice()) {
    const offCapacity = getOfficialCapacity(room.building, room.room);
    room.capacity = offCapacity ?? room.capacity;
    const savedRoom = await saveRoom(room);
    if (!savedRoom) {
      console.warn('Failed to save room');
      return;
    }
  }
}
</script>

<template>
  <div class="mx-4" style="position: relative;">
    <div
      class="py-3"
      style="position: sticky; top: 0; z-index: 2; width: 100%; background: white;"
    >
      <div
        class="d-flex justify-space-between align-center"
        style="gap: 100px"
      >

        <v-text-field
          v-model="filterQuery"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          variant="outlined"
          hide-details
        ></v-text-field>

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

      </div>

      <div class="pt-2 pb-1">
        <h5 v-if="!loadingRooms">
          {{ roomListLabel }}
        </h5>
      </div>
    </div>
    
    <v-btn
          @click.stop="updateAllCapacities"
          color="blue"
        >
          Update All Room Capacities
    </v-btn>

    <v-divider></v-divider>

    <div
      class="mt-2"
      style="margin-bottom: 400px;"
    >
      <RoomList />
    </div>
  </div>
</template>
