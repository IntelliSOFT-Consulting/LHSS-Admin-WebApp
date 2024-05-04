import {createApp} from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'maz-ui/styles'
import "../css/maz-ui-variables.css"
import './style.css'
import 'vue3-easy-data-table/dist/style.css';
import App from './App.vue'
import {router} from "./shared/router/index.js";
import {installToaster} from 'maz-ui'
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
    faCheckCircle,
    faChevronLeft,
    faChevronRight,
    faFileExport,
    faUserCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight, faChevronLeft, faUserCircle, faFileExport, faCheckCircle)

const app = createApp(App)

// DEFAULT OPTIONS
const toasterOptions = {
    position: 'top-right',
    timeout: 10_000,
    persistent: false,
}

app
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(installToaster, toasterOptions)
    .component("EasyDataTable", Vue3EasyDataTable)
    .mount('#app')
