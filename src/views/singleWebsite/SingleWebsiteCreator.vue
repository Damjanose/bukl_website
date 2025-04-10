<template>
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
        Create New Website
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

      <DomainSetup
        v-if="currentStep === 1"
        :domain="domain"
        @update:domain="domain = $event"
        @domain-valid="handleNextStep"
      />
      <SelectNiche
        v-if="currentStep === 2"
        :selectedNiche="selectedNiche"
        @update:selectedNiche="selectedNiche = $event"
      />
      <SelectCategory
        v-if="currentStep === 3"
        :selectedNiche="selectedNiche"
        :selectedCategories="selectedCategories"
        @update:selectedCategories="selectedCategories = $event"
      />
      <SelectTemplate
        v-if="currentStep === 4"
        :selectedTemplate="selectedTemplate"
        @update:selectedTemplate="selectedTemplate = $event"
      />
      <SelectHosting
        v-if="currentStep === 5"
        :selectedHosting="selectedHosting"
        @update:selectedHosting="selectedHosting = $event"
      />
      <Payment
        v-if="currentStep === 6"
        v-model:selectedPaymentMethod="selectedPaymentMethod"
        v-model:paymentDetails="selectedPaymentDetails"
      />
      <Confirm
        v-if="currentStep === 7"
        :domain="domain"
        :selectedNiche="selectedNiche"
        :selectedCategories="selectedCategories"
        :selectedTemplate="selectedTemplate"
        :selectedHosting="selectedHosting"
        :selectedPaymentMethod="selectedPaymentMethod"
        :paymentDetails="selectedPaymentDetails"
        @goToStep="currentStep = $event"
        @confirm="handleConfirm"
      />

      <div class="mt-8 flex justify-between">
        <button
          v-if="currentStep > 1"
          @click="currentStep--"
          class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Previous
        </button>

        <button
          v-if="currentStep < steps.length"
          @click="handleNextStep"
          :disabled="!canProceed"
          :class="[
            'bg-indigo-600 text-white px-4 py-2 rounded-lg',
            canProceed ? 'hover:bg-indigo-700' : 'cursor-not-allowed opacity-50'
          ]"
        >
          Next
        </button>
      </div>
    </div>

    <SuccessModal
      :visible="showSuccessModal"
      @close="showSuccessModal = false"
      @back="$emit('back')"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { ArrowLeft } from 'lucide-vue-next';
  import DomainSetup from './steps/DomainSetup.vue';
  import SelectNiche from './steps/SelectNiche.vue';
  import SelectCategory from './steps/SelectCategory.vue';
  import SelectTemplate from './steps/SelectTemplate.vue';
  import SelectHosting from './steps/SelectHosting.vue';
  import Payment from './steps/Payment.vue';
  import Confirm from './steps/Confirm.vue';
  import SuccessModal from '../../components/SuccessModal.vue';

  const props = defineProps<{
    editData?: {
      domain: string;
      selectedNiche: string | null;
      selectedCategories: string[];
      selectedTemplate: string | null;
      selectedHosting: string | null;
      selectedPaymentMethod: string | null;
      paymentDetails: Record<string, any>;
    };
  }>();

  const emit = defineEmits<{
    (e: 'back'): void;
    (e: 'update-credits', credits: number): void;
  }>();

  const currentStep = ref(1);
  const domain = ref('');
  const selectedNiche = ref(null);
  const selectedTemplate = ref(null);
  const selectedHosting = ref(null);
  const selectedPaymentMethod = ref(null);
  const selectedPaymentDetails = ref({});
  const showSuccessModal = ref(false);
  const selectedCategories = ref<string[]>([]);

  const steps = [
    'Domain',
    'Niche',
    'Category',
    'Template',
    'Hosting',
    'Payment',
    'Confirm',
  ];

  const canProceed = computed(() => {
    if (currentStep.value === 1) {
      return domain.value.trim() !== '';
    } else if (currentStep.value === 2) {
      return selectedNiche.value !== null;
    } else if (currentStep.value === 3) {
      return selectedCategories.value.length > 0;
    } else if (currentStep.value === 4) {
      return selectedTemplate.value !== null;
    } else if (currentStep.value === 5) {
      return selectedHosting.value !== null;
    } else if (currentStep.value === 6) {
      return selectedPaymentMethod.value !== null;
    }
    return true;
  });

  const handleNextStep = () => {
    if (currentStep.value === steps.length) {
      showSuccessModal.value = true;
    } else {
      currentStep.value++;
    }
  };

  const handleConfirm = () => {
    const websiteData = {
      website_id: Date.now(),
      domain: domain.value,
      selectedNiche: selectedNiche.value,
      selectedCategories: selectedCategories.value,
      selectedTemplate: selectedTemplate.value,
      selectedHosting: selectedHosting.value,
      selectedPaymentMethod: selectedPaymentMethod.value,
      paymentDetails: selectedPaymentDetails.value,
    };

    const createdWebsites = JSON.parse(localStorage.getItem('Created_websites') || '[]');
    createdWebsites.push(websiteData);
    localStorage.setItem('Created_websites', JSON.stringify(createdWebsites));

    const currentCredits = parseInt(localStorage.getItem('credits') || '0', 10);
    const updatedCredits = currentCredits - 100;
    localStorage.setItem('credits', updatedCredits.toString());

    emit('update-credits', updatedCredits);

    showSuccessModal.value = true;
  };

  watch(
    () => props.editData,
    (newData) => {
      if (newData) {
        domain.value = newData.domain;
        selectedNiche.value = newData.selectedNiche;
        selectedCategories.value = newData.selectedCategories;
        selectedTemplate.value = newData.selectedTemplate;
        selectedHosting.value = newData.selectedHosting;
        selectedPaymentMethod.value = newData.selectedPaymentMethod;
        selectedPaymentDetails.value = newData.paymentDetails;
      }
    },
    { immediate: true }
  );
</script>
