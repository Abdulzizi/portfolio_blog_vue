<template>
    <Layouts>
        <div class="w-full min-h-screen bg-yellow-400 text-black px-6 py-12 md:px-8 md:py-16 border-8 border-black">
            <router-link to="/blog" class="text-lg font-bold underline">&larr; Back to Blog</router-link>

            <!-- Blog Post Image -->
            <div class="mt-6 border-8 border-black bg-white">
                <img :src="post.image" :alt="post.title"
                    class="w-full h-[250px] md:h-[400px] object-cover border-8 border-black">
            </div>

            <!-- Blog Post Title -->
            <h1 class="mt-4 text-[10vw] md:text-[7vw] font-black uppercase border-b-8 border-black pb-3">
                {{ post.title }}
            </h1>

            <p class="mt-2 text-lg md:text-xl">{{ post.date }}</p>

            <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 bg-black text-yellow-400 text-sm font-bold">
                    #{{ tag }}
                </span>
            </div>

            <!-- Blog Content -->
            <article class="mt-6 text-lg md:text-xl max-w-3xl">
                <p v-for="(paragraph, index) in post.content" :key="index" class="mb-4">{{ paragraph }}</p>
            </article>

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
import { useRoute } from 'vue-router';
import Layouts from '@/layouts/Layouts.vue';

const route = useRoute();
const postId = route.params.id;

const post = ref({
    title: "Brutalist Web Design: Breaking the Rules",
    date: "March 6, 2025",
    tags: ["design", "web"],
    image: "/images/brutalist-design.jpg", // Example image
    content: [
        "Brutalism in web design is about raw, unfiltered aesthetics. No smooth gradients, no soft shadows—just bold typography and strong contrasts.",
        "This design philosophy rejects over-polished UI trends and brings back the feeling of raw, human-created experiences.",
        "The beauty of brutalist design lies in its simplicity and functionality. It's fast, readable, and unapologetically bold.",
    ],
});
</script>
