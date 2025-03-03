<template>
    <div class="absolute left-0 w-full border-black text-xs font-black uppercase overflow-hidden"
        :class="position === 'top' ? 'top-0 border-b-2 bg-yellow-400' : 'bottom-0 border-t-2 bg-white'">
        <div class="flex whitespace-nowrap animate-scroll">
            <span v-for="n in 3" :key="n" class="px-2 tracking-widest">
                ⚡ WEB DEVELOPMENT ✖ CONTENT CREATION ✖ SOCIAL MEDIA ✖ CONTENT CREATIVE ✖ AI ⚡
            </span>
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
/* Brutalist Scrolling Text Animation */
@keyframes scroll {
    0% {
        transform: translateX(100%);
    }

    50% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.animate-scroll {
    display: inline-block;
    animation: scroll 5s linear infinite;
}

/* Brutalist Font */
body {
    font-family: "Arial Black", sans-serif;
}
</style>
