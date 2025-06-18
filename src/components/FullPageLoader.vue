<template>
    <div class="fixed inset-0 bg-white/80 backdrop-blur-sm z-[1000] flex items-center justify-center">
        <div class="flex flex-col items-center space-y-4">
            <div class="relative w-12 h-12">
                <div class="absolute inset-0 rounded-full border-4 border-t-transparent border-black animate-spin">
                </div>
                <div class="absolute inset-2 bg-black rounded-full animate-ping"></div>
            </div>
            <span class="text-sm font-semibold text-black animate-pulse">{{ message }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({ message: { type: String, default: 'Loading...' } })
</script>
