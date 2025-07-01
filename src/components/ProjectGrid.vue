<template>
    <div class="w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8 md:mb-4" :class="containerClass">
            <ProjectCard v-for="(project, index) in displayProjects" :key="project.id" :project="project"
                :featured="index === 0 && showFeatured" :size="getCardSize(index)" />
        </div>

        <div v-if="hasMoreProjects && showMoreButton" class="text-center pb-14">
            <router-link to="/all-projects"
                class="inline-flex items-center justify-center px-6 py-3 border border-black bg-white hover:bg-yellow-300 transition-colors duration-300 text-sm font-medium group">
                <span class="mr-2">+</span>
                View All Projects
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
    projects: {
        type: Array,
        required: true
    },
    maxDisplay: {
        type: Number,
        default: 5
    },
    showFeatured: {
        type: Boolean,
        default: true
    },
    showMoreButton: {
        type: Boolean,
        default: true
    },
    containerClass: {
        type: String,
        default: 'h-4/5'
    }
})

defineEmits(['show-more'])

const displayProjects = computed(() => {
    return props.projects.slice(0, props.maxDisplay)
})

const hasMoreProjects = computed(() => {
    return props.projects.length > props.maxDisplay
})

const remainingCount = computed(() => {
    return Math.max(0, props.projects.length - props.maxDisplay)
})

const getCardSize = (index) => {
    if (index === 0 && props.showFeatured) return 'large'
    return 'normal'
}
</script>
