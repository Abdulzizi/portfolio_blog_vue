<template>
    <Layout>
        <main class="mx-auto max-w-7xl px-6 py-14 sm:px-6 lg:px-0 min-h-screen flex flex-col" ref="contactSection">
            <header class="text-center mb-12 md:mb-20 pt-10 sm:pt-16" ref="headerRef">
                <h1 class="font-extrabold text-5xl md:text-7xl lg:text-9xl leading-none mb-6">
                    HIT ME UP!
                </h1>
                <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Got an idea brewing? Pick your favorite way to get in touch, and let's create something awesome.
                </p>
            </header>

            <section class="flex-grow" aria-labelledby="contact-methods-title">
                <h2 id="contact-methods-title" class="sr-only">Contact Methods</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" ref="cardsRef">
                    <article v-for="(method, i) in contactMethods" :key="i"
                        class="contact-card bg-white border-2 border-black p-6 transition-all duration-300 cursor-pointer group"
                        :class="method.color" role="link" tabindex="0" :aria-label="`Contact via ${method.label}`"
                        @click="method.action">
                        <div class="flex items-center justify-between mb-4">
                            <component :is="method.icon"
                                class="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <ExternalLink
                                class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">{{ method.label }}</h3>
                        <p class="text-gray-600 mb-3">{{ method.description }}</p>
                        <p class="text-sm font-medium px-2 py-1 rounded" :class="method.textColor">
                            {{ method.detail }}
                        </p>
                    </article>
                </div>
            </section>
        </main>
    </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLenis } from "@/composables/useLenis"
import { gsap } from 'gsap'
import Layout from "@/Layout/LayoutWithNav.vue"
import {
    Mail,
    Linkedin,
    MessageCircle,
    Instagram,
    MessageSquare,
    Github,
    Send,
    Youtube,
    ExternalLink
} from 'lucide-vue-next'

const contactSection = ref(null)
const headerRef = ref(null)
const cardsRef = ref(null)
const ctaRef = ref(null)

const contactMethods = [
    {
        label: 'Email',
        description: 'Send me a direct message',
        detail: 'jawadabdul307@gmail.com',
        icon: Mail,
        color: 'hover:bg-yellow-300',
        textColor: 'font-mono bg-gray-100 group-hover:bg-white',
        action: () => window.open('mailto:jawadabdul307@gmail.com?subject=Project Inquiry&body=Hallo Abdul,%0D%0A%0D%0AI would like to discuss a project with you.%0D%0A%0D%0ABest regards,', '_blank')
    },
    {
        label: 'LinkedIn',
        description: 'Connect professionally',
        detail: 'Let\'s network and collaborate',
        icon: Linkedin,
        color: 'hover:bg-blue-100',
        textColor: 'text-blue-600',
        action: () => window.open('https://www.linkedin.com/in/abduljawadazizi07/', '_blank')
    },
    {
        label: 'GitHub',
        description: 'Check out my code',
        detail: 'Explore my repositories',
        icon: Github,
        color: 'hover:bg-gray-100',
        textColor: 'text-gray-700',
        action: () => window.open('https://github.com/Abdulzizi', '_blank')
    },
    {
        label: 'WhatsApp',
        description: 'Quick chat or call',
        detail: 'Instant messaging',
        icon: MessageCircle,
        color: 'hover:bg-green-100',
        textColor: 'text-green-600',
        action: () => {
            const phone = '+6282316756727'
            const message = 'Hallo bang! Gw punya ide bagus yg mungkin bisa kita kerjain bareng.'
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
        }
    },
    {
        label: 'YouTube',
        description: 'Follow my YouTube journey',
        detail: '@AbdulZizi',
        icon: Youtube,
        color: 'hover:bg-red-50',
        textColor: 'text-red-500',
        action: () => window.open('https://www.youtube.com/@Abdul_zizi?sub_confirmation=1', '_blank')
    },
    {
        label: 'Instagram',
        description: 'Behind the scenes',
        detail: 'Creative process & life',
        icon: Instagram,
        color: 'hover:bg-pink-100',
        textColor: 'text-pink-600',
        action: () => window.open('https://www.instagram.com/_abdu.l1/', '_blank')
    }
]

const animatePage = () => {
    gsap.fromTo(headerRef.value, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(cardsRef.value.children, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.05 }, "-=0.2")
}

useLenis()

onMounted(() => {
    animatePage()
})
</script>

<style scoped>
.contact-card {
    transform: translateY(0);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.contact-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.contact-card:active {
    transform: translateY(-2px);
}
</style>
