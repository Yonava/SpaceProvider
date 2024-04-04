<script setup lang="ts">
import type { PostedRoom } from '../rooms';

const props = defineProps<{
  room: PostedRoom;
}>();
</script>

<template>
  <div>
    <v-text-field
      v-model="props.room.building"
      label="Building"
    />
    <v-text-field
      v-model="props.room.room"
      label="Room"
    />
  </div>
</template>