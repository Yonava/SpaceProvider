<script setup lang="ts" generic="T extends Room">
import { ref } from 'vue';
import { buildings, labels } from '../rooms';
import type { PostedRoom, Room } from '../rooms';
import { getOfficialCapacity } from '../capacities';
import { getCoords } from '../location';
import ImageUpload from './ImageUpload.vue';

const capacities = Array.from({ length: 30 }, (_, i) => (i + 1) * 10);
const capacityUpdated = ref(false);
const officialCapacityFailed = ref(false);

const props = defineProps<{
  room: PostedRoom<T>;
  loading: boolean;
}>();

const getLiveGPS = async () => {
  props.room.gps_coords.coordinates = await getCoords();
};

const getRoomCapacity = () => {
  const officialCapacity = getOfficialCapacity(props.room.building, props.room.room);
  if (!officialCapacity) {
    capacityUpdated.value = false;
    officialCapacityFailed.value = true;
  } else {
    props.room.capacity = officialCapacity;
    capacityUpdated.value = true;
    officialCapacityFailed.value = false;
  }
}
</script>

<template>
  <div style="padding-bottom: 300px">

    <v-progress-linear
      v-if="loading"
      class="px-2 my-2"
      color="primary"
      indeterminate
    />

    <h1 class="mb-3">
      Edit Room
    </h1>

    <div class="d-flex" style="gap: 20px;">
      <v-autocomplete
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
      type="number"
      inputmode="numeric"
      label="Capacity"
      hide-details
    />

    <div
      class="d-flex py-3"
      style="gap: 10px; overflow-y: auto;"
    >
      <v-btn
        v-for="capacity in capacities"
        size="small"
        color="primary"
        rounded
        :key="capacity"
        @click.stop="props.room.capacity = capacity"
      >
        {{ capacity }}
      </v-btn>
    </div>

    <v-btn
      @click.stop="getRoomCapacity"
      size="small"
      color="primary"
    >
      Get Official Room Capacity
    </v-btn>

    <div>
      <b
        v-if="officialCapacityFailed"
        class="py-2 text-red"
      >
        No official room capacity found
      </b>
      <b
        v-if="capacityUpdated"
        class="py-2 text-blue"
      >
        Updated with official room capacity
      </b>
    </div>
    
    <div class="mt-5">
      <ImageUpload
        v-model="props.room.images"
      />
    </div>

    <v-textarea
      v-model="props.room.access_notes"
      class="mt-5"
      label="Access Notes"
    ></v-textarea>

    <h3 class="my-3">
      GPS Coordinates
    </h3>

    <div
      class="d-flex"
      style="gap: 20px"
    >
      <v-text-field
        v-model="props.room.gps_coords.coordinates[0]"
        label="Lat"
      />

      <v-text-field
        v-model="props.room.gps_coords.coordinates[1]"
        label="Lon"
      />
    </div>

    <v-btn
      @click.stop="getLiveGPS"
      size="small"
      color="primary"
    >
      Get Live GPS Coordinates
    </v-btn>

  </div>

</template>