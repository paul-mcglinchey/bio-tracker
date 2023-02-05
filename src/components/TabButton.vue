<script setup lang="ts">
import { Tab } from '@headlessui/vue';
</script>

<template>
  <Tab v-slot="{ selected }" class="text-left flex-shrink sm:px-2 py-1 sm:mx-1 outline-none border-b border-transparent transition-colors aria-selected:border-indigo-500 leading-tight flex items-center justify-between">
    <div>
      <slot />
    </div>
    <div v-if="selected" class="block sm:hidden bg-indigo-500 w-3 h-3">
    </div>
  </Tab>
</template>