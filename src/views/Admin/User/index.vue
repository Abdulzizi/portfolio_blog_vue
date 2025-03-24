<template>
    <div>
        <p class="text-white">Hello, World!</p>
        <button @click="showAlert">Click Me</button>
    </div>
</template>

<script setup>
function showAlert() {
    alert('Button clicked!');
}
</script>
