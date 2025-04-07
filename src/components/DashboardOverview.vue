`<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        @click="$emit('createSingle')"
        class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      >
        <Globe class="h-8 w-8 text-indigo-500 mb-4" />
        <h3 class="text-xl font-semibold mb-2">Create Single Website</h3>
        <p class="text-gray-600">Launch a new website with our guided setup process</p>
      </div>

      <div
        @click="$emit('createBulk')"
        class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      >
        <Package class="h-8 w-8 text-indigo-500 mb-4" />
        <h3 class="text-xl font-semibold mb-2">Bulk Creation</h3>
        <p class="text-gray-600">Create multiple websites efficiently in one go</p>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <History class="h-8 w-8 text-indigo-500 mb-4" />
        <h3 class="text-xl font-semibold mb-2">Website History</h3>
        <p class="text-gray-600">View and manage your created websites</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <CreditCard class="h-8 w-8 text-indigo-500 mb-4" />
        <h3 class="text-xl font-semibold mb-2">Buy Credits</h3>
        <p class="text-gray-600">Purchase credits to create more websites</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Globe, Package, History, CreditCard } from 'lucide-vue-next';

defineEmits<{
  (e: 'createSingle'): void;
  (e: 'createBulk'): void;
}>();
</script>`
