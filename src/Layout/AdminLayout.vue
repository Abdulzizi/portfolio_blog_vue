<template>
    <div class="min-h-screen relative">
        <div v-if="auth.isLoading" class="fixed inset-0 bg-white/80 z-[1000] flex items-center justify-center">
            <div class="flex flex-col items-center">
                <svg class="animate-spin h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span class="mt-3 text-sm font-medium text-black">Logging out...</span>
            </div>
        </div>

        <AdminNav />
        <main class="max-w-7xl mx-auto px-6 py-8">
            <slot />
        </main>
    </div>
</template>

<script setup>
import AdminNav from '@/components/AdminNav.vue'
import { useAuthStore } from '@/state/pinia'
import { useLenis } from "@/composables/useLenis"

const auth = useAuthStore()
useLenis();
</script>

<style>
/* Hide scrollbar (Chrome, Safari, Edge) */
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

html {
    scrollbar-width: none;
}

body {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>