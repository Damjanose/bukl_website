<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white rounded-lg p-6 shadow-lg">
      <h3 class="text-lg font-semibold mb-4">Success</h3>
      <p class="mb-4">Website created successfully!</p>
      <button @click="closeModal" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        Thank you
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'back'): void;
}>();

const closeModal = () => {
  emit('close');
  emit('back');

};
</script>
