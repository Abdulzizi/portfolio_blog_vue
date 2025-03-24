<script setup>

import { computed } from "vue";

const props = defineProps({
    fixed: Boolean
});

const mainClass = computed(() => [
    "peer-[.header-fixed]/header:mt-16",
    "px-4 py-6",
    props.fixed && "fixed-main flex flex-grow flex-col overflow-hidden"
]);
</script>

<template>
    <main :class="mainClass">
        <slot />
    </main>
</template>
