import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";
import {useLocationStore} from "../../../shared/store/locationStore.js";

export const useAllFacilities = () => {
    const locations = ref([])

    const data = ref([])

    const loading = ref(false)

    const searchString = ref(null)

    const router = useRouter()

    const {makeRequest} = useAxios()

    const locationStore = useLocationStore()


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


    const getAllFacilities = async ({filter = ""}) => {
        try {
            loading.value = true;

            await locationStore.fetchLocations()

            const response = await makeRequest({
                url: `/Location?type=FACILITY&${filter}&_count=5000`,
            })

            if (response.entry) {
                data.value = []
                for (const entry of response.entry) {
                    data.value = [...data.value, {
                        ...entry,
                        district: entry.resource.partOf?.reference?.split('/')[1],
                        region: locationStore.getParentLocation(entry.resource.partOf?.reference?.split('/')[1]),
                        country: locationStore.getParentLocation(locationStore.getParentLocation(entry.resource.partOf?.reference?.split('/')[1])),
                    }]
                }
            } else data.value = []
        } catch (e) {
            toast.error('Error getting facilities')
        } finally {
            loading.value = false;
        }
    }

    const handleSearch = async (searchKey) => {
        searchString.value = searchKey
        if (searchKey.length > 0)
            await getAllFacilities({filter: `name=${searchKey}`})
        else if (searchKey === "")
            await getAllFacilities({})
    }


    return {
        handleSearch,
        getAllFacilities,
        data,
        searchString,
        headers,
        add,
        loading,
        locations,
    }
}