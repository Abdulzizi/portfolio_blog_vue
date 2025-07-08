<template>
    <div class="min-h-screen bg-white flex flex-col">
        <div ref="content" class="flex-grow flex flex-col items-center justify-center px-6 opacity-0">
            <div class="text-center mb-8">
                <h1 class="font-black text-8xl md:text-9xl lg:text-[12rem] leading-none">404</h1>
            </div>

            <div class="text-center max-w-2xl">
                <h2 class="text-2xl md:text-3xl font-bold mb-4">PAGE NOT FOUND</h2>
                <p class="text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
            </div>

            <div>
                <Button @click="redirectToPreviousPage"
                    class="bg-yellow-300 border border-black text-3xl px-8 py-8 font-black hover:bg-yellow-400 transition-colors">
                    BACK TO HOME
                </Button>
            </div>
        </div>

        <div class="border-t border-black h-px"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from 'vue-router'

import gsap from "gsap"

import Button from "@/components/ui/button/Button.vue"

const router = useRouter()

const content = ref(null)

const redirectToPreviousPage = () => {
    const lastPath = localStorage.getItem('lastVisitedRoute') || '/dashboard';
    router.push(lastPath);

    localStorage.removeItem('lastVisitedRoute');
}

onMounted(() => {
    gsap.to(content.value, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power2.out',
        from: { y: 20 }
    });
})

</script>