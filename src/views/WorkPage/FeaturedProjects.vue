<template>
    <div v-if="isLoading" class="h-[300px] flex items-center justify-center">
        <Spinner />
    </div>
    <div v-else-if="projects.length > 0">
        <ProjectGrid :projects="projects" :max-display="maxDisplay" :show-featured="true" :show-more-button="showMore"
            @show-more="$emit('show-more')" :container-class="containerClass" />
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full text-center">
        <h2 class="text-2xl font-bold mb-4">No featured projects... yet</h2>
        <p class="text-gray-600">Either I'm cooking up something epic or I just forgot to tag them.</p>
    </div>
</template>

<script setup>
import ProjectGrid from '@/components/ProjectGrid.vue'

defineProps({
    projects: Array,
    isLoading: Boolean,
    maxDisplay: { type: Number, default: 5 },
    showMore: { type: Boolean, default: true },
    containerClass: { type: String, default: 'h-auto' }
});
</script>
