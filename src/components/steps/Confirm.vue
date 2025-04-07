<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Confirm</h3>
    <div class="space-y-4">
      <div>
        <h4 class="text-md font-semibold">Domain</h4>
        <p>{{ domain }}</p>
      </div>
      <div>
        <h4 class="text-md font-semibold">Niche</h4>
        <p>{{ selectedNiche }}</p>
      </div>
      <div>
        <h4 class="text-md font-semibold">Category</h4>
        <p>{{ selectedCategory }}</p>
      </div>
      <div>
        <h4 class="text-md font-semibold">Template</h4>
        <p>{{ selectedTemplate }}</p>
      </div>
      <div>
        <h4 class="text-md font-semibold">Hosting</h4>
        <p>{{ selectedHosting }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  domain: string;
  selectedNiche: string | null;
  selectedCategory: string | null;
  selectedTemplate: string | null;
  selectedHosting: string | null;
}>();
</script>
