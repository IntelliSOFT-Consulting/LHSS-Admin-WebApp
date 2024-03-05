import {createApp} from 'vue'
import 'maz-ui/styles'
import "../css/maz-ui-variables.css"
import './style.css'
import App from './App.vue'
import {router} from "./shared/router/index.js";

const app = createApp(App)

app
    .use(router)
    .mount('#app')
