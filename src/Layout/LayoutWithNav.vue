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
