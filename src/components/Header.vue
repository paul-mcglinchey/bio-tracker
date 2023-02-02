<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="text-4xl font-semibold tracking-wider lowercase">{{ msg }}</h1>
  </div>
</template>
