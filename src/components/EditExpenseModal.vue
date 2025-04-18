<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="close">
      <div class="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Редактировать расход</h2>

        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-300">Название:</label>
            <input v-model="localExpense.name" required class="w-full p-2 rounded border dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-300">Сумма:</label>
            <input v-model.number="localExpense.amount" type="number" required class="w-full p-2 rounded border dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-300">Категория:</label>
            <input v-model="localExpense.category" required class="w-full p-2 rounded border dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm text-gray-600 dark:text-gray-300">Дата:</label>
            <input v-model="localExpense.date" type="date" required class="w-full p-2 rounded border dark:border-zinc-600 dark:bg-zinc-700 dark:text-white" />
          </div>

          <div class="flex justify-end gap-4 pt-2">
            <button type="button" @click="close" class="flex items-center gap-1 text-sm px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-gray-700 dark:text-white">
              <X class="w-4 h-4" /> Отмена
            </button>
            <button type="submit" class="flex items-center gap-1 text-sm px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white">
              <Save class="w-4 h-4" /> Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { ref, watch } from 'vue';
import { Save, X } from 'lucide-vue-next'

const props = defineProps({
  expense: Object,
  visible: Boolean
});

const emit = defineEmits(['close', 'save']);

const localExpense = ref({...props.expense});

watch(() => props.expense, (newVal) => {
  localExpense.value = {...newVal };
});

const close = () => {
  emit('close');
};

const save = () => {
  emit('save', localExpense.value);
  close();
};
</script>

<style scoped>

</style>
