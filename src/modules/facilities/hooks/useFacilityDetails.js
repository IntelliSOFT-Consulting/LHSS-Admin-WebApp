import {useAxios} from "../../../shared/hooks/useAxios.js";
import {reactive, ref} from "vue";
import {useToast} from "maz-ui";
import {useLocationStore} from "../../../shared/store/locationStore.js";


export const useFacilityDetails = () => {
    const {makeRequest} = useAxios()


    const locationStore = useLocationStore()

    const toast = useToast()

    const facility = ref()

    const state = reactive({
        "name": "",
        "country": "",
        "level": "",
        "region": "",
        "code": "",
        "district": "",
    })


    const getDetails = async (resourceID) => {
        try {
            const response = await makeRequest({
                url: `/Location/${resourceID}`
            })
            state['name'] = response?.name
            state['district'] = response?.partOf?.reference?.split('/')[1]
            state['region'] = locationStore.getParentLocation(response?.partOf?.reference?.split('/')[1])
            state['country'] = locationStore.getParentLocation(locationStore.getParentLocation(response?.partOf?.reference?.split('/')[1]))
            facility.value = response
        } catch (e) {
            toast.error('Error getting facility', e)
        }
    }

    return {getDetails, state}
}