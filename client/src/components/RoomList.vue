
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import RoomListItem from './RoomListItem.vue';
import { useRooms } from '../stores/rooms';

const { displayedRooms } = storeToRefs(useRooms());
const { setCurrentRoom } = useRooms();
</script>

<template>
  <div>
    <div
      v-for="room in displayedRooms"
      :key="room._id"
      @click.stop="setCurrentRoom(room)"
      class="my-2"
    >
      <RoomListItem :room="room" />
    </div>
  </div>
</template>