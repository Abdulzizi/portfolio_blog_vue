<template>
    <div class="min-h-screen flex flex-col pb-20">
        <!-- Page Content -->
        <slot />

        <!-- Bottom Navbar -->
        <nav class="fixed bottom-0 left-0 w-full border-t border-black bg-white grid grid-cols-5">
            <router-link to="/work" class="block w-full">
                <button
                    class="py-4 text-lg font-bold border-r border-black bg-green-300 w-full h-full hover:bg-green-200 transition-colors duration-200">
                    WORK
                </button>
            </router-link>
            <router-link to="/about" class="block w-full">
                <button
                    class="py-4 text-lg font-bold border-r border-black w-full h-full hover:bg-green-200 transition-colors duration-200">
                    ABOUT
                </button>
            </router-link>
            <div
                class="py-4 flex items-center justify-center border-r border-black w-full h-full hover:bg-green-200 transition-colors duration-200">
                <router-link to="/" class="w-full flex items-center justify-center">
                    <img src="@/assets/images/logo.svg" alt="Logo" class="h-10" />
                </router-link>
            </div>
            <router-link to="/community" class="block w-full">
                <button
                    class="py-4 text-lg font-bold border-r border-black w-full h-full hover:bg-green-200 transition-colors duration-200">
                    COMMUNITY
                </button>
            </router-link>
            <router-link to="/connect" class="block w-full">
                <button class="py-4 text-lg font-bold w-full h-full hover:bg-green-200 transition-colors duration-200">
                    CONNECT
                </button>
            </router-link>
        </nav>
    </div>
</template>

<script setup></script>

<style scoped></style>
