<template>
  <div class="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-2xl shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">➕ Добавить расход</h2>
    <form @submit.prevent="submitExpense" class="space-y-4">
      <input
          v-model="name"
          type="text"
          placeholder="Название"
          required
          class="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
          v-model="amount"
          type="number"
          placeholder="Сумма"
          required
          class="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
          v-model="category"
          type="text"
          placeholder="Категория"
          required
          class="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
          v-model="date"
          type="date"
          class="w-full p-3 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition"
      >
        💸 Добавить
      </button>
    </form>
  </div>
</template>


<script setup>
import { ref, defineEmits } from "vue";
import { addExpense } from "../firebase";

const name = ref("");
const amount = ref("");
const category = ref("");
const date = ref(new Date().toISOString().split("T")[0]); // Сегодняшняя дата

// Создаем событие для передачи данных в родительский компонент
const emit = defineEmits(["expenseAdded"]);

async function submitExpense() {

  // Создаем объект расхода
  const newExpense = {
    name: name.value,
    amount: Number(amount.value),
    category: category.value,
    date: date.value // Добавляем дату
  };

  // Добавляем в Firestore
  await addExpense(newExpense);

  // Очищаем форму
  name.value = "";
  amount.value = "";
  category.value = "";
  date.value = new Date().toISOString().split("T")[0]; // Сброс даты
  emit("expenseAdded");
}
</script>


<style scoped>

</style>