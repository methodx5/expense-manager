<template>
  <button
      @click="toggleTheme"
      class="fixed top-4 right-4 z-50 w-14 h-8 rounded-full flex items-center transition-colors duration-300
           bg-gray-300 dark:bg-gray-600"
  >
    <div class="w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-300
             flex items-center justify-center ml-1"
        :class="{ 'translate-x-6': isDark }">
      <component :is="isDark ? MoonIcon : SunIcon" class="w-4 h-4 text-yellow-400 dark:text-gray-800" />
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

// тема сохраняется в localStorage
const isDark = ref(false)

const SunIcon = Sun
const MoonIcon = Moon

onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark'); // добавляем класс на <html>
  }
});

// Переключение темы
const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark'); // добавляем класс на <html>
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark'); // удаляем класс с <html>
    localStorage.setItem('theme', 'light');
  }
};

</script>