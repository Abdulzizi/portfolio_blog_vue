<template>
    <div class="relative min-h-screen bg-white">
        <!-- Scrolling Head Services -->
        <Scrollbar position="top" />

        <!-- Asymmetrical Grid -->
        <div class="grid min-h-screen p-1 gap-1 transition-all duration-500 cursor-pointer" :class="getGridClasses()">
            <div class="grid-item col-span-2 row-span-2" @click="$router.push('/work')" :class="getBgClass('work')"
                @mouseenter="setHover('work')" @mouseleave="resetHover">
                WORK
            </div>
            <div class="grid-item" :class="getBgClass('connect')" @mouseenter="setHover('connect')"
                @mouseleave="resetHover">
                CONNECT
            </div>
            <div class="grid-item" :class="getBgClass('about')" @mouseenter="setHover('about')"
                @mouseleave="resetHover">
                ABOUT
            </div>

            <!-- Logo (Always Yellow, but Scales on Hover) -->
            <div class="flex items-center justify-center border-black border transition-all duration-500"
                :class="getBgClass('logo')" @mouseenter="setHover('logo')" @mouseleave="resetHover">
                <img src="@/assets/images/logo.svg" alt="Milli Logo" class="w-24 transition-transform duration-500"
                    :class="hoveredSection === 'logo' ? 'scale-110' : 'scale-100'">
            </div>

            <div class="grid-item col-span-2" :class="getBgClass('blog')" @mouseenter="setHover('blog')"
                @mouseleave="resetHover">
                BLOG
            </div>
        </div>

        <!-- Scrolling Bottom Services -->
        <Scrollbar position="bottom" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Scrollbar from "./scrollBar.vue";

const hoveredSection = ref(null);

const setHover = (section) => {
    hoveredSection.value = section;
};

const resetHover = () => {
    hoveredSection.value = null;
};

const getGridClasses = () => {
    switch (hoveredSection.value) {
        case "work":
            return "grid-cols-[3fr_1fr_1fr] grid-rows-[3fr_1fr_1fr]";
        case "connect":
            return "grid-cols-[2fr_2fr_1fr] grid-rows-[2fr_1fr_1fr]";
        case "about":
            return "grid-cols-[2fr_1fr_2fr] grid-rows-[1fr_2fr_1fr]";
        case "logo":
            return "grid-cols-[2fr_1fr_1fr] grid-rows-[2fr_1fr_2fr]";
        case "blog":
            return "grid-cols-[2fr_1fr_2fr] grid-rows-[2fr_1fr_1fr]";
        default:
            return "grid-cols-[2fr_1fr_1fr] grid-rows-[2fr_1fr_1fr]";
    }
};

const getBgClass = (section) => {
    return section === "logo"
        ? "bg-green-400" // Keep logo background always yellow
        : hoveredSection.value === section
            ? "bg-green-200"
            : "bg-white";
};
</script>

<style scoped>
/* Grid item styling */
.grid-item {
    @apply border border-black flex items-center justify-center text-4xl font-bold transition-all duration-500;
}
</style>