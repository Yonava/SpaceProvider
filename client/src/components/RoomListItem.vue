<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { PostedRoom } from '../rooms';

const props = defineProps<{
  room: PostedRoom;
}>();
</script>

<template>
  <div>
    <v-card color="grey-lighten-3">
      <v-card-title>
        {{ props.room.building }}-{{ props.room.room || '(Missing Room Number)' }}
      </v-card-title>
    </v-card>
  </div>
</template>