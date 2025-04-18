<template>
  <header class="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Менеджер расходов</h1>
    <div class="flex items-center gap-3">
      <!-- Переключатель темы -->
      <ThemeToggle />
      <!-- Кнопка выхода -->
      <button
          @click="$emit('logout')"
          class="text-sm font-medium px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
      >
        🚪 Выйти
      </button>
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>


