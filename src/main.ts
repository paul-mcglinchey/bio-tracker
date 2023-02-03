import { createApp, provide, ref } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { authInjectionKey } from './injectionKeys/auth.key'
import { APISettings } from './api/config'
import PocketBase, { BaseAuthStore } from 'pocketbase'

const app = createApp(App)

app.use(router)

app.mount('#app')

const db = new PocketBase(APISettings.baseURL)
const auth = ref<BaseAuthStore | null>(db.authStore)

app.provide(authInjectionKey, auth)