<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button
      @click="$emit('back')"
      class="flex items-center text-gray-600 hover:text-gray-900 mb-8"
    >
      <ArrowLeft class="h-5 w-5 mr-2" />
      Back to Dashboard
    </button>

    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-indigo-600 mb-6">Buy Credits</h1>

      <p class="text-gray-700 mb-4">Current Credits: <span class="font-bold">{{ credits }}</span></p>
      <div class="flex items-center space-x-4">
        <input
          v-model.number="amount"
          type="number"
          min="1"
          class="border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Enter amount"
        />
        <button
          @click="buyCredits"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Buy Credits
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import {ArrowLeft} from "lucide-vue-next";

  const credits = ref<number>(parseInt(localStorage.getItem('credits') || '0', 10));
  const amount = ref<number>(0);

  const emit = defineEmits<{
    (e: 'credits-updated', newCredits: number): void;
    (e: 'back'): void;
  }>();

  const buyCredits = () => {
    if (amount.value > 0) {
      credits.value += amount.value;
      localStorage.setItem('credits', credits.value.toString());
      emit('credits-updated', credits.value);
      emit('back');
      amount.value = 0;
    }
  };
</script>

<style scoped>
/* Add any custom styles here */
</style>
