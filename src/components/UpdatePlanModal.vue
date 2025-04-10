<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Update Your Plan</h2>
      <p class="text-gray-600 mb-6">
        Your current plan only allows creating single websites. To create bulk websites, please update your plan.
      </p>
      <div class="flex justify-end space-x-4">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          @click="$emit('navigate-pricing')"
        >
          Update Plan
        </button>
      </div>
    </div>
  </div>
</template>
