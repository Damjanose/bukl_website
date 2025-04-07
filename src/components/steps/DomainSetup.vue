<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Domain Setup</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Domain Name
        </label>
        <div class="flex gap-4">
          <input
            v-model="localDomain"
            type="text"
            placeholder="Enter domain name"
            class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Search class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search } from 'lucide-vue-next';

const props = defineProps<{
  domain: string;
}>();

const emit = defineEmits<{
  (e: 'update:domain', value: string): void;
}>();

const localDomain = ref(props.domain);

watch(localDomain, (newDomain) => {
  emit('update:domain', newDomain);
});
</script>
