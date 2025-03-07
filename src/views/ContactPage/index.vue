<template>
    <Layouts>
        <div
            class="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--primary-foreground))] border-8 border-[hsl(var(--border))] px-6 md:px-8 py-12">
            <!-- Title -->
            <h1
                class="text-[15vw] sm:text-[12vw] md:text-[10vw] font-black uppercase border-b-8 border-[hsl(var(--border))] pb-2 md:pb-4 tracking-wide leading-none skew-x-[-5deg] text-center w-full text-[hsl(var(--primary))]">
                CONTACT ME.
            </h1>

            <!-- Description -->
            <p
                class="text-xl sm:text-2xl md:text-3xl font-mono text-center mt-4 sm:mt-6 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-4 py-2 inline-block rotate-[-2deg]">
                SAY SOMETHING. OR DON'T.
            </p>

            <!-- Contact Form -->
            <form
                class="mt-8 sm:mt-10 w-full max-w-lg border-8 border-[hsl(var(--border))] p-4 sm:p-6 bg-[hsl(var(--secondary))] shadow-2xl rotate-[2deg]">
                <div class="mb-6 sm:mb-8">
                    <label class="text-lg sm:text-2xl font-bold block uppercase text-[hsl(var(--primary))]">Your
                        Name</label>
                    <input type="text" class="brutalist-input" placeholder="TELL ME WHO YOU ARE">
                </div>

                <div class="mb-6 sm:mb-8">
                    <label class="text-lg sm:text-2xl font-bold block uppercase text-[hsl(var(--primary))]">Your
                        Email</label>
                    <input type="email" class="brutalist-input" placeholder="WHERE CAN I REACH YOU?">
                </div>

                <div class="mb-6 sm:mb-8">
                    <label
                        class="text-lg sm:text-2xl font-bold block uppercase text-[hsl(var(--primary))]">Message</label>
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
    border: 5px solid hsl(var(--border));
    background: hsl(var(--input));
    color: hsl(var(--primary-foreground));
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    font-family: monospace;
    outline: none;
    box-shadow: 4px 4px 0 hsl(var(--border));
    transition: all 0.1s ease-in-out;
}

.brutalist-input::placeholder {
    color: hsl(var(--primary-foreground));
    opacity: 1;
}

.brutalist-input:focus {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border-color: hsl(var(--primary-foreground));
    box-shadow: 8px 8px 0 hsl(var(--primary-foreground));
}

/* Brutalist Button */
.brutalist-button {
    display: inline-block;
    padding: 18px 32px;
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
    font-weight: bold;
    text-transform: uppercase;
    border: 5px solid hsl(var(--accent-foreground));
    box-shadow: 8px 8px 0 hsl(var(--border));
    font-family: monospace;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

.brutalist-button:hover {
    transform: translate(-6px, -6px) rotate(-2deg);
    box-shadow: 14px 14px 0 hsl(var(--border));
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border-color: hsl(var(--primary-foreground));
}

.brutalist-button:active {
    transform: translate(3px, 3px) rotate(2deg);
    box-shadow: 4px 4px 0 hsl(var(--border));
}

/* Brutalist Text */
h1 {
    font-family: "Arial Black", sans-serif;
    text-shadow: -3px 3px 0 hsl(var(--border));
}

p {
    font-family: "Courier New", monospace;
    font-weight: bold;
}
</style>
