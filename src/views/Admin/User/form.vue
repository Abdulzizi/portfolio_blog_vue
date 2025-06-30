<template>
    <AdminLayout>
        <FullPageLoader v-if="isLoading && isEditMode" />

        <div v-else>
            <!-- Page Header -->
            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            {{ isEditMode ? 'Edit User' : 'Add New User' }}
                        </h1>
                        <p class="text-gray-600">
                            {{ isEditMode ? 'Update user information and settings' : 'Create a new user account' }}
                        </p>
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

            <!-- User Form -->
            <div class="bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <h2 class="text-lg font-bold">
                        {{ isEditMode ? 'User Information' : 'New User Details' }}
                    </h2>
                </div>

                <form @submit.prevent="handleSubmit" class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <!-- User ID (Read-only, Edit Mode Only) -->
                        <div v-if="isEditMode" class="md:col-span-2">
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
                                Password <span v-if="!isEditMode" class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                    :required="!isEditMode"
                                    :placeholder="isEditMode ? 'Enter new password (leave blank to keep current)' : 'Enter password'"
                                    class="w-full px-4 py-3 pr-12 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                    :class="{ 'border-red-500': errors.password }" />
                                <button type="button" @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                                    <Eye v-if="!showPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                            <p class="text-xs text-gray-500 mt-1">
                                {{ isEditMode ? 'Leave blank to keep the current password.' : 'Minimum 6 characters' }}
                            </p>
                        </div>

                        <!-- Security Updated (Read-only, Edit Mode Only) -->
                        <div v-if="isEditMode && user?.updated_security" class="md:col-span-2">
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
                                {{ isEditMode ? 'Reset Changes' : 'Clear Form' }}
                            </button>
                        </div>

                        <div class="flex items-center space-x-4">
                            <button type="button" @click="goBackToUsers"
                                class="px-6 py-2 border border-black hover:bg-gray-100 transition-colors duration-300">
                                Cancel
                            </button>

                            <button type="submit" :disabled="isSubmitting"
                                class="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                                <div v-if="isSubmitting"
                                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                                </div>
                                <span>
                                    {{ isSubmitting
                                        ? (isEditMode ? 'Updating...' : 'Creating...')
                                        : (isEditMode ? 'Update User' : 'Create User')
                                    }}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- User Activity (Edit Mode Only) -->
            <div v-if="isEditMode && user?.id" class="mt-8 bg-white border border-black">
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

            <!-- Success Message for Add Mode -->
            <!-- <div v-if="!isEditMode && showSuccessMessage" class="mt-8 bg-green-50 border border-green-200 p-4">
                <div class="flex items-center">
                    <div class="text-green-600 mr-3">✅</div>
                    <div>
                        <h3 class="text-green-800 font-medium">User Created Successfully!</h3>
                        <p class="text-green-700 text-sm">The new user account has been created and is ready to use.</p>
                    </div>
                </div>
            </div> -->
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

const showPassword = ref(false)
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

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
const isEditMode = computed(() => !!route.params.id)
const userId = computed(() => route.params.id)

watch(user, (newUser) => {
    if (newUser && isEditMode.value && Object.keys(newUser).length > 0) {
        form.value.username = newUser.username || ''
        form.value.email = newUser.email || ''
        form.value.password = ''
    }
}, { immediate: true })

const getUser = async () => {
    if (!isEditMode.value) return

    try {
        await userStore.getUserById(userId.value)
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

    // Username validation
    if (!form.value.username.trim()) {
        errors.value.username = 'Username is required'
        isValid = false
    } else if (form.value.username.length < 3) {
        errors.value.username = 'Username must be at least 3 characters'
        isValid = false
    }

    // Email validation
    if (!form.value.email.trim()) {
        errors.value.email = 'Email is required'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Please enter a valid email address'
        isValid = false
    }

    // Password validation
    if (!isEditMode.value) {
        // Add mode: password is required
        if (!form.value.password.trim()) {
            errors.value.password = 'Password is required'
            isValid = false
        } else if (form.value.password.length < 6) {
            errors.value.password = 'Password must be at least 6 characters'
            isValid = false
        }
    } else {
        // Edit mode: password is optional, but if provided must be valid
        if (form.value.password && form.value.password.length < 6) {
            errors.value.password = 'Password must be at least 6 characters'
            isValid = false
        }
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
        if (isEditMode.value) {
            // Update existing user
            const updateData = {
                username: form.value.username,
                email: form.value.email
            }

            if (form.value.password.trim()) {
                updateData.password = form.value.password
            }

            const success = await userStore.updateUser(userId.value, updateData)

            if (success) {
                showSuccessToast('Success', 'User updated successfully')
                router.push('/admin/users-list')
            } else {
                showErrorToast('Error', userStore.error || 'Failed to update user')
            }
        } else {
            // Create new user
            const newUserData = {
                username: form.value.username,
                email: form.value.email,
                password: form.value.password
            }

            const newUser = await userStore.addUser(newUserData)

            if (newUser) {
                showSuccessToast('Success', 'User created successfully')
                showSuccessMessage.value = true

                setTimeout(() => {
                    router.push('/admin/users-list')
                }, 2000)
            } else {
                showErrorToast('Error', userStore.error || 'Failed to create user')
            }
        }
    } catch (error) {
        console.error('Error submitting form:', error)
        showErrorToast('Error', 'An unexpected error occurred')
    } finally {
        isSubmitting.value = false
    }
}

const resetForm = () => {
    if (isEditMode.value && user.value && Object.keys(user.value).length > 0) {
        form.value.username = user.value.username || ''
        form.value.email = user.value.email || ''
        form.value.password = ''
    } else {
        form.value.username = ''
        form.value.email = ''
        form.value.password = ''
    }

    errors.value = {
        username: '',
        email: '',
        password: ''
    }

    showSuccessMessage.value = false
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
    router.push('/admin/users-list')
}

onMounted(() => {
    if (isEditMode.value) {
        getUser()
    } else {
        userStore.clearOneUser()
    }
})

onUnmounted(() => {
    userStore.clearOneUser()
    showSuccessMessage.value = false
})
</script>
