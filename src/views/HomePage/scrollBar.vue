<template>
    <div class="absolute left-0 w-full border-black bg-white text-xs overflow-hidden"
        :class="position === 'top' ? 'top-0 border-b' : 'bottom-0 border-t'">
        <div class="flex whitespace-nowrap animate-scroll px-4">
            <span class="px-4">WEB DEVELOPMENT ✖ CONTENT CREATION ✖ SOCIAL MEDIA ✖ CONTENT CREATIVE ✖ AI</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    position: {
        type: String,
        default: "bottom" // Default to bottom
    }
});
</script>

<style scoped>
/* Scrolling text animation */
@keyframes scroll {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(-100%);
    }
}

.animate-scroll {
    display: inline-block;
    animation: scroll 10s linear infinite;
}
</style>
