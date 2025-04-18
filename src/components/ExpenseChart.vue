<template>
  <div class="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6 mt-6 max-w-3xl mx-auto w-full">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">График расходов</h2>

      <div class="flex items-center gap-2">
        <label for="chartType" class="text-sm text-gray-600 dark:text-gray-300">Тип графика:</label>
        <select
            id="chartType"
            v-model="chartType"
            class="p-2 rounded-md border dark:border-zinc-600 dark:bg-zinc-700 dark:text-white text-sm"
        >
          <option value="pie">Круговая</option>
          <option value="bar">Столбчатая</option>
          <option value="doughnut">Кольцевая</option>
          <option value="line">Линейная</option>
        </select>
      </div>
    </div>

    <canvas ref="chartCanvas" class="w-full max-h-[400px]"></canvas>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart } from 'chart.js/auto';

const props = defineProps({
  expenses: {
    type: Array,
    required: true,
  },
});

const chartType = ref('pie');
const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {
  const categoryTotals = {};

  props.expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += Number(exp.amount);
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: chartType.value,
    data: {
      labels,
      datasets: [{
        label: 'Расходы по категориям',
        data,
        backgroundColor: [
          '#f87171', '#60a5fa', '#34d399', '#fbbf24', '#c084fc', '#fb923c',
        ],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
    },
  });
};

onMounted(createChart);

// Обновление при смене данных или типа графика
watch([() => props.expenses, chartType], createChart, { deep: true });
</script>

<!--<template>-->
<!--  <div class="chart-container">-->
<!--    <div class="chart-controls">-->
<!--      <label for="chartType">Тип графика:</label>-->
<!--      <select id="chartType" v-model="chartType">-->
<!--        <option value="pie">Круговая диаграмма</option>-->
<!--        <option value="bar">Столбчатая диаграмма</option>-->
<!--        <option value="doughnut">Кольцевая диаграмма</option>-->
<!--        <option value="line">Линейный график</option>-->
<!--      </select>-->
<!--    </div>-->

<!--    <canvas ref="chartCanvas"></canvas>-->
<!--  </div>-->
<!--</template>-->

<style scoped>
.chart-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
canvas {
  width: 100% !important;
  height: auto !important;
}
.chart-controls {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.chart-controls select {
  padding: 4px 8px;
  font-size: 14px;
}
</style>