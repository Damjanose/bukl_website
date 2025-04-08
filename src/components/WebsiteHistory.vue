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
    <div v-if="websites.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
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
          <tr v-for="website in websites" :key="website.website_id">
            <td class="border border-gray-300 px-4 py-2">{{ website.domain }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedNiche }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedCategory }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedTemplate }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ website.selectedHosting }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button
                @click="deleteWebsite(website.website_id)"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-gray-600">
      <p>No websites found in history.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {ArrowLeft} from "lucide-vue-next";

const websites = ref([]);

// Fetch websites from localStorage
const fetchWebsites = () => {
  const storedWebsites = localStorage.getItem('Created_websites');
  websites.value = storedWebsites ? JSON.parse(storedWebsites) : [];
};

// Delete a website by ID
const deleteWebsite = (websiteId: number) => {
  websites.value = websites.value.filter((website) => website.website_id !== websiteId);
  localStorage.setItem('Created_websites', JSON.stringify(websites.value));
};

// Initialize the component
fetchWebsites();
</script>
