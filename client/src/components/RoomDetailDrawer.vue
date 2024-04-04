<script setup lang="ts">
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRooms } from '../stores/rooms';
import RoomDetail from './RoomDetail.vue';

const { currentRoom } = storeToRefs(useRooms());
const { saveRoom, setCurrentRoom } = useRooms();

const drawer = computed({
  get: () => !!currentRoom.value,
  set: (value) => {
    if (!value) {
      closeDrawer();
    }
    return value;
  }
});

watch(currentRoom, (room) => {
  if (!room) return;
  drawer.value = true;
});

const closeDrawer = () => {
  if (!currentRoom.value) {
    console.log('No current room to close');
    return;
  }
  saveRoom(currentRoom.value);
  setCurrentRoom(null);
}
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    touchless
    rounded
    location="bottom"
    style="width: 100%; height: calc(100vh - 175px);"
  >
    <div
      v-if="currentRoom"
      class="pa-4"
    >
      <RoomDetail :room="currentRoom" />
    </div>
    <div v-else>
      <h1>
        No Room Selected
      </h1>
    </div>
  </v-navigation-drawer>
</template>