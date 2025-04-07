<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Select Template</h3>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search templates"
      class="mb-4 p-2 border rounded-lg w-full"
    />
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="template in filteredTemplates"
        :key="template.id"
        @click="updateTemplate(template.id)"
        :class="[
          'p-4 rounded-lg border flex flex-col items-center',
          selectedTemplate === template.id
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        <img :src="template.preview" alt="Template Preview" class="mb-2 w-full h-32 object-cover rounded-lg" />
        <span class="font-medium">{{ template.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Template } from '../../types.ts';

const props = defineProps<{
  selectedTemplate: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:selectedTemplate', value: string): void;
}>();

const templates = [
  { id: 'template1', name: 'Template 1', preview: 'path/to/preview1.jpg' },
  { id: 'template2', name: 'Template 2', preview: 'path/to/preview2.jpg' },
  // Add more templates here
];

const searchQuery = ref('');
const selectedTemplate = ref<string | null>(null);

const filteredTemplates = computed(() => {
  return templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const updateTemplate = (id: string) => {
  selectedTemplate.value = id;
  emit('update:selectedTemplate', id);
};
</script>
