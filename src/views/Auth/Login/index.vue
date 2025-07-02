<template>
    <div class="min-h-screen bg-white flex">
        <div class="flex-1 flex items-center justify-center px-6 py-12">
            <div class="w-full max-w-md">
                <div class="text-center mb-12">
                    <h1 class="text-3xl font-bold mb-2">Admin Login</h1>
                    <p class="text-gray-600">Sign in to manage your portfolio</p>
                </div>

                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <label class="block text-sm font-medium mb-2">Email Address</label>
                        <input v-model="formModel.email" type="email" required placeholder="admin@abdulzizi.com"
                            class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Password</label>
                        <div class="relative">
                            <input v-model="formModel.password" type="password" required
                                placeholder="Enter your password"
                                class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300 pr-12" />
                            <button type="button"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input type="checkbox" class="w-4 h-4 border border-black focus:ring-yellow-300">
                            <span class="ml-2 text-sm">Remember me</span>
                        </label>
                        <a href="#" class="text-sm hover:opacity-70 transition-opacity">Forgot password?</a>
                    </div>

                    <button type="submit"
                        class="w-full bg-black text-white py-3 px-4 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition-all duration-300">
                        Sign In
                    </button>
                </form>

                <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200">
                    <h3 class="text-sm font-medium mb-2">Demo Credentials:</h3>
                    <p class="text-xs text-gray-600 mb-1">Email: jawadazizi052@gmail.com</p>
                    <p class="text-xs text-gray-600">Password: devGanteng</p>
                </div>

                <div class="text-center mt-8">
                    <a href="/"
                        class="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity group">
                        ← Back to Site
                        <span class="ml-2 w-6 h-px bg-black transition-all duration-300 group-hover:w-10"></span>
                    </a>
                </div>
            </div>
        </div>

        <div class="hidden lg:flex flex-1 bg-yellow-300 items-center justify-center relative overflow-hidden">
            <div class="text-center z-10">
                <h2 class="text-4xl xl:text-6xl font-black mb-4">ADMIN</h2>
                <p class="text-xl opacity-80">Portfolio Management</p>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute top-10 left-10 w-20 h-20 border-4 border-black transform rotate-45"></div>
            <div class="absolute bottom-10 right-10 w-16 h-16 bg-black transform -rotate-12"></div>
            <div class="absolute top-1/2 left-10 w-2 h-32 bg-black transform -rotate-45"></div>
            <div class="absolute top-20 right-20 w-8 h-8 border-2 border-black rounded-full"></div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'

import { showErrorToast, showSuccessToast } from "@/helpers/alert";
import { useAuthStore } from "@/state/pinia";

const authStore = useAuthStore();

const formModel = ref({
    email: "",
    password: "",
});

const handleSubmit = async () => {
    try {
        const user = await authStore.login(formModel.value);

        if (authStore.response.status === 200) {
            showSuccessToast("Login Success");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500);
        } else {
            console.log(`Error : `, authStore.response.error);
            showErrorToast("Login Failed", authStore.response.error[0]);
        }
    } catch (error) {
        console.log(`Error : `, error);
    }
};
</script>