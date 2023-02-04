<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

defineProps<{ to: string }>()

const route = useRoute()
const matched = ref(route.matched)

watch(route, () => {
  matched.value = route.matched
})

</script>

<template>
  <RouterLink 
    :to="to"
    v-slot="{ isActive }"
    active-class=""
    :class="['font-bold text-lg group lowercase font-mono']">
    <span
      :class="[
        'relative inline-block px-2',
        'before:block before:absolute before:-inset-1 before:-skew-y-2 before:h-5/6 before:top-1 before:bg-gray-900 before:scale-x-0 before:origin-left before:group-hover:scale-x-100 before:transition-all before:ease-in-out before:duration-200',
        isActive && 'before:scale-x-100'
      ]">
      <span :class="[
        'relative group-hover:text-white transition-colors ease-in-out',
        isActive ? 'text-white' : 'text-indigo-500'
      ]">
        <slot />
      </span>
    </span>
  </RouterLink>
</template>