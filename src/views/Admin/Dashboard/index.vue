<template>
    <AdminLayout>
        <FullPageLoader v-if="isLoading" />

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 border border-black">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Total Projects</p>
                        <p class="text-3xl font-bold">{{ projectCount }}</p>
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
                        <p class="text-3xl font-bold">{{ publishedCount }}</p>
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
                        <p class="text-3xl font-bold">{{ draftCount }}</p>
                    </div>
                    <div class="w-12 h-12 bg-yellow-100 border border-black flex items-center justify-center">
                        <Edit class="w-6 h-6 text-yellow-600" />
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 border border-black">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Tags</p>
                        <p class="text-3xl font-bold">{{ tags.length }}</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 border border-black flex items-center justify-center">
                        <Tag class="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div v-if="projects.length === 0" class="text-center py-10 text-gray-500">
                <p>No projects yet. Let's build something!</p>
                <button @click="goToCreateProject" class="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                    + Create Your First Project
                </button>
            </div>

            <!-- Recent Projects -->
            <div v-else class="lg:col-span-2 bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold">Recent Projects</h2>
                        <!-- <button @click="goToCreateProject"
                            class="p-4 border border-black hover:bg-yellow-300 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-left flex items-center space-x-3">
                            + New Project
                        </button> -->
                    </div>
                </div>

                <div class="p-6">
                    <div class="space-y-4">
                        <!-- Project Item -->
                        <div v-for="project in projects" :key="project.id"
                            class="flex items-center justify-between p-4 border border-black rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white">
                            <div class="flex items-center space-x-3">
                                <div :class="{
                                    'bg-gradient-to-br from-blue-500 to-purple-600': project.is_published === 1,
                                    'bg-gradient-to-br from-yellow-500 to-orange-600': project.is_published === 0
                                }" class="w-10 h-10 flex items-center justify-center text-white text-xs font-bold">
                                    {{ project.title.slice(0, 1) }}
                                </div>
                                <div>
                                    <h3 class="font-medium">{{ project.title }}</h3>
                                    <p class="text-sm text-gray-600">{{ project.tech_stack }} • {{
                                        formatPeriod(project.start_date, project.end_date) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 text-xs font-medium rounded-full">
                                    {{ project.is_published === 1 ? 'Published' : 'Draft' }}
                                </span>
                                <button class="text-gray-400 hover:text-gray-600">
                                    <Edit class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 text-center">
                        <button @click="viewAllProjects"
                            class="text-sm font-medium hover:opacity-70 transition-opacity">
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
                            <button @click="goToCreateProject"
                                class="w-full p-4 border border-black hover:bg-yellow-300 transition-colors duration-300 text-left flex items-center space-x-3">
                                <Plus class="w-5 h-5" />
                                <span class="font-medium">Create New Project</span>
                            </button>

                            <button @click="goToLiveApp"
                                class="w-full p-4 border border-black hover:bg-yellow-300 transition-colors duration-300 text-left flex items-center space-x-3">
                                <ExternalLink class="w-5 h-5" />
                                <span class="font-medium">View Live Site</span>
                            </button>

                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white border border-black">
                    <div class="p-6 border-b border-black">
                        <h2 class="text-lg font-bold">Recent Activity</h2>
                    </div>

                    <div v-if="recentActivities.length === 0" class="text-sm text-gray-400 italic">
                        No recent activity.
                    </div>

                    <div v-else class="p-6">
                        <div class="space-y-4">
                            <div v-for="activity in recentActivities" :key="activity.message"
                                class="flex items-start space-x-3">
                                <div class="w-2 h-2 rounded-full mt-2" :class="activityColor(activity.type)"
                                    style="animation: pulse 1.5s infinite"></div>
                                <div>
                                    <p class="text-sm font-medium">{{ activity.message }}</p>
                                    <p class="text-xs text-gray-500">{{ activity.timestamp }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import {
    Folder,
    CheckCircle,
    Edit,
    Tag,
    Plus,
    ExternalLink
} from 'lucide-vue-next'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/Layout/AdminLayout.vue'
import FullPageLoader from '@/components/FullPageLoader.vue'
import { useTagStore, useProjectStore } from "@/state/pinia"
import { formatPeriod } from '@/helpers/formatters'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const liveAppUrl = import.meta.env.VITE_LIVE_APP_URL;

const tagStore = useTagStore()
const projectStore = useProjectStore()

const router = useRouter()

const tags = ref([])
const projects = ref([])

const isLoading = computed(() => projectStore.isLoading)
const draftCount = computed(() => projects.value.filter(project => !project.is_published).length)
const publishedCount = computed(() => projects.value.filter(project => project.is_published).length)
const projectCount = computed(() => projects.value.length)

const activityColor = (type) => {
    switch (type) {
        case 'publish':
            return 'bg-green-500'
        case 'create':
            return 'bg-blue-500'
        case 'update':
            return 'bg-yellow-500'
        default:
            return 'bg-gray-400'
    }
}

const getTags = async () => {
    try {
        await tagStore.getAllTags()

        if (tagStore.tags) {
            tags.value = tagStore.tags
        }
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
}

const getProjects = async () => {
    try {
        await projectStore.fetchAllProjects()

        if (projectStore.projects) {
            projects.value = projectStore.projects
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

const recentActivities = computed(() => {
    return projects.value
        .flatMap(project => {
            const items = []

            if (project.created_at) {
                items.push({
                    type: 'create',
                    message: `Project "${project.title}" created`,
                    // raw ISO date
                    time: project.created_at
                })
            }

            if (project.updated_at && project.updated_at !== project.created_at) {
                items.push({
                    type: 'update',
                    message: `Project "${project.title}" updated`,
                    time: project.updated_at
                })
            }

            if (project.isPublished || project.status === 'Published') {
                items.push({
                    type: 'publish',
                    message: `Project "${project.title}" published`,
                    time: project.updated_at || project.created_at
                })
            }

            return items
        })
        // 1. sort by real millis — newest first
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        // 2. 'limit
        .slice(0, 5)
        // 3. _after_ sorting/limiting, add the human‑readable string
        .map(item => ({
            ...item,
            timestamp: dayjs(item.time).fromNow()
        }))
})

const viewAllProjects = () => {
    router.push({ name: 'admin-projects' })
}

const goToLiveApp = () => {
    window.open(liveAppUrl)
}

const goToCreateProject = () => {
    router.push({ name: 'admin-projects-form' })
}

onMounted(() => {
    getTags();
    getProjects();
})

</script>
