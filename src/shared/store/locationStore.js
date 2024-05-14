import {defineStore} from "pinia";


export const useLocationStore = defineStore("locations", {
    state: () => ({
        locations: [],
    }),
    getters: {
        getParentLocation: state => locationName => {
            const locationObject = state.locations.find(item => item.resource.name === locationName)
            return locationObject.resource.partOf.reference.split("/")[1]
        },
        getLocations: state => state.locations,
    },
    actions: {
        setLocations(entries) {
            this.locations = entries
        }
    }
})