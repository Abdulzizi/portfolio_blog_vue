<template>
    <Layout>
        <div v-if="project" class="min-h-screen bg-white" ref="slideInSection">
            <!-- Hero Section -->
            <section class="py-12 md:py-20">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span class="text-sm font-medium text-gray-600">{{ project.category }}</span>
                            <h1 class="text-4xl md:text-6xl font-bold mt-2 mb-6">{{ project.title }}</h1>
                            <p class="text-lg text-gray-700 mb-8">{{ project.description }}</p>

                            <div class="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 class="font-bold mb-2">Client</h3>
                                    <p class="text-gray-600">{{ project.client }}</p>
                                </div>
                                <div>
                                    <h3 class="font-bold mb-2">Year</h3>
                                    <p class="text-gray-600">{{ project.year }}</p>
                                </div>
                            </div>

                            <div v-if="project.tags && project.tags.length" class="mb-8">
                                <h3 class="font-bold mb-3">Technologies</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in project.tags" :key="tag"
                                        class="px-3 py-1 bg-gray-100 text-sm rounded">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div :class="project.color" class="aspect-video rounded-lg flex items-center justify-center">
                            <img v-if="project.image" :src="project.image" :alt="project.title"
                                class="w-full h-full object-cover rounded-lg">
                            <div v-else :class="project.textColor" class="text-2xl font-bold opacity-50">
                                {{ project.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-8 border-t border-black">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="flex justify-between items-center">
                        <router-link to="/work"
                            class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                            ← BACK TO WORKS
                            <span class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
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

    </Layout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '@/composables/useProjects'
import Layout from '@/Layout/LayoutWithNav.vue'
import gsap from "gsap"
import { useLenis } from "@/composables/useLenis"

const route = useRoute()
const { projects, getProjectBySlug } = useProjects()

const slideInSection = ref(null)

const project = getProjectBySlug(route.params.slug)

const currentIndex = computed(() => {
    if (!project) return -1
    return projects.value.findIndex(p => p.id === project.id)
})

const previousProject = computed(() => {
    if (currentIndex.value <= 0) return null
    return projects[currentIndex.value - 1]
})

const nextProject = computed(() => {
    if (currentIndex.value >= projects.length - 1) return null
    return projects[currentIndex.value + 1]
})

const animatePage = () => {
    gsap.fromTo(
        slideInSection.value,
        {
            opacity: 0,
            y: 100,
        },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power4.out",
        }
    );
};

onMounted(() => {
    animatePage();
})

useLenis()
</script>
