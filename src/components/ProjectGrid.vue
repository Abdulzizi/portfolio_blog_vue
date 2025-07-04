<template>
    <div class="w-full">
        <!-- Custom Layout for Exactly 5 Projects -->
        <div v-if="displayProjects.length === 5" class="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full h-full"
            :class="containerClass">
            <!-- Big Featured Card -->
            <div class="lg:col-span-3 row-span-2">
                <ProjectCard :project="displayProjects[0]" size="featured" :featured="showFeatured" />
            </div>

            <!-- Grid of 4 Cards -->
            <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProjectCard v-for="(project, index) in displayProjects.slice(1)" :key="project.id" :project="project"
                    size="normal" />
            </div>
        </div>

        <!-- Default Grid for Other Counts -->
        <div v-else class="grid gap-6 w-full" :class="[containerClass, gridClasses]">
            <ProjectCard v-for="(project, index) in displayProjects" :key="project.id" :project="project"
                :featured="index === 0 && showFeatured" :size="getCardSize(index)" :class="getCardGridClasses(index)"
                :style="getCardStyles(index)" />
        </div>

        <!-- Show More Button -->
        <div v-if="hasMoreProjects && showMoreButton" class="text-center pt-8 pb-14">
            <router-link to="/all-projects"
                class="inline-flex items-center justify-center px-8 py-4 border-2 border-black bg-white hover:bg-yellow-300 transition-all duration-300 text-sm font-bold group transform hover:scale-105">
                <span class="mr-3 text-lg">+</span>
                View All Projects
                <span class="ml-3 text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                    ({{ remainingCount }} more)
                </span>
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
        default: 8
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
        default: 'min-h-[400px]'
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

// Dynamic grid system based on number of projects and screen size
const gridClasses = computed(() => {
    const projectCount = displayProjects.value.length

    if (projectCount <= 2) {
        return 'grid-cols-1 sm:grid-cols-2'
    } else if (projectCount <= 4) {
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'
    } else if (projectCount <= 6) {
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    } else {
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
    }
})

const getCardSize = (index) => {
    const projectCount = displayProjects.value.length

    // Featured card logic
    if (index === 0 && props.showFeatured) {
        return 'featured'
    }

    // Create visual hierarchy with different sizes
    if (projectCount > 4) {
        // For larger grids, create more variety
        if (index === 1 || index === 4) return 'large'
        if (index === 2 || index === 5) return 'tall'
        return 'normal'
    }

    return 'normal'
}

// Dynamic grid positioning for better visual flow
const getCardGridClasses = (index) => {
    const classes = []
    const size = getCardSize(index)

    switch (size) {
        case 'featured':
            classes.push(
                'sm:col-span-2',
                'lg:col-span-2',
                'xl:col-span-3',
                'sm:row-span-2'
            )
            break
        case 'large':
            classes.push(
                'sm:col-span-2',
                'lg:col-span-2'
            )
            break
        case 'tall':
            classes.push(
                'sm:row-span-2'
            )
            break
        case 'wide':
            classes.push(
                'sm:col-span-2'
            )
            break
    }

    return classes
}

// Add subtle staggered animations
const getCardStyles = (index) => {
    return {
        animationDelay: `${index * 0.1}s`
    }
}
</script>

<style scoped>
.grid>* {
    animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
