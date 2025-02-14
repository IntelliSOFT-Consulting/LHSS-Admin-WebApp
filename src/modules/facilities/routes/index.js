export const facilityRoutes = [
    {
        name: "facilityParent",
        path: "/facility",
        component: () => import("../parent/FacilityParent.vue"),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                name: "dashboard",
                path: "",
                component: () => import ("../views/Dashboard.vue")
            },
            {
                name: "edit facility",
                path: "edit/:resourceID",
                component: () => import ("../views/RegisterFacility.vue")
            },
            {
                name: "registered facilities",
                path: "registered-facilities",
                component: () => import ("../views/AllFacilities.vue")
            },
            {
                name: "facility details",
                path: ":resourceID",
                component: () => import ("../views/FacilityDetails.vue")
            },
            {
                name: "facility reports",
                path: "reports",
                component: () => import ("../views/Reports.vue")
            },
            {
                name: "registered patients",
                path: "patients",
                component: () => import ("../views/RegisteredPatients.vue")
            },
            {
                name: "referrals",
                path: "referrals",
                component: () => import ("../views/Referrals.vue")
            },
            {
                name: "users",
                path: "users",
                component: () => import ("../views/Users.vue")
            },
            {
                name: "profile",
                path: "profile",
                component: () => import ("../views/Profile.vue")
            },
            {
                name: "providers",
                path: "providers",
                component: () => import ("../views/RegisterProvider.vue")
            },
        ]
    }
]