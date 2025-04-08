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
            localPaymentMethod === 'crypto'
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
            localPaymentMethod === 'bank'
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
            localPaymentMethod === 'card'
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          Card
        </button>
      </div>
    </div>

    <!-- Conditional Forms -->
    <div class="mt-6">
      <div v-if="localPaymentMethod === 'card'">
        <h4 class="text-md font-semibold mb-4">Card Details</h4>
        <div class="flex items-center mb-4 border rounded-lg p-2">
          <CreditCard class="h-5 w-5 text-gray-500 mr-2" />
          <input v-model="localPaymentDetails.card.cardNumber" type="text" placeholder="Card Number" class="w-full outline-none" />
        </div>
        <div class="flex items-center mb-4 border rounded-lg p-2">
          <User class="h-5 w-5 text-gray-500 mr-2" />
          <input v-model="localPaymentDetails.card.cardholderName" type="text" placeholder="Cardholder Name" class="w-full outline-none" />
        </div>
        <div class="flex items-center mb-4 border rounded-lg p-2">
          <Calendar class="h-5 w-5 text-gray-500 mr-2" />
          <input v-model="localPaymentDetails.card.expiryDate" type="text" placeholder="Expiry Date (MM/YY)" class="w-full outline-none" />
        </div>
        <div class="flex items-center mb-4 border rounded-lg p-2">
          <Lock class="h-5 w-5 text-gray-500 mr-2" />
          <input v-model="localPaymentDetails.card.cvv" type="text" placeholder="CVV" class="w-full outline-none" />
        </div>
      </div>

      <div v-if="localPaymentMethod === 'bank'">
        <h4 class="text-md font-semibold mb-4">Bank Transfer</h4>
        <div class="flex items-center mb-4 border rounded-lg p-2">
          <Banknote class="h-5 w-5 text-gray-500 mr-2" />
          <input v-model="localPaymentDetails.bank.iban" type="text" placeholder="IBAN" class="w-full outline-none" />
        </div>
      </div>

      <div v-if="localPaymentMethod === 'crypto'">
        <h4 class="text-md font-semibold mb-4">Crypto Payment</h4>
        <div class="flex items-center mb-4 border rounded-lg p-2">
          <Bitcoin class="h-5 w-5 text-gray-500 mr-2" />
          <select v-model="localPaymentDetails.crypto.cryptoType" class="w-full outline-none">
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="litecoin">Litecoin</option>
          </select>
        </div>
        <div class="flex items-center mb-4 border rounded-lg p-2">
          <Wallet class="h-5 w-5 text-gray-500 mr-2" />
          <input v-model="localPaymentDetails.crypto.walletAddress" type="text" placeholder="Wallet Address" class="w-full outline-none" />
        </div>
      </div>
    </div>
  </div>
  </template>

<script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import { CreditCard, User, Calendar, Lock, Banknote, Bitcoin, Wallet } from 'lucide-vue-next';

  const props = defineProps<{
    selectedPaymentMethod: string | null;
    paymentDetails: Record<string, any>;
  }>();

  const emit = defineEmits<{
    (e: 'update:selectedPaymentMethod', value: string | null): void;
    (e: 'update:paymentDetails', value: Record<string, any>): void;
  }>();

  const credits = ref(100);

  const localPaymentMethod = ref(props.selectedPaymentMethod);
  const localPaymentDetails = reactive({
    card: { ...props.paymentDetails.card },
    bank: { ...props.paymentDetails.bank },
    crypto: { ...props.paymentDetails.crypto },
  });

  watch(localPaymentMethod, (newValue) => {
    emit('update:selectedPaymentMethod', newValue);
  });

  watch(localPaymentDetails, (newValue) => {
    emit('update:paymentDetails', newValue);
  });

  const purchaseCredits = () => {
    // Implement credit purchase logic here
  };

  const selectPaymentMethod = (method: 'crypto' | 'bank' | 'card') => {
    localPaymentMethod.value = method;
  };
</script>
