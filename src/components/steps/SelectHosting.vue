<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Select Hosting</h3>
    <!-- Add your hosting selection UI here -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedHosting = ref<'self' | 'bulkweb' | null>(null);
</script>
