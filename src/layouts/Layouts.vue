<template>
    <div :class="layoutBgClass" class="min-h-screen flex flex-col pb-0 sm:pb-20 transition-colors duration-200">

        <!-- Burger Menu (Mobile) -->
        <button @click="toggleMenu" class="fixed top-4 right-4 z-50 sm:hidden bg-black text-white p-3 rounded-md">
            <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>

        <slot />

        <!-- Mobile Fullscreen Menu -->
        <div v-if="menuOpen"
            class="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white space-y-6 z-40 sm:hidden">
            <router-link to="/work" @click="toggleMenu" class="text-2xl font-bold">WORK</router-link>
            <router-link to="/about" @click="toggleMenu" class="text-2xl font-bold">ABOUT</router-link>
            <router-link to="/" @click="toggleMenu">
                <img src="@/assets/images/logo.svg" alt="Logo" class="h-16 grayscale invert" />
            </router-link>
            <router-link to="/blog" @click="toggleMenu" class="text-2xl font-bold">BLOG</router-link>
            <router-link to="/connect" @click="toggleMenu" class="text-2xl font-bold">CONNECT</router-link>
        </div>

        <!-- Bottom Navbar (Desktop only) -->
        <nav
            class="fixed bottom-0 left-0 w-full border-t-4 border-black bg-white grid-cols-5 text-black text-xs sm:text-base hidden sm:grid">
            <router-link to="/work" class="block w-full">
                <button :class="getButtonClass('/work')">WORK</button>
            </router-link>
            <router-link to="/about" class="block w-full">
                <button :class="getButtonClass('/about')">ABOUT</button>
            </router-link>

            <!-- Central Logo -->
            <div class="py-4 sm:py-6 flex items-center justify-center border-r-4 border-black w-full h-full bg-black">
                <router-link to="/" class="w-full flex items-center justify-center">
                    <img src="@/assets/images/logo.svg" alt="Logo" class="h-10 sm:h-12 grayscale invert" />
                </router-link>
            </div>

            <router-link to="/blog" class="block w-full">
                <button :class="getButtonClass('/blog')">BLOG</button>
            </router-link>
            <router-link to="/connect" class="block w-full">
                <button :class="getButtonClass('/connect')">CONNECT</button>
            </router-link>
        </nav>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

// Function to get button class based on active route
const getButtonClass = (path) => {
    return route.path === path
        ? 'py-4 sm:py-6 text-sm sm:text-xl font-black border-r-4 border-black w-full h-full uppercase bg-primary'
        : 'py-4 sm:py-6 text-sm sm:text-xl font-black border-r-4 border-black w-full h-full uppercase bg-white hover:bg-accent hover:text-white transition duration-100';
};
</script>

<style scoped>
/* Extra brutalist tweaks */
button {
    font-family: "Arial Black", sans-serif;
    letter-spacing: 1px;
}

/* Mobile Adjustments */
@media (max-width: 640px) {
    button {
        font-size: 12px;
        padding: 12px 8px;
    }

    .py-6 {
        padding-top: 12px;
        padding-bottom: 12px;
    }

    .h-12 {
        height: 32px;
    }
}
</style>
