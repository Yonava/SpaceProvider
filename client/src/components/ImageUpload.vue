<script setup lang="ts">
import { ref } from 'vue';
import { uploadImageFilePipeline } from '../images';
import { storeToRefs } from 'pinia';
import { useRooms } from '../stores/rooms';

const { currentRoom } = storeToRefs(useRooms());
const { saveRoom } = useRooms();

const fileInput = ref<HTMLInputElement | null>(null);
const thumbInput = ref<HTMLInputElement | null>(null);
const fileUploadError = ref<string | null>(null);
const thumbUploadError = ref<string | null>(null);
const isWorking = ref<boolean>(false);
const actionStatus = ref<string | null>(null);

const props = defineProps<{
  modelValue: string[];
  thumbnail: string;
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'update:thumbnail', value: string): void;
}>()

const MAX_MB_ALLOWANCE = 2;
const MAX_WIDTH_OR_HEIGHT = 3840;

const MAX_T_MB_ALLOWANCE = .1; // FOR THUMBNAILS
const MAX_T_WIDTH_OR_HEIGHT = 853;

const saveImages = async () => {
  if (!currentRoom.value) {
    console.log('No current room to save');
    return;
  }
  await saveRoom(currentRoom.value, false);
}

/**
 * Takes an image as a base64 encoded string and a string that is either 'mb' or
 * 'kb' and returns an object containing the unit used and the size of the image.
 */
const getImageSize = (image: string, unit: 'mb' | 'kb' = 'mb') => {
  const sizeInBytes = (image.length * 3) / 4 - 2;
  return { unit, value: sizeInBytes / (1024 * (unit === 'mb' ? 1024 : 1)) }
};

/**
 * Takes an image as a base64 encoded string and returns a string label representing the computed
 * size of the image.
 */
const imageSizeLabel = (image: string) => {
  let size = getImageSize(image);
  if (!Math.floor(size.value)) size = getImageSize(image, 'kb');
  return `${size.value.toFixed(1)} ${size.unit.toUpperCase()}`;
};

const onFileChange = async (e: Event) => {
  isWorking.value = true;
  fileUploadError.value = null;
  const { files } = e.target as HTMLInputElement;
  if (!files) return;
  const [ image ] = Array.from(files);
  if (!image) return;
  try {
    const base64Img = await uploadImageFilePipeline(image, MAX_MB_ALLOWANCE, MAX_WIDTH_OR_HEIGHT)
    isWorking.value = false;
    emits('update:modelValue', [...props.modelValue, base64Img])
    actionStatus.value = `Saving image...`
    await saveImages();
    actionStatus.value = `Image saved.`
  } catch (error) {
    fileUploadError.value = error instanceof Error ? error.message : 'Error encoding image';
    actionStatus.value = null;
    isWorking.value = false;
  }
};

const onThumbnailChange = async (e: Event) => {
  thumbUploadError.value = null;
  const { files } = e.target as HTMLInputElement;
  if (!files) return;
  const image = files[0];
  if (!image) return;
  try {
    const base64Img = await uploadImageFilePipeline(image, MAX_T_MB_ALLOWANCE, MAX_T_WIDTH_OR_HEIGHT)
    emits('update:thumbnail', base64Img)
  } catch (error) {
    thumbUploadError.value = error instanceof Error ? error.message : 'Error encoding thumbnail';
  }
};

const removeImage = async (image: string) => {
  emits('update:modelValue', props.modelValue.filter((img) => img !== image));
  actionStatus.value = `Deleting image...`
  await saveImages();
  actionStatus.value = `Image deleted.`
};
</script>

<template>
  <div>
    <v-btn
      @click.stop="thumbInput!.click()"
      color="primary"
      size="small"
    >
      Upload thumbnail
    </v-btn>

    <p
      v-if="thumbUploadError"
      class="text-red py-2"
    >
      {{ thumbUploadError }}
    </p>

    <input
      v-show="false"
      @change="onThumbnailChange"
      type="file"
      ref="thumbInput"
    />
    <span class="text-grey py-2 font-italic">
      Thumbnails are saved on drawer exit.
    </span>
    </div>
    <div style="padding-bottom: 20px">
    <div
      v-if="props.thumbnail !== ''"
      style="margin-top: 10px; position: relative; overflow: hidden; border-radius: 5px; width: 100%; height: 200px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);"
    >
      <img
        :src="props.thumbnail"
        style="object-fit: cover; height: 100%; width: 100%;"
      />
      <div
        class="px-3 d-flex align-center"
        style="position: absolute; top: 8px; left: 8px; background: rgba(255, 255, 255, 0.85); border-radius: 100px; gap: 5px"
      >
        <v-icon size="small">
          mdi-image
        </v-icon>
        <h4>
          {{ imageSizeLabel(props.thumbnail) }}
        </h4>
        <v-icon
          @click.stop="emits('update:thumbnail', '')"
          size="small"
          color="red-darken-2"
          style="cursor: pointer;"
        >
          mdi-close-circle
        </v-icon>
      </div>
    </div>
  </div>

  <div>

    <v-btn
      @click.stop="fileInput!.click()"
      color="primary"
      size="small"
    >
      Upload Image
    </v-btn>

    <b
      v-if="actionStatus"
      class="text-blue px-2"
    >
      {{ actionStatus }}
    </b>

    <p
      v-if="fileUploadError"
      class="text-red py-2"
    >
      {{ fileUploadError }}
    </p>

    <input
      v-show="false"
      @change="onFileChange"
      type="file"
      ref="fileInput"
      multiple="true"
    />
  </div>
  <div>
    <div
      v-for="image in props.modelValue"
      :key="image"
      style="margin-top: 10px; position: relative; overflow: hidden; border-radius: 5px; width: 100%; height: 200px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);"
    >
      <img
        :src="image"
        style="object-fit: cover; height: 100%; width: 100%;"
      />
      <div
        class="px-3 d-flex align-center"
        style="position: absolute; top: 8px; left: 8px; background: rgba(255, 255, 255, 0.85); border-radius: 100px; gap: 5px"
      >
        <v-icon size="small">
          mdi-image
        </v-icon>
        <h4>
          {{ imageSizeLabel(image) }}
        </h4>
        <v-icon
          @click.stop="removeImage(image)"
          size="small"
          color="red-darken-2"
          style="cursor: pointer;"
        >
          mdi-close-circle
        </v-icon>
      </div>
    </div>
    <h1
      v-if="props.modelValue.length === 0 && !isWorking"
      class="py-2 text-red"
    >
      No images uploaded
    </h1>
    <h1
      v-else-if="isWorking"
      class="py-2 text-blue"
    >
      Encoding image...
    </h1>
  </div>
</template>