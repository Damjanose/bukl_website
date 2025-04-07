<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Select Template</h3>
    <!-- Add your template selection UI here -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Template } from '../../types.ts';

const selectedTemplate = ref<Template | null>(null);

// Add your templates data here
</script>
