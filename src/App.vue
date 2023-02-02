<script setup lang="ts">
import './assets/main.css'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import NavLink from './components/NavLink.vue'
import Modal from './components/Modal.vue'
import { ref } from 'vue'
import { APISettings } from './api/config'
import PocketBase from 'pocketbase'

const pb = new PocketBase(APISettings.baseURL)
const loginOpen = ref<boolean>(false)
const openLogin = (): void => { loginOpen.value = true }
const closeLogin = (): void => { loginOpen.value = false }

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
          <button v-if="!pb.authStore.isValid" type="button" @click="openLogin" class="text-lg lowercase text-neutral-500 font-bold px-2 py-1 h-fit border-b-2 border-transparent hover:border-neutral-500 transition-colors">
            Login
          </button>
          <span v-else>Hello, {{ pb.authStore.model!['name'] ?? pb.authStore.model!['username'] }}</span>
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