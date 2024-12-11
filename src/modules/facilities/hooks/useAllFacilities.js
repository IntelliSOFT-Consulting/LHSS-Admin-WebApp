import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";
import {useLocationStore} from "../../../shared/store/locationStore.js";

export const useAllFacilities = () => {
    const locations = ref([]);
    const countries = ref([]);
    const counties = ref([]);
    const subCounties = ref([]);
    const wards = ref([]);
    const selectedCountryID = ref("");
    const selectedCountyID = ref("");
    const selectedSubCountyID = ref("");
    const selectedWardID = ref("");

    const data = ref([])

    const loading = ref(false)

    const searchString = ref(null)

    const router = useRouter()

    const {makeFHIRRequest} = useAxios()

    const locationStore = useLocationStore()


    const toast = useToast()

    const add = () => router.push("/facility/register")

    const getCountries = async () => {
        try {
            loading.value = true;
            const response = await makeFHIRRequest({
                url: "Location?type=COUNTRY"
            });

            if (response.entry) {
                /**
                 * flatten the entries
                 */
                countries.value = response.entry.map(entry => ({
                    ...entry,
                    value: entry.resource.id,
                    label: entry.resource.name
                }));
                /**
                 * Clear all address hierarchies down the list
                 */
                counties.value = [];
                subCounties.value = [];
                wards.value = [];
            } else {
                countries.value = []
            }
        } catch (e) {
            toast.error(`Error getting countries`)
        }
    }

    const getCounties = async ({countryID}) => {
        try {
            loading.value = true;
            const response = await makeFHIRRequest({
                url: `Location?partof=${countryID}&type=COUNTY&_count=5000`
            });

            if (response.entry) {
                /**
                 * flatten the entries
                 */
                counties.value = response.entry.map(entry => ({
                    ...entry,
                    value: entry.resource.id,
                    label: entry.resource.name
                }))
                /**
                 * Clear all address hierarchies down the list
                 */
                subCounties.value = [];
                selectedSubCountyID.value=""
                wards.value = [];
                selectedWardID.value="";
                data.value=[];
            } else {
                counties.value = []
            }
        } catch (e) {
            toast.error(`Error getting counties`)
        }finally {
            loading.value = false;
        }
    }

    const getSubCounties = async ({countyID}) => {
        try {
            loading.value = true;
            const response = await makeFHIRRequest({
                url: `Location?partof=${countyID}&type=SUB-COUNTY&_count=5000`
            });

            if (response.entry) {
                /**
                 * flatten the entries
                 */
                subCounties.value = response.entry.map(entry => ({
                    ...entry,
                    value: entry.resource.id,
                    label: entry.resource.name
                }))
                /**
                 * Clear all address hierarchies down the list
                 */
                wards.value = [];
                data.value=[];
            } else {
                subCounties.value = []
            }
        } catch (e) {
            toast.error(`Error getting counties`)
        }finally {
            loading.value = false;
        }
    }

    const getWards = async ({subCountyID}) => {
        try {
            loading.value = true;
            const response = await makeFHIRRequest({
                url: `Location?partof=${subCountyID}&type=WARD&_count=5000`
            });

            if (response.entry) {
                /**
                 * flatten the entries
                 */
                wards.value = response.entry.map(entry => ({
                    ...entry,
                    value: entry.resource.id,
                    label: entry.resource.name
                }))
            } else {
                wards.value = []
            }
        } catch (e) {
            toast.error(`Error getting counties`)
        }finally {
            loading.value = false;
        }
    }

    const getAllFacilities = async ({filter = "", wardID = ""}) => {
        try {
            loading.value = true;

            await locationStore.fetchLocations();

            let path = "/Location";
            let queryParams = [];

            queryParams.push("type=FACILITY", "_count=1000");

            if (filter) {
                queryParams.push(filter);
            }

            if (wardID) {
                queryParams.push(`partof=${wardID}`);
            }

            path += `?${queryParams.join("&")}`;

            const response = await makeFHIRRequest({
                url: path
            })
            if (response.entry) {
                data.value = []
                for (const entry of response.entry) {
                    data.value = [...data.value, {
                        ...entry,
                        district: entry?.resource?.partOf?.reference?.split('/')[1],
                        region: locationStore.getParentLocation(entry?.resource?.partOf?.reference?.split('/')[1]),
                        country: locationStore.getParentLocation(locationStore.getParentLocation(entry?.resource?.partOf?.reference?.split('/')[1])),
                    }]
                }
            } else data.value = []
            return response?.entry
        } catch (e) {
            toast.error('Error getting facilities')
        } finally {
            loading.value = false;
        }
    }

    const handleSearch = async (searchKey) => {
        searchString.value = searchKey
        if (searchKey.length > 2)
            await getAllFacilities({filter: `name=${searchKey}`})
        else if (searchKey === "")
            await getAllFacilities({})
    }


    return {
        handleSearch,
        getAllFacilities,
        data,
        searchString,
        add,
        loading,
        locations,
        getCountries,
        countries,
        selectedCountryID,
        getCounties,
        counties,
        selectedCountyID,
        getSubCounties,
        subCounties,
        selectedSubCountyID,
        getWards,
        wards,
        selectedWardID,
    }
}