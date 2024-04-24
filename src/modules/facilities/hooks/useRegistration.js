import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useFacilityDetails} from "./useFacilityDetails.js";
import {useToast} from "maz-ui";
import {useAxios} from "../../../shared/hooks/useAxios.js";

export const useRegistration = () => {

    const isOpen = ref(false)
    const loading = ref(false)
    const name = ref("")
    const country = ref("")
    const level = ref("")
    const region = ref("")
    const district = ref("")
    const code = ref("")
    const regionOptions = ref([])
    const countryOptions = ref([])

    const route = useRoute()

    const router = useRouter()


    const {resourceID} = route.params

    const {getDetails, state} = useFacilityDetails()

    const {makeRequest} = useAxios()


    const forms = [
        {
            id: "name",
            type: "text",
            label: "Health facility name",
            required: true,
            refName: name
        },
        {
            id: "country",
            type: "select",
            label: "Country",
            required: true,
            options: ['Ethiopia', 'Djibouti'],
            refName: country
        },
        {
            id: "level",
            type: "select",
            label: "Level",
            required: true,
            options: [
                "Hospital",
                "Health Centre_IV",
                "Health Centre_III",
                "Health Centre_II",
                "Health Post",
                "Comprehensive Health Post",
                "Surveillance office",
                "Primary Clinic",
                "Drug Vender",
            ],
            refName: level
        },
        {
            id: "region",
            type: "select",
            label: "Region/District",
            required: true,
            options: ['Addis', 'Afmadow', 'Djibouti', 'Lower Nile'],
            refName: region
        },
        {
            id: "code",
            type: "text",
            label: "Facility code(if any)",
            required: false,
            refName: code
        },
        {
            id: "district",
            type: "select",
            label: "District/Village",
            required: true,
            options: ['Addis', 'Afmadow', 'Djibouti', 'Lower Nile'],
            refName: district
        },
    ]

    const toast = useToast()

    const getRegions = async (partOf) => {
        try {
            loading.value = true;
            const response = await makeRequest({url: `Location?type=REGION&partof=${partOf}`})
            if (!response?.entry)
                return
            regionOptions.value = response.entry.map(entry => entry.resource.id)
        } catch (error) {
            toast.error('Error getting regions')
        } finally {
            loading.value = false;
        }
    }


    const getCountries = async () => {
        try {
            loading.value = true;
            const response = await makeRequest({url: `Location?type=COUNTRY}`})
            if (!response?.entry)
                return
            countryOptions.value = response.entry.map(entry => entry.resource.id)
        } catch (error) {
            toast.error('Error getting countries')
        } finally {
            loading.value = false;
        }
    }


    const submit = async (evt) => {
        evt.preventDefault()

        try {
            const response = await makeRequest({
                method: resourceID ? "PUT" : "POST",
                url: resourceID ? `Location/${resourceID}` : "Location",
                data: {
                    resourceType: "Location",
                    id: resourceID ? resourceID : name.value,
                    name: name.value,
                    region: region.value,
                    district: district.value,
                    level: level.value,
                    partOf: {
                        reference: `Location/${country.value}`
                    },
                    search: {
                        mode: "match"
                    },
                    type: [
                        {
                            coding: [
                                {code: "FACILITY"}
                            ]
                        }
                    ]
                }
            })

            if (response.id) {
                isOpen.value = !isOpen.value
                setTimeout(() => {
                    isOpen.value = false
                    router.push('/facility/registered-facilities')
                }, 1000)
            }
        } catch (e) {
            toast.error('Error creating facility', e)
        }

    }


    const close = () => {
        isOpen.value = false
        router.push('/facility/registered-facilities')
    }


    return {
        isOpen,
        loading,
        name,
        country,
        level,
        region,
        district,
        code,
        regionOptions,
        countryOptions,
        getDetails,
        state,
        forms,
        getRegions,
        getCountries,
        submit,
        close,
        resourceID
    }
}