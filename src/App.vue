<script setup lang="ts">
import './assets/main.css'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import NavLink from './components/NavLink.vue'
import Modal from './components/Modal.vue'
import Menu from './components/Menu.vue'
import { inject, ref, watch } from 'vue'
import { authInjectionKey } from './injectionKeys/auth.key'

const loginOpen = ref<boolean>(false)
const openLogin = (): void => { loginOpen.value = true }
const closeLogin = (): void => { loginOpen.value = false }

const auth = inject(authInjectionKey, ref(null))

</script>

<template>
  <div class="mx-5 mt-2">
    <header>
      <div class="flex justify-between">
        <Header msg="Bio-tracker" />
        <div class="flex items-center">
          <nav class="flex items-center space-x-4 pr-4 mr-4 border-r-2">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="about">About</NavLink>
          </nav>
          <button v-if="!auth?.isValid" type="button" @click="openLogin" class="text-lg lowercase text-neutral-500 font-bold px-2 py-1 h-fit border-b-2 border-transparent hover:border-neutral-500 transition-colors">
            Login
          </button>
          <Menu :label="'Hello, ' + auth?.model!.name ?? auth?.model!.username" v-else />
        </div>
      </div>
    </header>
  
    <RouterView />
    
    <footer>
      <Footer />
    </footer>
  </div>
  
  <Modal :is-open="loginOpen" @close="closeLogin" />
</template>