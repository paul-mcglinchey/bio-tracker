<script setup lang="ts">
import { dbInjectionKey } from '@/injectionKeys/db.key';
import { inject, ref } from 'vue';
import NavLink from '../components/NavLink.vue'
import Menu from '../components/Menu.vue'
import { XMarkIcon, Bars3Icon } from '@heroicons/vue/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { RouterLink } from 'vue-router';
import MobileNavLink from './MobileNavLink.vue';

const loginOpen = ref<boolean>(false)
const openLogin = (): void => { loginOpen.value = true }
const closeLogin = (): void => { loginOpen.value = false }

const db = ref(inject(dbInjectionKey))
const isValid = ref(db.value?.authStore.isValid)

db?.value?.authStore.onChange(() => {
  isValid.value = db.value?.authStore.isValid
})

</script>

<template>
  <div>
    <div class="hidden md:flex items-center">
      <nav class="flex items-center space-x-4 pr-4 mr-4 border-r-2">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
      
      <Menu v-if="isValid" :label="'Hello, ' + db?.authStore.model?.name ?? db?.authStore?.model?.username" />
      <button v-else type="button" @click="openLogin"
        class="text-lg lowercase text-neutral-500 font-bold px-2 py-1 h-fit border-b-2 border-transparent hover:border-neutral-500 transition-colors">
        Login
      </button>
    </div>
    
    <Disclosure as="nav" class="mt-2 sm:mb-4 md:hidden">
      <DisclosureButton>
        <Bars3Icon class="w-7 h-7 text-indigo-500" />
      </DisclosureButton>

      <DisclosurePanel class="lg:hidden h-screen w-screen inset-0 bg-white dark:bg-black/90 fixed z-50 mx-auto px-2 sm:px-6 overflow-y-hidden">
        <div class="flex items-center h-16 justify-end">
          <DisclosureButton class="">
            <XMarkIcon class="w-7 h-7 text-blue-500" />
          </DisclosureButton>
        </div>
        <div class="flex flex-col space-y-2">
          <DisclosureButton :as="MobileNavLink" to="/">Dashboard</DisclosureButton>
          <DisclosureButton :as="MobileNavLink" to="/about">About</DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <Modal :is-open="loginOpen" @close="closeLogin" />
  </div>
</template>