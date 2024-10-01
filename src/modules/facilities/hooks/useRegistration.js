import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useToast} from "maz-ui";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import facilitiesCSV from "../../../shared/assets/facilities.csv"
import {csvToArrayOfObjects} from "../../../shared/utils/csvOperations.js";

export const useRegistration = () => {

    const isOpen = ref(false)
    const loading = ref(false)
    const name = ref("")
    const level = ref("")
    const district = ref("")
    const listOfFacilities = ref([])
    const searchString = ref("")
    const selectedFacility = ref({
        name: "",
        code: "",
        level: "",
        county: ""
    });


    const route = useRoute()

    const router = useRouter()

    const {resourceID} = route.params

    const {makeFHIRRequest} = useAxios()

    const toast = useToast()


    const submit = async (evt) => {
        evt.preventDefault()
        loading.value = true;
        try {
            const response = await makeFHIRRequest({
                method: resourceID ? "PUT" : "POST",
                url: resourceID ? `Location/${resourceID}` : "Location",
                data: {
                    resourceType: "Location",
                    id: resourceID ? resourceID : selectedFacility.value.name,
                    name: selectedFacility.value.name,
                    level: selectedFacility.value.level,
                    partOf: {
                        reference: `Location/${selectedFacility.value.county}`
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

    const getListOfFacilities = () => {
        fetch(facilitiesCSV)
            .then(res => res.text())
            .then(data => {
                const arrayOfFacilities = csvToArrayOfObjects(data)
                listOfFacilities.value = arrayOfFacilities;
                return arrayOfFacilities
            })
            .catch(err => err)
    }


    return {
        isOpen,
        loading,
        submit,
        close,
        getListOfFacilities,
        listOfFacilities,
        searchString,
        selectedFacility
    }
}