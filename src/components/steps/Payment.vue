<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Payment</h3>
    <div class="mb-4">
      <p class="text-gray-600">You have {{ credits }} credits available.</p>
      <button @click="purchaseCredits" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        Purchase Credits
      </button>
    </div>
    <div>
      <h4 class="text-md font-semibold mb-2">Payment Methods</h4>
      <div class="grid grid-cols-3 gap-4">
        <button
          @click="selectPaymentMethod('crypto')"
          :class="[
            'p-4 rounded-lg border flex items-center justify-center',
            selectedPaymentMethod === 'crypto'
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          Crypto
        </button>
        <button
          @click="selectPaymentMethod('bank')"
          :class="[
            'p-4 rounded-lg border flex items-center justify-center',
            selectedPaymentMethod === 'bank'
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          Bank Transfer
        </button>
        <button
          @click="selectPaymentMethod('card')"
          :class="[
            'p-4 rounded-lg border flex items-center justify-center',
            selectedPaymentMethod === 'card'
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          Card
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const credits = ref(100); // Example credit balance
const selectedPaymentMethod = ref<'crypto' | 'bank' | 'card' | null>(null);

const purchaseCredits = () => {
  // Implement credit purchase logic here
};

const selectPaymentMethod = (method: 'crypto' | 'bank' | 'card') => {
  selectedPaymentMethod.value = method;
};
</script>
