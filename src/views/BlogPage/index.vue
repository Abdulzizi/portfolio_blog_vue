<template>
    <Layouts>
        <div
            class="w-full min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--primary-foreground))] px-6 py-12 md:px-8 md:py-16 border-8 border-[hsl(var(--border))]">
            <h1
                class="text-[12vw] md:text-[9vw] font-black uppercase border-b-8 border-[hsl(var(--border))] pb-3 text-center">
                BLOG
            </h1>

            <!-- Blog Post Grid -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <router-link v-for="post in posts" :key="post.id" :to="'/blog/' + post.id"
                    class="border-8 border-[hsl(var(--border))] p-6 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-none">
                    <h2 class="text-3xl md:text-4xl font-black uppercase leading-tight">
                        {{ post.title }}
                    </h2>
                    <p class="mt-2 text-lg">{{ post.date }}</p>
                    <div class="mt-2 flex flex-wrap gap-2">
                        <span v-for="tag in post.tags" :key="tag"
                            class="px-3 py-1 bg-[hsl(var(--foreground))] text-[hsl(var(--primary))] text-sm font-bold">
                            #{{ tag }}
                        </span>
                    </div>
                </router-link>
            </div>

            <!-- Social Media Links -->
            <div class="mt-12 flex gap-6 justify-center">
                <a href="https://youtube.com" target="_blank" class="brutalist-icon">YT</a>
                <a href="https://instagram.com" target="_blank" class="brutalist-icon">IG</a>
                <a href="https://github.com" target="_blank" class="brutalist-icon">GH</a>
            </div>
        </div>
    </Layouts>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Layouts from '@/layouts/Layouts.vue';

const posts = ref([
    { id: 1, title: "Brutalist Web Design", date: "March 6, 2025", tags: ["design", "web"] },
    { id: 2, title: "My Journey into Vue & TypeScript", date: "March 5, 2025", tags: ["vue", "typescript"] },
    { id: 3, title: "Why I Chose Laravel", date: "March 3, 2025", tags: ["laravel", "backend"] },
    { id: 4, title: "Building a Personal Brand", date: "March 2, 2025", tags: ["branding", "content"] },
]);
</script>

<style scoped>
.brutalist-icon {
    display: inline-block;
    padding: 12px 24px;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    background: hsl(var(--foreground));
    color: hsl(var(--primary));
    border: 6px solid hsl(var(--primary));
    box-shadow: 6px 6px 0 hsl(var(--border));
    text-align: center;
    transition: all 0.1s ease-in-out;
}

.brutalist-icon:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 hsl(var(--border));
}
</style>
