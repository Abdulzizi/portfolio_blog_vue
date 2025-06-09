<template>
    <Layout>
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-6 lg:px-0 min-h-screen flex flex-col" ref="contactSection">

            <div class="text-center mb-12 md:mb-20 pt-10 sm:pt-16" ref="headerRef">
                <h1 class="font-black text-5xl md:text-7xl lg:text-9xl leading-none mb-6">LET'S CONNECT</h1>
                <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Ready to bring your ideas to life? Choose your preferred way to reach out and let's start building
                    something amazing together.
                </p>
            </div>

            <div class="flex-grow">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" ref="cardsRef">

                    <div class="contact-card bg-white border-2 border-black p-6 hover:bg-yellow-300 transition-all duration-300 cursor-pointer group"
                        @click="openEmail">
                        <div class="flex items-center justify-between mb-4">
                            <Mail class="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <ExternalLink
                                class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">Email</h3>
                        <p class="text-gray-600 mb-3">Send me a direct message</p>
                        <p class="text-sm font-mono bg-gray-100 group-hover:bg-white px-2 py-1 rounded">
                            jawadabdul307@gmail.com
                        </p>
                    </div>

                    <div class="contact-card bg-white border-2 border-black p-6 hover:bg-blue-100 transition-all duration-300 cursor-pointer group"
                        @click="openLinkedIn">
                        <div class="flex items-center justify-between mb-4">
                            <Linkedin class="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <ExternalLink
                                class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">LinkedIn</h3>
                        <p class="text-gray-600 mb-3">Connect professionally</p>
                        <p class="text-sm font-medium text-blue-600">
                            Let's network and collaborate
                        </p>
                    </div>

                    <div class="contact-card bg-white border-2 border-black p-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
                        @click="openGitHub">
                        <div class="flex items-center justify-between mb-4">
                            <Github class="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <ExternalLink
                                class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">GitHub</h3>
                        <p class="text-gray-600 mb-3">Check out my code</p>
                        <p class="text-sm font-medium text-gray-700">
                            Explore my repositories
                        </p>
                    </div>


                    <div class="contact-card bg-white border-2 border-black p-6 hover:bg-green-100 transition-all duration-300 cursor-pointer group"
                        @click="openWhatsApp">
                        <div class="flex items-center justify-between mb-4">
                            <MessageCircle class="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <ExternalLink
                                class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">WhatsApp</h3>
                        <p class="text-gray-600 mb-3">Quick chat or call</p>
                        <p class="text-sm font-medium text-green-600">
                            Instant messaging
                        </p>
                    </div>

                    <div class="contact-card bg-white border-2 border-black p-6 hover:bg-red-50 transition-all duration-300 cursor-pointer group"
                        @click="openYoutube">
                        <div class="flex items-center justify-between mb-4">
                            <Youtube class="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <ExternalLink
                                class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">Youtube</h3>
                        <p class="text-gray-600 mb-3">Follow my youtube journey</p>
                        <p class="text-sm font-medium text-red-500">
                            @AbdulZizi
                        </p>
                    </div>


                    <div class="contact-card bg-white border-2 border-black p-6 hover:bg-pink-100 transition-all duration-300 cursor-pointer group"
                        @click="openInstagram">
                        <div class="flex items-center justify-between mb-4">
                            <Instagram class="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <ExternalLink
                                class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">Instagram</h3>
                        <p class="text-gray-600 mb-3">Behind the scenes</p>
                        <p class="text-sm font-medium text-pink-600">
                            Creative process & life
                        </p>
                    </div>

                </div>
            </div>
        </div>
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

const openEmail = () => {
    window.open('mailto:jawadabdul307@gmail.com?subject=Project Inquiry&body=Hallo Abdul,%0D%0A%0D%0AI would like to discuss a project with you.%0D%0A%0D%0ABest regards,', '_blank')
}

const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/abduljawadazizi07/', '_blank')
}

const openGitHub = () => {
    window.open('https://github.com/Abdulzizi', '_blank')
}

const openWhatsApp = () => {
    const phoneNumber = '+6282316756727'
    const message = 'Hallo bang! Gw punya ide bagus yg mungkin bisa kita kerjain bareng.'
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
}

const openYoutube = () => {
    window.open('https://www.youtube.com/@Abdul_zizi?sub_confirmation=1', '_blank')
}

const openInstagram = () => {
    window.open('https://www.instagram.com/_abdu.l1/', '_blank')
}

const animatePage = () => {
    const tl = gsap.timeline()

    tl.fromTo(headerRef.value,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )

    tl.fromTo(cardsRef.value.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        },
        "-=0.5"
    )
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
