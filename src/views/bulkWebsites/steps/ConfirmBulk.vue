<template>
      <div>
        <h3 class="text-lg font-semibold mb-4">Confirm Bulk Website Creation</h3>
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
          <ul class="list-disc pl-5 ml-3">
            <li v-for="(domain, index) in domains" :key="index">{{ index + 1 }}. {{ domain }}</li>
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
          <p class="ml-3">{{ selectedNiche }}</p>
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
          <p class="ml-3">{{ selectedCategories.join(', ') }}</p>
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
          <p class="ml-3">{{ selectedTemplate }}</p>
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
          <p class="ml-3">{{ selectedHosting }}</p>
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
          <div v-if="paymentDetails" class="ml-3">
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

        <div class="flex justify-end mt-8">
          <button
            @click="handleConfirm"
            class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import { Edit3 } from "lucide-vue-next";
    import { ref } from "vue";

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
      (e: 'update-credits', credits: number): void;
    }>();

    const handleConfirm = () => {
      // Calculate required credits
      const websites = props.numberOfWebsites;
      let requiredCredits = 0;
      if (websites <= 5) {
        requiredCredits = websites * 80;
      } else if (websites <= 20) {
        requiredCredits = websites * 60;
      } else if (websites <= 40) {
        requiredCredits = websites * 50;
      } else if (websites <= 50) {
        requiredCredits = websites * 30;
      }

      // Deduct credits from localStorage
      const currentCredits = parseInt(localStorage.getItem('credits') || '0', 10);
      const updatedCredits = currentCredits - requiredCredits;
      localStorage.setItem('credits', updatedCredits.toString());

      // Emit event to refresh credits in the header
      emit('update-credits', updatedCredits);

      // Emit confirm event to proceed
      emit('confirm');
    };
    </script>
