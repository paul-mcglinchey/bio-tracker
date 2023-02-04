<script setup lang="ts">

defineProps<{
  to: string
}>()

</script>

<template>
  <RouterLink
    :to="to"
    v-slot="{ isActive }"
    as="Fragment"
  >
    <div :class="['p-2 text-indigo-500 font-bold tracking-wide lowercase flex justify-between items-center', isActive ? 'bg-neutral-200' : 'bg-transparent']">
      <slot />
      <div v-if="isActive" class="w-3 h-3 bg-indigo-500"></div>
    </div>
  </RouterLink>
</template>