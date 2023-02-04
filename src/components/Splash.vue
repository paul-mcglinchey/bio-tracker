<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

var activeInstances = ref<Ref<{ x: number, y: number, strength: number, id: string, lifespan: number }>[]>([])

const generateInstancePosition = () => {
  const yMax = Math.floor(window.innerHeight) + 25
  const xMax = Math.floor(window.innerWidth) + 25

  let activeY = Math.floor(Math.random() * yMax)
  let activeX = Math.floor(Math.random() * xMax)
  
  return { x: activeX, y: activeY }
}

const generateInstance = () => ref({ 
  ...generateInstancePosition(),
  strength: Math.random() * 0.5,
  id: uuidv4(),
  lifespan: Math.floor(Math.random() * 100) 
})

const cycleInstances = () => {

  for (let i = 0; i < activeInstances.value.length; i++) {
    activeInstances.value[i].value.lifespan--

    // remove dead instances
    if (activeInstances.value[i].value.lifespan <= 0) {
      activeInstances.value.splice(i, 1)
    }
  }

  // create new instances
  let numberOfInstancesToAdd = Math.floor(Math.random() * 5) + 1

  for (let i = 0; i < numberOfInstancesToAdd; i++) {
    activeInstances.value.push(generateInstance())
  }
}

onMounted(() => {

  // create 100 instances to populate the page
  for (let i = 0; i < 100; i++) {
    activeInstances.value.push(generateInstance())
  }

  setInterval(() => cycleInstances(), 100)
})

</script>

<template>
  <div class="w-screen h-screen absolute inset-0 -z-50 overflow-hidden">
    <TransitionGroup name="skybox">
      <div 
        v-for="instance in activeInstances"
        :key="instance.value.id"
        class="absolute rounded-full bg-indigo-500"
        :style="{
          top: instance.value.y + 'px',
          left: instance.value.x + 'px',
          opacity: instance.value.strength,
          width: instance.value.strength * 2 + 'rem',
          height: instance.value.strength * 2 + 'rem' 
        }">
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>

.skybox-enter-active,
.skybox-leave-active {
  transition: all 2s cubic-bezier(0.55, 0, 0.1, 1);
}
.skybox-enter-from,
.skybox-leave-to {
  opacity: 0 !important;
  transform: scale(0.01) !important;
}

</style>