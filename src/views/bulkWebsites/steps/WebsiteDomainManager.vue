<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Number of Websites and Domains</h3>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Number of Websites</label>
      <input
        v-model.number="numberOfWebsites"
        type="number"
        min="1"
        max="50"
        placeholder="Enter number of websites"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        @input="updateDomains"
      />
    </div>
    <p v-if="!hasEnoughCredits" class="text-red-600">
      Not enough credits. You need {{ requiredCredits }} credits but only have {{ userCredits }}.
    </p>
    <div v-if="hasEnoughCredits">
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const emit = defineEmits<{
    (e: 'updateDomains', domains: string[]): void;
    (e: 'updateNumberOfWebsites', number: number): void;
  }>();

  const numberOfWebsites = ref(1);
  const domains = ref<string[]>([]);
  const domainStatus = ref<string[]>([]);

  const userCredits = ref<number>(parseInt(localStorage.getItem('credits') || '0', 10));

  const requiredCredits = computed(() => {
    const websites = numberOfWebsites.value;
    if (websites <= 5) {
      return websites * 80;
    } else if (websites <= 20) {
      return websites * 60;
    } else if (websites <= 40) {
      return websites * 50;
    } else if (websites <= 50) {
      return websites * 30;
    }
    return 0;
  });

  const hasEnoughCredits = computed(() => userCredits.value >= requiredCredits.value);

  const updateDomains = () => {
    if (numberOfWebsites.value > domains.value.length) {
      domains.value.push(...Array(numberOfWebsites.value - domains.value.length).fill(''));
      domainStatus.value.push(...Array(numberOfWebsites.value - domainStatus.value.length).fill(null));
    } else {
      domains.value.splice(numberOfWebsites.value);
      domainStatus.value.splice(numberOfWebsites.value);
    }
    emit('updateDomains', domains.value);
    emit('updateNumberOfWebsites', numberOfWebsites.value);
  };

  const checkDomainAvailability = async (index: number) => {
    const domain = domains.value[index];
    if (!domain) {
      domainStatus.value[index] = 'Please enter a domain.';
      return;
    }

    const isAvailable = await fakeDomainCheck(domain);
    domainStatus.value[index] = isAvailable ? 'Available' : 'Not Available';
  };

  const fakeDomainCheck = async (domain: string): Promise<unknown> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(domain.length % 2 === 0);
      }, 500);
    });
  };
</script>
