<script setup lang="ts">
import { ref } from 'vue';
import { isImageFormat, uploadImageFilePipeline } from '../images';

const fileInput = ref<HTMLInputElement | null>(null);
const fileUploadError = ref<string | null>(null);

const props = defineProps<{
  modelValue: string[];
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>()

const MAX_MB_ALLOWANCE = 2;

const getImageSize = (image: string, unit: 'mb' | 'kb' = 'mb') => {
  const sizeInBytes = (image.length * 3) / 4 - 2;
  return { unit, value: sizeInBytes / (1024 * (unit === 'mb' ? 1024 : 1)) }
};

const imageSizeLabel = (image: string) => {
  let size = getImageSize(image);
  if (!Math.floor(size.value)) size = getImageSize(image, 'kb');
  return `${size.value.toFixed(1)} ${size.unit.toUpperCase()}`;
};

const onFileChange = (e: Event) => {
  const handleEncodedImages = (encodedImages: string[]) => {    
    const compliantImages = encodedImages.filter(img => getImageSize(img).value <= MAX_MB_ALLOWANCE);
    if (compliantImages.length !== encodedImages.length) {
      if (compliantImages.length !== 0) {
        console.warn(`some images exceed ${MAX_MB_ALLOWANCE}MB limit and have been discarded`);
        fileUploadError.value = `Some images exceed ${MAX_MB_ALLOWANCE}MB limit and have been discarded`;
      } else {
        console.warn(`images exceed ${MAX_MB_ALLOWANCE}MB limit and have been discarded`);
        fileUploadError.value = `Upload exceeds ${MAX_MB_ALLOWANCE}MB limit and has been discarded`;
      }
    }
    emits('update:modelValue', [...compliantImages, ...props.modelValue]);
  };
  
  const handleEncodedImagesError = (error: unknown) => {
    console.warn('cannot encode images')
    console.error('Error encoding images:', error);
    if (error instanceof Error) {
      fileUploadError.value = error.message;
    } else {
      fileUploadError.value = 'Error encoding images';
    }
  };

  fileUploadError.value = null;
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;

  const images = Array.from(files);
  Promise.all(images.map(img => uploadImageFilePipeline(img, MAX_MB_ALLOWANCE)))
    .then(handleEncodedImages)
    .catch(handleEncodedImagesError);
};

const removeImage = (image: string) => {
  emits('update:modelValue', props.modelValue.filter((img) => img !== image));
};
</script>

<template>
  <div>
    <v-btn
      @click.stop="fileInput!.click()"
      color="primary"
      size="small"
    >
      Upload Image
    </v-btn>

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
      v-if="props.modelValue.length === 0"
      class="py-2 text-red"
    >
      No images uploaded
    </h1>
  </div>
</template>