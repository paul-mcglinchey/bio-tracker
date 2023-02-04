import { createApp, provide, ref } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { APISettings } from './api/config'
import PocketBase from 'pocketbase'
import { authServiceInjectionKey } from './injectionKeys/auth.service.key'
import { AuthService } from './services/auth.service'
import { dbInjectionKey } from './injectionKeys/db.key'

const app = createApp(App)

app.use(router)

const pb = new PocketBase(APISettings.baseURL)
app.provide(dbInjectionKey, pb)
app.provide(authServiceInjectionKey, new AuthService(pb))

app.mount('#app')
