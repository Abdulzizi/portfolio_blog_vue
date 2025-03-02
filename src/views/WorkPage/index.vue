<template>
    <Layouts>
        <!-- Hero Section -->
        <section class="relative min-h-screen flex flex-col justify-between bg-white text-black px-6 md:px-20 pt-5">
            <div class="mt-16 md:mt-32">
                <h1 class="text-6xl md:text-8xl font-bold leading-tight uppercase">
                    Where code meets art.<br />
                    Where creativity meets logic.<br />
                    Code is my craft.
                </h1>
            </div>

            <div class="absolute bottom-20 left-1/2 transform translate-x-1/2 animate-bounce">
                <img :src="arrow" alt="Arrow Icon" class="w-12 h-12 rotate-90">
            </div>
        </section>

        <!-- Horizontal Scrolling Section -->
        <div class="horizontal-scroll-container">
            <div ref="scrollContent" class="content">
                <div v-for="(project, index) in projects" :key="index"
                    class="panel flex flex-col items-center justify-center p-8 transition-transform duration-500 relative">
                    <h1 class="text-5xl font-bold mb-4">{{ project.title }}</h1>

                    <!-- Subtitle and button in a bottom rectangle -->
                    <div
                        class="subsection absolute bottom-0 left-0 w-full h-[30%] flex flex-col items-center justify-center bg-black bg-opacity-80 opacity-0 transition-opacity duration-300">
                        <p class="text-xl text-black font-semibold mb-2">{{ project.subtitle }}</p>
                        <router-link :to="`/work/${project.id}`">
                            <Button class="button-brutalist text-black" size="lg">View Details</Button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </Layouts>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Layouts from '@/layouts/Layouts.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/button/Button.vue';
import arrow from '@/assets/images/right-arrow.svg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, image: 'image1.jpg', title: 'Project One', subtitle: 'Subtitle One' },
    { id: 2, image: 'image2.jpg', title: 'Project Two', subtitle: 'Subtitle Two' },
    { id: 3, image: 'image3.jpg', title: 'Project Three', subtitle: 'Subtitle Three' },
    { id: 4, image: 'image4.jpg', title: 'Project Four', subtitle: 'Subtitle Four' }
];

const scrollContent = ref(null);

let ctx;

onMounted(() => {
    ctx = gsap.context(() => {
        const panels = gsap.utils.toArray('.content .panel');
        const totalWidth = window.innerWidth * panels.length;

        if (scrollContent.value) {
            gsap.set(scrollContent.value, { width: totalWidth });
        }

        gsap.to(scrollContent.value, {
            x: () => -totalWidth + window.innerWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal-scroll-container',
                start: 'top top',
                end: () => `+=${totalWidth}`,
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
    });
});

onUnmounted(() => {
    ctx && ctx.revert();
});
</script>

<style scoped>
/* Hide Scrollbars */
body {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

body::-webkit-scrollbar {
    display: none;
}

/* Horizontal Scrolling Section */
.horizontal-scroll-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
}

.content {
    display: flex;
    height: 100vh;
    white-space: nowrap;
}

.panel {
    width: 100vw;
    height: 100vh;
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    font-size: 2rem;
    font-weight: bold;
    background-color: #f3f4f6;
    border: 2px solid #000;
    position: relative;
}

/* Subsection at the bottom (Hidden by default) */
.subsection {
    position: absolute;
    /* bottom: 20px; */
    left: 0;
    width: 100%;
    /* height: 40%; */
    background-color: #86efac;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    border-top: #000 solid 2px;
    transition: opacity 0.3s ease-in-out;
}

.subsection {
    bottom: calc(4rem + 4px);
    /* Adjust based on navbar height */
}

.panel:hover .subsection {
    opacity: 1;
}

/* Brutalist Button Sty: ;le */
.button-brutalist {
    position: relative;
    z-index: 10;
    background-color: #ffffff;
    border: 2px solid #000000;
    box-shadow: 4px 4px 0 #000000;
    transition: transform 0.2s ease;
}

.button-brutalist:hover {
    transform: translate(-4px, -4px);
}
</style>
