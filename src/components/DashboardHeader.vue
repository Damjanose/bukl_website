<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0">
          <h1
            class="text-2xl font-bold text-indigo-600 cursor-pointer"
            @click="$emit('navigate-dashboard')"
          >
            BulkWeb.io
          </h1>
        </div>

        <div class="flex items-center space-x-4">
          <div
            class="flex items-center bg-indigo-50 px-4 py-2 rounded-lg cursor-pointer"
            @click="$emit('navigate-buy-credits')"
          >
            <Wallet class="h-5 w-5 text-indigo-500 mr-2" />
            <span class="font-medium text-indigo-700">{{ credits }} Credits</span>
          </div>

          <button class="p-2 rounded-full hover:bg-gray-100">
            <Bell class="h-5 w-5 text-gray-500" />
          </button>

          <button class="p-2 rounded-full hover:bg-gray-100">
            <Settings class="h-5 w-5 text-gray-500" />
          </button>

          <button class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
            <User class="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { Wallet, Bell, Settings, User } from 'lucide-vue-next';

  defineProps<{
    credits: number;
  }>();

  defineEmits<{
    (e: 'navigate-dashboard'): void;
    (e: 'navigate-buy-credits'): void;
  }>();
</script>
