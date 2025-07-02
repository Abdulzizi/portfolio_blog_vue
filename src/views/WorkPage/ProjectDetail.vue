<template>
    <Layout>
        <div class="min-h-screen bg-white" ref="slideInSection">
            <div v-if="loading" class="flex items-center justify-center h-screen">
                <!-- Spinner -->
                <Spinner />
            </div>

            <div v-else-if="project">
                <!-- Hero Section -->
                <section class="py-12 md:py-20">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <!-- Info -->
                            <div>
                                <h1 class="text-4xl md:text-6xl font-bold mt-2 mb-6">
                                    {{ project.title }}
                                </h1>
                                <p class="text-lg text-gray-700 mb-8">
                                    {{ project.description }}
                                </p>

                                <div class="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 class="font-bold">Year</h3>
                                        <p class="text-gray-600">{{ project.periodLabel ?? '—' }}</p>
                                    </div>

                                    <div v-if="project.techStack.length">
                                        <h3 class="font-bold mb-3">Technologies</h3>
                                        <div class="flex flex-wrap gap-2">
                                            <span v-for="tag in project.techStack.slice(0, 3)" :key="tag"
                                                class="px-3 py-1 bg-gray-100 text-sm rounded">
                                                {{ tag }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Image / Color Block -->
                            <div :class="project.color ?? 'bg-gray-200'"
                                class="aspect-video rounded-lg flex items-center justify-center">
                                <img v-if="project.image" :src="project.image" :alt="project.title"
                                    class="w-full h-full object-cover rounded-lg" />
                                <div v-else :class="project.textColor ?? 'text-black'"
                                    class="text-2xl font-bold opacity-50">
                                    {{ project.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Nav Section -->
                <section class="py-8 border-t border-black">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="flex justify-between items-center">
                            <router-link to="/work"
                                class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                                ← BACK TO WORKS
                                <span
                                    class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
                            </router-link>

                            <div class="flex gap-4">
                                <router-link v-if="previousProject" :to="`/project/${previousProject.slug}`"
                                    class="text-sm font-medium hover:opacity-70 transition-opacity">
                                    ← {{ previousProject.title }}
                                </router-link>
                                <router-link v-if="nextProject" :to="`/project/${nextProject.slug}`"
                                    class="text-sm font-medium hover:opacity-70 transition-opacity">
                                    {{ nextProject.title }} →
                                </router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div v-else class="flex items-center justify-center h-screen text-center px-4">
                <div>
                    <h2 class="text-2xl md:text-4xl font-bold mb-4">There is no projects for now</h2>
                    <p class="text-gray-600 mb-6">
                        Oops! The project you seek is as elusive as a cat in a magician's hat. Maybe it vanished in a
                        puff of digital smoke, or it never existed in the first place!
                    </p>
                    <router-link to="/work"
                        class="inline-flex items-center justify-center px-6 py-3 border border-black bg-white hover:bg-yellow-300 transition-colors duration-300 text-sm font-medium group">
                        ← Back to Projects
                    </router-link>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/Layout/LayoutWithNav.vue'
import gsap from 'gsap'
import { useLenis } from '@/composables/useLenis'
import Spinner from '@/components/Spinner.vue'

import { useProjectStore } from '@/state/pinia'
import { safeParse, formatPeriod } from '@/helpers/formatters'

const route = useRoute()
const slideInSection = ref<HTMLElement | null>(null)
const loading = ref(true)

const projectStore = useProjectStore()

const project = computed(() => {
    const raw = projectStore.project
    if (!raw || typeof raw !== 'object' || !('id' in raw)) return null

    return {
        ...raw,
        techStack: safeParse(raw.tech_stack),
        periodLabel: formatPeriod(raw.start_date, raw.end_date),
        color: raw.color,
        textColor: raw.textColor,
        image: raw.thumbnail ?? raw.images?.[0] ?? null
    }
})

const currentIndex = computed(() => {
    if (!project.value) return -1
    return projectStore.projects.findIndex((p) => p.id === project.value?.id)
})

const previousProject = computed(() => {
    if (currentIndex.value <= 0) return null
    return projectStore.projects[currentIndex.value - 1]
})

const nextProject = computed(() => {
    if (currentIndex.value === -1 || currentIndex.value >= projectStore.projects.length - 1) return null
    return projectStore.projects[currentIndex.value + 1]
})

const fetchProjectBySlug = async () => {
    try {
        loading.value = true

        // await new Promise(resolve => setTimeout(resolve, 200))
        await projectStore.fetchBySlug(route.params.slug as string)
    } catch (error) {
        console.error('[ProjectDetail.vue] Error fetching project:', error)
    } finally {
        loading.value = false
        animatePage()
    }
}

const animatePage = () => {
    if (!slideInSection.value) return
    gsap.fromTo(
        slideInSection.value,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 2, ease: 'power4.out' }
    )
}

watch(() => route.params.slug, fetchProjectBySlug, { immediate: true })

onMounted(() => {
    useLenis()
})
</script>
