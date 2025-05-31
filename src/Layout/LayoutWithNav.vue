<template>
    <div>

        <main>
            <slot />
        </main>

        <!-- Navbar -->
        <Navbar />
    </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
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