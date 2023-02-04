<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

var activeInstances = ref<{ x: number, y: number, strength: number, id: string }[]>([])

const generateInstancePosition = () => {
  const yMax = Math.floor(window.innerHeight) + 25
  const xMax = Math.floor(window.innerWidth) + 25

  let activeY = Math.floor(Math.random() * yMax)
  let activeX = Math.floor(Math.random() * xMax)
  
  return { x: activeX, y: activeY, strength: Math.random() * 0.5, id: uuidv4() }
}

const cycleInstances = async () => {
  var chanceToRemoveInstance = Math.random()

  // 30 % chance of removing an instance if less than 100 instances, otherwise 60%
  if (activeInstances.value.length > 100 ? chanceToRemoveInstance > 0.4 : chanceToRemoveInstance > 0.7) {
    activeInstances.value.splice(Math.floor(Math.random() * activeInstances.value.length), 1)
  }

  activeInstances.value.push(generateInstancePosition())
  
  setTimeout(() => cycleInstances(), 200)
}

onMounted(() => {

  for (let i = 0; i < 100; i++) {
    activeInstances.value.push(generateInstancePosition())
  }

  cycleInstances()
})

</script>

<template>
  <div class="w-screen h-screen absolute inset-0 -z-50 overflow-hidden">
    <TransitionGroup name="skybox">
      <div 
        v-for="instance in activeInstances"
        :key="instance.id"
        class="absolute rounded-full bg-indigo-500"
        :style="{
          top: instance.y + 'px',
          left: instance.x + 'px',
          opacity: instance.strength,
          width: instance.strength * 2 + 'rem',
          height: instance.strength * 2 + 'rem' 
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