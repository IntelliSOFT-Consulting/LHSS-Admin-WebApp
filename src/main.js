import {createApp} from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'maz-ui/styles'
import "../css/maz-ui-variables.css"
import './style.css'
import 'vue3-easy-data-table/dist/style.css';
import App from './App.vue'
import {router} from "./shared/router/index.js";

const app = createApp(App)

app
    .use(router)
    .component("EasyDataTable", Vue3EasyDataTable)
    .mount('#app')
