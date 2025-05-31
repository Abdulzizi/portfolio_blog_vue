<template>
    <Layout>
        <div class="min-h-screen bg-white py-12" ref="slideInSection">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center mb-12">
                    <h1 class="text-4xl md:text-6xl font-bold mb-4">ALL PROJECTS</h1>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore my complete portfolio of digital experiences, brand identities, and creative solutions.
                    </p>
                </div>

                <div class="flex flex-wrap justify-center gap-2 mb-12">
                    <button v-for="category in categories" :key="category" @click="selectedCategory = category"
                        class="px-4 py-2 text-sm font-medium border border-black transition-colors duration-300" :class="{
                            'bg-yellow-300': selectedCategory === category,
                            'bg-white hover:bg-gray-50': selectedCategory !== category
                        }">
                        {{ category }}
                    </button>
                </div>

                <ProjectGrid :projects="filteredProjects" :max-display="50" :show-featured="false"
                    :show-more-button="false" container-class="min-h-[400px]" />

                <div v-if="filteredProjects.length === 0" class="text-center py-12">
                    <div class="text-gray-400 text-lg">No projects found in this category.</div>
                </div>

                <div class="text-center mt-12 pt-8 border-t border-black">
                    <router-link to="/work"
                        class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                        ← BACK TO WORK
                        <span class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
                    </router-link>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLenis } from "@/composables/useLenis"
import gsap from "gsap"

import { useProjects } from '@/composables/useProjects'
import Layout from '@/Layout/LayoutWithNav.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'

const { projects } = useProjects()

const selectedCategory = ref('ALL')
const slideInSection = ref(null)

const categories = computed(() => {
    const cats = ['ALL']
    const projectCategories = [...new Set(projects.value.map(p => p.category))]
    return [...cats, ...projectCategories]
})

const filteredProjects = computed(() => {
    if (selectedCategory.value === 'ALL') {
        return projects.value
    }
    return projects.value.filter(project => project.category === selectedCategory.value)
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

useLenis();
</script>
