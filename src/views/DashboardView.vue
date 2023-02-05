<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/20/solid';
</script>

<template>
  <div class="flex justify-center py-4 lg:p-20">
    <div class="flex flex-col flex-shrink space-y-1 lg:space-y-4">
      <h1 class="text-4xl lg:text-5xl font-bold tracking-wide text-left lg:text-center">The simplest way to track your progress</h1>
      <div class="flex justify-end">
        <button class="flex items-center space-x-2 hover:bg-indigo-500/20 px-2 py-0.5 transition-colors relative group">
          <span class="text-neutral-400 text-md lg:text-lg text-right leading-tight">
            Do I need to log in?
          </span>
          <QuestionMarkCircleIcon class="w-5 h-5" />
          <div class="hidden hover:flex group-hover:flex absolute bg-indigo-500/20 top-full w-72 right-0 origin-top-right text-left text-sm p-2 flex-col space-y-2">
            <p>
              No, absolutely not!
            </p>
            <p>
              The application will work entirely locally on a per-device basis unless you decide to login. Click <RouterLink to="/about" class="text-indigo-500 italic hover:text-indigo-700">here</RouterLink> to learn more
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
