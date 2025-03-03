<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-yellow-400 text-black border-8 border-black px-6 md:px-8 py-12">
        <!-- Title -->
        <h1
            class="text-[15vw] sm:text-[12vw] md:text-[10vw] font-black uppercase border-b-8 border-black pb-2 md:pb-4 tracking-wide leading-none skew-x-[-5deg] text-center w-full glitch">
            COMING SOON.
        </h1>

        <!-- Subtext -->
        <p
            class="text-xl sm:text-2xl md:text-3xl font-mono text-center mt-4 sm:mt-6 bg-black text-yellow-400 px-4 py-2 inline-block rotate-[-2deg]">
            SOMETHING BIG IS DROPPING.
        </p>

        <!-- Countdown Timer -->
        <div v-if="countdown"
            class="mt-8 sm:mt-10 flex gap-4 text-black text-3xl md:text-5xl font-bold font-mono border-8 border-black px-6 py-4 bg-white rotate-[2deg] shadow-xl">
            <div>{{ countdown.days }}<span class="text-sm block font-normal">DAYS</span></div>
            <div>:</div>
            <div>{{ countdown.hours }}<span class="text-sm block font-normal">HOURS</span></div>
            <div>:</div>
            <div>{{ countdown.minutes }}<span class="text-sm block font-normal">MIN</span></div>
            <div>:</div>
            <div>{{ countdown.seconds }}<span class="text-sm block font-normal">SEC</span></div>
        </div>

        <!-- Notify Button -->
        <router-link to="/">
            <button class="brutalist-button text-xl sm:text-2xl md:text-3xl w-full max-w-xs mt-8 sm:mt-12">
                Come Back Later.
            </button>
        </router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });

const updateCountdown = () => {
    const launchDate = new Date('2025-03-30T00:00:00').getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = launchDate - now;
        if (diff <= 0) return;

        countdown.value = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    }, 1000);
};

onMounted(updateCountdown);
</script>

<style scoped>
/* Brutalist Glitch Effect */
@keyframes glitch {
    0% {
        transform: translate(2px, -2px);
        text-shadow: -2px 2px 0 black, 2px -2px 0 yellow;
    }

    25% {
        transform: translate(-2px, 2px);
        text-shadow: 2px -2px 0 black, -2px 2px 0 yellow;
    }

    50% {
        transform: translate(2px, 2px);
        text-shadow: -2px -2px 0 black, 2px 2px 0 yellow;
    }

    75% {
        transform: translate(-2px, -2px);
        text-shadow: 2px 2px 0 black, -2px -2px 0 yellow;
    }

    100% {
        transform: translate(0, 0);
        text-shadow: -1px 1px 0 black, 1px -1px 0 yellow;
    }
}

.glitch {
    font-family: "Arial Black", sans-serif;
    animation: glitch 0.2s infinite;
}

/* Brutalist Button */
.brutalist-button {
    display: inline-block;
    padding: 20px 40px;
    background: black;
    color: yellow;
    font-weight: bold;
    text-transform: uppercase;
    border: 6px solid yellow;
    box-shadow: 10px 10px 0 black;
    font-family: monospace;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

.brutalist-button:hover {
    transform: translate(-8px, -8px) rotate(-2deg);
    box-shadow: 18px 18px 0 black;
    background: yellow;
    color: black;
    border-color: black;
}

.brutalist-button:active {
    transform: translate(4px, 4px) rotate(2deg);
    box-shadow: 4px 4px 0 black;
}
</style>
