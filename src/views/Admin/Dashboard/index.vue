<template>
    <AdminLayout>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 border border-black">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Total Projects</p>
                        <p class="text-3xl font-bold">12</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 border border-black flex items-center justify-center">
                        <Folder class="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 border border-black">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Published</p>
                        <p class="text-3xl font-bold">8</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 border border-black flex items-center justify-center">
                        <CheckCircle class="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 border border-black">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Draft</p>
                        <p class="text-3xl font-bold">4</p>
                    </div>
                    <div class="w-12 h-12 bg-yellow-100 border border-black flex items-center justify-center">
                        <Edit class="w-6 h-6 text-yellow-600" />
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 border border-black">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Categories</p>
                        <p class="text-3xl font-bold">5</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 border border-black flex items-center justify-center">
                        <Tag class="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Recent Projects -->
            <div class="lg:col-span-2 bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold">Recent Projects</h2>
                        <button
                            class="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
                            + New Project
                        </button>
                    </div>
                </div>

                <div class="p-6">
                    <div class="space-y-4">
                        <!-- Project Item -->
                        <div
                            class="flex items-center justify-between p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                    W
                                </div>
                                <div>
                                    <h3 class="font-medium">E-Commerce Platform</h3>
                                    <p class="text-sm text-gray-600">WEB DESIGN • 2024</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800">Published</span>
                                <button class="text-gray-400 hover:text-gray-600">
                                    <Edit class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div
                            class="flex items-center justify-between p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-yellow-300 flex items-center justify-center text-black text-xs font-bold">
                                    B
                                </div>
                                <div>
                                    <h3 class="font-medium">Tech Startup Branding</h3>
                                    <p class="text-sm text-gray-600">BRANDING • 2024</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800">Published</span>
                                <button class="text-gray-400 hover:text-gray-600">
                                    <Edit class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div
                            class="flex items-center justify-between p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-black flex items-center justify-center text-white text-xs font-bold">
                                    M
                                </div>
                                <div>
                                    <h3 class="font-medium">Fitness Tracker App</h3>
                                    <p class="text-sm text-gray-600">MOBILE APP • 2023</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">Draft</span>
                                <button class="text-gray-400 hover:text-gray-600">
                                    <Edit class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div
                            class="flex items-center justify-between p-4 border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-green-400 flex items-center justify-center text-black text-xs font-bold">
                                    V
                                </div>
                                <div>
                                    <h3 class="font-medium">Brand Campaign Video</h3>
                                    <p class="text-sm text-gray-600">VIDEO • 2024</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800">Published</span>
                                <button class="text-gray-400 hover:text-gray-600">
                                    <Edit class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 text-center">
                        <button class="text-sm font-medium hover:opacity-70 transition-opacity">
                            View All Projects →
                        </button>
                    </div>
                </div>
            </div>

            <!-- Quick Actions & Info -->
            <div class="space-y-8">
                <!-- Quick Actions -->
                <div class="bg-white border border-black">
                    <div class="p-6 border-b border-black">
                        <h2 class="text-lg font-bold">Quick Actions</h2>
                    </div>

                    <div class="p-6">
                        <div class="space-y-3">
                            <button
                                class="w-full p-4 border border-black hover:bg-yellow-300 transition-colors duration-300 text-left flex items-center space-x-3">
                                <Plus class="w-5 h-5" />
                                <span class="font-medium">Create New Project</span>
                            </button>

                            <button
                                class="w-full p-4 border border-black hover:bg-yellow-300 transition-colors duration-300 text-left flex items-center space-x-3">
                                <Upload class="w-5 h-5" />
                                <span class="font-medium">Upload Images</span>
                            </button>

                            <button
                                class="w-full p-4 border border-black hover:bg-yellow-300 transition-colors duration-300 text-left flex items-center space-x-3">
                                <Settings class="w-5 h-5" />
                                <span class="font-medium">Site Settings</span>
                            </button>

                            <a href="/" target="_blank"
                                class="w-full p-4 border border-black hover:bg-yellow-300 transition-colors duration-300 text-left flex items-center space-x-3">
                                <ExternalLink class="w-5 h-5" />
                                <span class="font-medium">View Live Site</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white border border-black">
                    <div class="p-6 border-b border-black">
                        <h2 class="text-lg font-bold">Recent Activity</h2>
                    </div>

                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-start space-x-3">
                                <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <div>
                                    <p class="text-sm font-medium">Project "E-Commerce Platform" published</p>
                                    <p class="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-3">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div>
                                    <p class="text-sm font-medium">New project "Portfolio Website" created</p>
                                    <p class="text-xs text-gray-500">1 day ago</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-3">
                                <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                <div>
                                    <p class="text-sm font-medium">Project "Fitness App" updated</p>
                                    <p class="text-xs text-gray-500">3 days ago</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-3">
                                <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                    <p class="text-sm font-medium">Site settings updated</p>
                                    <p class="text-xs text-gray-500">1 week ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/state/pinia'
import {
    Folder,
    CheckCircle,
    Edit,
    Tag,
    Plus,
    Upload,
    Settings,
    ExternalLink
} from 'lucide-vue-next'

import AdminLayout from '@/Layout/AdminLayout.vue'

// const router = useRouter()
// const authStore = useAuthStore()

// Handle logout
// const handleLogout = async () => {
//     await authStore.logout()
//     router.push('/login')
// }
</script>
