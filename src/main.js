import App from './App.vue'
import {createApp} from 'vue'

import {maska} from 'maska'

import "./assets/css/app.css"
import '@/prototypes'
import directives from "@/directives";


const app = createApp(App)

app.directive('mask', maska)
directives(app)

import { nl } from 'yup-locales';
import { setLocale } from 'yup';
setLocale(nl);

app.mount('#app')

