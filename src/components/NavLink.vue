<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, useLink, useRoute } from 'vue-router';

defineProps<{ to: string }>()

const route = useRoute()

</script>

<template>
  <RouterLink :active="route.matched.some(({ name }) => name === to)" :to="to" class="font-bold active:text-lg text-sm group lowercase font-mono">
    <span
      :class="[
        'relative inline-block px-2',
        'before:block before:absolute before:-inset-1 before:-skew-y-2 before:h-5/6 before:top-1 before:bg-gray-900 before:scale-x-0 before:origin-left before:group-hover:scale-x-100 before:transition-all before:ease-in-out before:duration-200'
      ]">
      <span class="relative text-indigo-500 group-hover:text-white transition-colors ease-in-out">
        <slot />
      </span>
    </span>
  </RouterLink>
</template>