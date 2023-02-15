<script setup lang="ts">
var version = APP_VERSION
</script>

<template>
  <div class="fixed left-0 bottom-0 text-center w-screen text-sm lowercase">
    <a class="hidden md:inline-block border-r-2 mr-2 pr-2 text-indigo-900 hover:text-indigo-500" href="privacypolicy.html">
      <span>Privacy Policy</span>
    </a>
    <span class="border-r-2 mr-2 pr-2">v{{ version }}</span>
    <a
      href="https://github.com/paul-mcglinchey/bio-tracker" 
      class="bg-neutral-100 lg:bg-transparent lowercase lg:pb-2 group"
    >
      <span class="inline-block group-hover:-translate-x-full group-hover:scale-x-0 transition-transform origin-right">
        Created by
      </span>
      <span class="inline-block text-indigo-800 group-hover:-translate-x-2/3 origin-bottom group-hover:bg-gray-900 group-hover:text-indigo-500 rounded px-1 py-0.5 transition-transform ease-in-out duration-300">
        <span class="hidden group-hover:inline">@</span>
        <span>
          Paul<span class="group-hover:hidden before:content-['_']"></span>McGlinchey
        </span>
      </span>
    </a>
  </div>
</template>