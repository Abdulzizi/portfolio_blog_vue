<template>
    <Layout>
        <div v-if="isDesktop" class="relative h-screen md:h-screen overflow-hidden bg-white"
            :class="{ 'overflow-x-hidden': !isDesktop }">
            <div ref="scrollContainer" class="flex h-full">
                <!-- Slide 1: Hero Text -->
                <div class="w-screen h-full flex-shrink-0 flex items-center justify-start px-6 md:px-20">
                    <div ref="heroText">
                        <h1 class="text-6xl md:text-8xl font-bold leading-tight uppercase">
                            Where code meets art.<br />
                            Masters of Digital.<br />
                            Crafting digital wonders.
                        </h1>
                    </div>
                </div>

                <!-- Slide 2: Featured Projects Grid -->
                <div class="w-screen h-full flex-shrink-0 flex items-center px-6 md:px-20">
                    <div ref="projectsGrid" class="w-full max-w-7xl mx-auto">
                        <FeaturedProjects :projects="projects" :is-loading="isLoading" :max-display="8"
                            :show-more="true" container-class="h-auto" @show-more="goToAllProjects" />
                    </div>
                </div>
            </div>

            <div class="absolute bottom-20 right-6 md:right-20 flex items-center space-x-4">
                <button @click="previousSlide" :disabled="currentSlide === 0"
                    class="nav-button w-12 h-12 border border-black bg-white hover:bg-yellow-200 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft class="w-6 h-6" />
                </button>
                <button @click="nextSlide" :disabled="currentSlide === totalSlides - 1"
                    class="nav-button w-12 h-12 border border-black bg-white hover:bg-yellow-200 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight class="w-6 h-6" />
                </button>
            </div>
        </div>

        <div v-else class="bg-white overflow-y-auto">
            <!-- Hero Section -->
            <section class="min-h-screen flex items-center justify-center px-6 py-12">
                <div class="text-center">
                    <h1 class="text-4xl sm:text-5xl font-bold leading-tight uppercase">
                        Where code meets art.<br />
                        Masters of Digital.<br />
                        Crafting digital wonders.
                    </h1>
                </div>
            </section>

            <section class="min-h-screen px-6 py-12">
                <div class="max-w-7xl mx-auto">
                    <h2 class="text-3xl font-bold mb-12 text-center">FEATURED WORK</h2>
                    <FeaturedProjects :projects="projects" :is-loading="isLoading" :max-display="8" :show-more="true"
                        container-class="h-auto" @show-more="goToAllProjects" />
                </div>
            </section>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useLenis } from "@/composables/useLenis"
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Layout from '@/Layout/LayoutWithNav.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'
import Spinner from '@/components/Spinner.vue'
import FeaturedProjects from './FeaturedProjects.vue'
import { useProjectStore } from "@/state/pinia";

const projectStore = useProjectStore();
const isLoading = computed(() => projectStore.isLoading);
const projects = ref([]);
const router = useRouter();

const scrollContainer = ref(null)
const heroText = ref(null)
const projectsGrid = ref(null)
const approachContent = ref(null)
const currentSlide = ref(0)
const totalSlides = ref(2)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const isDesktop = computed(() => windowWidth.value >= 768)

const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

const fetchAllProjects = async () => {
    try {
        await projectStore.fetchAllProjects();

        const publishedProjects = projectStore.projects.filter(project => project.is_published === 1);
        if (publishedProjects.length > 0) {
            projects.value = publishedProjects;
        } else {
            console.error('[WORKPAGE, index.vue] No published projects found');
        }
    } catch (error) {
        console.error('[WORKPAGE, index.vue] Error fetching projects:', error);
    }
}

const goToAllProjects = () => {
    router.push('/projects')
}

const nextSlide = () => {
    if (currentSlide.value < totalSlides.value - 1) {
        const nextSlideIndex = currentSlide.value + 1
        animateToSlide(nextSlideIndex)
        currentSlide.value = nextSlideIndex
    }
}

const previousSlide = () => {
    if (currentSlide.value > 0) {
        const prevSlideIndex = currentSlide.value - 1
        animateToSlide(prevSlideIndex)
        currentSlide.value = prevSlideIndex
    }
}

const goToSlide = (index) => {
    animateToSlide(index)
    currentSlide.value = index
}

const animateToSlide = (slideIndex) => {
    gsap.to(scrollContainer.value, {
        x: -slideIndex * window.innerWidth,
        duration: 1,
        ease: "power2.inOut"
    })
}

const handleKeydown = (event) => {
    if (event.key === 'ArrowLeft') {
        previousSlide()
    } else if (event.key === 'ArrowRight') {
        nextSlide()
    }
}

const handleResize = () => {
    windowWidth.value = getViewportWidth()
}

onMounted(() => {
    fetchAllProjects();
    if (heroText.value) {
        gsap.from(heroText.value, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
    }
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', handleResize)

    document.body.setAttribute('tabindex', '0');
    document.body.focus();
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', handleResize)
})

watchEffect(() => {
    if (isDesktop.value) {
        animateToSlide(currentSlide.value);
    }
});

useLenis();
</script>