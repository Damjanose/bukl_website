<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Confirm Bulk Website Creation</h3>
    <div class="mb-4">
      <h4 class="text-md font-semibold flex items-center justify-between">
        Number of Websites
        <button
          @click="$emit('goToStep', 1)"
          class="text-gray-500 hover:text-gray-700"
        >
          <Edit3 class="h-5 w-5" />
        </button>
      </h4>
      <p>{{ numberOfWebsites }}</p>
    </div>
    <div class="mb-4">
      <h4 class="text-md font-semibold flex items-center justify-between">
        Domains
        <button
          @click="$emit('goToStep', 2)"
          class="text-gray-500 hover:text-gray-700"
        >
          <Edit3 class="h-5 w-5" />
        </button>
      </h4>
      <ul class="list-disc pl-5">
        <li v-for="(domain, index) in domains" :key="index">{{ domain }}</li>
      </ul>
    </div>
    <div class="mb-4">
      <h4 class="text-md font-semibold flex items-center justify-between">
        Niche
        <button
          @click="$emit('goToStep', 3)"
          class="text-gray-500 hover:text-gray-700"
        >
          <Edit3 class="h-5 w-5" />
        </button>
      </h4>
      <p>{{ selectedNiche }}</p>
    </div>
    <div class="mb-4">
      <h4 class="text-md font-semibold flex items-center justify-between">
        Categories
        <button
          @click="$emit('goToStep', 4)"
          class="text-gray-500 hover:text-gray-700"
        >
          <Edit3 class="h-5 w-5" />
        </button>
      </h4>
      <p>{{ selectedCategories.join(', ') }}</p>
    </div>
    <div class="mb-4">
      <h4 class="text-md font-semibold flex items-center justify-between">
        Template
        <button
          @click="$emit('goToStep', 5)"
          class="text-gray-500 hover:text-gray-700"
        >
          <Edit3 class="h-5 w-5" />
        </button>
      </h4>
      <p>{{ selectedTemplate }}</p>
    </div>
    <div class="mb-4">
      <h4 class="text-md font-semibold flex items-center justify-between">
        Hosting
        <button
          @click="$emit('goToStep', 6)"
          class="text-gray-500 hover:text-gray-700"
        >
          <Edit3 class="h-5 w-5" />
        </button>
      </h4>
      <p>{{ selectedHosting }}</p>
    </div>
    <div>
      <h4 class="text-md font-semibold flex items-center justify-between">
        Payment Method
        <button
          @click="$emit('goToStep', 7)"
          class="text-gray-500 hover:text-gray-700"
        >
          <Edit3 class="h-5 w-5" />
        </button>
      </h4>
      <p>{{ selectedPaymentMethod }}</p>
      <div v-if="paymentDetails">
        <p v-if="selectedPaymentMethod === 'card'">
          <strong>Card Details:</strong><br />
          Card Number: {{ paymentDetails.card.cardNumber }}<br />
          Cardholder Name: {{ paymentDetails.card.cardholderName }}<br />
          Expiry Date: {{ paymentDetails.card.expiryDate }}
        </p>
        <p v-if="selectedPaymentMethod === 'bank'">
          <strong>Bank Transfer:</strong><br />
          IBAN: {{ paymentDetails.bank.iban }}
        </p>
        <p v-if="selectedPaymentMethod === 'crypto'">
          <strong>Crypto Payment:</strong><br />
          Crypto Type: {{ paymentDetails.crypto.cryptoType }}<br />
          Wallet Address: {{ paymentDetails.crypto.walletAddress }}
        </p>
      </div>
    </div>

    <div class="flex justify-between mt-8">
      <button
        @click="$emit('goToStep', 7)"
        class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        Back
      </button>
      <button
        @click="$emit('confirm')"
        class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Edit3 } from "lucide-vue-next";

  const props = defineProps<{
    numberOfWebsites: number;
    domains: string[];
    selectedNiche: string | null;
    selectedCategories: string[];
    selectedTemplate: string | null;
    selectedHosting: string | null;
    selectedPaymentMethod: string | null;
    paymentDetails: Record<string, any>;
  }>();

  const emit = defineEmits<{
    (e: 'goToStep', step: number): void;
    (e: 'confirm'): void;
  }>();
</script>
