<template>
    <AdminLayout>
        <FullPageLoader v-if="isLoading && isEditMode" />

        <div v-else>
            <!-- Page Header -->
            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            {{ isEditMode ? 'Edit Project' : 'Add New Project' }}
                        </h1>
                        <p class="text-gray-600">
                            {{ isEditMode ? 'Update project information and settings' : 'Create a new project for' }}
                        </p>
                    </div>
                    <button @click="goBackToProjects"
                        class="px-4 py-2 border border-black text-sm font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                        <ArrowLeft class="w-4 h-4" />
                        <span>Back to Projects</span>
                    </button>
                </div>
            </div>

            <!-- Project Form -->
            <div class="bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <h2 class="text-lg font-bold">
                        {{ isEditMode ? 'Project Information' : 'New Project Details' }}
                    </h2>
                </div>

                <form @submit.prevent="handleSubmit" class="p-6">
                    <div class="grid grid-cols-1 gap-6">

                        <!-- Project ID (Read-only, Edit Mode Only) -->
                        <div v-if="isEditMode" class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Project ID
                            </label>
                            <input :value="project?.id || ''" type="text" disabled
                                class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500 font-mono text-sm" />
                            <p class="text-xs text-gray-500 mt-1">Project ID cannot be changed</p>
                        </div>

                        <!-- Project Title -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Project Title <span class="text-red-500">*</span>
                            </label>
                            <input v-model="form.title" type="text" required
                                placeholder="Enter project title (e.g., E-commerce Platform, Mobile App)"
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                :class="{ 'border-red-500': errors.title }" @input="generateSlug" />
                            <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
                            <p class="text-xs text-gray-500 mt-1">Use a clear, descriptive title for your project</p>
                        </div>

                        <!-- Project Slug -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Project Slug <span class="text-red-500">*</span>
                            </label>
                            <input v-model="form.slug" disabled type="text" required placeholder="project-slug"
                                class="w-full px-4 py-3 border text-gray-500 border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 font-mono text-sm"
                                :class="{ 'border-red-500': errors.slug }" />
                            <p v-if="errors.slug" class="text-red-500 text-sm mt-1">{{ errors.slug }}</p>
                            <p class="text-xs text-gray-500 mt-1">URL-friendly version of the title (auto-generated)</p>
                        </div>

                        <!-- Project Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Description <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="form.description" required rows="4"
                                placeholder="Enter a detailed description of your project, its goals, and key features..."
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 resize-vertical"
                                :class="{ 'border-red-500': errors.description }"></textarea>
                            <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
                            <p class="text-xs text-gray-500 mt-1">
                                Provide a comprehensive description of the project, its purpose, and outcomes
                            </p>
                        </div>

                        <!-- Project Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Project Link <span class="text-red-500">*</span>
                            </label>
                            <input v-model="form.link" type="url" required
                                placeholder="https://github.com/username/project or https://project-demo.com"
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                :class="{ 'border-red-500': errors.link }" />
                            <p v-if="errors.link" class="text-red-500 text-sm mt-1">{{ errors.link }}</p>
                            <p class="text-xs text-gray-500 mt-1">GitHub repository, live demo, or project website URL
                            </p>
                        </div>

                        <!-- Tech Stack -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Tech Stack <span class="text-red-500">*</span> ({{ form.tech_stack.length }}/{{ MAX_TECH
                                }})
                            </label>
                            <div class="space-y-3">
                                <!-- Tech Stack Input -->
                                <div class="flex items-center space-x-2">
                                    <input v-model="newTech" type="text"
                                        placeholder="Enter technology (e.g., React, Node.js, MongoDB)"
                                        class="flex-1 px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                        @keydown.enter.prevent="addTech" />
                                    <button type="button" @click="addTech"
                                        class="px-4 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300">
                                        Add
                                    </button>
                                </div>

                                <!-- Tech Stack Tags -->
                                <div v-if="form.tech_stack.length > 0" class="flex flex-wrap gap-2">
                                    <span v-for="(tech, index) in form.tech_stack" :key="index"
                                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-300 text-black border border-black">
                                        {{ tech }}
                                        <button type="button" @click="removeTech(index)"
                                            class="ml-2 text-black hover:text-red-600 transition-colors">
                                            ×
                                        </button>
                                    </span>
                                </div>

                                <!-- Common Tech Stack Suggestions -->
                                <div v-if="form.tech_stack.length < 4" class="flex flex-wrap gap-2">
                                    <span class="text-xs text-gray-500 mr-2">Quick add:</span>
                                    <button v-for="suggestion in techSuggestions" :key="suggestion" type="button"
                                        @click="addSuggestedTech(suggestion)"
                                        class="px-2 py-1 text-xs border border-gray-300 hover:bg-gray-100 transition-colors duration-300">
                                        {{ suggestion }}
                                    </button>
                                </div>
                            </div>
                            <p v-if="errors.tech_stack" class="text-red-500 text-sm mt-1">{{ errors.tech_stack }}</p>
                            <p class="text-xs text-gray-500 mt-1">Add technologies, frameworks, and tools used in this
                                project</p>
                        </div>

                        <!-- Project Dates -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Start Date -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date <span class="text-red-500">*</span>
                                </label>
                                <input v-model="form.start_date" type="date" required
                                    class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                                    :class="{ 'border-red-500': errors.start_date }" />
                                <p v-if="errors.start_date" class="text-red-500 text-sm mt-1">{{ errors.start_date }}
                                </p>
                            </div>

                            <!-- End Date -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    End Date <span v-if="!stillWorking" class="text-red-500">*</span>
                                </label>
                                <input v-model="form.end_date" type="date" :required="!stillWorking"
                                    :disabled="stillWorking"
                                    class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-500"
                                    :class="{ 'border-red-500': errors.end_date }" />
                                <p v-if="errors.end_date" class="text-red-500 text-sm mt-1">{{ errors.end_date }}</p>

                                <!-- Still Working Checkbox -->
                                <div class="mt-2">
                                    <label class="flex items-center">
                                        <input v-model="stillWorking" type="checkbox"
                                            class="w-4 h-4 border border-black focus:ring-yellow-300"
                                            @change="handleStillWorkingChange" />
                                        <span class="ml-2 text-sm text-gray-700">I'm still working on this
                                            project</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Publication Status -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Publication Status <span class="text-red-500">*</span>
                            </label>
                            <div class="flex items-center space-x-6">
                                <label class="flex items-center">
                                    <input v-model="form.is_published" type="radio" :value="true"
                                        class="w-4 h-4 border border-black focus:ring-yellow-300" />
                                    <span class="ml-2 text-sm font-medium text-gray-700">Published</span>
                                    <span class="ml-1 text-xs text-gray-500">(visible to public)</span>
                                </label>
                                <label class="flex items-center">
                                    <input v-model="form.is_published" type="radio" :value="false"
                                        class="w-4 h-4 border border-black focus:ring-yellow-300" />
                                    <span class="ml-2 text-sm font-medium text-gray-700">Draft</span>
                                    <span class="ml-1 text-xs text-gray-500">(hidden from public)</span>
                                </label>
                            </div>
                            <p v-if="errors.is_published" class="text-red-500 text-sm mt-1">{{ errors.is_published }}
                            </p>
                        </div>

                        <!-- Created/Updated Info (Edit Mode Only) -->
                        <div v-if="isEditMode && (project?.created_at || project?.updated_at)"
                            class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div v-if="project?.created_at">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Created At
                                </label>
                                <input :value="formatDate(project?.created_at)" type="text" disabled
                                    class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500" />
                            </div>
                            <div v-if="project?.updated_at">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Last Updated
                                </label>
                                <input :value="formatDate(project?.updated_at)" type="text" disabled
                                    class="w-full px-4 py-3 border border-gray-300 bg-gray-50 text-gray-500" />
                            </div>
                        </div>

                        <!-- Thumbnail Upload (Optional) -->
                        <div>
                            <label class=" text-sm font-medium text-gray-700 mb-2">
                                Project Thumbnail <span class="text-gray-500">(Optional)</span>
                            </label>
                            <div
                                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                <input ref="thumbnailInput" type="file" accept="image/*" class="hidden"
                                    @change="handleThumbnailUpload" />
                                <div v-if="!form.thumbnail" class="space-y-2">
                                    <Upload class="w-8 h-8 text-gray-400 mx-auto" />
                                    <div class="text-sm text-gray-600">
                                        <button type="button" @click="$refs.thumbnailInput.click()"
                                            class="text-black hover:underline">
                                            Click to upload
                                        </button>
                                        or drag and drop
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <div v-else class="space-y-2">
                                    <img :src="thumbnailPreview" alt="Thumbnail preview"
                                        class="w-32 h-32 object-cover mx-auto rounded border border-black" />
                                    <div class="flex items-center justify-center space-x-2">
                                        <button type="button" @click="$refs.thumbnailInput.click()"
                                            class="text-sm text-black hover:underline">
                                            Change
                                        </button>
                                        <button type="button" @click="removeThumbnail"
                                            class="text-sm text-red-600 hover:underline">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project Images (Optional) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Project Images <span class="text-gray-500">(Optional)</span>
                            </label>
                            <div
                                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                <input ref="imagesInput" type="file" accept="image/*" multiple class="hidden"
                                    @change="handleImagesUpload" />
                                <div v-if="form.images.length === 0" class="space-y-2">
                                    <Images class="w-8 h-8 text-gray-400 mx-auto" />
                                    <div class="text-sm text-gray-600">
                                        <button type="button" @click="$refs.imagesInput.click()"
                                            class="text-black hover:underline">
                                            Click to upload images
                                        </button>
                                        or drag and drop
                                    </div>
                                    <p class="text-xs text-gray-500">Multiple PNG, JPG, GIF files up to 10MB each</p>
                                </div>
                                <div v-else class="space-y-4">
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div v-for="(image, index) in imagesPreviews" :key="index"
                                            class="relative group">
                                            <img :src="image" alt="Project image"
                                                class="w-full h-24 object-cover rounded border border-black" />
                                            <button type="button" @click="removeImage(index)"
                                                class="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full text-xs hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100">
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                    <button type="button" @click="$refs.imagesInput.click()"
                                        class="text-sm text-black hover:underline">
                                        Add more images
                                    </button>
                                </div>
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
                            <button type="button" @click="goBackToProjects"
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
                                        : (isEditMode ? 'Update Project' : 'Create Project')
                                    }}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Project Preview -->
            <div v-if="form.title || form.description" class="mt-8 bg-white border border-black">
                <div class="p-6 border-b border-black">
                    <h2 class="text-lg font-bold">Project Preview</h2>
                </div>
                <div class="p-6">
                    <div class="border border-gray-200 rounded-lg p-6">
                        <!-- Project Header -->
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                                    {{ form.title || 'Project Title' }}
                                </h3>
                                <p class="text-gray-600 mb-4">
                                    {{ form.description || 'Project description will appear here...' }}
                                </p>
                            </div>
                            <div class="ml-4">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    :class="{
                                        'bg-green-100 text-green-800': form.is_published,
                                        'bg-yellow-100 text-yellow-800': !form.is_published
                                    }">
                                    {{ form.is_published ? 'Published' : 'Draft' }}
                                </span>
                            </div>
                        </div>

                        <!-- Project Details -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">Project Timeline</h4>
                                <p class="text-sm text-gray-600">
                                    {{ form.start_date ? formatDate(form.start_date) : 'Start date' }} -
                                    {{ stillWorking ? 'Present' : formatDate(form.end_date || 'End date') }}
                                </p>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">Project Link</h4>
                                <a :href="form.link" target="_blank" class="text-sm text-blue-600 hover:underline">
                                    {{ form.link || 'Project link will appear here' }}
                                </a>
                            </div>
                        </div>

                        <!-- Tech Stack -->
                        <div v-if="form.tech_stack.length > 0" class="mb-6">
                            <h4 class="font-medium text-gray-900 mb-2">Tech Stack</h4>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tech in form.tech_stack" :key="tech"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <!-- Thumbnail Preview -->
                        <div v-if="form.thumbnail" class="mb-6">
                            <h4 class="font-medium text-gray-900 mb-2">Thumbnail</h4>
                            <img :src="thumbnailPreview" alt="Project thumbnail"
                                class="w-48 h-32 object-cover rounded border border-gray-200" />
                        </div>

                        <!-- Images Preview -->
                        <div v-if="form.images.length > 0">
                            <h4 class="font-medium text-gray-900 mb-2">Project Images</h4>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <img v-for="(image, index) in imagesPreviews" :key="index" :src="image"
                                    alt="Project image"
                                    class="w-full h-24 object-cover rounded border border-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project Guidelines -->
            <div class="mt-8 bg-blue-50 border border-blue-200 p-6">
                <div class="flex items-start">
                    <div class="text-blue-600 mr-3 mt-1">💡</div>
                    <div>
                        <h3 class="text-blue-800 font-medium mb-2">Project Guidelines</h3>
                        <ul class="text-blue-700 text-sm space-y-1">
                            <li>• Use clear, descriptive titles that explain what the project does</li>
                            <li>• Include comprehensive descriptions with project goals and outcomes</li>
                            <li>• Add relevant technologies and frameworks used in the tech stack</li>
                            <li>• Provide working links to live demos or GitHub repositories</li>
                            <li>• Upload high-quality images that showcase your project effectively</li>
                            <li>• Set accurate start and end dates for project timeline</li>
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
import { useProjectStore } from '@/state/pinia'
import { showSuccessToast, showErrorToast } from '@/helpers/alert'
import FullPageLoader from '@/components/FullPageLoader.vue'
import AdminLayout from '@/Layout/AdminLayout.vue'
import { ArrowLeft, Upload, Images } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const stillWorking = ref(false)
const newTech = ref('')
const thumbnailPreview = ref('')
const imagesPreviews = ref([])

// Tech stack suggestions
const techSuggestions = ref([
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
    'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL', 'MySQL',
    'Tailwind CSS', 'Bootstrap', 'SASS', 'Docker', 'AWS', 'Firebase'
])

// Form data
const form = ref({
    title: '',
    description: '',
    link: '',
    slug: '',
    tech_stack: [],
    start_date: '',
    end_date: '',
    is_published: false,
    thumbnail: null,
    images: []
})

// Form errors
const errors = ref({
    title: '',
    description: '',
    link: '',
    slug: '',
    tech_stack: '',
    start_date: '',
    end_date: '',
    is_published: ''
})

const isLoading = computed(() => projectStore.isLoading)
const error = computed(() => projectStore.error)
const project = computed(() => projectStore.project)
const isEditMode = computed(() => !!route.params.id)
const projectId = computed(() => route.params.id)

const MAX_TECH = 4
const MIN_TECH = 1

// Watch for project data and populate form (edit mode only)
watch(project, (newProject) => {
    if (newProject && isEditMode.value && Object.keys(newProject).length > 0) {
        form.value.title = newProject.title || ''
        form.value.description = newProject.description || ''
        form.value.link = newProject.link || ''
        form.value.slug = newProject.slug || ''
        form.value.tech_stack = JSON.parse(newProject.tech_stack || '[]')
        form.value.start_date = newProject.start_date || ''
        form.value.end_date = newProject.end_date || ''
        form.value.is_published = Boolean(newProject.is_published)
        form.value.thumbnail = newProject.thumbnail || null
        form.value.images = newProject.images || []

        // Set still working if end date is empty
        stillWorking.value = !newProject.end_date

        // Set preview images
        if (newProject.thumbnail) {
            thumbnailPreview.value = newProject.thumbnail
        }
        if (newProject.images && newProject.images.length > 0) {
            imagesPreviews.value = [...newProject.images]
        }
    }
}, { immediate: true })

const getProject = async () => {
    if (!isEditMode.value) return

    try {
        await projectStore.fetchProductById(projectId.value)
    } catch (error) {
        console.error('Error fetching project:', error)
        showErrorToast('Error', 'Failed to load project data')
    }
}

const generateSlug = () => {
    if (!isEditMode.value && form.value.title) {
        form.value.slug = form.value.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }
}

const addTech = () => {
    const trimmed = newTech.value.trim();

    if (trimmed && !form.value.tech_stack.includes(trimmed) && form.value.tech_stack.length < MAX_TECH) {
        form.value.tech_stack.push(trimmed)
        newTech.value = ''
    } else {
        showErrorToast('Error', 'Tech stack limit reached')
    }
}

const addSuggestedTech = (tech) => {
    if (
        !form.value.tech_stack.includes(tech) &&
        form.value.tech_stack.length < MAX_TECH
    ) {
        form.value.tech_stack.push(tech)
    } else {
        showErrorToast('Error', 'Tech stack limit reached')
    }
}

const removeTech = (index) => {
    if (form.value.tech_stack.length > MIN_TECH && index >= 0 && index < form.value.tech_stack.length) {
        form.value.tech_stack.splice(index, 1)
    } else {
        showErrorToast('Error', 'Tech stack Minimal 1 Item')
    }
}

const handleStillWorkingChange = () => {
    if (stillWorking.value) {
        form.value.end_date = ''
    }
}

const handleThumbnailUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.value.thumbnail = file
        const reader = new FileReader()
        reader.onload = (e) => {
            thumbnailPreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const removeThumbnail = () => {
    form.value.thumbnail = null
    thumbnailPreview.value = ''
}

const handleImagesUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach(file => {
        form.value.images.push(file)
        const reader = new FileReader()
        reader.onload = (e) => {
            imagesPreviews.value.push(e.target.result)
        }
        reader.readAsDataURL(file)
    })
}

const removeImage = (index) => {
    form.value.images.splice(index, 1)
    imagesPreviews.value.splice(index, 1)
}

const validateForm = () => {
    errors.value = {
        title: '',
        description: '',
        link: '',
        slug: '',
        tech_stack: '',
        start_date: '',
        end_date: '',
        is_published: ''
    }

    let isValid = true

    // Title validation
    if (!form.value.title.trim()) {
        errors.value.title = 'Project title is required'
        isValid = false
    } else if (form.value.title.length < 3) {
        errors.value.title = 'Project title must be at least 3 characters'
        isValid = false
    }

    // Description validation
    if (!form.value.description.trim()) {
        errors.value.description = 'Description is required'
        isValid = false
    } else if (form.value.description.length < 20) {
        errors.value.description = 'Description must be at least 20 characters'
        isValid = false
    }

    // Link validation
    if (!form.value.link.trim()) {
        errors.value.link = 'Project link is required'
        isValid = false
    } else if (!/^https?:\/\/.+/.test(form.value.link)) {
        errors.value.link = 'Please enter a valid URL starting with http:// or https://'
        isValid = false
    }

    // Slug validation
    if (!form.value.slug.trim()) {
        errors.value.slug = 'Project slug is required'
        isValid = false
    } else if (!/^[a-z0-9-]+$/.test(form.value.slug)) {
        errors.value.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
        isValid = false
    }

    // Tech stack validation
    if (form.value.tech_stack.length === 0) {
        errors.value.tech_stack = 'At least one technology is required'
        isValid = false
    }

    // Start date validation
    if (!form.value.start_date) {
        errors.value.start_date = 'Start date is required'
        isValid = false
    }

    // End date validation
    if (!stillWorking.value && !form.value.end_date) {
        errors.value.end_date = 'End date is required (or check "still working")'
        isValid = false
    }

    // Date logic validation
    if (form.value.start_date && form.value.end_date) {
        if (new Date(form.value.start_date) > new Date(form.value.end_date)) {
            errors.value.end_date = 'End date must be after start date'
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
        const projectData = {
            title: form.value.title.trim(),
            description: form.value.description.trim(),
            link: form.value.link.trim(),
            slug: form.value.slug.trim(),
            // tech_stack: JSON.stringify(form.value.tech_stack),
            tech_stack: form.value.tech_stack,
            start_date: form.value.start_date,
            end_date: stillWorking.value ? null : form.value.end_date,
            is_published: form.value.is_published ? 1 : 0,
            thumbnail: form.value.thumbnail,
            images: form.value.images
        }

        if (isEditMode.value) {
            // console.log(JSON.stringify(projectData));

            const success = await projectStore.updateProject(projectId.value, projectData)
            if (success) {
                showSuccessToast('Success', 'Project updated successfully')
                router.push({ name: 'admin-projects' })
            } else {
                showErrorToast('Error', projectStore.error || 'Failed to update project')
            }
        } else {
            const newProject = await projectStore.addProject(projectData)
            if (newProject) {
                showSuccessToast('Success', 'Project created successfully')
                showSuccessMessage.value = true
                setTimeout(() => {
                    router.push({ name: 'admin-projects' })
                }, 2000)
            } else {
                showErrorToast('Error', projectStore.error || 'Failed to create project')
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
    if (isEditMode.value && project.value && Object.keys(project.value).length > 0) {
        // Reset to original project data
        form.value.title = project.value.title || ''
        form.value.description = project.value.description || ''
        form.value.link = project.value.link || ''
        form.value.slug = project.value.slug || ''
        form.value.tech_stack = JSON.parse(project.value.tech_stack || '[]')
        form.value.start_date = project.value.start_date || ''
        form.value.end_date = project.value.end_date || ''
        form.value.is_published = Boolean(project.value.is_published)
        form.value.thumbnail = project.value.thumbnail || null
        form.value.images = project.value.images || []
        stillWorking.value = !project.value.end_date
    } else {
        form.value.title = ''
        form.value.description = ''
        form.value.link = ''
        form.value.slug = ''
        form.value.tech_stack = []
        form.value.start_date = ''
        form.value.end_date = ''
        form.value.is_published = false
        form.value.thumbnail = null
        form.value.images = []
        stillWorking.value = false
        thumbnailPreview.value = ''
        imagesPreviews.value = []
    }

    errors.value = {
        title: '',
        description: '',
        link: '',
        slug: '',
        tech_stack: '',
        start_date: '',
        end_date: '',
        is_published: ''
    }

    showSuccessMessage.value = false
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const goBackToProjects = () => {
    router.push({ name: 'admin-projects' })
}

const isEditModeValue = ref(false)
const projectIdValue = ref(null)

onMounted(() => {
    isEditModeValue.value = !!route.params.id
    projectIdValue.value = route.params.id

    if (isEditModeValue.value) {
        getProject()
    } else {
        projectStore.clearOneProject()
    }
})

onUnmounted(() => {
    projectStore.clearOneProject()
    showSuccessMessage.value = false
})
</script>
