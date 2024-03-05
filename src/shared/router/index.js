import {createRouter, createWebHistory} from "vue-router";
import {authRoutes} from "../../modules/auth/routes/index.js";

const routes = [
    ...authRoutes
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})