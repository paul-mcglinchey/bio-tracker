<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <RouterLink to="/">
      <h1 class="text-xl md:text-4xl tracking-wider lowercase select-none">{{ msg }}</h1>
    </RouterLink>
  </div>
</template>
