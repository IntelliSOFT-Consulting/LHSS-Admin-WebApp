import {createApp} from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'maz-ui/styles'
import "../css/maz-ui-variables.css"
import './style.css'
import 'vue3-easy-data-table/dist/style.css';
import App from './App.vue'
import router from "./shared/router/index.js";
import {installToaster} from 'maz-ui'
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
    faArrowRightFromBracket,
    faBars,
    faCheckCircle,
    faChevronLeft,
    faChevronRight,
    faFileExport,
    faUserCircle, faUserDoctor,
    faUserPlus,
    faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import pinia from "./shared/store/index.js";

library.add(faChevronRight, faChevronLeft, faUserCircle, faFileExport, faCheckCircle, faUserPlus, faXmarkCircle, faBars, faArrowRightFromBracket, faUserDoctor)

const app = createApp(App)


// DEFAULT OPTIONS
const toasterOptions = {
    position: 'top-right',
    timeout: 10_000,
    persistent: false,
}

app
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(pinia)
    .use(router)
    .use(installToaster, toasterOptions)
    .component("EasyDataTable", Vue3EasyDataTable)
    .mount('#app')
