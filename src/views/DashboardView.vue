<script setup lang="ts">
import BiometricsView from '@/components/BiometricsView.vue';
import WelcomePanel from '@/components/WelcomePanel.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

const auth = getAuth()
const isAuthenticated = ref<Boolean>(false)

onAuthStateChanged(auth, user => {
  isAuthenticated.value = !!user
})
</script>

<template>
  <div class="mb-10">
    <WelcomePanel />
    <BiometricsView v-if="isAuthenticated" />
  </div>
</template>