import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useFacilityDetails} from "./useFacilityDetails.js";
import {useToast} from "maz-ui";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useAddresses} from "./useAddresses.js";

export const useRegistration = () => {

    const isOpen = ref(false)
    const loading = ref(false)
    const name = ref("")
    const country = ref("")
    const level = ref("")
    const region = ref("")
    const district = ref("")
    const code = ref("")
    const districtOptions = ref([])
    const regionOptions = ref([])
    const countryOptions = ref([])

    const levelOptions = ref([
        "Hospital",
        "Health Centre_IV",
        "Health Centre_III",
        "Health Centre_II",
        "Health Post",
        "Comprehensive Health Post",
        "Surveillance office",
        "Primary Clinic",
        "Drug Vendor"
    ])

    const route = useRoute()

    const router = useRouter()


    const {resourceID} = route.params

    const {getDetails, state} = useFacilityDetails()

    const {getLocationByName} = useAddresses()


    const {makeRequest} = useAxios()


    const toast = useToast()

    const getCountries = async () => {
        try {
            loading.value = true;
            const response = await makeRequest({url: `Location?type=COUNTRY`})
            if (!response?.entry)
                return
            countryOptions.value = response.entry.map(entry => entry.resource.id)
        } catch (error) {
            toast.error('Error getting countries')
        } finally {
            loading.value = false;
        }
    }

    const getRegions = async (country) => {
        try {
            loading.value = true;
            const response = await makeRequest({url: `Location?type=REGION&partof=${country}`})
            if (!response?.entry)
                return
            regionOptions.value = response.entry.map(entry => entry.resource.name)
        } catch (error) {
            toast.error('Error getting regions')
        } finally {
            loading.value = false;
        }
    }

    const getDistricts = async (region) => {
        try {
            loading.value = true;
            const response = await makeRequest({url: `Location?type=DISTRICT&partof=${region}`});
            if (!response?.entry)
                return
            districtOptions.value = response.entry.map(entry => entry.resource.id)
        } catch (e) {
            toast.error('Error getting districts')
        } finally {
            loading.value = false;
        }
    }

    const populateFields = async (originalState) => {
        try {
            loading.value = true;

            name.value = originalState.name
            region.value = originalState.region

            const location = await getLocationByName(originalState.region)

            country.value = location.resource?.partOf?.reference?.split('/')[1]

        } catch (error) {
            toast.error('Error populating fields')
        } finally {
            loading.value = false;
        }
    }

    const submit = async (evt) => {
        evt.preventDefault()
        loading.value = true;
        try {
            const response = await makeRequest({
                method: resourceID ? "PUT" : "POST",
                url: resourceID ? `Location/${resourceID}` : "Location",
                data: {
                    resourceType: "Location",
                    id: resourceID ? resourceID : name.value,
                    name: name.value,
                    level: level.value,
                    partOf: {
                        reference: `Location/${district.value}`
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
        } finally {
            loading.value = false;
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
        getRegions,
        getCountries,
        submit,
        close,
        resourceID,
        levelOptions,
        populateFields,
        getDistricts,
        districtOptions
    }
}