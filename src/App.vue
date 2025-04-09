<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader :credits="credits" />

    <DashboardOverview
      v-if="view === 'dashboard'"
      @create-single="view = 'create-single'"
      @create-bulk="view = 'create-bulk'"
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

const view = ref<'dashboard' | 'create-single' | 'create-bulk' | 'history' | 'buy-credits'>('dashboard');
const credits = ref<number>(parseInt(localStorage.getItem('credits') || '0', 10));

const updateCredits = (newCredits: number) => {
  credits.value = newCredits;
};

watch(credits, (newCredits) => {
  localStorage.setItem('credits', newCredits.toString());
});
</script>
