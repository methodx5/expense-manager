<template>
  <div class="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-2xl shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">📊 Статистика расходов</h2>
    <ul class="space-y-2">
      <li>
        <span class="font-semibold">Всего записей:</span>
        <span class="ml-2">{{ expenses.length }}</span>
      </li>
      <li>
        <span class="font-semibold">Общая сумма:</span>
        <span class="ml-2">{{ totalAmount }} грн</span>
      </li>
      <li>
        <span class="font-semibold">Самая затратная категория:</span>
        <span class="ml-2">{{ topCategory || '—' }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  expenses: {
    type: Array,
    required: true,
  },
});

const totalAmount = computed(() => {
  return props.expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
});

const topCategory = computed(() => {
  const categorySums = {};

  props.expenses.forEach(exp => {
    if (!categorySums[exp.category]) {
      categorySums[exp.category] = 0;
    }
    categorySums[exp.category] += Number(exp.amount);
  });

  const sorted = Object.entries(categorySums).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : null;
});
</script>

<style scoped>

</style>
