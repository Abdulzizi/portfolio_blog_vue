<template>
    <section
        class="relative min-h-screen flex flex-col justify-between bg-white text-black px-6 md:px-20 pt-10 overflow-x-hidden">
        <!-- Hero Text -->
        <div class="mt-16 md:mt-32">
            <h1 class="text-6xl md:text-8xl font-bold leading-tight uppercase">
                Where code meets art.<br />
                Where creativity meets logic.<br />
                Code is my craft.
            </h1>
        </div>

        <!-- Bottom Navigation -->
        <nav class="fixed bottom-0 left-0 w-full border-t border-black bg-white grid grid-cols-5">
            <button
                class="py-4 text-lg font-bold border-r border-black bg-green-400 w-full hover:bg-green-200 transition-colors duration-200">
                WORK
            </button>
            <button
                class="py-4 text-lg font-bold border-r border-black w-full hover:bg-green-200 transition-colors duration-200">
                ABOUT
            </button>
            <div
                class="py-4 flex justify-center border-r border-black w-full hover:bg-green-200 transition-colors duration-200">
                <img src="@/assets/images/logo.svg" alt="Logo" class="h-10" />
            </div>
            <button
                class="py-4 text-lg font-bold border-r border-black w-full hover:bg-green-200 transition-colors duration-200">
                COMMUNITY
            </button>
            <button class="py-4 text-lg font-bold w-full hover:bg-green-200 transition-colors duration-200">
                CONNECT
            </button>
        </nav>

    </section>
</template>

<script setup>
import { ref } from "vue";

const workProjects = [
    { title: "Project Alpha", description: "A cutting-edge digital experience." },
    { title: "Project Beta", description: "Blending technology with creativity." },
    { title: "Project Gamma", description: "Redefining the future of design." },
    { title: "Project Delta", description: "An immersive storytelling platform." },
];
</script>
