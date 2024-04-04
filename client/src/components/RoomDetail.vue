<script setup lang="ts">
import { buildings, labels } from '../rooms';
import type { PostedRoom } from '../rooms';

const capacities = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const props = defineProps<{
  room: PostedRoom;
}>();
</script>

<template>
  <div>
    <h1 class="mb-3">
      Edit Room
    </h1>
    <div class="d-flex" style="gap: 20px;">
      <v-select
        :items="buildings"
        v-model="props.room.building"
        label="Building"
      />
      <v-text-field
        v-model="props.room.room"
        label="Room"
      />
    </div>

    <v-select
      v-model="props.room.labels"
      :items="labels"
      chips
      label="Labels"
      multiple
      persistent-hint
    ></v-select>

    <v-text-field
      v-model="props.room.capacity"
      label="Capacity"
    />

    <div class="d-flex flex-wrap justify-center" style="gap: 10px;">
      <v-btn
        v-for="capacity in capacities"
        color="primary"
        rounded
        :key="capacity"
        @click.stop="props.room.capacity = capacity"
      >
        {{ capacity }}
      </v-btn>
    </div>

  </div>

</template>