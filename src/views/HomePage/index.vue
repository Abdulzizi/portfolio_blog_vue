<template>
    <div
        class="grid min-h-screen grid-cols-[1fr,2fr,1fr] grid-rows-[1fr,2fr,1fr] gap-px bg-black transition-all duration-500">
        <!-- First Row -->
        <GridBox label="WORK" @hover="hover('work')" :active="hovered === 'work'" class="row-span-2" />
        <GridBox label="CONNECT" @hover="hover('connect')" :active="hovered === 'connect'" class="col-span-2" />
        <!-- <GridBox label="ABOUT" @hover="hover('about')" :active="hovered === 'about'" /> -->

        <!-- Center Logo -->
        <div class="bg-yellow-300 flex items-center justify-center border border-black transition-transform duration-500"
            @mouseenter="hover('logo')" @mouseleave="hover(null)">
            <img src="@/assets/images/logo.svg" alt="Logo" class="w-20 transition-transform duration-300"
                :class="{ 'scale-110': hovered === 'logo' }" />
        </div>

        <!-- Second Row -->
        <GridBox label="BLOG" @hover="hover('blog')" :active="hovered === 'blog'" class="row-span-2" />
        <GridBox label="CONTACT" @hover="hover('contact')" :active="hovered === 'contact'" class="col-span-2" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import GridBox from './GridBox.vue'

const hovered = ref(null)
const hover = (key) => {
    hovered.value = key
}
</script>

<style scoped>
/* Ensure grid fills the height of the screen */
.grid {
    height: 100vh;
}
</style>
