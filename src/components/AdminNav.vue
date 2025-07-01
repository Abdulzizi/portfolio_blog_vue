<template>
    <nav class="bg-white border-b border-black">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center justify-between h-16">
                <!-- Logo & Brand -->
                <div class="flex items-center space-x-4">
                    <div>
                        <h1 class="text-lg font-bold">Portfolio Dashboard</h1>
                    </div>
                </div>

                <!-- Navigation Links -->
                <div class="hidden md:flex items-center space-x-1">
                    <router-link v-for="route in routes" :key="route.name" :to="route.path"
                        class="px-3 py-2 text-sm font-medium hover:bg-yellow-300 transition-colors duration-300"
                        :class="{ 'bg-yellow-300': $route.path === route.path }">
                        {{ route.name }}
                    </router-link>
                </div>

                <!-- User Menu -->
                <div class="flex items-center space-x-4">

                    <!-- User Dropdown -->
                    <div class="relative">
                        <button @click="showUserMenu = !showUserMenu"
                            class="flex items-center space-x-2 text-sm font-medium hover:opacity-70 transition-opacity">
                            <span>{{ user?.username || 'User' }}</span>
                            <ChevronDown class="w-4 h-4" />
                        </button>

                        <!-- Dropdown Menu -->
                        <div v-if="showUserMenu"
                            class="absolute right-0 mt-2 w-48 bg-white border border-black shadow-lg z-50">
                            <div class="py-1">
                                <router-link to="/admin/profile"
                                    class="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-300">
                                    Profile Settings
                                </router-link>
                                <router-link to="/admin/account"
                                    class="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-300">
                                    Account
                                </router-link>
                                <hr class="border-gray-200">
                                <button @click="handleLogout"
                                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-300">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button @click="showMobileMenu = !showMobileMenu"
                        class="md:hidden p-2 hover:bg-gray-100 transition-colors duration-300">
                        <Menu class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div v-if="showMobileMenu" class="md:hidden border-t border-black">
                <div class="py-2 space-y-1">

                    <router-link v-for="route in routes" :key="route.name" :to="route.path"
                        class="block px-3 py-2 text-sm font-medium hover:bg-yellow-300 transition-colors duration-300"
                        :class="{ 'bg-yellow-300': $route.path === route.path }">
                        {{ route.name }}
                    </router-link>

                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/state/pinia'
import { ChevronDown, Menu } from 'lucide-vue-next'

const user = ref<{ username: string } | null>(null)

const router = useRouter()
const authStore = useAuthStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const routes = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Users', path: '/admin/users-list' },
    { name: 'Projects', path: '/admin/projects-list' },
    { name: 'Blogs', path: '/admin/blogs' },
    { name: 'Tags', path: '/admin/tags-list' },
    { name: 'Settings', path: '/admin/settings' },
]

// Handle logout
const handleLogout = async () => {
    await authStore.logout()
    router.push('/login')
}

// Close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
        showUserMenu.value = false
    }
}

const getUserUsername = async () => {
    try {
        const userStr = localStorage.getItem('user')
        if (userStr) {
            user.value = JSON.parse(userStr)
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)

    getUserUsername();
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
