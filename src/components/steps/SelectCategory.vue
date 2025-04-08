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
  { id: 'construction', name: 'Construction', niche: 'landing' },
  { id: 'landscaping', name: 'Landscaping', niche: 'landing' },
  { id: 'fashion', name: 'Fashion', niche: 'ecommerce' },
  { id: 'mode', name: 'Mode', niche: 'ecommerce' },
  { id: 'tech', name: 'Tech', niche: 'ecommerce' },
  { id: 'sports', name: 'Sports', niche: 'sport-fantasy' },
  { id: 'games', name: 'Games', niche: 'sport-fantasy' },
  { id: 'clothes', name: 'Clothes', niche: 'sport-fantasy' },
  { id: 'gaming', name: 'Gaming', niche: 'social-casino' },
  { id: 'football', name: 'Football', niche: 'social-casino' },
  { id: 'basketball', name: 'Basketball', niche: 'social-casino' },
];

const selectedCategory = ref<string | null>(null);

const filteredCategories = computed(() => {
  return categories.filter(category => category.niche === props.selectedNiche);
});

const updateCategory = (id: string) => {
  selectedCategory.value = id;
  emit('update:selectedCategory', id);
};
</script>
