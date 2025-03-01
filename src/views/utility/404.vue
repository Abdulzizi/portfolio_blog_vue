<script setup>
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <!-- Animated 404 Title -->
        <h1 class="text-7xl font-extrabold text-red-600 flex items-center space-x-2">
            <i class="bx bx-buoy bx-spin text-blue-500 text-5xl animate-pulse"></i>
            4
            <i class="bx bx-buoy bx-spin text-blue-500 text-5xl animate-pulse"></i>
            0
            <i class="bx bx-buoy bx-spin text-blue-500 text-5xl animate-pulse"></i>
            4
        </h1>

        <!-- Error Message -->
        <h2 class="text-2xl font-semibold text-gray-800 mt-3">Oops! Page Not Found</h2>
        <p class="text-gray-500 max-w-lg text-center mt-2">
            The page you're looking for might have been moved, deleted, or does not exist.
        </p>

        <!-- Action Button -->
        <router-link to="/">
            <!-- <button class="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md transition-all 
        hover:bg-blue-600 hover:shadow-lg active:scale-95">
                Go Back Home
            </button> -->
            <Button variant="primary" size="lg"
                class="mt-6 px-6 py-3 bg-blue-500 text-white text-lg border-0 rounded-md shadow-md transition-all hover:bg-blue-600 hover:shadow-lg active:scale-95">
                Go Back Home
            </Button>
        </router-link>

        <!-- Error Image -->
        <img src="@/assets/images/error-img.png" alt="Error Image" class="mt-8 w-80 opacity-90 animate-fadeIn" />
    </div>
</template>

<style scoped>
/* Custom Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 1.2s ease-in-out;
}
</style>
