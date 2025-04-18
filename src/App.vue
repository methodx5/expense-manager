<template>
    <div class="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <ThemeToggle />
      <router-view />
    </div>
</template>

<script setup>
import ThemeToggle from "./components/ThemeToggle.vue";
</script>