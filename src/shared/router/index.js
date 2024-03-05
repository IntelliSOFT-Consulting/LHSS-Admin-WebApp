import {createRouter, createWebHistory} from "vue-router";
import {authRoutes} from "../../modules/auth/routes/index.js";
import {facilityRoutes} from "../../modules/facilities/routes/index.js";

const routes = [
    ...authRoutes,
    ...facilityRoutes,
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})