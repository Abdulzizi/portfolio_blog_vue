<template>
    <div class="relative min-h-screen bg-[hsl(var(--background))] border-[hsl(var(--border))] border-8">
        <!-- Scrolling Head Services -->
        <Scrollbar position="top" />

        <!-- Asymmetrical Brutalist Grid -->
        <div class="grid min-h-screen p-2 gap-2 cursor-pointer" :class="getGridClasses()">
            <div class="grid-item col-span-2 md:col-span-1 row-span-2 text-[hsl(var(--primary-foreground))]"
                @click="$router.push('/work')" :class="getBgClass('work')" @mouseenter="setHover('work')"
                @mouseleave="resetHover">
                WORK
            </div>
            <div class="grid-item text-[hsl(var(--primary-foreground))]" @click="$router.push('/connect')"
                :class="getBgClass('connect')" @mouseenter="setHover('connect')" @mouseleave="resetHover">
                CONNECT
            </div>
            <div class="grid-item text-[hsl(var(--primary-foreground))]" @click="$router.push('/about')"
                :class="getBgClass('about')" @mouseenter="setHover('about')" @mouseleave="resetHover">
                ABOUT
            </div>

            <!-- Brutalist Logo (Static but Dominant) -->
            <div class="grid-item col-span-2 md:col-span-1 text-[hsl(var(--primary-foreground))]"
                @click="$router.push('/blog')" @mouseenter="setHover('blog')" :class="getBgClass('blog')"
                @mouseleave="resetHover">
                BLOG
            </div>

            <div class="flex items-center justify-center border-[hsl(var(--border))] border-8 bg-[hsl(var(--primary))]"
                @mouseenter="setHover('logo')" :class="getBgClass('logo')" @mouseleave="resetHover">
                <img src="@/assets/images/logo.svg" alt="Milli Logo" class="w-28 transition-transform duration-75"
                    :class="hoveredSection === 'logo' ? 'scale-125' : 'scale-100'">
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
            return "grid-cols-[2fr_2fr_1fr] grid-rows-[2fr_1fr_1fr] md:grid-cols-[2fr_1fr] md:grid-rows-[2fr_1fr] sm:grid-cols-1 sm:grid-rows-1";
        case "connect":
            return "grid-cols-[3fr_2fr_1fr] grid-rows-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr] md:grid-rows-[2fr_1fr] sm:grid-cols-1 sm:grid-rows-1";
        case "about":
            return "grid-cols-[3fr_1fr_2fr] grid-rows-[1fr_3fr_1fr] md:grid-cols-[2fr_1fr] md:grid-rows-[2fr_1fr] sm:grid-cols-1 sm:grid-rows-1";
        case "logo":
            return "grid-cols-[3fr_1fr_2fr] grid-rows-[2fr_1fr_3fr] md:grid-cols-[2fr_1fr] md:grid-rows-[2fr_1fr] sm:grid-cols-1 sm:grid-rows-1";
        case "blog":
            return "grid-cols-[3fr_1fr_2fr] grid-rows-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr] md:grid-rows-[2fr_1fr] sm:grid-cols-1 sm:grid-rows-1";
        default:
            return "grid-cols-[2fr_2fr_1fr] grid-rows-[2fr_1fr_1fr] md:grid-cols-[2fr_1fr] md:grid-rows-[2fr_1fr] sm:grid-cols-1 sm:grid-rows-1";
    }
};

const getBgClass = (section) => {
    return section === "logo"
        ? "bg-[hsl(var(--primary))]" // Keep logo background always primary color
        : hoveredSection.value === section
            ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
            : "bg-[hsl(var(--foreground))]";
};
</script>

<style scoped>
/* Brutalist Grid Item Styling */
.grid-item {
    @apply border-8 border-[hsl(var(--border))] flex items-center justify-center text-5xl font-black uppercase transition-none;
}

/* Make hover effects SNAPPY & ABRUPT */
.grid-item:hover {
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 hsl(var(--border));
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
}

/* Brutalist font */
body {
    font-family: "Arial Black", sans-serif;
}

/* Make the grid responsive */
@media (max-width: 768px) {
    .grid {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .grid-item {
        flex: 1;
        width: 100%;
    }
}
</style>
