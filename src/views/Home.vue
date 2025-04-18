<template>
  <div class="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Менеджер расходов</h1>
      <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">🚪 Выйти</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Левая колонка -->
      <div class="space-y-6">
        <!-- Статистика расходов -->
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <ExpenseStats :expenses="filteredExpenses" />
        </div>

        <!-- Форма для добавления -->
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <ExpenseForm @expenseAdded="loadExpenses" />
        </div>

        <!-- Фильтр по категориям -->
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <label class="block mb-2 font-semibold">Фильтр по категории:</label>
          <select v-model="selectedCategory" class="w-full p-2 rounded bg-white dark:bg-gray-700 border dark:border-gray-600">
            <option v-for="category in uniqueCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Фильтр по дате -->
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <label class="block font-semibold">От:</label>
          <input type="date" v-model="startDate" class="w-full mb-2 p-2 rounded bg-white dark:bg-gray-700 border dark:border-gray-600" />

          <label class="block font-semibold">До:</label>
          <input type="date" v-model="endDate" class="w-full p-2 rounded bg-white dark:bg-gray-700 border dark:border-gray-600" />
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="space-y-6">
        <!-- Список расходов с фильтрацией -->
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <ExpenseList :expenses="filteredExpenses" @expenseDeleted="loadExpenses" @expenseUpdated="loadExpenses" />
        </div>

        <!-- График -->
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <ExpenseChart :expenses="filteredExpenses" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 15px;
}
select {
  padding: 5px;
  font-size: 16px;
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import ExpenseList from "../components/ExpenseList.vue";
import ExpenseForm from "../components/ExpenseForm.vue";
import ExpenseChart from '../components/ExpenseChart.vue';
import ExpenseStats from "../components/ExpenseStats.vue";
import { getExpenses } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import Header from "../components/Header.vue";

const expenses = ref([]);
const selectedCategory = ref("Все");
const startDate = ref("");
const endDate = ref("");
const router = useRouter();

async function loadExpenses() {
  expenses.value = await getExpenses();
}

onMounted(loadExpenses);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Пользователь вошёл', user.email);
    } else {
      console.log('Не авторизован');
    }
  });
});

// Получаем уникальные категории
const uniqueCategories = computed(() => {
  const categories = new Set(expenses.value.map(expense => expense.category));
  return ["Все", ...categories]; // Добавляем "Все" в начало списка
});

// Фильтруем расходы по категории и дате
const filteredExpenses = computed(() => {
  return expenses.value.filter(expense => {
    const expenseDate = new Date(expense.date); // Преобразуем дату в объект Date
    const isCategoryMatch = selectedCategory.value === "Все" || expense.category === selectedCategory.value;
    const isStartDateMatch = !startDate.value || expenseDate >= new Date(startDate.value);
    const isEndDateMatch = !endDate.value || expenseDate <= new Date(endDate.value);

    return isCategoryMatch && isStartDateMatch && isEndDateMatch;
  });
});

const logout = async () => {
  await signOut(auth);
  await router.push('/login');
};

</script>

<style scoped>

</style>