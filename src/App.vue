<template>
      <div class="min-h-screen bg-gray-50">
        <DashboardHeader
          :credits="credits"
          @navigate-buy-credits="view = 'buy-credits'"
          @navigate-pricing="view = 'pricing'"
          @navigate-dashboard="view = 'dashboard'"
        />

        <DashboardOverview
          v-if="view === 'dashboard'"
          @create-single="checkPlanAndCredits('single')"
          @create-bulk="checkPlanAndCredits('bulk')"
          @view-history="view = 'history'"
          @buy-credits="view = 'buy-credits'"
        />

        <SingleWebsiteCreator
          v-if="view === 'create-single'"
          @back="view = 'dashboard'"
        />

        <BulkWebsiteCreator
          v-if="view === 'create-bulk'"
          @back="view = 'dashboard'"
        />

        <WebsiteHistory
          v-if="view === 'history'"
          @back="view = 'dashboard'"
        />

        <BuyCredits
          v-if="view === 'buy-credits'"
          @credits-updated="updateCredits"
          @back="view = 'dashboard'"
        />

        <PricingScreen
          v-if="view === 'pricing'"
          @back="view = 'dashboard'"
        />

        <NoPlanSelectedModal
          v-if="showNoPlanModal"
          @close="showNoPlanModal = false"
          @navigate-pricing="navigateToPricing"
        />

        <NotEnaughCredit
          v-if="showNotEnoughCreditsModal"
          @close="showNotEnoughCreditsModal = false"
          @navigate-buy-credits="navigateToBuyCredits"
        />
      </div>
    </template>

    <script setup lang="ts">
    import { ref, watch } from 'vue';
    import DashboardHeader from './components/DashboardHeader.vue';
    import DashboardOverview from './components/DashboardOverview.vue';
    import SingleWebsiteCreator from './views/singleWebsite/SingleWebsiteCreator.vue';
    import WebsiteHistory from './views/history/WebsiteHistory.vue';
    import BulkWebsiteCreator from './views/bulkWebsites/BulkWebsiteCreator.vue';
    import BuyCredits from './views/buyCredits/BuyCredits.vue';
    import PricingScreen from './views/pricing/PricingScreen.vue';
    import NoPlanSelectedModal from './components/NoPlanSelectedModal.vue';
    import NotEnaughCredit from './components/NotEnaughCredit.vue';

    const view = ref<'dashboard' | 'create-single' | 'create-bulk' | 'history' | 'buy-credits' | 'pricing'>('dashboard');
    const credits = ref<number>(parseInt(localStorage.getItem('credits') || '0', 10));
    const showNoPlanModal = ref(false);
    const showNotEnoughCreditsModal = ref(false);

    const updateCredits = (newCredits: number) => {
      credits.value = newCredits;
    };

    watch(credits, (newCredits) => {
      localStorage.setItem('credits', newCredits.toString());
    });

    const checkPlanAndCredits = (type: 'single' | 'bulk') => {
      const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || 'null');
      if (!selectedPlan) {
        showNoPlanModal.value = true;
        return;
      }

      const requiredCredits = type === 'single' ? 100 : 80; // Example credit requirements
      if (credits.value < requiredCredits) {
        showNotEnoughCreditsModal.value = true;
        return;
      }

      view.value = type === 'single' ? 'create-single' : 'create-bulk';
    };

    const navigateToPricing = () => {
      showNoPlanModal.value = false;
      view.value = 'pricing';
    };

    const navigateToBuyCredits = () => {
      showNotEnoughCreditsModal.value = false;
      view.value = 'buy-credits';
    };
    </script>
