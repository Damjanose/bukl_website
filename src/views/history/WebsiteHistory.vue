<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Back Button -->
    <button
      @click="$emit('back')"
      class="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
    >
      <ArrowLeft class="h-5 w-5 mr-2" />
      <span class="text-base font-medium">Back to Dashboard</span>
    </button>

    <h2 class="text-2xl font-bold mb-6 text-gray-800">Website History</h2>

    <!-- Normal Websites -->
    <div
      v-if="normalWebsites.length > 0"
      class="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Normal Websites</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-700 uppercase tracking-wider">
          <tr>
            <th class="px-4 py-3">Domain</th>
            <th class="px-4 py-3">Niche</th>
            <th class="px-4 py-3">Category</th>
            <th class="px-4 py-3">Template</th>
            <th class="px-4 py-3">Hosting</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          <tr v-for="website in normalWebsites" :key="website.website_id">
            <td class="px-4 py-3 font-medium text-gray-900">{{ website.domain }}</td>
            <td class="px-4 py-3">{{ website.selectedNiche }}</td>
            <td class="px-4 py-3">{{ website.selectedCategories.join(', ') }}</td>
            <td class="px-4 py-3">{{ website.selectedTemplate }}</td>
            <td class="px-4 py-3">{{ website.selectedHosting }}</td>
            <td class="px-4 py-3 flex gap-2">
              <button
                @click="editWebsite(website, 'normal')"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                @click="deleteWebsite(website.website_id, 'normal')"
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bulk Websites -->
    <div
      v-if="bulkWebsites.length > 0"
      class="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
    >
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Bulk Websites</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-700 uppercase tracking-wider">
          <tr>
            <th class="px-4 py-3">Domains</th>
            <th class="px-4 py-3">Niche</th>
            <th class="px-4 py-3">Category</th>
            <th class="px-4 py-3">Template</th>
            <th class="px-4 py-3">Hosting</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          <tr v-for="website in bulkWebsites" :key="website.website_id">
            <td class="px-4 py-3 font-medium text-gray-900">{{ website.domain }}</td>
            <td class="px-4 py-3">{{ website.selectedNiche }}</td>
            <td class="px-4 py-3">{{ website.selectedCategories.join(', ') }}</td>
            <td class="px-4 py-3">{{ website.selectedTemplate }}</td>
            <td class="px-4 py-3">{{ website.selectedHosting }}</td>
            <td class="px-4 py-3 flex gap-2">
              <button
                @click="editWebsite(website, 'bulk')"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                @click="deleteWebsite(website.website_id, 'bulk')"
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="normalWebsites.length === 0 && bulkWebsites.length === 0"
      class="text-center text-gray-500 mt-10"
    >
      <p class="text-lg">No websites found in history.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from 'lucide-vue-next';

type SingleWebsite = {
  website_id: number;
  domain: string;
  selectedNiche: string | null;
  selectedCategories: string[];
  selectedTemplate: string | null;
  selectedHosting: string | null;
  selectedPaymentMethod: string | null;
  paymentDetails: Record<string, any>;
};

type BulkWebsites = {
  website_id: number;
  domain: string;
  selectedNiche: string | null;
  selectedCategories: string[];
  selectedTemplate: string | null;
  selectedHosting: string | null;
  selectedPaymentMethod: string | null;
  paymentDetails: Record<string, any>;
};

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'edit-website', payload: { website: SingleWebsite | BulkWebsites; type: 'normal' | 'bulk' }): void;
}>();

const normalWebsites = ref<SingleWebsite[]>([]);
const bulkWebsites = ref<BulkWebsites[]>([]);

const fetchWebsites = () => {
  const storedNormalWebsites = localStorage.getItem('Created_websites');
  const storedBulkWebsites = localStorage.getItem('Created_bulk_websites');
  normalWebsites.value = storedNormalWebsites ? JSON.parse(storedNormalWebsites) : [];
  bulkWebsites.value = storedBulkWebsites ? JSON.parse(storedBulkWebsites) : [];
};

const deleteWebsite = (websiteId: number, type: 'normal' | 'bulk') => {
  if (type === 'normal') {
    normalWebsites.value = normalWebsites.value.filter(w => w.website_id !== websiteId);
    localStorage.setItem('Created_websites', JSON.stringify(normalWebsites.value));
  } else {
    bulkWebsites.value = bulkWebsites.value.filter(w => w.website_id !== websiteId);
    localStorage.setItem('Created_bulk_websites', JSON.stringify(bulkWebsites.value));
  }
};

const editWebsite = (website: SingleWebsite | BulkWebsites, type: 'normal' | 'bulk') => {
  emit('edit-website', { website, type });
};

fetchWebsites();
</script>
