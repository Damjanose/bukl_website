<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button
      @click="$emit('back')"
      class="flex items-center text-gray-600 hover:text-gray-900 mb-8"
    >
      <ArrowLeft class="h-5 w-5 mr-2" />
      Back to Dashboard
    </button>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 class="text-2xl font-bold mb-6">Bulk Website Creation</h2>

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
        <WebsiteDomainManager
          @updateDomains="domains = $event"
          @updateNumberOfWebsites="numberOfWebsites = $event"
          :domains="domains"
          :number-of-websites="numberOfWebsites"
        />
      </div>

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

      <ConfirmBulk
        v-if="currentStep === 7"
        :domains="domains"
        :selectedNiche="selectedNiche"
        :selectedCategories="selectedCategories"
        :selectedTemplate="selectedTemplate"
        :selectedHosting="selectedHosting"
        :selectedPaymentMethod="selectedPaymentMethod"
        :paymentDetails="selectedPaymentDetails"
        @goToStep="currentStep = $event"
        @confirm="handleConfirm"
        :number-of-websites="numberOfWebsites"
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
  import WebsiteDomainManager from './steps/WebsiteDomainManager.vue';
  import SelectNiche from '../singleWebsite/steps/SelectNiche.vue';
  import SelectCategory from '../singleWebsite/steps/SelectCategory.vue';
  import SelectTemplate from '../singleWebsite/steps/SelectTemplate.vue';
  import SelectHosting from '../singleWebsite/steps/SelectHosting.vue';
  import ConfirmBulk from './steps/ConfirmBulk.vue';
  import SuccessModal from '../../components/SuccessModal.vue';
  import Payment from '../singleWebsite/steps/Payment.vue';

  const props = defineProps<{
    editData?: {
      domains: string[];
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
  const numberOfWebsites = ref(1);
  const domains = ref<string[]>([]);
  const domainStatus = ref<string[]>([]);
  const selectedNiche = ref(null);
  const selectedCategories = ref<string[]>([]);
  const selectedTemplate = ref(null);
  const selectedHosting = ref(null);
  const showSuccessModal = ref(false);
  const selectedPaymentMethod = ref(null);
  const selectedPaymentDetails = ref({});

  const steps = [
    'Websites & Domains',
    'Niche',
    'Category',
    'Template',
    'Hosting',
    'Payment',
    'Confirm',
  ];

 const canProceed = computed(() => {
   if (currentStep.value === 1) {
     return (
       numberOfWebsites.value > 0 &&
       domains.value.length === numberOfWebsites.value &&
       domains.value.every(domain => domain.trim() !== '') &&
       domainStatus.value.every(status => status === 'Available')
     );
   }
   return true;
 });

 watch(numberOfWebsites, (newCount) => {
   // Ensure domains and domainStatus arrays are updated when numberOfWebsites changes
   const currentLength = domains.value.length;

   if (newCount > currentLength) {
     domains.value.push(...Array(newCount - currentLength).fill(''));
     domainStatus.value.push(...Array(newCount - currentLength).fill(null));
   } else if (newCount < currentLength) {
     domains.value.splice(newCount);
     domainStatus.value.splice(newCount);
   }
 });

  const handleNextStep = () => {
    if (currentStep.value === steps.length) {
      showSuccessModal.value = true;
    } else {
      currentStep.value++;
    }
  };

  const handleConfirm = () => {
    const websites = numberOfWebsites.value;
    let requiredCredits = 0;
    if (websites <= 5) {
      requiredCredits = websites * 80;
    } else if (websites <= 20) {
      requiredCredits = websites * 60;
    } else if (websites <= 40) {
      requiredCredits = websites * 50;
    } else if (websites <= 50) {
      requiredCredits = websites * 30;
    }

    const currentCredits = parseInt(localStorage.getItem('credits') || '0', 10);
    const updatedCredits = currentCredits - requiredCredits;
    localStorage.setItem('credits', updatedCredits.toString());

    emit('update-credits', updatedCredits);

    const websitesData = domains.value.map(domain => ({
      website_id: Date.now(),
      domain,
      selectedNiche: selectedNiche.value,
      selectedCategories: selectedCategories.value,
      selectedTemplate: selectedTemplate.value,
      selectedHosting: selectedHosting.value,
      selectedPaymentMethod: selectedPaymentMethod.value,
    }));

    const createdWebsites = JSON.parse(localStorage.getItem('Created_bulk_websites') || '[]');
    createdWebsites.push(...websitesData);
    localStorage.setItem('Created_bulk_websites', JSON.stringify(createdWebsites));

    showSuccessModal.value = true;
  };

  // Populate fields if editing
  watch(
    () => props.editData,
    (newData) => {
      if (newData) {
        domains.value = newData.domains || [];
        numberOfWebsites.value = newData.domains?.length || 1;
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
