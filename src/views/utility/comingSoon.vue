<template>
    <div class="min-h-screen bg-white flex flex-col">
        <div ref="content" class="flex-grow flex flex-col items-center justify-center px-6 opacity-0">
            <div class="text-center mb-8">
                <h1 class="font-black text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tight">COMING SOON</h1>
            </div>

            <div class="text-center max-w-2xl">
                <h2 class="text-2xl md:text-3xl font-bold mb-4">Something exciting is on the way</h2>
                <p class="text-lg mb-8">I'm currently building something awesome. Stay tuned!</p>
            </div>

            <div>
                <router-link to="/">
                    <Button
                        class="bg-yellow-300 border border-black text-2xl px-8 py-6 hover:bg-yellow-400 transition-colors font-black">
                        BACK TO HOME
                    </Button>
                </router-link>
            </div>
        </div>

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
        duration: 2,
        ease: 'power2.out',
        from: { y: 20 }
    })
})
</script>
