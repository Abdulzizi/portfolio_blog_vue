<template>
    <AdminLayout>
        <FullPageLoader v-if="isLoading" />

        <div v-else>
            <!-- Page Header -->
            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Edit User</h1>
                        <p class="text-gray-600">Update user information and settings</p>
                    </div>
                    <button @click="goBackToUsers"
                        class="px-4 py-2 border border-black text-sm font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                        <ArrowLeft class="w-4 h-4" />
                        <span>Back to Users</span>
                    </button>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-50 border border-red-200 p-4 mb-6">
                <div class="flex items-center">
                    <div class="text-red-600 mr-3">⚠️</div>
                    <div>
                        <h3 class="text-red-800 font-medium">Error</h3>
                        <p class="text-red-700 text-sm">{{ error }}</p>
                    </div>
                </div>
            </div>

            <!-- Edit Form -->
            <div class="bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <h2 class="text-lg font-bold">User Information</h2>
                </div>

                <form @submit.prevent="handleSubmit" class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <!-- User ID (Read-only) -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                User ID
                            </label>
                            <input :value="user?.id || ''" type="text" disabled
                                class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500 font-mono text-sm" />
                            <p class="text-xs text-gray-500 mt-1">User ID cannot be changed</p>
                        </div>

                        <!-- Username -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Username <span class="text-red-500">*</span>
                            </label>
                            <input v-model="form.username" type="text" required placeholder="Enter username"
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                :class="{ 'border-red-500': errors.username }" />
                            <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span class="text-red-500">*</span>
                            </label>
                            <input v-model="form.email" type="email" required placeholder="Enter email address"
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                :class="{ 'border-red-500': errors.email }" />
                            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                        </div>

                        <!-- Password -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div class="relative">
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                    placeholder="Enter new password (leave blank to keep current)"
                                    class="w-full px-4 py-3 pr-12 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                    :class="{ 'border-red-500': errors.password }" />
                                <button type="button" @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                                    <Eye v-if="!showPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                            <p class="text-xs text-gray-500 mt-1">Leave blank to keep the current password</p>
                        </div>

                        <!-- Security Updated (Read-only) -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Security Last Updated
                            </label>
                            <input :value="formatDate(user?.updated_security)" type="text" disabled
                                class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500" />
                            <p class="text-xs text-gray-500 mt-1">Automatically updated when password is changed</p>
                        </div>

                    </div>

                    <!-- Form Actions -->
                    <div class="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                        <div class="flex items-center space-x-4">
                            <button type="button" @click="resetForm"
                                class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                                Reset Changes
                            </button>
                        </div>

                        <div class="flex items-center space-x-4">
                            <router-link to="/admin/users"
                                class="px-6 py-2 border border-black hover:bg-gray-100 transition-colors duration-300">
                                Cancel
                            </router-link>

                            <button type="submit" :disabled="isSubmitting"
                                class="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                                <div v-if="isSubmitting"
                                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                                </div>
                                <span>{{ isSubmitting ? 'Updating...' : 'Update User' }}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- User Activity (Optional) -->
            <div class="mt-8 bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <h2 class="text-lg font-bold">User Activity</h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">{{ formatDate(user?.updated_security) }}</div>
                            <div class="text-sm text-gray-600">Last Security Update</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-green-600">Active</div>
                            <div class="text-sm text-gray-600">Account Status</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-purple-600">User</div>
                            <div class="text-sm text-gray-600">Role</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { onMounted, ref, computed, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/state/pinia'
import { showSuccessToast, showErrorToast } from '@/helpers/alert'
import FullPageLoader from '@/components/FullPageLoader.vue'
import AdminLayout from '@/Layout/AdminLayout.vue'
import { ArrowLeft, Eye, EyeOff } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const userId = route.params.id

const showPassword = ref(false)
const isSubmitting = ref(false)

const form = ref({
    username: '',
    email: '',
    password: ''
})

const errors = ref({
    username: '',
    email: '',
    password: ''
})

const isLoading = computed(() => userStore.isLoading)
const error = computed(() => userStore.error)
const user = computed(() => userStore.user)

watch(user, (newUser) => {
    if (newUser) {
        form.value.username = newUser.username || ''
        form.value.email = newUser.email || ''
        form.value.password = ''
    }
}, { immediate: true })

const getUser = async () => {
    try {
        await userStore.getUserById(userId)
    } catch (error) {
        console.error('Error fetching user:', error)
        showErrorToast('Error', 'Failed to load user data')
    }
}

const validateForm = () => {
    errors.value = {
        username: '',
        email: '',
        password: ''
    }

    let isValid = true

    if (!form.value.username.trim()) {
        errors.value.username = 'Username is required'
        isValid = false
    } else if (form.value.username.length < 3) {
        errors.value.username = 'Username must be at least 3 characters'
        isValid = false
    }

    if (!form.value.email.trim()) {
        errors.value.email = 'Email is required'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Please enter a valid email address'
        isValid = false
    }

    if (form.value.password && form.value.password.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
        isValid = false
    }

    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) {
        showErrorToast('Validation Error', 'Please fix the errors below')
        return
    }

    isSubmitting.value = true

    try {
        const updateData = {
            username: form.value.username,
            email: form.value.email
        }

        if (form.value.password.trim()) {
            updateData.password = form.value.password
        }

        const success = await userStore.updateUser(userId, updateData)

        if (success) {
            showSuccessToast('Success', 'User updated successfully')
            router.push('/admin/users')
        } else {
            showErrorToast('Error', userStore.error || 'Failed to update user')
        }
    } catch (error) {
        console.error('Error updating user:', error)
        showErrorToast('Error', 'An unexpected error occurred')
    } finally {
        isSubmitting.value = false
    }
}

const resetForm = () => {
    if (user.value) {
        form.value.username = user.value.username || ''
        form.value.email = user.value.email || ''
        form.value.password = ''
    }
    errors.value = {
        username: '',
        email: '',
        password: ''
    }
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const goBackToUsers = () => {
    router.push({ name: 'admin-users' })
}

onMounted(() => {
    getUser()
})

onUnmounted(() => {
    userStore.clearOneUser()
})
</script>
