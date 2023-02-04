<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="text-xl md:text-4xl tracking-wider lowercase">{{ msg }}</h1>
  </div>
</template>
