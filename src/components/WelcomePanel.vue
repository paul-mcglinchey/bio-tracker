<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue'

const getPreference = (): boolean => {
  let localStorageValue = localStorage.getItem('welcome-open')
  
  return localStorageValue === null || localStorageValue === "true"
}

const updatePreference = (open: boolean) => {
  localStorage.setItem('welcome-open', (!open).toString())
}

const welcomeDefault = ref<boolean>(getPreference())

</script>

<template>
  <Disclosure v-slot="{ open }" :default-open="welcomeDefault">
    <div class="flex justify-end">
      <DisclosureButton @click="updatePreference(open)" as="button" class="flex items-center space-x-1">
        <div class="border-b border-transparent hover:border-neutral-500 text-xs transition-colors">
          {{ open ? 'Hide this' : 'Show welcome' }}
        </div>
        <ChevronUpIcon :class="[
          'w-3 h-3 text-neutral-500 transform transition-transform',
          !open && 'rotate-180'
        ]" />
      </DisclosureButton>
    </div>
    <Transition>
      <DisclosurePanel class="flex py-4 justify-center">
        <div class="max-w-fit">
          <h1 class="text-3xl lg:text-5xl font-bold tracking-wide text-left lg:text-center">The simplest way to track your progress</h1>
          <div class="flex justify-end mt-2">
            <button class="flex items-center space-x-2 hover:bg-indigo-500/20 py-0.5 transition-colors relative group">
              <span class="text-neutral-400 text-base lg:text-lg leading-tight">
                Do I need to log in?
              </span>
              <QuestionMarkCircleIcon class="w-5 h-5" />
              <div class="hidden hover:flex group-hover:flex absolute z-50 bg-white border border-indigo-500 top-full w-72 right-0 origin-top-right text-left text-sm p-2 flex-col space-y-2">
                <p>
                  No, absolutely not!
                </p>
                <p>
                  The application will work entirely locally on a per-device basis unless you decide to login. Click
                  <RouterLink to="/about" class="text-indigo-500 italic hover:text-indigo-700">here</RouterLink> to learn
                  more
                </p>
              </div>
            </button>
          </div>
        </div>
      </DisclosurePanel>
    </Transition>
  </Disclosure>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>