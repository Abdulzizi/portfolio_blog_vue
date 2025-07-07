<template>
    <div :class="['bg-white overflow-hidden whitespace-nowrap block', borderClass]">
        <div class="animate-marquee inline-block">
            <span class="inline-block py-2 px-4">CALL ME ABDULZIZI — I'M A PROGRAMMER, CONTENT CREATOR THAT LOVES
                LEARNING.</span>
            <span class="inline-block py-2 px-4">CALL ME ABDULZIZI — I'M A PROGRAMMER, CONTENT CREATOR THAT LOVES
                LEARNING.</span>
            <span class="inline-block py-2 px-4">CALL ME ABDULZIZI — I'M A PROGRAMMER, CONTENT CREATOR THAT LOVES
                LEARNING.</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    position: {
        type: String,
        default: 'bottom',
        validator: value => ['top', 'bottom'].includes(value)
    }
});

const borderClass = computed(() => {
    return `border-black ${props.position === 'top' ? 'border-b' : 'border-t'}`;
});
</script>

<style scoped>
@keyframes marquee {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-marquee {
    animation: marquee 15s linear infinite;
}
</style>
