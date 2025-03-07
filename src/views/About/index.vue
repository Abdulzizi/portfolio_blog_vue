<template>
    <Layouts>
        <div
            class="w-full min-h-screen bg-background text-primary-foreground px-6 py-12 md:px-8 md:py-16 border-8 border-black flex flex-col items-center">

            <h1
                class="text-[12vw] md:text-[9vw] font-black uppercase border-b-8 border-accent pb-3 tracking-wide leading-none text-center">
                ABOUT ME
            </h1>

            <!-- Profile Picture -->
            <div class="mt-8 flex justify-center">
                <div class="p-3 md:p-4 border-8 border-accent bg-secondary inline-block">
                    <img src="@/assets/images/users/profile-me.jpg" alt="My Photo"
                        class="w-30 h-30 sm:w-48 sm:h-48 md:w-64 md:h-64 border-8 border-black">
                </div>
            </div>

            <!-- Description -->
            <p
                class="mt-8 text-2xl sm:text-3xl md:text-4xl font-mono font-bold leading-tight tracking-wide text-center max-w-4xl px-4">
                I BUILD <span class="bg-accent text-accent-foreground px-2">WEBSITES</span> THAT HIT HARD. <br>
                I CREATE CONTENT THAT <span class="underline text-ring">STANDS OUT.</span> <br>
                PLAN? CODE? ALL OF IT. <br>
                <span class="bg-primary text-primary-foreground px-4 py-1 inline-block">I BREAK THE RULES.</span>
            </p>

            <!-- Brutalist Social Media Links -->
            <div class="mt-8 flex flex-wrap justify-center gap-6">
                <a href="https://github.com/Abdulzizi" target="_blank" class="social-link bg-accent border-black">
                    <img src="@/assets/images/icons/github.svg" alt="GitHub" class="w-12 h-12">
                </a>
                <a href="https://www.instagram.com/_abdu.l1/" target="_blank"
                    class="social-link bg-accent border-black">
                    <img src="@/assets/images/icons/instagram.svg" alt="Instagram" class="w-12 h-12">
                </a>
                <a href="https://youtube.com/@ss_abdul?si=3ypjRR7LLN3Fc-Ig" target="_blank"
                    class="social-link bg-accent border-black">
                    <img src="@/assets/images/icons/youtube.svg" alt="YouTube" class="w-12 h-12">
                </a>
            </div>

            <!-- Buttons -->
            <div class="mt-12 flex flex-col sm:flex-row items-center gap-6">
                <button class="brutalist-button text-xl sm:text-2xl md:text-3xl w-full sm:w-auto" @click="handleClick">
                    Go Back
                </button>
                <button class="brutalist-button-accent text-xl sm:text-2xl md:text-3xl w-full sm:w-auto">
                    Contact Me
                </button>
            </div>
        </div>
    </Layouts>
</template>

<script setup lang="ts">
import Layouts from '@/layouts/Layouts.vue';

const handleClick = () => {
    window.location.href = '/';
};
</script>

<style scoped>
/* Brutalist Social Media Icons */
.social-link {
    display: inline-block;
    border: 6px solid black;
    padding: 12px;
    transition: transform 0.1s ease-in-out;
}

.social-link:hover {
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--accent);
}

/* Brutalist Buttons */
.brutalist-button {
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
    border: 4px solid black;
    padding: 16px 32px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: monospace;
    cursor: pointer;
    text-align: center;
    transition: transform 0.1s ease-in-out;
}

.brutalist-button:hover {
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 black;
}

.brutalist-button-accent {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border: 4px solid black;
    padding: 16px 32px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: monospace;
    cursor: pointer;
    text-align: center;
    transition: transform 0.1s ease-in-out;
}

.brutalist-button-accent:hover {
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--ring);
}

/* Brutalist Title */
h1 {
    font-family: "Arial Black", sans-serif;
    text-shadow: -4px 4px 0 var(--accent);
}

/* Brutalist Text Enhancements */
p {
    font-family: "Courier New", monospace;
}
</style>
