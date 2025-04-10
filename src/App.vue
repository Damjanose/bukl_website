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
      @update-credits="updateCredits"
      :edit-data="editData"
    />

    <BulkWebsiteCreator
      v-if="view === 'create-bulk'"
      @back="view = 'dashboard'"
      @update-credits="updateCredits"
      :edit-data="editData"
    />

    <WebsiteHistory
      v-if="view === 'history'"
      @back="view = 'dashboard'"
      @edit-website="handleEditWebsite"
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

    <NotEnoughCredit
      v-if="showNotEnoughCreditsModal"
      @close="showNotEnoughCreditsModal = false"
      @navigate-buy-credits="navigateToBuyCredits"
    />

    <UpdatePlanModal
      v-if="showUpdatePlanModal"
      @close="showUpdatePlanModal = false"
      @navigate-pricing="navigateToPricing"
    />

    <UnsubscribeConfirmationModal
      v-if="showUnsubscribeModal"
      @close="showUnsubscribeModal = false"
      @confirm="confirmUnsubscribe"
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
  import NotEnoughCredit from './components/NotEnoughCredit.vue';
  import UpdatePlanModal from './components/UpdatePlanModal.vue';
  import UnsubscribeConfirmationModal from './components/UnsubscribeConfirmationModal.vue';

  const view = ref<'dashboard' | 'create-single' | 'create-bulk' | 'history' | 'buy-credits' | 'pricing'>('dashboard');
  const credits = ref<number>(parseInt(localStorage.getItem('credits') || '0', 10));
  const showNoPlanModal = ref(false);
  const showNotEnoughCreditsModal = ref(false);
  const showUpdatePlanModal = ref(false);
  const showUnsubscribeModal = ref(false);
  const editData = ref(null);

  const updateCredits = (newCredits: number) => {
    credits.value = newCredits;
  };

  const confirmUnsubscribe = () => {
    localStorage.setItem('selectedPlan', JSON.stringify(null));
    showUnsubscribeModal.value = false;
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

    if (selectedPlan === 'single' && type === 'bulk') {
      showUpdatePlanModal.value = true;
      return;
    }

    const requiredCredits = type === 'single' ? 100 : 80;
    if (credits.value < requiredCredits) {
      showNotEnoughCreditsModal.value = true;
      return;
    }

    view.value = type === 'single' ? 'create-single' : 'create-bulk';
  };

  const navigateToPricing = () => {
    showNoPlanModal.value = false;
    showUpdatePlanModal.value = false;
    view.value = 'pricing';
  };

  const navigateToBuyCredits = () => {
    showNotEnoughCreditsModal.value = false;
    view.value = 'buy-credits';
  };

  const handleEditWebsite = ({ website, type }: { website: any; type: 'normal' | 'bulk' }) => {
    editData.value = website;
    view.value = type === 'normal' ? 'create-single' : 'create-bulk';
  };
</script>
