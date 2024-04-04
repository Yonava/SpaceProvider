
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import RoomListItem from './RoomListItem.vue';
import { useRooms } from '../stores/rooms';

const { displayedRooms } = storeToRefs(useRooms());
const { setCurrentRoom, removeRoom } = useRooms();
</script>

<template>
  <div v-if="displayedRooms.length">
    <div
      v-for="room in displayedRooms"
      :key="room._id"
      @click.stop="setCurrentRoom(room)"
      class="my-2"
    >
      <RoomListItem
        @delete="removeRoom"
        :room="room"
      />
    </div>
  </div>
  <div v-else>
    <h1>
      No Rooms Found
    </h1>
  </div>
</template>