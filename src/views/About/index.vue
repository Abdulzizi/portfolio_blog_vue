<template>
    <Layout>
        <div class="mx-auto max-w-7xl px-6 py-8 sm:px-6 lg:px-0 min-h-screen flex flex-col" ref="slideInSection">

            <div class="text-center mb-12 md:mb-20 pt-10 sm:pt-16">
                <h1 class="font-black text-5xl md:text-7xl lg:text-9xl leading-none">THIS IS WHO I AM</h1>
            </div>

            <!-- Photo Section -->
            <div class="mb-12 md:mb-16 border border-black overflow-hidden">
                <div class="aspect-[16/9] md:aspect-[21/9] bg-gray-100 relative">
                    <!-- Replace with your actual photo -->
                    <!-- <div class="absolute inset-0 bg-yellow-300 flex items-center justify-center">
                        <span class="text-2xl font-bold opacity-30">YOUR PHOTO</span>
                    </div> -->
                    <img src="/images/my-photo.svg" alt="Abdulzizi"
                        class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300">
                </div>
            </div>

            <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div class="flex flex-col">
                    <!-- About Section -->
                    <div class="mb-8 pb-8">
                        <h2 class="text-xl font-bold mb-4">ABOUT ME</h2>
                        <p class="text-base sm:text-lg leading-relaxed">
                            I'm a purpose-driven developer who thrives on turning ideas into impactful digital
                            experiences.
                            I approach every project with a balance of creativity, precision, and a focus on real-world
                            value.
                        </p>
                        <p class="text-base sm:text-lg leading-relaxed mt-4">
                            With a strong foundation across the stack, I bring flexibility, curiosity, and a deep
                            commitment
                            to learning and collaboration. I’m always looking to push boundaries and build things that
                            matter.
                        </p>
                    </div>
                </div>

                <div class="flex flex-col">
                    <!-- Philosophy Section -->
                    <div class="mb-8 pb-8">
                        <h2 class="text-xl font-bold mb-4">MY PHILOSOPHY</h2>
                        <p class="text-base sm:text-lg leading-relaxed">
                            I believe—every color, line, and interaction has a purpose. My work leans into
                            bold aesthetics, built on a foundation of clean, modular code.
                            Every detail matters, and I’m always looking for ways to improve.
                        </p>
                        <p class="text-base sm:text-lg leading-relaxed mt-4">
                            Whether it's a UI component or a full-stack app, I focus on clarity, performance, and
                            impact.
                            Good design shouldn't just look cool—it should function and serve a purpose.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { useLenis } from "@/composables/useLenis";
import gsap from "gsap";

import { ref, onMounted } from "vue";

import Layout from "@/Layout/LayoutWithNav.vue";

const slideInSection = ref(null)

const animatePage = () => {
    gsap.fromTo(
        slideInSection.value,
        {
            opacity: 0,
            y: 100,
        },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power4.out",
        }
    );
};

onMounted(() => {
    animatePage();
})

useLenis();
</script>
