<template>
    <div class="fixed inset-0 bg-white/80 backdrop-blur-sm z-[1000] flex items-center justify-center">
        <div class="flex flex-col items-center space-y-4">
            <Spinner />
        </div>
    </div>
</template>

<script setup>
import Spinner from '@/components/Spinner.vue'

defineProps({ message: { type: String, default: 'Loading...' } })
</script>
