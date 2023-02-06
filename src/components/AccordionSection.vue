<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon } from '@heroicons/vue/20/solid';

defineProps<{
  sectionTitle: string,
  defaultOpen?: boolean 
}>()

</script>

<template>
  <Disclosure as="div" v-slot="{ open }" :default-open="defaultOpen ?? false">
    <DisclosureButton as="button" class="w-full flex justify-between py-2 hover:bg-indigo-500/20">
      <div class="border-b border-indigo-500 text-lg">{{ sectionTitle }}</div>
      <ChevronUpIcon :class="['w-6 h-6 transform transition-transform', open && 'rotate-180']" />
    </DisclosureButton>
    <Transition>
      <DisclosurePanel>
        <slot />
      </DisclosurePanel>
    </Transition>
  </Disclosure>
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>