<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Select Category</h3>
    <!-- Add your category selection UI here -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Category } from '../../types.ts';

const selectedCategory = ref<Category | null>(null);

// Add your categories data here
</script>
