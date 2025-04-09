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
            <h3 class="text-lg font-semibold mb-4">Number of Websites and Domains</h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Number of Websites</label>
              <input
                v-model="numberOfWebsites"
                type="number"
                min="1"
                placeholder="Enter number of websites"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                @input="updateDomains"
              />
            </div>
            <div v-for="(domain, index) in domains" :key="index" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Domain for Website {{ index + 1 }}
              </label>
              <div class="flex gap-4">
                <input
                  v-model="domains[index]"
                  type="text"
                  placeholder="Enter domain name"
                  class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  @click="checkDomainAvailability(index)"
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Check
                </button>
              </div>
              <p v-if="domainStatus[index]" :class="domainStatus[index] === 'Available' ? 'text-green-600' : 'text-red-600'" class="mt-2">
                {{ domainStatus[index] }}
              </p>
            </div>
            <p class="text-sm text-gray-500 mt-1" v-if="domains.length">
              Hint: A valid domain should look like "example.com" or "mywebsite.org".
            </p>
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

<!--          <ConfirmBulk-->
<!--            v-if="currentStep === 7"-->
<!--            :domains="domains"-->
<!--            :selectedNiche="selectedNiche"-->
<!--            :selectedCategories="selectedCategories"-->
<!--            :selectedTemplate="selectedTemplate"-->
<!--            :selectedHosting="selectedHosting"-->
<!--            @goToStep="currentStep = $event"-->
<!--            @confirm="handleConfirm"-->
<!--            :number-of-websites="numberOfWebsites"-->
<!--            :payment-details="selectedPaymentMethod"-->
<!--            :paymentDetails="selectedPaymentDetails"-->
<!--           selected-payment-method=""-->
<!--          />-->

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
    import { ref, computed } from 'vue';
    import { ArrowLeft } from 'lucide-vue-next';
    import SelectNiche from '../singleWebsite/steps/SelectNiche.vue';
    import SelectCategory from '../singleWebsite/steps/SelectCategory.vue';
    import SelectTemplate from '../singleWebsite/steps/SelectTemplate.vue';
    import SelectHosting from '../singleWebsite/steps/SelectHosting.vue';
    import ConfirmBulk from './steps/ConfirmBulk.vue';
    import SuccessModal from '../../components/SuccessModal.vue';
    import Payment from '../singleWebsite/steps/Payment.vue';

    const emit = defineEmits<{
      (e: 'back'): void;
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

    const updateDomains = () => {
      const currentLength = domains.value.length;
      if (numberOfWebsites.value > currentLength) {
        domains.value.push(...Array(numberOfWebsites.value - currentLength).fill(''));
        domainStatus.value.push(...Array(numberOfWebsites.value - currentLength).fill(null));
      } else if (numberOfWebsites.value < currentLength) {
        domains.value.splice(numberOfWebsites.value);
        domainStatus.value.splice(numberOfWebsites.value);
      }
    };

    const checkDomainAvailability = async (index: number) => {
      const domain = domains.value[index];
      if (!domain) {
        domainStatus.value[index] = 'Please enter a domain.';
        return;
      }

      // Simulate an API call to check domain availability
      const isAvailable = await fakeDomainCheck(domain);
      domainStatus.value[index] = isAvailable ? 'Available' : 'Not Available';
    };

    const fakeDomainCheck = async (domain: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(domain.length % 2 === 0); // Simulate availability based on domain length
        }, 500);
      });
    };

    const handleNextStep = () => {
      if (currentStep.value === steps.length) {
        showSuccessModal.value = true;
      } else {
        currentStep.value++;
      }
    };

    const handleConfirm = () => {
      const websitesData = domains.value.map(domain => ({
        website_id: Date.now(),
        domain,
        selectedNiche: selectedNiche.value,
        selectedCategories: selectedCategories.value,
        selectedTemplate: selectedTemplate.value,
        selectedHosting: selectedHosting.value,
        selectedPaymentMethod: selectedPaymentMethod.value,
      }));

      const createdWebsites = JSON.parse(localStorage.getItem('Created_websites') || '[]');
      createdWebsites.push(...websitesData);
      localStorage.setItem('Created_bulk_websites', JSON.stringify(createdWebsites));
      showSuccessModal.value = true;
    };
    </script>
