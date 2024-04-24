import {useAxios} from "../../../shared/hooks/useAxios.js";
import {reactive, ref} from "vue";
import {useToast} from "maz-ui";


export const useFacilityDetails = () => {
    const {makeRequest} = useAxios()

    const toast = useToast()

    const facility = ref()

    const state = reactive({
        "name": "",
        "country": "",
        "level": "",
        "region": "",
        "code": "",
    })


    const getDetails = async (resourceID) => {
        try {
            const response = await makeRequest({
                url: `/Location/${resourceID}`
            })
            state['name'] = response?.name
            state['country'] = response?.partOf?.reference?.split('/')[1]
            state['region'] = response?.partOf?.reference?.split('/')[1]
            facility.value = response
        } catch (e) {
            toast.error('Error getting facility', e)
        }
    }

    return {getDetails, state}
}