export const dummyStats = [
    {
        id: "0",
        title: "Total number of Cross Border Patients",
        number: 2500
    },
    {
        id: "1",
        title: "Total number of referrals",
        number: 1300
    },
]

export const dummyFacilities = [
    {
        name: "Ethiopian health facility",
        code: "10225",
        country: "Ethiopia",
        region: "Addis",
        level: "IV",
        district: "Tigray",
    },
    {
        name: "Djiboutian health facility",
        code: "1571",
        country: "Djibouti",
        region: "Afar",
        level: "III",
        district: "Afar",
    },
]

export const dummyPatients = [
    {
        name: "John Doe",
        gender: "Male",
        registrationDate: new Date(),
        cbID: "CB-785-965-789",
        facility: "Ethiopian facility"
    },
    {
        name: "Jane Doe",
        gender: "Female",
        registrationDate: new Date(),
        cbID: "CB-224-965-789",
        facility: "Ethiopian facility"
    },
    {
        name: "Mike Doe",
        gender: "Male",
        registrationDate: new Date(),
        cbID: "CB-785-889-789",
        facility: "Djiboutian facility"
    },
    {
        name: "Kelly Doe",
        gender: "Female",
        registrationDate: new Date(),
        cbID: "CB-785-965-112",
        facility: "Djiboutian facility"
    },
]

export const dummyReferrals = [
    {
        name: "Laura Doe",
        gender: "Female",
        registrationDate: new Date(),
        referredFrom: "Addis General Hospital",
        referredTo: "Djibouti General Hospital",
        reasonForReferral: "Travels",
        referralReceived: "Yes",
    },
    {
        name: "Jackie Doe",
        gender: "Female",
        registrationDate: new Date(),
        referredFrom: "Addis General Hospital",
        referredTo: "Djibouti General Hospital",
        reasonForReferral: "Equipment",
        referralReceived: "No",
    },

    {
        name: "Laura Doe",
        gender: "Female",
        registrationDate: new Date(),
        referredFrom: "Djibouti General Hospital",
        referredTo: "Ethiopian General Hospital",
        reasonForReferral: "Travels",
        referralReceived: "Yes",
    },
    {
        name: "Jack Doe",
        gender: "Male",
        registrationDate: new Date(),
        referredFrom: "Addis General Hospital",
        referredTo: "Djibouti General Hospital",
        reasonForReferral: "Travels",
        referralReceived: "Yes",
    },
]