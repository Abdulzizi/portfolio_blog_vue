<template>
    <AdminLayout>
        <FullPageLoader v-if="isLoading && isEditMode" />

        <div v-else>
            <!-- Page Header -->
            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            {{ isEditMode ? 'Edit Tag' : 'Add New Tag' }}
                        </h1>
                        <p class="text-gray-600">
                            {{ isEditMode ? 'Update tag information and settings' : 'Create a new tag' }}
                        </p>
                    </div>
                    <button @click="goBackToTags"
                        class="px-4 py-2 border border-black text-sm font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                        <ArrowLeft class="w-4 h-4" />
                        <span>Back to Tags</span>
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

            <!-- Tag Form -->
            <div class="bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <h2 class="text-lg font-bold">
                        {{ isEditMode ? 'Tag Information' : 'New Tag Details' }}
                    </h2>
                </div>

                <form @submit.prevent="handleSubmit" class="p-6">
                    <div class="grid grid-cols-1 gap-6">

                        <!-- Tag ID (Read-only, Edit Mode Only) -->
                        <div v-if="isEditMode" class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Tag ID
                            </label>
                            <input :value="tag?.id || ''" type="text" disabled
                                class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500 font-mono text-sm" />
                            <p class="text-xs text-gray-500 mt-1">Tag ID cannot be changed</p>
                        </div>

                        <!-- Tag Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Tag Name <span class="text-red-500">*</span>
                            </label>
                            <input v-model="form.name" type="text" required
                                placeholder="Enter tag name (e.g., JavaScript, Design, Frontend)"
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                :class="{ 'border-red-500': errors.name }" />
                            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
                            <p class="text-xs text-gray-500 mt-1">Use clear, descriptive names for better organization
                            </p>
                        </div>

                        <!-- Tag Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Description <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="form.description" required rows="4"
                                placeholder="Enter a detailed description of what this tag represents..."
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 resize-vertical"
                                :class="{ 'border-red-500': errors.description }"></textarea>
                            <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
                            <p class="text-xs text-gray-500 mt-1">
                                Provide a clear description to help others understand when to use this tag
                            </p>
                        </div>

                        <!-- Created/Updated Info (Edit Mode Only) -->
                        <div v-if="isEditMode && (tag?.created_at || tag?.updated_at)"
                            class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div v-if="tag?.created_at">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Created At
                                </label>
                                <input :value="formatDate(tag?.created_at)" type="text" disabled
                                    class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500" />
                            </div>

                            <div v-if="tag?.updated_at">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Last Updated
                                </label>
                                <input :value="formatDate(tag?.updated_at)" type="text" disabled
                                    class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500" />
                            </div>
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
                            <button type="button" @click="goBackToTags"
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
                                        : (isEditMode ? 'Update Tag' : 'Create Tag')
                                    }}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Tag Preview (Edit Mode Only) -->
            <div v-if="isEditMode && tag?.id" class="mt-8 bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <h2 class="text-lg font-bold">Tag Preview</h2>
                </div>
                <div class="p-6">
                    <div class="flex items-center space-x-4">
                        <!-- Tag Badge Preview -->
                        <div
                            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-300 text-black border border-black">
                            <Tag class="w-4 h-4 mr-2" />
                            {{ form.name || 'Tag Name' }}
                        </div>
                        <div class="text-gray-600">
                            {{ form.description || 'Tag description will appear here...' }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Usage Guidelines -->
            <div class="mt-8 bg-blue-50 border border-blue-200 p-6">
                <div class="flex items-start">
                    <div class="text-blue-600 mr-3 mt-1">💡</div>
                    <div>
                        <h3 class="text-blue-800 font-medium mb-2">Tag Guidelines</h3>
                        <ul class="text-blue-700 text-sm space-y-1">
                            <li>• Use clear, concise names that are easy to understand</li>
                            <li>• Avoid special characters and spaces in tag names</li>
                            <li>• Write descriptive explanations to help others use tags correctly</li>
                            <li>• Consider creating a hierarchy (e.g., "Frontend", "Backend", "Design")</li>
                            <li>• Keep descriptions informative but concise</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { onMounted, ref, computed, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagStore } from '@/state/pinia'
import { showSuccessToast, showErrorToast } from '@/helpers/alert'
import FullPageLoader from '@/components/FullPageLoader.vue'
import AdminLayout from '@/Layout/AdminLayout.vue'
import { ArrowLeft, Tag } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()

// Reactive state
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

// Form data
const form = ref({
    name: '',
    description: ''
})

// Form errors
const errors = ref({
    name: '',
    description: ''
})

// Computed properties
const isLoading = computed(() => tagStore.isLoading)
const error = computed(() => tagStore.error)
const tag = computed(() => tagStore.tag)
const isEditMode = computed(() => !!route.params.id)
const tagId = computed(() => route.params.id)

// Watch for tag data and populate form (edit mode only)
watch(tag, (newTag) => {
    if (newTag && isEditMode.value && Object.keys(newTag).length > 0) {
        form.value.name = newTag.name || ''
        form.value.description = newTag.description || ''
    }
}, { immediate: true })

// Methods
const getTag = async () => {
    if (!isEditMode.value) return

    try {
        await tagStore.getTagById(tagId.value)
    } catch (error) {
        console.error('Error fetching tag:', error)
        showErrorToast('Error', 'Failed to load tag data')
    }
}

const validateForm = () => {
    errors.value = {
        name: '',
        description: ''
    }

    let isValid = true

    // Name validation
    if (!form.value.name.trim()) {
        errors.value.name = 'Tag name is required'
        isValid = false
    } else if (form.value.name.length < 2) {
        errors.value.name = 'Tag name must be at least 2 characters'
        isValid = false
    } else if (form.value.name.length > 50) {
        errors.value.name = 'Tag name must be less than 50 characters'
        isValid = false
    } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(form.value.name)) {
        errors.value.name = 'Tag name can only contain letters, numbers, spaces, hyphens, and underscores'
        isValid = false
    }

    // Description validation
    if (!form.value.description.trim()) {
        errors.value.description = 'Description is required'
        isValid = false
    } else if (form.value.description.length < 10) {
        errors.value.description = 'Description must be at least 10 characters'
        isValid = false
    } else if (form.value.description.length > 500) {
        errors.value.description = 'Description must be less than 500 characters'
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
        if (isEditMode.value) {
            // Update existing tag
            const updateData = {
                name: form.value.name.trim(),
                description: form.value.description.trim()
            }

            const success = await tagStore.updateTag(tagId.value, updateData)

            if (success) {
                showSuccessToast('Success', 'Tag updated successfully')
                router.push('/admin/tags-list')
            } else {
                showErrorToast('Error', tagStore.error || 'Failed to update tag')
            }
        } else {
            // Create new tag
            const newTagData = {
                name: form.value.name.trim(),
                description: form.value.description.trim()
            }

            const newTag = await tagStore.addTag(newTagData)

            if (newTag) {
                showSuccessToast('Success', 'Tag created successfully')
                showSuccessMessage.value = true

                setTimeout(() => {
                    router.push('/admin/tags-list')
                }, 2000)
            } else {
                showErrorToast('Error', tagStore.error || 'Failed to create tag')
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
    if (isEditMode.value && tag.value && Object.keys(tag.value).length > 0) {
        // Reset to original tag data
        form.value.name = tag.value.name || ''
        form.value.description = tag.value.description || ''
    } else {
        // Clear form for add mode
        form.value.name = ''
        form.value.description = ''
    }

    errors.value = {
        name: '',
        description: ''
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

const goBackToTags = () => {
    router.push('/admin/tags-list')
}

onMounted(() => {
    if (isEditMode.value) {
        getTag()
    } else {
        tagStore.clearOneTag()
    }
})

onUnmounted(() => {
    tagStore.clearOneTag()
    showSuccessMessage.value = false
})
</script>
