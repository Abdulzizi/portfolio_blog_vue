<template>
    <header class="w-full border-b backdrop-blur-lg shadow-mdbg-gray-900">
        <div class="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
            <!-- Logo -->
            <router-link to="/" class="flex items-center gap-2">
                <MountainIcon class="h-7 w-7" />
                <span class="text-lg font-bold text-gray-900">Acme Inc</span>
            </router-link>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-6">
                <router-link v-for="link in links" :key="link.to" :to="link.to"
                    class="text-sm font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
                    active-class="font-bold text-blue-600 dark:text-blue-400">
                    {{ link.label }}
                </router-link>
            </nav>

            <!-- Mobile Menu Button -->
            <button @click="toggleMenu"
                class="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <svg v-if="!isMobileMenuOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 6l12 12M6 18L18 6" />
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-fade">
            <div v-if="isMobileMenuOpen" class="absolute inset-x-0 top-16 bg-gray-900 border-t shadow-md md:hidden">
                <div class="p-4 flex flex-col space-y-3">
                    <router-link v-for="link in links" :key="link.to" :to="link.to"
                        class="text-white hover:text-blue-600 dark:hover:text-blue-400"
                        active-class="font-bold text-blue-600 dark:text-blue-400" @click="closeMenu">
                        {{ link.label }}
                    </router-link>
                </div>
            </div>
        </transition>
    </header>
</template>

<script setup>
import { ref } from "vue";

// Navigation Links
const links = ref([
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/products", label: "Products" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
]);

// Mobile Menu State
const isMobileMenuOpen = ref(false);

const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
    isMobileMenuOpen.value = false;
};

// Dark Mode State
const isDarkMode = ref(localStorage.getItem("theme") === "dark");

const MountainIcon = {
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    `,
};
</script>

<style>
/* Smooth fade-in for mobile menu */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
