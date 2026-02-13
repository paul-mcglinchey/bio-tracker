import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = createApp(App)

app.use(router)

const firebaseConfig = {};

const firebaseApp = initializeApp(firebaseConfig)
getFirestore(firebaseApp)
getAnalytics(firebaseApp)
getAuth(firebaseApp)

app.mount('#app')
