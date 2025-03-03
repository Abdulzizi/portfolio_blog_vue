<template>
    <Layouts>
        <div
            class="min-h-screen flex flex-col items-center justify-center bg-yellow-400 text-black border-8 border-black px-6 md:px-8 py-12">
            <!-- Title -->
            <h1
                class="text-[15vw] sm:text-[12vw] md:text-[10vw] font-black uppercase border-b-8 border-black pb-2 md:pb-4 tracking-wide leading-none skew-x-[-5deg] text-center w-full">
                CONTACT ME.
            </h1>

            <!-- Description -->
            <p
                class="text-xl sm:text-2xl md:text-3xl font-mono text-center mt-4 sm:mt-6 bg-black text-yellow-400 px-4 py-2 inline-block rotate-[-2deg]">
                SAY SOMETHING. OR DON'T.
            </p>

            <!-- Contact Form -->
            <form
                class="mt-8 sm:mt-10 w-full max-w-lg border-8 border-black p-4 sm:p-6 bg-white shadow-2xl rotate-[2deg]">
                <div class="mb-6 sm:mb-8">
                    <label class="text-lg sm:text-2xl font-bold block uppercase">Your Name</label>
                    <input type="text" class="brutalist-input" placeholder="TELL ME WHO YOU ARE">
                </div>

                <div class="mb-6 sm:mb-8">
                    <label class="text-lg sm:text-2xl font-bold block uppercase">Your Email</label>
                    <input type="email" class="brutalist-input" placeholder="WHERE CAN I REACH YOU?">
                </div>

                <div class="mb-6 sm:mb-8">
                    <label class="text-lg sm:text-2xl font-bold block uppercase">Message</label>
                    <textarea class="brutalist-input h-32 sm:h-40" placeholder="WHAT'S ON YOUR MIND?"></textarea>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="brutalist-button text-xl sm:text-2xl md:text-3xl w-full">
                    SEND IT.
                </button>
            </form>
        </div>
    </Layouts>
</template>

<script setup>
import Layouts from '@/layouts/Layouts.vue';
</script>

<style scoped>
/* Brutalist Input Fields */
.brutalist-input {
    width: 100%;
    padding: 14px;
    border: 5px solid black;
    background: yellow;
    color: black;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    font-family: monospace;
    outline: none;
    box-shadow: 4px 4px 0 black;
    transition: all 0.1s ease-in-out;
}

.brutalist-input::placeholder {
    color: black;
    opacity: 1;
}

.brutalist-input:focus {
    background: black;
    color: yellow;
    border-color: yellow;
    box-shadow: 8px 8px 0 yellow;
}

/* Brutalist Button */
.brutalist-button {
    display: inline-block;
    padding: 18px 32px;
    background: black;
    color: yellow;
    font-weight: bold;
    text-transform: uppercase;
    border: 5px solid yellow;
    box-shadow: 8px 8px 0 black;
    font-family: monospace;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

.brutalist-button:hover {
    transform: translate(-6px, -6px) rotate(-2deg);
    box-shadow: 14px 14px 0 black;
    background: yellow;
    color: black;
    border-color: black;
}

.brutalist-button:active {
    transform: translate(3px, 3px) rotate(2deg);
    box-shadow: 4px 4px 0 black;
}

/* Brutalist Text */
h1 {
    font-family: "Arial Black", sans-serif;
    text-shadow: -3px 3px 0 black;
}

p {
    font-family: "Courier New", monospace;
    font-weight: bold;
}
</style>
