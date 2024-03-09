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
                name: "registered-facilities",
                path: "registered-facilities",
                component: () => import ("../views/RegisteredFacilities.vue")
            },
            {
                name: "facility-details",
                path: "details",
                component: () => import ("../views/FacilityDetails.vue")
            },
            {
                name: "facility-reports",
                path: "reports",
                component: () => import ("../views/Reports.vue")
            },
            {
                name: "registered-patients",
                path: "patients",
                component: () => import ("../views/RegisteredPatients.vue")
            },
            {
                name: "referrals",
                path: "referrals",
                component: () => import ("../views/Referrals.vue")
            },
        ]
    }
]