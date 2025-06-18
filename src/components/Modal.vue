<template>
    <div v-if="isModalOpen" class="fixed inset-0 bg-slate-950/50 flex justify-center items-center z-[9999]">
        <div class="bg-white rounded-xl shadow-lg p-6" :class="modalWidth">
            <div class="text-center">
                <slot name="title">Confirm Delete</slot>
                <div class="text-gray-600 text-sm mt-2">
                    <slot name="body">Are you sure you want to delete this item?</slot>
                </div>
                <div class="mt-6 flex justify-center gap-4">
                    <button @click="cancel" class="px-4 py-2 border">Cancel</button>
                    <button @click="confirm" class="px-4 py-2 bg-red-600 text-white">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue"

const isModalOpen = ref(false)
const emit = defineEmits(["close"])
let resolver: ((val: boolean) => void) | null = null

type SizeOption = "sm" | "md" | "lg" | "xl" | "full"
interface ModalProps {
    size?: SizeOption
}
const props = withDefaults(defineProps<ModalProps>(), {
    size: "md"
})

const modalWidth = computed(() => ({
    sm: "w-3/12",
    md: "w-5/12",
    lg: "w-7/12",
    xl: "w-9/12",
    full: "w-11/12"
}[props.size] || "w-5/12"))

const openModal = () => {
    isModalOpen.value = true
    return new Promise<boolean>((resolve) => {
        resolver = resolve
    })
}
const confirm = () => {
    isModalOpen.value = false
    resolver?.(true)
    emit("close")
}
const cancel = () => {
    isModalOpen.value = false
    resolver?.(false)
    emit("close")
}

defineExpose({ openModal, confirm, cancel })
</script>