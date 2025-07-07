<template>
    <router-link :to="`/project/${project.slug}`"
        class="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl flex flex-col overflow-hidden"
        :class="[
            cardClasses,
            backgroundClasses,
            sizeClasses
        ]">

        <!-- Project Image -->
        <div v-if="project.thumbnail" class="overflow-hidden flex-shrink-0 relative" :class="imageClasses">
            <img :src="project.thumbnail" :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div v-if="featured"
                class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        </div>

        <!-- Project Info -->
        <div class="flex-1 flex flex-col justify-between" :class="contentPadding">
            <div class="flex-1">

                <!-- Title -->
                <h3 class="font-bold leading-tight mb-3 group-hover:text-yellow-600 transition-colors duration-300"
                    :class="titleClasses">
                    {{ project.title }}
                </h3>

                <!-- Description -->
                <p v-if="project.description && featured"
                    class="opacity-80 leading-relaxed mb-4 group-hover:opacity-100 transition-opacity duration-300"
                    :class="descriptionClasses">
                    {{ project.description }}
                </p>

                <!-- Tech Stack -->
                <div v-if="project.tech_stack && safeParse(project.tech_stack).length"
                    class="flex flex-wrap gap-1.5 mb-4">
                    <span v-for="(tag, tagIndex) in visibleTechStack" :key="tag"
                        class="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 hover:scale-105"
                        :class="getTagClasses(tagIndex)">
                        {{ tag }}
                    </span>
                    <span v-if="safeParse(project.tech_stack).length > maxVisibleTech"
                        class="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">
                        +{{ safeParse(project.tech_stack).length - maxVisibleTech }}
                    </span>
                </div>
            </div>

            <!-- Footer -->
            <div v-if="featured"
                class="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10 mt-auto">
                <span class="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {{ project.start_date ? formatPeriod(project.start_date, project.end_date) : 'Timeline TBD' }}
                </span>
                <div class="rounded-full flex items-center justify-center transition-all duration-300 border-2 border-black/20 dark:border-white/20 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black group-hover:shadow-lg group-hover:scale-110"
                    :class="buttonClasses">
                    <ChevronRight :class="iconClasses" />
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { safeParse, formatPeriod } from '@/helpers/formatters'

const props = defineProps({
    project: {
        type: Object,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'normal',
        validator: (value) => ['normal', 'large', 'small', 'featured', 'tall', 'wide'].includes(value)
    }
})

// Base card styling
const cardClasses = computed(() => [
    'rounded-xl',
    'shadow-lg',
    'hover:shadow-2xl',
    'border',
    'border-gray-200',
    'dark:border-gray-700'
])

const backgroundClasses = computed(() => [
    'bg-white',
    'dark:bg-gray-900',
    'text-gray-900',
    'dark:text-white'
])

// Size-based classes
const sizeClasses = computed(() => {
    const baseHeight = 'min-h-[240px]' // smaller base

    switch (props.size) {
        case 'featured':
            return [baseHeight, 'sm:min-h-[320px]', 'lg:min-h-[575px]']
        case 'large':
            return [baseHeight, 'sm:min-h-[300px]']
        case 'tall':
            return [baseHeight, 'sm:min-h-[320px]']
        default:
            return [baseHeight, 'sm:min-h-[280px]']
    }
})

const imageClasses = computed(() => {
    switch (props.size) {
        case 'featured':
            return 'h-40 sm:h-52 lg:h-60' // reduced height
        case 'large':
            return 'h-36 sm:h-44'
        case 'tall':
            return 'h-32 sm:h-40'
        default:
            return 'h-28 sm:h-36'
    }
})

const contentPadding = computed(() => {
    switch (props.size) {
        case 'featured':
            return 'p-4 sm:p-5'
        case 'large':
            return 'p-4'
        default:
            return 'p-3'
    }
})

const titleClasses = computed(() => {
    switch (props.size) {
        case 'featured':
            return 'text-lg sm:text-xl lg:text-2xl'
        case 'large':
            return 'text-base sm:text-lg'
        default:
            return 'text-sm sm:text-base'
    }
})


const descriptionClasses = computed(() => {
    switch (props.size) {
        case 'featured':
            return 'text-sm sm:text-base lg:text-lg line-clamp-4'
        case 'large':
            return 'text-sm sm:text-base line-clamp-3'
        default:
            return 'text-sm line-clamp-2'
    }
})

const buttonClasses = computed(() => {
    switch (props.size) {
        case 'featured':
            return 'w-10 h-10 sm:w-12 sm:h-12'
        case 'large':
            return 'w-9 h-9 sm:w-10 sm:h-10'
        default:
            return 'w-8 h-8 sm:w-9 sm:h-9'
    }
})

const iconClasses = computed(() => {
    switch (props.size) {
        case 'featured':
            return 'w-5 h-5 sm:w-6 sm:h-6'
        case 'large':
            return 'w-4 h-4 sm:w-5 sm:h-5'
        default:
            return 'w-4 h-4'
    }
})

const maxVisibleTech = computed(() => {
    switch (props.size) {
        case 'featured':
            return 6
        case 'large':
            return 4
        default:
            return 2
    }
})

const visibleTechStack = computed(() => {
    const techStack = safeParse(props.project.tech_stack)
    return techStack.slice(0, maxVisibleTech.value)
})

// Colorful tech stack tags
const getTagClasses = (index) => {
    const colors = [
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    ]
    return colors[index % colors.length]
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
