<template>
    <nav class="w-full bg-white border-b border-2 border-black fixed bottom-0 z-50" role="navigation"
        aria-label="Main navigation">
        <div class="hidden md:flex items-center h-16">
            <ul class="flex flex-1 h-full">
                <li v-for="leftItem in leftNavItems" :key="leftItem.name" class="flex-1">
                    <router-link :to="leftItem.path"
                        class="flex h-full items-center justify-center border-r border-black text-sm font-medium transition-colors duration-300 w-full"
                        :class="{
                            'bg-yellow-200': isActive(leftItem.path),
                            'hover:bg-yellow-200': !isActive(leftItem.path)
                        }" :aria-current="isActive(leftItem.path) ? 'page' : null">
                        {{ leftItem.name }}
                    </router-link>
                </li>
            </ul>

            <!-- Logo Center -->
            <router-link to="/"
                class="h-full flex items-center justify-center border-r border-black bg-yellow-300 px-8">
                <div class="py-2">
                    <img src="@/assets/images/logo-wo-bg.png" alt="Abdulzizi Logo" class="h-12 object-contain" />
                </div>
            </router-link>

            <ul class="flex flex-1 h-full">
                <li v-for="rightItem in rightNavItems" :key="rightItem.name" class="flex-1">
                    <router-link :to="rightItem.path"
                        class="flex h-full items-center justify-center border-r border-black text-sm font-medium transition-colors duration-300 w-full"
                        :class="{
                            'bg-yellow-200': isActive(rightItem.path),
                            'hover:bg-yellow-200': !isActive(rightItem.path)
                        }" :aria-current="isActive(rightItem.path) ? 'page' : null">
                        {{ rightItem.name }}
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="md:hidden flex items-center justify-between h-16 px-4">
            <router-link to="/" class="flex items-center" aria-label="Home">
                <div class="border border-black p-2 relative">
                    <div class="text-lg font-black italic transform -rotate-12">ABDULZIZI</div>
                    <span class="absolute top-0 right-0 text-xs">×</span>
                    <span class="absolute bottom-0 left-0 text-xs">×</span>
                </div>
            </router-link>

            <button @click="toggleMobileMenu"
                class="flex flex-col justify-center items-center w-10 h-10 border border-black bg-white hover:bg-yellow-200 transition-colors duration-300"
                :class="{ 'bg-yellow-200': isMobileMenuOpen }" aria-label="Toggle mobile menu"
                :aria-expanded="isMobileMenuOpen.toString()" aria-controls="mobile-menu">
                <span class="block w-6 h-0.5 bg-black transition-all duration-300"
                    :class="{ 'rotate-45 translate-y-1.5': isMobileMenuOpen }"></span>
                <span class="block w-6 h-0.5 bg-black mt-1 transition-all duration-300"
                    :class="{ 'opacity-0': isMobileMenuOpen }"></span>
                <span class="block w-6 h-0.5 bg-black mt-1 transition-all duration-300"
                    :class="{ '-rotate-45 -translate-y-1.5': isMobileMenuOpen }"></span>
            </button>
        </div>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="transform translate-y-full opacity-0" enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform translate-y-full opacity-0">
            <div v-if="isMobileMenuOpen" id="mobile-menu"
                class="md:hidden absolute bottom-16 left-0 right-0 bg-white border-t border-black z-50">
                <ul class="flex flex-col">
                    <li v-for="item in allNavItems" :key="item.name">
                        <router-link :to="item.path" @click="closeMobileMenu"
                            class="flex items-center justify-center h-14 border-b border-black text-lg font-medium transition-colors duration-300"
                            :class="{
                                'bg-yellow-200': isActive(item.path),
                                'hover:bg-yellow-200': !isActive(item.path)
                            }" :aria-current="isActive(item.path) ? 'page' : null">
                            {{ item.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </Transition>

        <!-- Mobile Menu Overlay -->
        <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isMobileMenuOpen" class="md:hidden fixed inset-0 bg-black bg-opacity-30 z-40"
                @click="closeMobileMenu" aria-hidden="true"></div>
        </Transition>
    </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const leftNavItems = [
    { name: 'WORK', path: '/work' },
    { name: 'ABOUT', path: '/about' }
]

const rightNavItems = [
    { name: 'BLOG', path: '/blog' },
    { name: 'CONNECT', path: '/connect' }
]

const allNavItems = computed(() => [...leftNavItems, ...rightNavItems])

const isActive = (path) => route.path === path

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

watch(() => route.path, () => {
    closeMobileMenu()
})
</script>
