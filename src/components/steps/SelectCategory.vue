<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Select Category</h3>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="category in filteredCategories"
        :key="category.id"
        @click="updateCategory(category.id)"
        :class="[
          'p-4 rounded-lg border flex items-center',
          selectedCategory === category.id
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        <span class="font-medium">{{ category.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  selectedNiche: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:selectedCategory', value: string): void;
}>();

const categories = [
  { id: 'tech', name: 'Technology', niche: 'landing' },
  { id: 'fashion', name: 'Fashion', niche: 'ecommerce' },
  { id: 'sports', name: 'Sports', niche: 'sport-fantasy' },
  { id: 'gaming', name: 'Gaming', niche: 'social-casino' },];

const selectedCategory = ref<string | null>(null);

const filteredCategories = computed(() => {
  return categories.filter(category => category.niche === props.selectedNiche);
});

const updateCategory = (id: string) => {
  selectedCategory.value = id;
  emit('update:selectedCategory', id);
};
</script>
