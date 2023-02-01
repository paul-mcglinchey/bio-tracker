<script setup lang="ts">
import './assets/main.css'
import { RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import NavLink from './components/NavLink.vue'

const route = useRoute()

</script>

<template>
  <div class="mx-5">
    <header>
      <div class="flex justify-between">
        <Header msg="Bio-tracker" />
        <nav class="flex items-center space-x-2">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="about">About</NavLink>
        </nav>
      </div>
    </header>
  
    <RouterView />
    
    <footer>
      <Footer />
    </footer>
  </div>
</template>