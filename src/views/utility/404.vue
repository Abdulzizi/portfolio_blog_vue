<script setup>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-yellow-400 text-black border-8 border-black px-8">
        <!-- Brutalist 404 Title -->
        <h1 class="text-[10vw] font-black uppercase border-b-8 border-black pb-4 tracking-wider leading-none">
            404
        </h1>

        <!-- Error Message -->
        <h2 class="text-3xl md:text-4xl font-bold mt-6 text-center">
            PAGE NOT FOUND.
        </h2>
        <p class="text-2xl md:text-3xl font-mono text-center mt-4 bg-black text-yellow-400 p-2">
            YOU WENT TOO FAR. TURN BACK.
        </p>

        <!-- Action Button -->
        <router-link to="/">
            <Button variant="primary" size="lg" class="brutalist-button text-3xl mt-12">
                GO BACK HOME
            </Button>
        </router-link>

        <!-- Error Image -->
        <div class="mt-12 p-4 border-8 border-black bg-white">
            <img src="@/assets/images/error-img.png" alt="Error Image" class="w-80 border-8 border-black">
        </div>
    </div>
</template>

<style scoped>
/* Brutalist Button */
.brutalist-button {
    display: inline-block;
    background: black;
    color: yellow;
    font-weight: bold;
    text-transform: uppercase;
    border: 6px solid yellow;
    box-shadow: 10px 10px 0 black;
    font-family: monospace;
    transition: none;
    cursor: pointer;
}

.brutalist-button:hover {
    transform: translate(-8px, -8px);
    box-shadow: 18px 18px 0 black;
}

.brutalist-button:active {
    transform: translate(4px, 4px);
    box-shadow: 4px 4px 0 black;
}

/* Brutalist Text */
h1 {
    font-family: "Arial Black", sans-serif;
    text-shadow: -4px 4px 0 black;
}

p {
    font-family: "Courier New", monospace;
}
</style>
