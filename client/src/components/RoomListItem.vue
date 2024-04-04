<script setup lang="ts">
import type { PostedRoom } from '../rooms';
import { computed } from 'vue';

const props = defineProps<{
  room: PostedRoom;
}>();

defineEmits<{
  (e: 'delete', _id: string): void
}>()

const roomCodeDisplay = computed(() => {
  const room = props.room.room;
  const building = props.room.building;
  return (room && building) ? `${building} ${room}` : '(Missing Room or Building)';
});
</script>

<template>
  <div>
    <v-card
      color="grey-lighten-3"
      class="pa-2"
    >
      <div class="d-flex align-center justify-space-between">
        <h3>
          {{ roomCodeDisplay }}
        </h3>
        <v-btn
          @click.stop="$emit('delete', props.room._id)"
          color="red"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>