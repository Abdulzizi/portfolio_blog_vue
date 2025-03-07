<template>
    <Layouts>
        <!-- Hero Section -->
        <section
            class="relative min-h-screen flex flex-col justify-center items-start bg-[hsl(var(--background))] px-6 md:px-20 pt-5 border-b-8 border-[hsl(var(--border))]">

            <!-- Fixed Responsive Positioning -->
            <h1 class="absolute left-4 sm:left-10 z-10 text-[hsl(var(--primary-foreground))] font-black tracking-tight uppercase"
                :class="'text-[clamp(50px,12vw,150px)] top-52 sm:top-10 drop-shadow-[5px_4px_0_hsl(var(--border))]'">
                PORTFOLIO
            </h1>

            <div class="mt-20 md:mt-40">
                <h1 class="font-mono uppercase text-[hsl(var(--primary-foreground))] leading-tight"
                    :class="'text-[clamp(28px,6vw,72px)]'">
                    <span class="relative inline-block">
                        Where <span class="bg-[hsl(var(--foreground))] text-[hsl(var(--primary))] px-2">code</span>
                        meets art.
                    </span><br />
                    <span class="relative inline-block">
                        Where <span
                            class="bg-[hsl(var(--foreground))] text-[hsl(var(--primary))] px-2">creativity</span> meets
                        logic.
                    </span><br />
                    <span class="relative inline-block bg-[hsl(var(--foreground))] text-[hsl(var(--primary))] px-2">
                        Code is my craft.
                    </span>
                </h1>
            </div>
        </section>

        <!-- Brutalist Project Grid -->
        <section class="px-6 md:px-20 py-16 bg-brutalist border-t-4 border-[hsl(var(--border))]">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div v-for="(project, index) in projects" :key="index" class="border-4 border-[hsl(var(--border))] bg-[hsl(var(--foreground))] text-[hsl(var(--primary))] flex flex-col justify-between items-center 
                    relative w-full aspect-square p-6 transition-all duration-200 hover:translate-y-[-12px] 
                    hover:translate-x-[-12px] hover:shadow-[12px_12px_0_hsl(var(--border))]">

                    <h1 class="text-xl sm:text-2xl md:text-3xl font-black uppercase text-center tracking-widest">
                        {{ project.title }}
                    </h1>

                    <div
                        class="absolute inset-0 flex flex-col items-center justify-center bg-[hsl(var(--primary))] bg-opacity-90 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <p class="text-base sm:text-lg text-[hsl(var(--primary-foreground))] font-semibold mb-2">{{
                            project.subtitle }}</p>
                        <router-link :to="`/work/${project.id}`">
                            <Button class="button-brutalist w-full max-w-[350px] text-[hsl(var(--primary))]">
                                View Details
                            </Button>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </Layouts>
</template>

<script setup>
import Layouts from '@/layouts/Layouts.vue';
import Button from '@/components/ui/button/Button.vue';

const projects = [
    { id: 1, title: 'Project One', subtitle: 'Subtitle One' },
    { id: 2, title: 'Project Two', subtitle: 'Subtitle Two' },
    { id: 3, title: 'Project Three', subtitle: 'Subtitle Three' },
    { id: 4, title: 'Project Four', subtitle: 'Subtitle Four' },
    { id: 5, title: 'Project Five', subtitle: 'Subtitle Five' },
    { id: 6, title: 'Project Six', subtitle: 'Subtitle Six' }
];
</script>

<style scoped>
/* Brutalist Grid Background */
.bg-brutalist {
    background-image: linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
        linear-gradient(hsl(var(--border)) 1px, transparent 1px);
    background-size: 40px 40px;
    background-color: hsl(var(--background));
}

/* Brutalist Button */
.button-brutalist {
    position: relative;
    background-color: hsl(var(--foreground));
    border: 4px solid hsl(var(--primary));
    box-shadow: 10px 10px 0 hsl(var(--primary));
    transition: all 0.2s ease-in-out;
}

.button-brutalist:hover {
    transform: translate(-12px, -12px);
    box-shadow: 16px 16px 0 hsl(var(--primary));
}

.button-brutalist:active {
    transform: translate(4px, 4px);
    box-shadow: 6px 6px 0 hsl(var(--primary));
}
</style>
