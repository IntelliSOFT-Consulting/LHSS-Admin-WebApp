export const facilityRoutes = [
    {
        path: "/facility",
        component: () => import("../parent/FacilityParent.vue"),
        children: [
            {
                name: "dash",
                path: "",
                component: () => import ("../views/Dashboard.vue")
            },
            {
                name: "register-facility",
                path: "register",
                component: () => import ("../views/RegisterFacility.vue")
            },
            {
                name: "registered-facility",
                path: "registered-facilities",
                component: () => import ("../views/RegisteredFacilities.vue")
            },
        ]
    }
]