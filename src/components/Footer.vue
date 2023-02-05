<script setup lang="ts">
var version = APP_VERSION
</script>

<template>
  <a
    href="https://github.com/paul-mcglinchey/bio-tracker" 
    class="bg-neutral-100 lg:bg-transparent fixed left-0 bottom-0 text-center w-screen text-sm font-bold lowercase lg:pb-2 group"
  >
    <span class="border-r-2 mr-2 pr-2">v{{ version }}</span>
    <span class="inline-block group-hover:-translate-x-full group-hover:scale-x-0 transition-transform origin-right">
      Developed by
    </span>
    <span class="inline-block text-indigo-800 group-hover:-translate-x-2/3 origin-bottom group-hover:bg-gray-900 group-hover:text-indigo-500 rounded px-1 py-0.5 transition-transform ease-in-out duration-300">
      <span class="hidden group-hover:inline">@</span>
      <span>
        Paul<span class="group-hover:hidden before:content-['_']"></span>McGlinchey
      </span>
    </span>
  </a>
</template>