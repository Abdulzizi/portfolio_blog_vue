<template>
    <div class="bg-white flex items-center justify-center p-6 md:p-8 transition-all duration-500 ease-in-out overflow-hidden"
        :class="{
            'scale-content': active,
            'bg-yellow-200': active,
            'bg-white': !active,
            'min-h-[150px] md:min-h-0': true
        }" @mouseenter="$emit('hover')" @mouseleave="$emit('hover', null)">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300"
            :class="{ 'scale-110': active }">
            {{ label }}
        </h2>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
})

defineEmits(['hover'])
</script>

<style scoped>
.scale-content {
    z-index: 10;
}
</style>