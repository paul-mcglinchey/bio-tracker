<script setup lang="ts">
import { onMounted, ref } from 'vue';

const path = ref("M42.7,-49.5C57.2,-38.7,72.1,-27,77,-11.7C82,3.7,77,22.6,68,40.2C59,57.9,45.9,74.1,31.3,74.3C16.7,74.5,0.6,58.7,-14.4,49.1C-29.4,39.5,-43.3,36.2,-48.1,27.8C-52.9,19.4,-48.7,5.8,-45.7,-7.6C-42.8,-20.9,-41.2,-34,-33.7,-46C-26.3,-58,-13.2,-68.9,0.5,-69.4C14.1,-70,28.2,-60.2,42.7,-49.5Z")

const handleClick = () => {
  var elem = document.getElementById("svgPath")

  if (elem) {
    var scale = ((Math.floor(Math.random() * 15) + 1) / 100) + 1
    elem.style.setProperty('--blob-scale', scale.toString())
  }
}

onMounted(() => {
  setInterval(() => handleClick(), 2000)
})

</script>

<template>
  <div class="w-full max-w-3xl flex flex-col justify-center">
    <svg class="fill-indigo-500 transition-all" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path id="svgPath" :d="path" class="transition-all stroke-indigo-200 origin-center" />
    </svg>
  </div>
</template>

<style scoped>

path {
  transform: scale(var(--blob-scale)) translate(50%, 50%);
  transition: transform 2s ease-in-out;
}

</style>