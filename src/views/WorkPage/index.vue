<template>
    <Layout>
        <div v-if="isDesktop" class="relative h-screen md:h-screen overflow-hidden bg-white">
            <!-- Horizontal Scrolling Container -->
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
                    <div ref="projectsGrid" class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-4/5">
                        <!-- Project 1: Large Featured -->
                        <div
                            class="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div class="h-full p-8 flex flex-col justify-between text-white">
                                <div>
                                    <span class="text-sm opacity-80">WEB DESIGN</span>
                                    <h3 class="text-3xl font-bold mt-2">E-Commerce Platform</h3>
                                    <p class="mt-4 opacity-90">Modern shopping experience with seamless checkout flow
                                    </p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">2024</span>
                                    <div
                                        class="w-8 h-8 border border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                        <ChevronRight class="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 2: Brand Identity -->
                        <div
                            class="bg-yellow-300 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div class="h-full p-6 flex flex-col justify-between">
                                <div>
                                    <span class="text-sm opacity-80">BRANDING</span>
                                    <h3 class="text-xl font-bold mt-2">Tech Startup</h3>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">2024</span>
                                    <div
                                        class="w-6 h-6 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 3: Mobile App -->
                        <div
                            class="bg-black rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div class="h-full p-6 flex flex-col justify-between text-white">
                                <div>
                                    <span class="text-sm opacity-80">MOBILE APP</span>
                                    <h3 class="text-xl font-bold mt-2">Fitness Tracker</h3>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">2023</span>
                                    <div
                                        class="w-6 h-6 border border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 4: Video Production -->
                        <div
                            class="bg-green-400 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div class="h-full p-6 flex flex-col justify-between">
                                <div>
                                    <span class="text-sm opacity-80">VIDEO</span>
                                    <h3 class="text-xl font-bold mt-2">Brand Campaign</h3>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">2024</span>
                                    <div
                                        class="w-6 h-6 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 5: Content Creation -->
                        <div
                            class="bg-rose-300 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div class="h-full p-6 flex flex-col justify-between">
                                <div>
                                    <span class="text-sm opacity-80">CONTENT</span>
                                    <h3 class="text-xl font-bold mt-2">Social Media</h3>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">2023</span>
                                    <div
                                        class="w-6 h-6 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
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

                            <!-- Back Button -->
                            <div class="pt-8 mt-12 border-t border-black">
                                <a href="/"
                                    class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                                    ← BACK TO HOME
                                    <span
                                        class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
                                </a>
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

                            <!-- Contact CTA -->
                            <div
                                class="mt-12 p-6 border border-black bg-yellow-300 hover:bg-yellow-200 transition-colors duration-300">
                                <h3 class="text-xl font-bold mb-2">Want to bring your ideas into digital solution?</h3>
                                <p class="mb-4">Let's discuss how we can bring your vision to life.</p>
                                <a href="/connect"
                                    class="inline-flex items-center text-sm font-medium bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors group">
                                    GET IN TOUCH
                                    <span
                                        class="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Controls (Desktop Only) -->
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

        <!-- Mobile: Stacked Layout -->
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

            <!-- Projects Section -->
            <section class="min-h-screen px-6 py-12">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold mb-8 text-center">FEATURED WORK</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Project 1: Large Featured -->
                        <div
                            class="sm:col-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[200px]">
                            <div class="h-full p-6 flex flex-col justify-between text-white">
                                <div>
                                    <span class="text-sm opacity-80">WEB DESIGN</span>
                                    <h3 class="text-2xl font-bold mt-2">E-Commerce Platform</h3>
                                    <p class="mt-4 opacity-90">Modern shopping experience with seamless checkout flow
                                    </p>
                                </div>
                                <div class="flex items-center justify-between mt-4">
                                    <span class="text-sm">2024</span>
                                    <div
                                        class="w-8 h-8 border border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                        <ChevronRight class="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 2: Brand Identity -->
                        <div
                            class="bg-yellow-300 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[180px]">
                            <div class="h-full p-6 flex flex-col justify-between">
                                <div>
                                    <span class="text-sm opacity-80">BRANDING</span>
                                    <h3 class="text-xl font-bold mt-2">Tech Startup</h3>
                                </div>
                                <div class="flex items-center justify-between mt-4">
                                    <span class="text-sm">2024</span>
                                    <div
                                        class="w-6 h-6 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 3: Mobile App -->
                        <div
                            class="bg-black rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[180px]">
                            <div class="h-full p-6 flex flex-col justify-between text-white">
                                <div>
                                    <span class="text-sm opacity-80">MOBILE APP</span>
                                    <h3 class="text-xl font-bold mt-2">Fitness Tracker</h3>
                                </div>
                                <div class="flex items-center justify-between mt-4">
                                    <span class="text-sm">2023</span>
                                    <div
                                        class="w-6 h-6 border border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 4: Video Production -->
                        <div
                            class="bg-green-400 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[180px]">
                            <div class="h-full p-6 flex flex-col justify-between">
                                <div>
                                    <span class="text-sm opacity-80">VIDEO</span>
                                    <h3 class="text-xl font-bold mt-2">Brand Campaign</h3>
                                </div>
                                <div class="flex items-center justify-between mt-4">
                                    <span class="text-sm">2024</span>
                                    <div
                                        class="w-6 h-6 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project 5: Content Creation -->
                        <div
                            class="sm:col-span-2 bg-rose-300 rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[180px]">
                            <div class="h-full p-6 flex flex-col justify-between">
                                <div>
                                    <span class="text-sm opacity-80">CONTENT</span>
                                    <h3 class="text-xl font-bold mt-2">Social Media</h3>
                                </div>
                                <div class="flex items-center justify-between mt-4">
                                    <span class="text-sm">2023</span>
                                    <div
                                        class="w-6 h-6 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <ChevronRight class="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Approach Section -->
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

                        <!-- Contact CTA -->
                        <div
                            class="p-6 border border-black bg-yellow-300 hover:bg-yellow-200 transition-colors duration-300 text-center">
                            <h3 class="text-xl font-bold mb-2">Want to bring your ideas into digital solution?</h3>
                            <p class="mb-4">Let's discuss how we can bring your vision to life.</p>
                            <a href="/connect"
                                class="inline-flex items-center text-sm font-medium bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors group">
                                GET IN TOUCH
                                <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </a>
                        </div>

                        <!-- Back Button -->
                        <div class="pt-8 border-t border-black text-center">
                            <a href="/"
                                class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                                ← BACK TO HOME
                                <span
                                    class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { useLenis } from "@/composables/useLenis"
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Layout from '@/Layout/LayoutWithNav.vue'

// Template refs
const scrollContainer = ref(null)
const heroText = ref(null)
const projectsGrid = ref(null)
const approachContent = ref(null)

// State
const currentSlide = ref(0)
const totalSlides = ref(3)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

// Computed
const isDesktop = computed(() => windowWidth.value >= 768)

// Navigation functions (Desktop only)
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

// Simple GSAP animations (Desktop only)
const animateToSlide = (slideIndex) => {
    gsap.to(scrollContainer.value, {
        x: -slideIndex * window.innerWidth,
        duration: 1,
        ease: "power2.inOut"
    })
}

// Keyboard navigation (Desktop only)
const handleKeydown = (event) => {
    if (event.key === 'ArrowLeft') {
        previousSlide()
    } else if (event.key === 'ArrowRight') {
        nextSlide()
    }
}

// Window resize handler
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
