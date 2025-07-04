<template>
    <router-link :to="`/project/${project.slug}`" :class="[
        cardClasses,
        'bg-gray-100 text-black dark:bg-gray-900 dark:text-white shadow-md',
        'rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[240px] flex flex-col'
    ]">
        <!-- Project Image -->
        <div v-if="project.thumbnail" class="aspect-video overflow-hidden flex-shrink-0">
            <img :src="project.thumbnail" :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>

        <!-- Project Info -->
        <div class="flex-1 p-4 md:p-6 flex flex-col justify-between">
            <div class="flex-1">
                <span class="text-sm opacity-80">{{ project.category ?? 'Project' }}</span>
                <h3 class="text-lg md:text-xl lg:text-2xl font-bold mt-2 mb-3" :class="{ 'text-3xl': featured }">
                    {{ project.title }}
                </h3>
                <p v-if="project.description" class="opacity-90 text-sm md:text-base leading-relaxed mb-4">
                    {{ project.description }}
                </p>

                <div v-if="project.tech_stack && project.tech_stack.length" class="flex flex-wrap gap-1 mb-4">
                    <span v-for="tag in safeParse(project.tech_stack)" :key="tag"
                        class="text-xs px-2 py-1 rounded bg-black/10 dark:bg-white/20 opacity-80">
                        {{ tag }}
                    </span>
                </div>
            </div>

            <div class="flex items-center justify-between pt-5">
                <span class="text-sm font-medium">{{ project.start_date ? formatPeriod(project.start_date,
                    project.end_date) : ''
                    }}</span>
                <div
                    class="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-black dark:border-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black">
                    <ChevronRight class="w-3 h-3 md:w-4 md:h-4" />
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
        validator: (value) => ['normal', 'large', 'small'].includes(value)
    }
})

const cardClasses = computed(() => {
    const classes = []
    if (props.featured || props.size === 'large') {
        classes.push('md:col-span-2', 'md:row-span-2')
    }
    if (props.size === 'small') {
        classes.push('md:col-span-1')
    }
    return classes
})
</script>
