<script setup>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center text-secondary bg-[hsl(var(--background))] border-[hsl(var(--border))] border-8px-8">
        <!-- Brutalist 404 Title -->
        <h1 class="text-[10vw] text-white uppercase border-b-8 border-secondary pb-4 tracking-wider leading-none">
            404
        </h1>

        <!-- Error Message -->
        <h2 class="text-3xl text-white md:text-4xl font-bold mt-6 text-center">
            PAGE NOT FOUND.
        </h2>
        <p class="text-2xl md:text-3xl font-mono text-center mt-4 bg-secondary text-primary p-2">
            YOU WENT TOO FAR. TURN BACK.
        </p>

        <!-- Action Button -->
        <router-link to="/">
            <Button variant="primary" size="lg" class="brutalist-button text-3xl mt-12">
                GO BACK HOME
            </Button>
        </router-link>
    </div>
</template>

<style scoped>
/* Brutalist Button */
.brutalist-button {
    display: inline-block;
    font-weight: bold;
    text-transform: uppercase;
    border: 6px solid var(--primary);
    box-shadow: 10px 10px 0 var(--secondary);
    font-family: monospace;
    transition: none;
    cursor: pointer;
}

.brutalist-button:hover {
    transform: translate(-8px, -8px);
    box-shadow: 18px 18px 0 var(--secondary);
}

.brutalist-button:active {
    transform: translate(4px, 4px);
    box-shadow: 4px 4px 0 var(--secondary);
}

/* Brutalist Text */
h1 {
    font-family: "Arial Black", sans-serif;
    text-shadow: -4px 4px 0 var(--secondary);
}

p {
    font-family: "Courier New", monospace;
}
</style>
