<template>
                <div>
                  <h3 class="text-lg font-semibold mb-4">Select Template</h3>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search templates"
                    class="mb-4 p-2 border rounded-lg w-full"
                  />
                  <div class="grid grid-cols-2 gap-4">
                    <div
                      v-for="template in paginatedTemplates"
                      :key="template.id"
                      @click="updateTemplate(template.id)"
                      :class="[
                        'p-4 rounded-lg border flex flex-col items-center',
                        selectedTemplate === template.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      ]"
                    >
                      <img :src="template.preview" alt="Template Preview" class="mb-2 w-full h-32 object-cover rounded-lg" />
                      <span class="font-medium">{{ template.name }}</span>
                    </div>
                  </div>
                  <div class="mt-4 flex justify-center items-center space-x-4">
                    <button
                      @click="prevPage"
                      :disabled="currentPage === 1"
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span class="text-gray-700">
                      Page {{ currentPage }} of {{ totalPages }}
                    </span>
                    <button
                      @click="nextPage"
                      :disabled="currentPage === totalPages"
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </template>

              <script setup lang="ts">
              import { ref, computed } from 'vue';
              import type { Template } from '../../types.ts';

              const props = defineProps<{
                selectedTemplate: string | null;
              }>();

              const emit = defineEmits<{
                (e: 'update:selectedTemplate', value: string): void;
              }>();

              const templates = [
                { id: 'template1', name: 'Template 1', preview: 'path/to/preview1.jpg' },
                { id: 'template2', name: 'Template 2', preview: 'path/to/preview2.jpg' },
                { id: 'template3', name: 'Template 3', preview: 'path/to/preview3.jpg' },
                { id: 'template4', name: 'Template 4', preview: 'path/to/preview4.jpg' },
                { id: 'template5', name: 'Template 5', preview: 'path/to/preview5.jpg' },
                { id: 'template6', name: 'Template 6', preview: 'path/to/preview6.jpg' },
                { id: 'template7', name: 'Template 7', preview: 'path/to/preview7.jpg' },
                { id: 'template8', name: 'Template 8', preview: 'path/to/preview8.jpg' }
              ];

              const searchQuery = ref('');
              const selectedTemplate = ref<string | null>(null);
              const currentPage = ref(1);
              const itemsPerPage = 4;

              const filteredTemplates = computed(() => {
                return templates.filter(template =>
                  template.name.toLowerCase().includes(searchQuery.value.toLowerCase())
                );
              });

              const totalPages = computed(() => {
                return Math.ceil(filteredTemplates.value.length / itemsPerPage);
              });

              const paginatedTemplates = computed(() => {
                const start = (currentPage.value - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                return filteredTemplates.value.slice(start, end);
              });

              const updateTemplate = (id: string) => {
                selectedTemplate.value = id;
                emit('update:selectedTemplate', id);
              };

              const nextPage = () => {
                if (currentPage.value < totalPages.value) {
                  currentPage.value++;
                }
              };

              const prevPage = () => {
                if (currentPage.value > 1) {
                  currentPage.value--;
                }
              };
              </script>
