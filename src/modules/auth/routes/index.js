export const authRoutes = [
    {
        name: "login",
        path: "/",
        component: () => import("../views/Login.vue"),
        meta: {
            checkAuth: true
        }
    }
]