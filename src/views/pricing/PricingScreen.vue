<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold text-indigo-600 mb-8">Pricing Plans</h1>
    <div class="flex flex-col md:flex-row gap-8">
      <div
        class="flex-1 bg-white rounded-xl shadow-md p-8 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
      >
        <div class="flex items-center mb-4">
          <svg
            class="h-6 w-6 text-indigo-500 mr-2"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v5H3V4zM3 9v11a1 1 0 001 1h16a1 1 0 001-1V9H3z"
            />
          </svg>
          <h2 class="text-xl font-semibold text-gray-800">Single Website</h2>
        </div>
        <p class="text-gray-600 mb-6">
          Build one website at a fixed price with all standard features.
        </p>
        <p class="text-2xl font-bold text-indigo-600">100 Credits</p>
      </div>

      <div
        class="flex-1 bg-white rounded-xl shadow-md p-8 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg relative"
      >
        <div
          class="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full"
        >
          Best Value
        </div>

        <div class="flex items-center mb-4">
          <svg
            class="h-6 w-6 text-indigo-500 mr-2"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 8h10M7 12h4m1 8h3a2 2 0 002-2V8a2 2 0 00-2-2h-3m-4 0H7a2 2 0 00-2 2v10a2 2 0 002 2h3"
            />
          </svg>
          <h2 class="text-xl font-semibold text-gray-800">Bulk Websites</h2>
        </div>

        <p class="text-gray-600 mb-6">
          Choose the number of websites you need and pay a discounted price per website.
        </p>

        <div class="mb-4">
          <label class="font-medium text-gray-700">Number of Websites:</label>
          <input
            v-model.number="numberOfWebsites"
            type="number"
            min="1"
            class="border border-gray-300 rounded-lg px-4 py-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="e.g. 10"
          />
        </div>

        <div class="text-gray-800 text-lg">
          <p>
            Total cost for <span class="font-semibold">{{ numberOfWebsites }}</span> website<span v-if="numberOfWebsites > 1">s</span>:
            <span class="font-bold text-indigo-600">{{ calculateBulkCost() }} Credits</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const numberOfWebsites = ref<number>(1);

const calculateBulkCost = (): number => {
  if (numberOfWebsites.value <= 5) {
    return numberOfWebsites.value * 80;
  } else if (numberOfWebsites.value <= 20) {
    return numberOfWebsites.value * 60;
  } else if (numberOfWebsites.value <= 40) {
    return numberOfWebsites.value * 50;
  } else if (numberOfWebsites.value <= 50) {
    return numberOfWebsites.value * 30;
  }
  return 0;
};
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
