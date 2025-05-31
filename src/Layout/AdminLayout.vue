<template>
    <div class="min-h-screen">
        <AdminNav />
        <main class="max-w-7xl mx-auto px-6 py-8">
            <slot />
        </main>
    </div>
</template>

<script setup>
import AdminNav from '@/components/AdminNav.vue'
import { useLenis } from "@/composables/useLenis";

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