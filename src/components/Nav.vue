<script setup lang="ts">
import { dbInjectionKey } from '@/injectionKeys/db.key';
import { computed, inject, ref } from 'vue';
import NavLink from '../components/NavLink.vue'
import Menu from '../components/Menu.vue'
import Modal from '../components/Modal.vue'
import { XMarkIcon, Bars3Icon } from '@heroicons/vue/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import MobileNavLink from './MobileNavLink.vue';
import { authServiceInjectionKey } from '@/injectionKeys/auth.service.key';

const loginOpen = ref<boolean>(false)
const openLogin = (): void => { loginOpen.value = true }
const closeLogin = (): void => { loginOpen.value = false }

const db = ref(inject(dbInjectionKey))
const authService = ref(inject(authServiceInjectionKey))
const isValid = ref(db.value?.authStore.isValid)

db?.value?.authStore.onChange(() => {
  isValid.value = db.value?.authStore.isValid
})

const greeting = computed(() => 'Hello, ' + db?.value?.authStore.model?.name)

</script>

<template>
  <div>
    <div class="hidden md:flex items-center">
      <nav class="flex items-center space-x-4 pr-4 mr-4 border-r-2">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
      
      <Menu v-if="isValid" :label="greeting" />
      <button v-else type="button" @click="openLogin"
        class="text-lg lowercase text-neutral-500 font-bold px-2 py-1 h-fit border-b-2 border-transparent hover:border-neutral-500 transition-colors">
        Login
      </button>
    </div>
    
    <Disclosure as="nav" class="mt-2 sm:mb-4 md:hidden">
      <DisclosureButton>
        <Bars3Icon class="w-7 h-7 text-indigo-500" />
      </DisclosureButton>

      <DisclosurePanel class="lg:hidden h-screen w-screen inset-0 text-neutral-800 bg-white fixed z-50 mx-auto px-2 sm:px-6 overflow-y-hidden">
        <div :class="['flex items-center h-16', isValid ? 'justify-between' : 'justify-end']">
          <div v-if="isValid" class="">{{ greeting }}</div>
          <DisclosureButton class="">
            <XMarkIcon class="w-8 h-8 text-indigo-500" />
          </DisclosureButton>
        </div>
        <div class="flex flex-col space-y-2">
          <DisclosureButton :as="MobileNavLink" to="/">Dashboard</DisclosureButton>
          <DisclosureButton :as="MobileNavLink" to="/about">About</DisclosureButton>
        </div>
      <div class="flex text-center mt-4 border-t border-neutral-500/50 pt-4 justify-center text-lg">
        <DisclosureButton v-if="isValid" as="button" @click="authService?.logout()" class="lowercase">Logout</DisclosureButton>
        <DisclosureButton v-else as="button" @click="openLogin" class="lowercase">Login</DisclosureButton>
      </div>
      </DisclosurePanel>
    </Disclosure>
    <Modal :is-open="loginOpen" @close="closeLogin" />
  </div>
</template>