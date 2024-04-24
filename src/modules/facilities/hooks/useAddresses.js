import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";

export const useAddresses = () => {

    const {makeRequest} = useAxios()

    const toast = useToast()

    const getAllLocations = async () => {
        try {
            const response = await makeRequest({url: 'Locations'})
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
            toast.error("Error getting location")

        }
    }


    return {getLocationByName, getAllLocations}
}