
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import RoomListItem from './RoomListItem.vue';
import { useRooms } from '../stores/rooms';

const { rooms } = storeToRefs(useRooms());
</script>

<template>
  <div>
    {{ rooms }}
  </div>
</template>