`<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button
      @click="$emit('back')"
      class="flex items-center text-gray-600 hover:text-gray-900 mb-8"
    >
      <ArrowLeft class="h-5 w-5 mr-2" />
      Back to Dashboard
    </button>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 class="text-2xl font-bold mb-6">
        {{ isBulk ? 'Bulk Website Creation' : 'Create New Website' }}
      </h2>

      <div class="mb-8">
        <div class="flex items-center">
          <template v-for="(step, index) in steps" :key="step">
            <div
              class="flex items-center"
              :class="{ 'opacity-50': currentStep < index + 1 }"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="[
                  currentStep > index + 1 ? 'bg-green-500' : 'bg-indigo-600',
                  'text-white'
                ]"
              >
                {{ index + 1 }}
              </div>
              <span class="ml-2">{{ step }}</span>
            </div>
            <div
              v-if="index < steps.length - 1"
              class="w-16 h-px bg-gray-300 mx-2"
            />
          </template>
        </div>
      </div>

      <div v-if="currentStep === 1">
        <h3 class="text-lg font-semibold mb-4">Domain Setup</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Domain Name
            </label>
            <div class="flex gap-4">
              <input
                v-model="domain"
                type="text"
                placeholder="Enter domain name"
                class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                <Search class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 2">
        <h3 class="text-lg font-semibold mb-4">Select Niche</h3>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="n in niches"
            :key="n.id"
            @click="selectedNiche = n.id"
            :class="[
              'p-4 rounded-lg border flex items-center',
              selectedNiche === n.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            <component :is="n.icon" class="h-6 w-6 text-indigo-500 mr-3" />
            <span class="font-medium">{{ n.name }}</span>
          </button>
        </div>
      </div>

      <div class="mt-8 flex justify-between">
        <button
          @click="currentStep--"
          :disabled="currentStep === 1"
          :class="[
            'px-4 py-2 rounded-lg',
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Previous
        </button>
        <button
          @click="currentStep++"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {{ currentStep === steps.length ? 'Create Website' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, Search, Globe2, Server } from 'lucide-vue-next';
import type { Niche } from '../types';

defineProps<{
  isBulk?: boolean;
}>();

defineEmits<{
  (e: 'back'): void;
}>();

const currentStep = ref(1);
const domain = ref('');
const selectedNiche = ref<Niche | null>(null);

const steps = [
  'Domain',
  'Niche',
  'Category',
  'Template',
  'Hosting',
  'Payment',
  'Confirm'
];

const niches = [
  { id: 'landing' as const, name: 'Landing Page', icon: Globe2 },
  { id: 'ecommerce' as const, name: 'Ecommerce', icon: Server },
  { id: 'sport-fantasy' as const, name: 'Sport Fantasy', icon: Globe2 },
  { id: 'social-casino' as const, name: 'Social Casino', icon: Server },
];
</script>`
