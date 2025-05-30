<template>
    <div class="min-h-screen bg-white" ref="fadeInSection">
        <Marquee />

        <!-- Grid Layout with Dynamic Scaling -->
        <div ref="gridRef" @mouseleave="clearHover"
            class="grid  gap-px bg-black transition-all duration-500 ease-in-out cursor-pointer"
            :class="gridResponsiveClass" :style="gridStyle">
            <!-- First Row -->
            <GridBox label="WORK" @hover="hover('work')" :active="hovered === 'work'"
                :class="{ 'row-span-2': isDesktop }" />
            <GridBox label="CONNECT" @hover="hover('connect')" :active="hovered === 'connect'"
                :class="{ 'col-span-2': isDesktop }" />

            <!-- Center Logo -->
            <div class="bg-yellow-300 flex items-center justify-center border border-black transition-all duration-500"
                :class="{ 'order-first': !isDesktop }" @mouseenter="hover('logo')" @mouseleave="hover(null)">
                <div class=" p-4 relative transition-transform duration-300"
                    :class="{ 'scale-150': hovered === 'logo' }">
                    <!-- <div class="text-4xl font-black italic transform -rotate-12">ABDULZIZI</div>
                    <span class="absolute top-0 right-0 text-xl">×</span>
                    <span class="absolute bottom-0 left-0 text-xl">×</span> -->

                    <img src="@/assets/images/logo-wo-bg.png" alt="Logo" class="h-52 opacity-90" />
                </div>
            </div>

            <!-- Second Row -->
            <GridBox label="ABOUT" @hover="hover('about')" :active="hovered === 'about'"
                :class="{ 'row-span-2': isDesktop }" @click="$router.push('/about')" />
            <GridBox label="COMMUNITY" @hover="hover('community')" :active="hovered === 'community'"
                :class="{ 'col-span-2': isDesktop }" />
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap';

import GridBox from './GridBox.vue'
import Marquee from './Marquee.vue'
import Footer from './Footer.vue'

const fadeInSection = ref(null)
const hovered = ref(null)
const gridRef = ref(null)
const windowWidth = ref(window.innerWidth)

// Track window width for responsive behavior
const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth
}

// Check if on desktop
const isDesktop = computed(() => {
    return windowWidth.value >= 768
})

const hover = (key) => {
    // Only enable hover effects on desktop
    if (isDesktop.value) {
        hovered.value = key
    }
}

const gridResponsiveClass = computed(() => {
    return isDesktop.value
        ? 'grid-cols-3 grid-rows-3'
        : 'grid-cols-1 auto-rows-min'
})

const handleDocumentMouseMove = (event) => {
    if (!isDesktop.value) return

    if (gridRef.value) {
        const rect = gridRef.value.getBoundingClientRect()
        const isInsideGrid =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom

        if (!isInsideGrid && hovered.value !== null) {
            clearHover()
        }
    }
}

const gridStyle = computed(() => {
    // For mobile, use simple stacked layout
    if (!isDesktop.value) {
        return {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            height: 'auto'
        }
    }

    // Desktop layout with hover effects
    let colTemplate = '1fr 2fr 1fr'
    let rowTemplate = '1fr 2fr 1fr'

    // Adjust based on which section is hovered
    if (hovered.value === 'work') {
        colTemplate = '2fr 1.5fr 0.5fr' // Left column grows
        rowTemplate = '1.5fr 2fr 0.5fr' // Top rows grow
    }
    else if (hovered.value === 'connect') {
        colTemplate = '0.5fr 3fr 0.5fr' // Middle column grows
        rowTemplate = '2fr 1.5fr 0.5fr' // Top row grows
    }
    else if (hovered.value === 'logo') {
        colTemplate = '0.8fr 2.4fr 0.8fr' // Middle column slightly grows
        rowTemplate = '0.8fr 2.4fr 0.8fr' // Middle row slightly grows
    }
    else if (hovered.value === 'about') {
        colTemplate = '0.5fr 1.5fr 2fr' // Right column grows
        rowTemplate = '0.5fr 2fr 1.5fr' // Top rows grow
    }
    else if (hovered.value === 'community') {
        colTemplate = '0.5fr 3fr 0.5fr' // Middle column grows
        rowTemplate = '0.5fr 1.5fr 2fr' // Bottom row grows
    }

    return {
        gridTemplateColumns: colTemplate,
        gridTemplateRows: rowTemplate,
        height: 'calc(100vh - 80px)' // Adjust based on header/footer height
    }
});

const clearHover = () => {
    hovered.value = null
}

onMounted(() => {
    document.addEventListener('mousemove', handleDocumentMouseMove)
    window.addEventListener('resize', updateWindowWidth)

    gsap.fromTo(
        fadeInSection.value,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
    )
})

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleDocumentMouseMove)
    window.removeEventListener('resize', updateWindowWidth)
})
</script>

<style>
@media (max-width: 767px) {
    .grid-layout>div {
        min-height: 150px;
    }
}
</style>