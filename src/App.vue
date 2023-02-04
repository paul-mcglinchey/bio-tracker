<script setup lang="ts">
import './assets/main.css'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Splash from './components/Splash.vue'
import Nav from './components/Nav.vue'

</script>

<template>
  <div class="px-2 md:px-5 mt-2">
    <header>
      <div class="flex justify-between items-center">
        <Header msg="Bio-tracker" />
        <Nav />
      </div>
    </header>
  
    <RouterView />
    
    <footer>
      <Footer />
    </footer>
  </div>
  <Splash />
</template>