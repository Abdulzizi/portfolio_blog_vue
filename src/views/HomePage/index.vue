<script setup>
import { ref } from "vue";

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
        ? "bg-yellow-400" // Keep logo background always yellow
        : hoveredSection.value === section
            ? "bg-yellow-200"
            : "bg-white";
};
</script>

<template>
    <div class="relative min-h-screen bg-white">
        <!-- Scrolling Top Border Text -->
        <div class="absolute top-0 left-0 w-full border-b border-black bg-white text-xs overflow-hidden">
            <div class="flex whitespace-nowrap animate-scroll px-4">
                <span class="px-4">✖ WE’RE AN AWARD-WINNING, PURPOSE-DRIVEN, CREATIVE AGENCY. BUT YOU CAN JUST CALL US
                    MILLI.</span>
            </div>
        </div>

        <!-- Asymmetrical Grid -->
        <div class="grid min-h-screen p-1 gap-1 transition-all duration-500" :class="getGridClasses()">
            <div class="grid-item col-span-2 row-span-2" :class="getBgClass('work')" @mouseenter="setHover('work')"
                @mouseleave="resetHover">
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
        <div class="absolute bottom-0 left-0 w-full border-t border-black bg-white text-xs overflow-hidden">
            <div class="flex whitespace-nowrap animate-scroll px-4">
                <span class="px-4">WEB DESIGN ✖ CREATIVE STRATEGY ✖ SOCIAL MEDIA ✖ BRANDING ✖ CONTENT CREATIVE ✖ VIDEO
                    PRODUCTION</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Grid item styling */
.grid-item {
    @apply border border-black flex items-center justify-center text-4xl font-bold transition-all duration-500;
}

/* Scrolling text animation */
@keyframes scroll {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(-100%);
    }
}

.animate-scroll {
    display: inline-block;
    animation: scroll 10s linear infinite;
}
</style>
