<template>
    <div class="bg-white border-b border-black overflow-hidden whitespace-nowrap">
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
</script>

<style scoped>
/* Scrolling text animation */
@keyframes marquee {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-marquee {
    animation: marquee 20s linear infinite;
}
</style>
