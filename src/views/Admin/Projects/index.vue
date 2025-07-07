<template>
    <AdminLayout>
        <Modal ref="modalRef">
            <template #title>Delete Project</template>
            <template #body>Are you sure you want to delete this project? This action cannot be undone.</template>
        </Modal>

        <FullPageLoader v-if="isLoading" />

        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Projects Management</h1>
                    <p class="text-gray-600">Manage projects to showcase your portfolio</p>
                </div>
                <button @click="goToAddProject"
                    class="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2">
                    <FolderPlus class="w-4 h-4" />
                    <span>Add New Project</span>
                </button>
            </div>
        </div>

        <div v-if="filteredProjects.length > 0" class="bg-white border border-black overflow-hidden">
            <div class="p-6 border-b border-black">
                <h2 class="text-lg font-bold">Projects Table</h2>
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
                                Title
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Category
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Status
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Year
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="project in filteredProjects" :key="project.id"
                            class="hover:bg-gray-50 transition-colors duration-200">
                            <td
                                class="px-6 py-4 whitespace-nowrap font-bold text-sm text-gray-900 border-r border-gray-200">
                                #{{ project.id }}
                            </td>
                            <td class="px-6 py-4 border-r border-gray-200">
                                <div class="flex items-center">
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 flex items-center">
                                            {{ project.title }}
                                        </div>
                                        <div class="text-sm text-gray-500">{{ project.slug }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                <span
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {{ project.tech_stack }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    :class="{
                                        'bg-green-100 text-green-800': project.is_published === 1,
                                        'bg-yellow-100 text-yellow-800': project.is_published === 0
                                    }">
                                    {{ project.is_published === 1 ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                                {{ formatPeriod(project.start_date, project.end_date) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex items-center space-x-2">
                                    <button @click="goToEditProject(project.id)"
                                        class="text-blue-600 hover:text-blue-900 transition-colors">
                                        <Edit class="w-4 h-4" />
                                    </button>
                                    <button @click="deleteProject(project.id)"
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
                        Showing {{ filteredProjects.length }} of {{ totalProjects }} projects
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

        <div v-else class="flex flex-col items-center justify-center py-20 text-gray-500">
            <Folder class="w-16 h-16 text-gray-400 mb-4" />
            <p class="text-lg">No projects found.</p>
            <p class="text-sm mt-2">
                {{
                    statusFilter || categoryFilter
                        ? `Try adjusting filters`
                        : `Add your first project to get started`
                }}
            </p>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/Layout/AdminLayout.vue'
import FullPageLoader from '@/components/FullPageLoader.vue'
import Modal from '@/components/Modal.vue'
import { Edit, Trash2, FolderPlus, Folder, CheckCircle, Star, Search } from 'lucide-vue-next'
import { useProjectStore } from '@/state/pinia'
import { showSuccessToast } from '@/helpers/alert'
import { formatPeriod } from '@/helpers/formatters'

const modalRef = ref()
const router = useRouter()
const projectStore = useProjectStore()

const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')

const projects = computed(() => projectStore.projects)
const totalProjects = computed(() => projectStore.totalProjects)
const publishedProjects = computed(() => projectStore.publishedProjects)
const draftProjects = computed(() => projectStore.draftProjects)
const featuredProjects = computed(() => projectStore.featuredProjects)
const isLoading = computed(() => projectStore.isLoading)

// Filtered projects
const filteredProjects = computed(() => {
    let filtered = projects.value

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(project =>
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.slug.toLowerCase().includes(query) ||
            (project.client && project.client.toLowerCase().includes(query))
        )
    }

    if (statusFilter.value) {
        filtered = filtered.filter(project => project.status === statusFilter.value)
    }

    if (categoryFilter.value) {
        filtered = filtered.filter(project => project.category === categoryFilter.value)
    }

    return filtered
})

const fetchProjects = async () => {
    try {
        await projectStore.fetchAllProjects()
    } catch (error) {
        console.error('Error fetching projects:', error)
    }
}

const deleteProject = async (projectId) => {
    const confirmed = await modalRef.value.openModal()
    if (!confirmed) return

    try {
        await projectStore.deleteProject(projectId)
        showSuccessToast('Project deleted successfully')
    } catch (error) {
        showErrorToast('Error', error.message || 'Failed to delete project')
        console.error('Error deleting project:', error);
    }
}

const goToEditProject = (projectId) => {
    router.push({ name: 'admin-projects-form', params: { id: projectId } })
}

const goToAddProject = () => {
    router.push({ name: 'admin-projects-form' })
}

onMounted(() => {
    fetchProjects()
})
</script>
