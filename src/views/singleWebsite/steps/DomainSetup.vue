<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Domain Setup</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Domain Name
        </label>
        <div class="flex gap-4">
          <input
            v-model="localDomain"
            type="text"
            placeholder="Enter domain name"
            class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            @click="checkDomainAvailability"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Search class="h-5 w-5" />
          </button>
        </div>
        <p class="text-sm text-gray-500 mt-1">
          Hint: A valid domain should look like "example.com" or "my_website.org".
        </p>
        <p v-if="domainStatus" :class="domainStatus === 'Available' ? 'text-green-600' : 'text-red-600'" class="mt-2">
          {{ domainStatus }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Search } from 'lucide-vue-next';

  const props = defineProps<{
    domain: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:domain', value: string): void;
  }>();

  const localDomain = ref(props.domain);
  const domainStatus = ref<string | null>(null);

  const checkDomainAvailability = async () => {
    if (!localDomain.value) {
      domainStatus.value = 'Please enter a domain.';
      return;
    }

    const isAvailable = await fakeDomainCheck(localDomain.value);
    domainStatus.value = isAvailable ? 'Available' : 'Not Available';

    if (isAvailable) {
      emit('update:domain', localDomain.value);
    }
  };

  const fakeDomainCheck = async (domain: string): Promise<unknown> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(domain.length % 2 === 0);
      }, 500);
    });
  };
</script>
