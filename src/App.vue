<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template>
  <VercelAnalytics />
  <RouterView />
  <Toaster richColors />
</template>