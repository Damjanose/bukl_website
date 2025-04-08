<template>
      <div>
        <h3 class="text-lg font-semibold mb-4">Select Categories</h3>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="category in filteredCategories"
            :key="category.id"
            @click="toggleCategory(category.id)"
            :class="[
              'p-4 rounded-lg border flex items-center',
              selectedCategories.includes(category.id)
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
      selectedCategories: string[];
      selectedNiche: string | null;
    }>();

    const emit = defineEmits<{
      (e: 'update:selectedCategories', value: string[]): void;
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

    const selectedCategories = ref([...props.selectedCategories]);

    const filteredCategories = computed(() => {
      return categories.filter(category => category.niche === props.selectedNiche);
    });

    const toggleCategory = (id: string) => {
      if (selectedCategories.value.includes(id)) {
        selectedCategories.value = selectedCategories.value.filter(cat => cat !== id);
      } else {
        selectedCategories.value.push(id);
      }
      emit('update:selectedCategories', selectedCategories.value);
    };
    </script>
