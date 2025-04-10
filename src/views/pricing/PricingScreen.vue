<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold text-indigo-600 mb-8">Pricing Plans</h1>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Single Website Card -->
      <div
        :class="[
          'flex-1 bg-white rounded-xl shadow-md p-8 border transition-transform transform hover:scale-105 hover:shadow-lg',
          selectedPlan === 'single' ? 'border-indigo-500 scale-105 shadow-lg' : 'border-gray-200'
        ]"
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
        <button
          class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          @click="openConfirmModal('single')"
        >
          Buy Plan
        </button>
      </div>

      <!-- Bulk Websites Card -->
      <div
        :class="[
          'flex-1 bg-white rounded-xl shadow-md p-8 border transition-transform transform hover:scale-105 hover:shadow-lg',
          selectedPlan === 'bulk' ? 'border-indigo-500 scale-105 shadow-lg' : 'border-gray-200'
        ]"
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
        <button
          class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          @click="openConfirmModal('bulk')"
        >
          Buy Plan
        </button>
      </div>
    </div>

    <!-- Unsubscribe Button -->
    <div class="mt-8 text-center">
      <button
        class="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        @click="unsubscribe"
        :disabled="!selectedPlan"
      >
        Unsubscribe from Selected Plan
      </button>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Confirm Plan Selection</h2>
        <p class="text-gray-600 mb-6">
          Are you sure you want to continue with the <span class="font-bold">{{ planToConfirm }}</span> plan?
        </p>
        <div class="flex justify-end space-x-4">
          <button
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            @click="showConfirmModal = false"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            @click="confirmPlan"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const numberOfWebsites = ref<number>(1);
  const selectedPlan = ref<string | null>(null);
  const showConfirmModal = ref(false);
  const planToConfirm = ref<string | null>(null);

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

  const openConfirmModal = (plan: string) => {
    planToConfirm.value = plan;
    showConfirmModal.value = true;
  };

  const confirmPlan = () => {
    if (planToConfirm.value) {
      selectedPlan.value = planToConfirm.value;
      localStorage.setItem('selectedPlan', JSON.stringify(planToConfirm.value));
    }
    showConfirmModal.value = false;
  };

  const unsubscribe = () => {
    selectedPlan.value = null;
    localStorage.setItem('selectedPlan', JSON.stringify(null));
  };

  onMounted(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      selectedPlan.value = JSON.parse(savedPlan);
    }
  });
</script>
