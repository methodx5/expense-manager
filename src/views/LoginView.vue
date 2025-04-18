<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
    <div class="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 space-y-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-white">Вход</h2>

      <form @submit.prevent="login" class="space-y-4">
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-4 py-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            required
            class="w-full px-4 py-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Войти
        </button>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>

      <div class="flex flex-col space-y-3">
        <router-link
            to="/register"
            class="w-full text-center border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Регистрация
        </router-link>

        <button
            @click="loginWithGoogle"
            class="w-full text-center bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg transition"
        >
          Войти через Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth, googleProvider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    console.log('Вход через Google:', result.user.email)
    await router.push('/')
  } catch (error) {
    console.error('Ошибка входа через Google:', error)
  }
}

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    await router.push('/');
  } catch (err) {
    error.value = 'Неверный email или пароль';
  }
};
</script>

<style scoped>

</style>
