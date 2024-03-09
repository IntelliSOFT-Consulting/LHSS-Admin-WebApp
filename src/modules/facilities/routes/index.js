export const facilityRoutes = [
    {
        path: "/facility",
        component: () => import("../parent/FacilityParent.vue"),
        children: [
            {
                name: "Dashboard",
                path: "",
                component: () => import ("../views/Dashboard.vue")
            },
            {
                name: "RegisterFacility",
                path: "register",
                component: () => import ("../views/RegisterFacility.vue")
            },
        ]
    }
]