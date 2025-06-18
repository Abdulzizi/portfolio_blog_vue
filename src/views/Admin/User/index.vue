<template>
    <AdminLayout>
        <Modal ref="modalRef">
            <template #title>Delete User</template>
            <template #body>Are you sure you want to delete this user? This action cannot be undone.</template>
        </Modal>

        <FullPageLoader v-if="isLoading" />

        <!-- Page Header -->
        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Users Management</h1>
                    <p class="text-gray-600">Manage user accounts and permissions</p>
                </div>
                <button
                    class="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2">
                    <UserPlus class="w-4 h-4" />
                    <span>Add New User</span>
                </button>
            </div>
        </div>

        <!-- Users Table -->
        <div v-if="users?.length > 0" class="bg-white border border-black overflow-hidden">
            <!-- Table Header -->
            <div class="p-6 border-b border-black">
                <h2 class="text-lg font-bold">Users Table</h2>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-black">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                ID
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Username
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Email
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.id"
                            class="hover:bg-gray-50 transition-colors duration-200">
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                #{{ user.id }}
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                                <div class="flex items-center">
                                    <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                        <User class="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                                        <div class="text-sm text-gray-500">{{ user.firstName }} {{ user.lastName }}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                {{ user.email }}
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex items-center space-x-2">
                                    <button @click="goToEditUser(user.id)"
                                        class="text-blue-600 hover:text-blue-900 transition-colors">
                                        <Edit class="w-4 h-4" />
                                    </button>
                                    <button @click="deleteUser(user.id)"
                                        class="text-red-600 hover:text-red-900 transition-colors">
                                        <Trash2 class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Table Footer -->
            <div class="px-6 py-3 border-t border-black bg-gray-50">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-700">
                        Showing {{ users.length }} of {{ users.length }} users
                    </div>
                    <div class="flex items-center space-x-2">
                        <button
                            class="px-3 py-1 border border-black text-sm hover:bg-yellow-300 transition-colors duration-300">
                            Previous
                        </button>
                        <span class="px-3 py-1 bg-yellow-300 border border-black text-sm font-medium">1</span>
                        <button
                            class="px-3 py-1 border border-black text-sm hover:bg-yellow-300 transition-colors duration-300">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center py-20 text-gray-500">
            <p class="text-lg">No users found.</p>
            <p class="text-sm mt-2">Try adding new users to get started.</p>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/Layout/AdminLayout.vue'
import {
    Users,
    UserPlus,
    UserCheck,
    Shield,
    TrendingUp,
    Search,
    User,
    Eye,
    EyeOff,
    Edit,
    Trash2,
    MoreHorizontal
} from 'lucide-vue-next'
import FullPageLoader from '@/components/FullPageLoader.vue'
import { showSuccessToast, showErrorToast } from '@/helpers/alert'

import { useUserStore } from "@/state/pinia"
import Modal from '@/components/Modal.vue'

const modalRef = ref()
const router = useRouter()

const userStore = useUserStore()

let users = computed(() => userStore.users)
const isLoading = computed(() => userStore.isLoading)
const error = computed(() => userStore.error)

const togglePassword = (userId) => {
    showPasswords.value[userId] = !showPasswords.value[userId]
}

const fetchUsers = async () => {
    try {
        await userStore.getAllUsers();
    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

const deleteUser = async (userId) => {
    const confirmed = await modalRef.value.openModal()

    if (!confirmed) return

    showSuccessToast("User deleted successfully")
}

const goToEditUser = async (userId) => {
    router.push({ name: 'admin-users-edit', params: { id: userId } })
}

onMounted(() => {
    fetchUsers()
})
</script>