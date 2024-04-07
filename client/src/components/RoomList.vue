
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import RoomListItem from './RoomListItem.vue';
import { useRooms } from '../stores/rooms';

const { displayedRooms, loadingRooms } = storeToRefs(useRooms());
const { setCurrentRoom, removeRoom } = useRooms();

const roomBeingDeleted = ref('');

const deleteRoom = async (_id: string) => {
  roomBeingDeleted.value = _id;
  await removeRoom(_id);
  roomBeingDeleted.value = '';
}
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
        @delete="deleteRoom"
        :deleting="roomBeingDeleted === room._id"
        :room="room"
      />
    </div>
  </div>
  <div v-else-if="loadingRooms">
    <v-progress-linear
      color="primary"
      indeterminate
    />
  </div>
  <div v-else>
    <h1>
      No Rooms Found
    </h1>
  </div>
</template>