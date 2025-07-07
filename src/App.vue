<script setup lang="ts">
import { Toaster } from "vue-sonner";
import { Analytics } from "@vercel/analytics/next"
</script>

<template>
  <Analytics />
  <RouterView />
  <Toaster richColors />
</template>