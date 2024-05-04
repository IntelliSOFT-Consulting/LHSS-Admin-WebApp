import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";
import {useAddresses} from "./useAddresses.js";

export const useAllFacilities = () => {

    const data = ref([])

    const loading = ref(false)

    const searchString = ref(null)

    const router = useRouter()

    const {makeRequest} = useAxios()

    const {getLocationByName} = useAddresses()

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
                url: `/Location?type=FACILITY&${filter}&_count=1000`,
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

    return {handleSearch, getAllFacilities, data, searchString, headers, add, getCountry, loading}
}