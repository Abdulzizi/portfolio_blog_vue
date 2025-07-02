<template>
    <Layout>
        <div class="min-h-screen bg-white py-12 pb-28" ref="slideInSection">
            <div v-if="loading" class="flex items-center justify-center h-screen">
                <!-- Spinner -->
                <Spinner />
            </div>
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center mb-12">
                    <h1 class="text-4xl md:text-6xl font-bold mb-4">ALL PROJECTS</h1>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore my complete portfolio of digital experiences, brand identities, and creative solutions.
                    </p>
                </div>

                <div v-if="projects.length > 0">
                    <ProjectGrid :projects="projects" :max-display="25" :show-featured="true" :show-more-button="false"
                        container-class="min-h-[400px]" />
                </div>

                <div v-else class="flex flex-col items-center justify-center min-h-[300px] text-center">
                    <h2 class="text-2xl md:text-3xl font-bold mb-4">Oops... Nothing here yet! 😅</h2>
                    <p class="text-gray-600 mb-6">
                        Looks like the project elves are still coding... or maybe they're just on a coffee break ☕👀
                    </p>
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

import { useProjectStore } from "@/state/pinia"
import Layout from '@/Layout/LayoutWithNav.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'
import Spinner from '@/components/Spinner.vue'

const projectStore = useProjectStore()
const loading = ref(true)
const projects = ref([])
const slideInSection = ref(null)

const fetchAllProjects = async () => {
    try {
        loading.value = true
        await projectStore.fetchAllProjects();

        if (projectStore.projects.length > 0) {
            projects.value = projectStore.projects
        } else {
            console.error('[WORKPAGE, projectPage.vue] No projects found');
        }
    } catch (error) {
        console.error('[WORKPAGE, projectPage.vue] Error fetching projects:', error);
    } finally {
        loading.value = false
    }
}

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
    fetchAllProjects();
})

useLenis();
</script>
