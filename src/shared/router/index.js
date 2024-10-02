import {createRouter, createWebHistory} from "vue-router";
import {authRoutes} from "../../modules/auth/routes/index.js";
import {facilityRoutes} from "../../modules/facilities/routes/index.js";
import {useAuthStore} from "../store/authStore.js";
import pinia from "../store/index.js";

const routes = [
    ...authRoutes,
    ...facilityRoutes,
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


/**
 * return this line of code when the authentication is fixed
 *
 * router.beforeEach((to) => {
 *     const authStore = useAuthStore(pinia)
 *     return
 * })
 *     if (to.meta.requiresAuth && !authStore.accessToken) {
 *         // return {name: "login"}
 *     }
 */


router.beforeEach((to) => {
    const authStore = useAuthStore(pinia)
    if (to.meta.checkAuth && authStore.accessToken) {
        return {name: "dashboard"}
    }

})

export default router