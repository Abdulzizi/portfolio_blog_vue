<template>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Test About Page
        </h1>
        <p class="mt-2 text-xl text-gray-600">
            This is a test About page. It just shows some text and a button.
        </p>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" @click="handleClick">
            Click me
        </button>
    </div>
</template>

<script setup lang="ts">
const handleClick = () => {
    // alert('Button was clicked!');
    window.location.href = '/';
}
</script>
