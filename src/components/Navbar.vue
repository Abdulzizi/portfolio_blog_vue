<template>
    <nav class="w-full bg-white border-b border-2 border-black sticky bottom-0 z-50">

        <!-- Navigation Bar -->
        <div class="flex items-center h-16">
            <!-- Left Navigation Items -->
            <div class="flex flex-1 h-full">
                <router-link v-for="leftItem in leftNavItems" :key="leftItem.name" :to="leftItem.path"
                    class="flex-1 h-full flex items-center justify-center border-r border-black text-sm font-medium transition-colors duration-300"
                    :class="{
                        'bg-yellow-200': isActive(leftItem.path),
                        'hover:bg-yellow-200': !isActive(leftItem.path)
                    }">
                    {{ leftItem.name }}
                </router-link>
            </div>

            <!-- Center Logo -->
            <router-link to="/"
                class=" h-full flex items-center justify-center border-r border-black bg-yellow-300 px-8">
                <div class="p-y-8">
                    <!-- <div class="text-lg font-black italic transform -rotate-12">ABDULZIZI</div> -->

                    <img src="@/assets/images/logo-wo-bg.png" alt="Logo Abdul" class="h-14 object-contain p-0">

                </div>
            </router-link>

            <!-- Right Navigation Items -->
            <div class="flex flex-1 h-full">
                <router-link v-for="rightItem in rightNavItems" :key="rightItem.name" :to="rightItem.path"
                    class="flex-1 h-full flex items-center justify-center border-r border-black last:border-r-0 text-sm font-medium transition-colors duration-300"
                    :class="{
                        'bg-yellow-200': isActive(rightItem.path),
                        'hover:bg-yellow-200': !isActive(rightItem.path)
                    }">
                    {{ rightItem.name }}
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Navigation items
const leftNavItems = [
    { name: 'WORK', path: '/work' },
    { name: 'ABOUT', path: '/about' }
]

const rightNavItems = [
    { name: 'COMMUNITY', path: '/community' },
    { name: 'CONNECT', path: '/connect' }
]
// Check if current route is active
const isActive = (path) => {
    return route.path === path
}
</script>
