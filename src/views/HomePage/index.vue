<template>
    <div class="min-h-screen bg-white" ref="fadeInSection">
        <Marquee position="top" />

        <div ref="gridRef" @mouseleave="clearHover"
            class="grid  gap-px bg-black transition-all duration-500 ease-in-out cursor-pointer"
            :class="gridResponsiveClass" :style="gridStyle">
            <GridBox label="WORK" @hover="hover('work')" :active="hovered === 'work'"
                :class="{ 'row-span-2': isDesktop }" @click="$router.push('/work')" />
            <GridBox label="CONNECT" @hover="hover('connect')" :active="hovered === 'connect'"
                :class="{ 'col-span-2': isDesktop }" @click="$router.push('/connect')" />

            <!--  Logo -->
            <div class="bg-yellow-300 flex items-center justify-center border border-black transition-all duration-500"
                :class="{ 'order-first': !isDesktop }">
                <div class="p-4 relative transition-transform duration-300"
                    :class="{ 'scale-150': hovered === 'logo' }">
                    <img src="@/assets/images/logo-wo-bg.png" alt="Logo Abdul" class="h-52 opacity-90"
                        @mouseenter="hover('logo')" @mouseleave="hover(null)" />
                </div>
            </div>

            <GridBox label="ABOUT" @hover="hover('about')" :active="hovered === 'about'"
                :class="{ 'row-span-2': isDesktop }" @click="$router.push('/about')" />
            <GridBox label="BLOG" @hover="hover('blog')" :active="hovered === 'blog'"
                :class="{ 'col-span-2': isDesktop }" @click="$router.push('/blog')" />
        </div>

        <Marquee position="bottom" />
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

const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth
}

const isDesktop = computed(() => {
    return windowWidth.value >= 768
})

const hover = (key) => {
    if (isDesktop.value) {
        hovered.value = key
    }
}

const gridResponsiveClass = computed(() => {
    return isDesktop.value
        ? 'grid-cols-3 grid-rows-3'
        : 'grid-cols-1 auto-rows-min'
})

const handleDocumentMouseMove = ({ clientX, clientY }) => {
    if (!isDesktop.value) return
    const { left, right, top, bottom } = gridRef.value.getBoundingClientRect()
    if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) return
    if (hovered.value !== null) clearHover()
}

const gridStyle = computed(() => {
    const colTemplate = isDesktop.value ? (hovered.value === 'work' ? '2fr 1.5fr 0.5fr' : hovered.value === 'connect' ? '0.5fr 3fr 0.5fr' : hovered.value === 'logo' ? '0.8fr 2.4fr 0.8fr' : hovered.value === 'about' ? '0.5fr 1.5fr 2fr' : hovered.value === 'blog' ? '0.5fr 3fr 0.5fr' : '1fr 2fr 1fr') : '1fr';
    const rowTemplate = isDesktop.value ? (hovered.value === 'work' ? '1.5fr 2fr 0.5fr' : hovered.value === 'connect' ? '2fr 1.5fr 0.5fr' : hovered.value === 'logo' ? '0.8fr 2.4fr 0.8fr' : hovered.value === 'about' ? '0.5fr 2fr 1.5fr' : hovered.value === 'blog' ? '0.5fr 1.5fr 2fr' : '1fr 2fr 1fr') : 'auto';

    return {
        gridTemplateColumns: colTemplate,
        gridTemplateRows: rowTemplate,
        height: isDesktop.value ? 'calc(100vh - 80px)' : 'auto'
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