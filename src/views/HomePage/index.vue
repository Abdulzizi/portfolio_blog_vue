<template>
    <div class="min-h-screen bg-white">
        <!-- Marquee Banner -->
        <Marquee />

        <!-- Grid Layout with Dynamic Scaling -->
        <div ref="gridRef" @mouseleave="clearHover" class="grid gap-px bg-black transition-all duration-500 ease-in-out"
            :style="gridStyle">
            <!-- First Row -->
            <GridBox label="WORK" @hover="hover('work')" :active="hovered === 'work'" class="row-span-2" />
            <GridBox label="CONNECT" @hover="hover('connect')" :active="hovered === 'connect'" class="col-span-2" />

            <!-- Center Logo -->
            <div class="bg-yellow-300 flex items-center justify-center border border-black transition-all duration-500"
                @mouseenter="hover('logo')" @mouseleave="hover(null)">
                <div class="border border-black p-4 relative transition-transform duration-300"
                    :class="{ 'scale-110': hovered === 'logo' }">
                    <div class="text-4xl font-black italic transform -rotate-12">ABDULZIZI</div>
                    <span class="absolute top-0 right-0 text-xl">×</span>
                    <span class="absolute bottom-0 left-0 text-xl">×</span>
                </div>
            </div>

            <!-- Second Row -->
            <GridBox label="ABOUT" @hover="hover('about')" :active="hovered === 'about'" class="row-span-2"
                :style="{ zIndex: active ? 10 : 1 }" />
            <GridBox label="COMMUNITY" @hover="hover('community')" :active="hovered === 'community'"
                class="col-span-2" />
        </div>

        <!-- Footer -->
        <div class="border-t border-black py-2 flex flex-wrap justify-center items-center text-sm">
            <span class="px-2">× CONTENT CREATION ×</span>
            <span class="px-2">× BRANDING ×</span>
            <span class="px-2">× VIDEO EDITING ×</span>
            <span class="px-2">× WEB DEVELOPMENT ×</span>
            <span class="px-2">× WEB DESIGN ×</span>
            <span class="px-2">× SOCIAL MEDIA ×</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import GridBox from './GridBox.vue'
import Marquee from './Marquee.vue'

const hovered = ref(null)
const gridRef = ref(null)

const hover = (key) => {
    hovered.value = key
}

const handleDocumentMouseMove = (event) => {
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
    // Default grid layout (when nothing is hovered)
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
        colTemplate = '1.5fr 1fr 2fr' // Adjusted to ensure growth
        rowTemplate = '1fr 1.8fr 1.2fr'
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
})

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleDocumentMouseMove)
})
</script>

<style>
/* Custom font styling */
body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    letter-spacing: -0.02em;
}
</style>