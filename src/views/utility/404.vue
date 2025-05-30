<template>
    <div class="min-h-screen bg-white flex flex-col">
        <!-- Main Content -->
        <div ref="content" class="flex-grow flex flex-col items-center justify-center px-6 opacity-0">
            <!-- Large 404 -->
            <div class="text-center mb-8">
                <h1 class="font-black text-8xl md:text-9xl lg:text-[12rem] leading-none">404</h1>
            </div>

            <!-- Error Message -->
            <div class="text-center max-w-2xl">
                <h2 class="text-2xl md:text-3xl font-bold mb-4">PAGE NOT FOUND</h2>
                <p class="text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
            </div>

            <!-- Yellow Box with Home Link -->
            <div>
                <router-link to="/">
                    <Button
                        class="bg-yellow-300 border border-black text-3xl p-10 hover:bg-yellow-400 transition-colors font-black">
                        HOME
                    </Button>
                </router-link>
            </div>
        </div>

        <!-- Bottom Border -->
        <div class="border-t border-black h-px"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

import gsap from "gsap"

import Button from "@/components/ui/button/Button.vue"

const content = ref(null)

onMounted(() => {
    gsap.to(content.value, {
        opacity: 1,
        y: 0,
        duration: 4,
        ease: 'power2.out',
        from: { y: 20 }
    })
})

</script>