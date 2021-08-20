import App from './App.vue'
import {createApp} from 'vue'

import Maska from 'maska'

import "./assets/css/app.css"
import '@/prototypes'

const app = createApp(App)

app.use(Maska);
app.mount('#app')
