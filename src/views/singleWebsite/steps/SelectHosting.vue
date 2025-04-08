<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Select Hosting</h3>
    <div class="grid grid-cols-2 gap-4">
      <button
        @click="updateHosting('self')"
        :class="[
          'p-4 rounded-lg border flex items-center',
          selectedHosting === 'self'
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        Self-hosted
      </button>
      <button
        @click="updateHosting('bulkweb')"
        :class="[
          'p-4 rounded-lg border flex items-center',
          selectedHosting === 'bulkweb'
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        Hosted on BulkWeb.io
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  selectedHosting: 'self' | 'bulkweb' | null;
}>();

const emit = defineEmits<{
  (e: 'update:selectedHosting', value: 'self' | 'bulkweb'): void;
}>();

const selectedHosting = ref<'self' | 'bulkweb' | null>(props.selectedHosting);

const updateHosting = (hosting: 'self' | 'bulkweb') => {
  selectedHosting.value = hosting;
  emit('update:selectedHosting', hosting);
};
</script>
