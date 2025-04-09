<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button
      @click="$emit('back')"
      class="flex items-center text-gray-600 hover:text-gray-900 mb-8"
    >
      <ArrowLeft class="h-5 w-5 mr-2" />
      Back to Dashboard
    </button>

    <h2 class="text-2xl font-bold mb-6">Website History</h2>

    <!-- Normal Websites -->
    <div v-if="normalWebsites.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
      <h3 class="text-lg font-semibold mb-4">Normal Websites</h3>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Domain</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Niche</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Template</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Hosting</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="website in normalWebsites" :key="website.website_id">
            <td class="border border-gray-300 px-4 py-2">{{ website.domain }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedNiche }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedCategories.join(', ') }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedTemplate }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedHosting }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button
                @click="deleteWebsite(website.website_id, 'normal')"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bulk Websites -->
    <div v-if="bulkWebsites.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h3 class="text-lg font-semibold mb-4">Bulk Websites</h3>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Domain</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Niche</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Categories</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Template</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Hosting</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="website in bulkWebsites" :key="website.website_id">
            <td class="border border-gray-300 px-4 py-2">{{ website.domain }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedNiche }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedCategories.join(', ') }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedTemplate }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedHosting }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button
                @click="deleteWebsite(website.website_id, 'bulk')"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="normalWebsites.length === 0 && bulkWebsites.length === 0" class="text-gray-600">
      <p>No websites found in history.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from "lucide-vue-next";


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

const normalWebsites = ref<SingleWebsite[]>([]);
const bulkWebsites = ref<BulkWebsites[]>([]);

// Fetch websites from localStorage
const fetchWebsites = () => {
  const storedNormalWebsites = localStorage.getItem('Created_websites');
  const storedBulkWebsites = localStorage.getItem('Created_bulk_websites');
  normalWebsites.value = storedNormalWebsites ? JSON.parse(storedNormalWebsites) : [];
  bulkWebsites.value = storedBulkWebsites ? JSON.parse(storedBulkWebsites) : [];
};

// Delete a website by ID and type
const deleteWebsite = (websiteId: number, type: 'normal' | 'bulk') => {
  if (type === 'normal') {
    normalWebsites.value = normalWebsites.value.filter((website) => website.website_id !== websiteId);
    localStorage.setItem('Created_websites', JSON.stringify(normalWebsites.value));
  } else {
    bulkWebsites.value = bulkWebsites.value.filter((website) => website.website_id !== websiteId);
    localStorage.setItem('Created_bulk_websites', JSON.stringify(bulkWebsites.value));
  }
};

// Initialize the component
fetchWebsites();
</script>
