<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Select Niche</h3>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="n in niches"
        :key="n.id"
        @click="updateNiche(n.id)"
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
</template>

<script setup lang="ts">
  import { Globe2, Server } from 'lucide-vue-next';

  const props = defineProps<{
    selectedNiche: string | null;
  }>();

  const emit = defineEmits<{
    (e: 'update:selectedNiche', value: string): void;
  }>();

  const niches = [
    { id: 'landing' as const, name: 'Landing Page', icon: Globe2 },
    { id: 'ecommerce' as const, name: 'Ecommerce', icon: Server },
    { id: 'sport-fantasy' as const, name: 'Sport Fantasy', icon: Globe2 },
    { id: 'social-casino' as const, name: 'Social Casino', icon: Server },
  ];

  const updateNiche = (id: string) => {
    emit('update:selectedNiche', id);
  };
</script>
