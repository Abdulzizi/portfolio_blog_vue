<template>
    <AdminLayout>
        <Modal ref="modalRef">
            <template #title>Delete Tag</template>
            <template #body>Are you sure you want to delete this tag? This action cannot be undone.</template>
        </Modal>

        <FullPageLoader v-if="isLoading" />

        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Tags Management</h1>
                    <p class="text-gray-600">Manage tags to connect all the projects</p>
                </div>
                <button @click="goToAddTag"
                    class="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2">
                    <UserPlus class="w-4 h-4" />
                    <span>Add New Tag</span>
                </button>
            </div>
        </div>

        <div v-if="tags.length > 0" class="bg-white border border-black overflow-hidden">
            <div class="p-6 border-b border-black">
                <h2 class="text-lg font-bold">Tags Table</h2>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-black">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                ID</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Name</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Slug</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="tag in tags" :key="tag.id" class="hover:bg-gray-50 transition-colors duration-200">
                            <td
                                class="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900 border-r border-gray-200">
                                #{{ tag.id }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                {{ tag.name }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                {{ tag.slug }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex items-center space-x-2">
                                    <button @click="goToEditTag(tag.id)"
                                        class="text-blue-600 hover:text-blue-900 transition-colors">
                                        <Edit class="w-4 h-4" />
                                    </button>
                                    <button @click="deleteTag(tag.id)"
                                        class="text-red-600 hover:text-red-900 transition-colors">
                                        <Trash2 class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="px-6 py-3 border-t border-black bg-gray-50">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-700">
                        Showing {{ tags.length }} of {{ tags.length }} tags
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
            <p class="text-lg">No tags found.</p>
            <p class="text-sm mt-2">Try adding new tags to get started.</p>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/Layout/AdminLayout.vue'
import FullPageLoader from '@/components/FullPageLoader.vue'
import Modal from '@/components/Modal.vue'
import { Edit, Trash2, UserPlus } from 'lucide-vue-next'
import { useTagStore } from '@/state/pinia'
import { showSuccessToast } from '@/helpers/alert'

const modalRef = ref()
const router = useRouter()
const tagStore = useTagStore()

const tags = computed(() => tagStore.tags)
const isLoading = computed(() => tagStore.isLoading)

const fetchTags = async () => {
    try {
        await tagStore.getAllTags()
    } catch (error) {
        console.error('Error fetching tags:', error)
    }
}

const deleteTag = async (tagId) => {
    const confirmed = await modalRef.value.openModal()
    if (!confirmed) return

    const success = await tagStore.deleteTag(tagId)
    if (success) showSuccessToast('Tag deleted successfully')
}

const goToEditTag = (tagId) => {
    router.push({ name: 'admin-tags-form', params: { id: tagId } })
}

const goToAddTag = () => {
    router.push({ name: 'admin-tags-form' })
}

onMounted(() => {
    fetchTags()
})
</script>
