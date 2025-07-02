<template>
  <div class="relative w-full aspect-video overflow-hidden rounded-lg">
    <img
      v-if="images.length"
      :src="images[current]"
      :alt="'Image ' + (current + 1)"
      class="w-full h-full object-cover transition-all duration-500"
    />

    <button
      v-if="images.length > 1"
      @click="prev"
      class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
    >
      ‹
    </button>
    <button
      v-if="images.length > 1"
      @click="next"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ images: string[] }>();

const current = ref(0);

const prev = () => {
  current.value =
    (current.value - 1 + props.images.length) % props.images.length;
};
const next = () => {
  current.value = (current.value + 1) % props.images.length;
};
</script>
