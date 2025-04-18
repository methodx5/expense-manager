<template>
  <div class="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-2xl shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">📋 Список расходов</h2>

    <EditExpenseModal
        :visible="showModal"
        :expense="expenseToEdit"
        @close="closeEditModal"
        @save="saveEditedExpense"
    />

    <ul v-if="props.expenses.length" class="space-y-4">
      <li
          v-for="expense in props.expenses"
          :key="expense.id"
          class="flex justify-between items-center p-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg shadow-sm"
      >
        <div class="flex-1">
          <div class="font-semibold">{{ expense.name }}</div>
          <div class="text-sm text-zinc-600 dark:text-zinc-400">
            {{ expense.amount }} грн — {{ expense.category }}
          </div>
        </div>
        <div class="flex space-x-2 ml-4">
          <button
              @click="openEditModal(expense)"
              class="text-blue-500 hover:text-blue-700 transition text-lg"
              title="Редактировать"
          >
<!--            ✏️-->
            <Pencil :size="20" />
          </button>
          <button
              @click="removeExpense(expense.id)"
              class="text-red-500 hover:text-red-700 transition text-lg"
              title="Удалить"
          >
<!--            ❌-->
            <Trash2 :size="20" />
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="text-zinc-500 dark:text-zinc-400 mt-2">Пока нет расходов.</p>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { deleteExpense, updateExpense } from "../firebase";
import EditExpenseModal from "./EditExpenseModal.vue";
import { Pencil, Trash2 } from 'lucide-vue-next';

const props = defineProps(["expenses"]);
const emit = defineEmits(["expenseUpdated", "expenseDeleted"]);

const showModal = ref(false);
const expenseToEdit = ref(null);

const openEditModal = (expense) => {
  expenseToEdit.value = { ...expense };
  showModal.value = true;
};

const closeEditModal = () => {
  showModal.value = false;
};

const saveEditedExpense = async (editedExpense) => {
  await updateExpense(editedExpense.id, {
    name: editedExpense.name,
    amount: editedExpense.amount,
    category: editedExpense.category,
    date: editedExpense.date,
  });
  emit("expenseUpdated")
};


// Удаление расхода
async function removeExpense(id) {
  if (confirm("Удалить этот расход?")) {
    await deleteExpense(id);
    emit("expenseDeleted"); // Сообщаем родителю, что расход удален
  }
}
</script>

<!--<template>-->
<!--  <div>-->
<!--    <h2>Список расходов</h2>-->
<!--    <EditExpenseModal-->
<!--        :visible="showModal"-->
<!--        :expense="expenseToEdit"-->
<!--        @close="closeEditModal"-->
<!--        @save="saveEditedExpense"-->
<!--    />-->
<!--    <ul v-if="props.expenses.length">-->
<!--      <li v-for="expense in props.expenses" :key="expense.id">-->
<!--        <div>-->
<!--          {{ expense.name }} - {{ expense.amount }} грн ({{ expense.category }})-->
<!--          <button @click="openEditModal(expense)">✏️</button>-->
<!--          <button @click="removeExpense(expense.id)">❌</button>-->
<!--        </div>-->
<!--      </li>-->
<!--    </ul>-->
<!--    <p v-else>Расходов пока нет</p>-->
<!--  </div>-->
<!--</template>-->

<style scoped>

</style>