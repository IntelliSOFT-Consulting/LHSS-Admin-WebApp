import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";

export const useAllFacilities = () => {
    const locations = ref([])

    const data = ref([])

    const loading = ref(false)

    const searchString = ref(null)

    const router = useRouter()

    const {makeRequest} = useAxios()


    const toast = useToast()

    const headers = [
        {
            text: "HEALTH FACILITY NAME",
            value: "resource.name",
        },
        {
            text: "LEVEL",
            value: "",
        },
        {
            text: "FACILITY CODE",
            value: "",
        },
        {
            text: "COUNTY OF ORIGIN",
            value: "country",
        },
        {
            text: "REGION",
            value: "region",
        },
        {
            text: "DISTRICT",
            value: "district",
        },
        {
            text: "ACTION",
            value: "id",
        },
    ]

    const add = () => router.push("/facility/register")

    const getCountry = async (region) => {
        try {
            const response = await getLocationByName(region)
            return response.resource?.partOf?.reference?.split('/')[1];
        } catch (error) {
            return "N/A"
        }
    }

    const getAllFacilities = async ({filter = ""}) => {
        try {
            loading.value = true;
            const response = await makeRequest({
                url: `/Location?type=FACILITY&${filter}&_count=5000`,
            })
            if (response.entry) {
                data.value = []
                for (const entry of response.entry) {
                    data.value = [...data.value, {
                        ...entry,
                        country: await getCountry(entry.resource.partOf?.reference?.split('/')[1])
                    }]
                }
            } else data.value = []
        } catch (e) {
            toast.error('Error getting facilities')
        } finally {
            loading.value = false;
        }
    }

    const handleSearch = (searchKey) => {
        searchString.value = searchKey
        if (searchKey.length > 0)
            getAllFacilities({filter: `name=${searchKey}`})
        else if (searchKey === "")
            getAllFacilities({})
    }

    const getAllLocations = async () => {
        try {
            const response = await makeRequest({url: 'Location'})
            locations.value = response.entry
            return response.entry
        } catch (error) {
            toast.error("Error getting locations")
        }
    }

    const getLocationByName = async (region) => {
        try {
            const response = await makeRequest({url: `Location?name=${region}`})
            return response?.entry[0]

        } catch (error) {
            return error?.message
        }
    }

    const getParentLocation = (name) => {
        const locationObject = locations?.value?.find(item => item.resource.name === name)
        if (!locationObject)
            return null;
        return locationObject.resource.partOf.reference.split("/")[1]
    }

    return {
        handleSearch,
        getAllFacilities,
        data,
        searchString,
        headers,
        add,
        getCountry,
        loading,
        getAllLocations,
        locations,
        getParentLocation
    }
}