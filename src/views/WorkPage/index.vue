<template>
    <Layout>
        <div v-if="isDesktop" class="relative h-screen md:h-screen overflow-hidden bg-white">
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
                    <div ref="projectsGrid" class="w-full h-4/5">
                        <ProjectGrid :projects="gridProjects" :max-display="5" :show-featured="true"
                            @show-more="goToAllProjects" />
                    </div>
                </div>

                <!-- Slide 3: Project Details/About -->
                <div class="w-screen h-full flex-shrink-0 flex items-center px-6 md:px-20">
                    <div ref="approachContent" class="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 class="text-4xl md:text-6xl font-bold mb-8">MY APPROACH</h2>
                            <p class="text-lg mb-6">Every project starts with understanding the problem. I believe in
                                creating solutions that are not just visually appealing, but also functional and
                                meaningful.
                            </p>
                            <p class="text-lg">From concept to execution, I focus on delivering work that makes an
                                impact and drives results.</p>

                            <div class="pt-8 mt-12 border-t border-black">
                                <router-link to="/"
                                    class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                                    ← BACK TO HOME
                                    <span
                                        class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
                                </router-link>
                            </div>
                        </div>
                        <div class="space-y-8">
                            <div
                                class="border-l-4 border-yellow-300 pl-6 py-4 hover:border-black hover:translate-x-1 transition-all duration-300 cursor-pointer">
                                <div class="flex items-start">
                                    <div class="flex-1">
                                        <h3 class="text-xl font-bold mb-2 flex items-center">
                                            RESEARCH & STRATEGY
                                        </h3>
                                        <p class="text-gray-700">Understanding your audience and market to create
                                            targeted solutions.</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="border-l-4 border-yellow-300 pl-6 py-4 hover:border-black hover:translate-x-1 transition-all duration-300 cursor-pointer">
                                <div class="flex items-start">
                                    <div class="flex-1">
                                        <h3 class="text-xl font-bold mb-2 flex items-center">
                                            DESIGN & DEVELOPMENT
                                        </h3>
                                        <p class="text-gray-700">Crafting beautiful, functional experiences with clean
                                            code.</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="border-l-4 border-yellow-300 pl-6 py-4 hover:border-black hover:translate-x-1 transition-all duration-300 cursor-pointer">
                                <div class="flex items-start">
                                    <div class="flex-1">
                                        <h3 class="text-xl font-bold mb-2 flex items-center">
                                            LAUNCH & OPTIMIZE
                                        </h3>
                                        <p class="text-gray-700">Ensuring your project performs and continues to
                                            improve.</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="mt-12 p-6 border border-black bg-yellow-300 hover:bg-yellow-200 transition-colors duration-300">
                                <h3 class="text-xl font-bold mb-2">Want to bring your ideas into digital solution?</h3>
                                <p class="mb-4">Let's discuss how we can bring your vision to life.</p>
                                <router-link to="/connect"
                                    class="inline-flex items-center text-sm font-medium bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors group">
                                    GET IN TOUCH
                                    <span
                                        class="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </router-link>
                            </div>
                        </div>
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
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-8 text-center">FEATURED WORK</h2>
                    <ProjectGrid :projects="gridProjects" :max-display="5" :show-featured="true"
                        :show-more-button="true" container-class="" @show-more="goToAllProjects" />
                </div>
            </section>

            <section class="min-h-screen px-6 py-12">
                <div class="max-w-4xl mx-auto">
                    <div class="space-y-12">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold mb-8">MY APPROACH</h2>
                            <p class="text-lg mb-6 max-w-2xl mx-auto">Every project starts with understanding the
                                problem. I believe in
                                creating solutions that are not just visually appealing, but also functional and
                                meaningful.
                            </p>
                            <p class="text-lg max-w-2xl mx-auto">From concept to execution, I focus on delivering work
                                that makes an
                                impact and drives results.</p>
                        </div>

                        <div class="space-y-6">
                            <div
                                class="border-l-4 border-yellow-300 pl-6 py-4 hover:border-black hover:translate-x-1 transition-all duration-300 cursor-pointer">
                                <h3 class="text-xl font-bold mb-2">RESEARCH & STRATEGY</h3>
                                <p class="text-gray-700">Understanding your audience and market to create targeted
                                    solutions.</p>
                            </div>
                            <div
                                class="border-l-4 border-yellow-300 pl-6 py-4 hover:border-black hover:translate-x-1 transition-all duration-300 cursor-pointer">
                                <h3 class="text-xl font-bold mb-2">DESIGN & DEVELOPMENT</h3>
                                <p class="text-gray-700">Crafting beautiful, functional experiences with clean code.</p>
                            </div>
                            <div
                                class="border-l-4 border-yellow-300 pl-6 py-4 hover:border-black hover:translate-x-1 transition-all duration-300 cursor-pointer">
                                <h3 class="text-xl font-bold mb-2">LAUNCH & OPTIMIZE</h3>
                                <p class="text-gray-700">Ensuring your project performs and continues to improve.</p>
                            </div>
                        </div>

                        <div
                            class="p-6 border border-black bg-yellow-300 hover:bg-yellow-200 transition-colors duration-300 text-center">
                            <h3 class="text-xl font-bold mb-2">Want to bring your ideas into digital solution?</h3>
                            <p class="mb-4">Let's discuss how we can bring your vision to life.</p>
                            <router-link to="/connect"
                                class="inline-flex items-center text-sm font-medium bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors group">
                                GET IN TOUCH
                                <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </router-link>
                        </div>

                        <div class="pt-8 border-t border-black text-center">
                            <router-link to="/"
                                class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                                ← BACK TO HOME
                                <span
                                    class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useLenis } from "@/composables/useLenis"
import { useProjects } from '@/composables/useProjects'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Layout from '@/Layout/LayoutWithNav.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'

const router = useRouter()
const { gridProjects } = useProjects()

const scrollContainer = ref(null)
const heroText = ref(null)
const projectsGrid = ref(null)
const approachContent = ref(null)

const currentSlide = ref(0)
const totalSlides = ref(3)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const isDesktop = computed(() => windowWidth.value >= 768)

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
    windowWidth.value = window.innerWidth
}

onMounted(() => {
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
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', handleResize)
})

useLenis();
</script>
