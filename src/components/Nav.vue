<script setup lang="ts">
import { computed, ref } from 'vue';
import NavLink from '../components/NavLink.vue'
import Menu from '../components/Menu.vue'
import LoginModal from './LoginModal.vue'
import MobileNavLink from './MobileNavLink.vue';
import { XMarkIcon, Bars3Icon } from '@heroicons/vue/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { getAuth } from 'firebase/auth';

const auth = getAuth()
const loginOpen = ref<boolean>(false)
const openLogin = (): void => { loginOpen.value = true }
const closeLogin = (): void => { loginOpen.value = false }

const isValid = ref(!!auth.currentUser)

auth.onAuthStateChanged(user => {
  isValid.value = !!user
})

const greeting = computed(() => 'Hello, ' + (auth.currentUser?.displayName ?? auth.currentUser?.email))

const logout = async () => {
  console.log('here')
  await auth.signOut()
}

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

      <DisclosurePanel
        v-slot="{ close }"
        class="lg:hidden h-screen w-screen inset-0 text-neutral-800 bg-white fixed z-50 mx-auto px-2 sm:px-6 overflow-y-hidden"
      >
        <div :class="['flex items-center h-16', isValid ? 'justify-between' : 'justify-end']">
          <div v-if="isValid" class="">{{ greeting }}</div>
          <DisclosureButton class="">
            <XMarkIcon class="w-8 h-8 text-indigo-500" />
          </DisclosureButton>
        </div>
        <div class="flex flex-col space-y-2">
          <MobileNavLink @click="close()" to="/">Dashboard</MobileNavLink>
          <MobileNavLink @click="close()" to="/about">About</MobileNavLink>
        </div>
      <div class="flex text-center mt-4 border-t border-neutral-500/50 pt-4 justify-center text-lg">
        <DisclosureButton v-if="isValid" as="button" @click="logout" class="lowercase">Logout</DisclosureButton>
        <DisclosureButton v-else as="button" @click="openLogin" class="lowercase">Login</DisclosureButton>
      </div>
      </DisclosurePanel>
    </Disclosure>
    <LoginModal :is-open="loginOpen" @close="closeLogin" />
  </div>
</template>