<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Confirm</h3>
    <div class="space-y-4">
      <div class="border-b border-gray-200">
        <h4 class="text-md font-semibold flex items-center justify-between">
          Domain
          <button @click="goToStep(1)" class="text-gray-500 hover:text-gray-700">
            <Edit3 class="h-5 w-5" />
          </button>
        </h4>
        <p>{{ domain }}</p>
      </div>
      <div class="border-b border-gray-200">
        <h4 class="text-md font-semibold flex items-center justify-between">
          Niche
          <button @click="goToStep(2)" class="text-gray-500 hover:text-gray-700">
            <Edit3 class="h-5 w-5" />
          </button>
        </h4>
        <p>{{ selectedNiche }}</p>
      </div>
      <div class="border-b border-gray-200">
        <h4 class="text-md font-semibold flex items-center justify-between">
          Category
          <button @click="goToStep(3)" class="text-gray-500 hover:text-gray-700">
            <Edit3 class="h-5 w-5" />
          </button>
        </h4>
        <p>{{ selectedCategory }}</p>
      </div>
      <div class="border-b border-gray-200">
        <h4 class="text-md font-semibold flex items-center justify-between">
          Template
          <button @click="goToStep(4)" class="text-gray-500 hover:text-gray-700">
            <Edit3 class="h-5 w-5" />
          </button>
        </h4>
        <p>{{ selectedTemplate }}</p>
      </div>
      <div class="border-b border-gray-200">
        <h4 class="text-md font-semibold flex items-center justify-between">
          Hosting
          <button @click="goToStep(5)" class="text-gray-500 hover:text-gray-700">
            <Edit3 class="h-5 w-5" />
          </button>
        </h4>
        <p>{{ selectedHosting }}</p>
      </div>
      <div>
        <h4 class="text-md font-semibold flex items-center justify-between">
          Payment Method
          <button @click="goToStep(6)" class="text-gray-500 hover:text-gray-700">
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
    </div>
    <button
      @click="confirm"
      class="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
    >
      Confirm and Create
    </button>
  </div>
</template>

<script setup lang="ts">
  import { Edit3 } from 'lucide-vue-next';

  const props = defineProps<{
    domain: string;
    selectedNiche: string | null;
    selectedCategory: string | null;
    selectedTemplate: string | null;
    selectedHosting: string | null;
    selectedPaymentMethod: string | null;
    paymentDetails: Record<string, any>;
  }>();

  const emit = defineEmits<{
    (e: 'goToStep', step: number): void;
    (e: 'confirm'): void;
  }>();

  const goToStep = (step: number) => {
    emit('goToStep', step);
  };

  const confirm = () => {
    emit('confirm');
  };
</script>
