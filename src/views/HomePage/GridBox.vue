<template>
    <div class="bg-white text-black flex items-center justify-center text-xl md:text-3xl font-bold border border-black transition-all duration-300 cursor-pointer"
        @mouseenter="$emit('hover')" @mouseleave="$emit('hover', null)" :class="{ 'bg-green-200': active }">
        {{ label }}
    </div>
</template>

<script setup>
defineProps({
    label: String,
    active: Boolean,
})
</script>