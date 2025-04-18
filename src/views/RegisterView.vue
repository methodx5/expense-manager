<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-zinc-900">
    <div class="w-full max-w-md bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Регистрация
      </h2>
      <form @submit.prevent="register" class="space-y-4">
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Зарегистрироваться
        </button>
        <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
      </form>

      <!-- 🔁 Переключатель на страницу входа -->
      <p class="text-center text-gray-600 dark:text-gray-300 mt-6">
        Уже есть аккаунт?
        <router-link
            to="/login"
            class="text-blue-500 hover:underline font-semibold"
        >
          Войти
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    await router.push('/')
  } catch (err) {
    error.value = "Такой email уже используется"
  }
}
</script>

<style scoped>

</style>
