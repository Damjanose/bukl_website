<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader :credits="credits" />

    <DashboardOverview
      v-if="view === 'dashboard'"
      @create-single="view = 'create-single'"
      @create-bulk="view = 'create-bulk'"
      @view-history="view = 'history'"
    />

    <SingleWebsiteCreator
      v-if="view === 'create-single'"
      @back="view = 'dashboard'"
    />

    <SingleWebsiteCreator
      v-if="view === 'create-bulk'"
      :is-bulk="true"
      @back="view = 'dashboard'"
    />

    <WebsiteHistory
      v-if="view === 'history'"
      @back="view = 'dashboard'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DashboardHeader from './components/DashboardHeader.vue';
import DashboardOverview from './components/DashboardOverview.vue';
import SingleWebsiteCreator from './components/SingleWebsiteCreator.vue';
import WebsiteHistory from './components/WebsiteHistory.vue';

const view = ref<'dashboard' | 'create-single' | 'create-bulk' | 'history'>('dashboard');
const credits = ref(100);
</script>
