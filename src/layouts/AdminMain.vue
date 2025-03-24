<script setup>
import { computed } from "vue";
import AdminNavbar from "@/components/AdminNavbar.vue";

const props = defineProps({
    fixed: Boolean,
    title: {
        type: String,
        default: "Dashboard" // Default title if none is provided
    }
});

const mainClass = computed(() => [
    "peer-[.header-fixed]/header:mt-16",
    "px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12",
    props.fixed && "fixed-main flex flex-grow flex-col overflow-hidden"
]);
</script>

<template>
    <div class="min-h-screen bg-gray-800 text-white flex flex-col">
        <AdminNavbar />
        <main :class="mainClass">
            <!-- Use the title prop properly -->
            <h1 class="text-3xl font-bold mb-4 font-sans">{{ title }}</h1>
            <slot />
        </main>
    </div>
</template>
