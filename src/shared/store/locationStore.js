import {defineStore} from "pinia";
import {useAxios} from "../hooks/useAxios.js";


export const useLocationStore = defineStore("locations", {
    state: () => ({
        locations: [],
    }),
    getters: {
        getParentLocation: state => locationName => {
            const locationObject = state.locations.find(item => item.resource.name === locationName)
            if(!locationObject)
                return "Not Found"
            return locationObject.resource.partOf.reference.split("/")[1]
        },
        getLocations: state => state.locations,
    },
    actions: {
        setLocations(entries) {
            this.locations = entries
        },
        async fetchLocations(){
            const {makeRequest} = useAxios()
            try {
                const response = await makeRequest({url: 'Location'})
                this.locations = response.entry
            } catch (error) {
                console.error("error", error)
            }
        },
    }
})