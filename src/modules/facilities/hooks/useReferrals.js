import {ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "maz-ui";
import {useAxios} from "../../../shared/hooks/useAxios.js";


export const useReferrals = () => {
    const rangeValues = ref({
        start: '',
        end: '',
    })

    const gender = ref("")
    const facilityFrom = ref("")
    const facilityTo = ref("")
    const loading = ref(false)
    const referrals = ref([])
    const filteredReferrals = ref([])
    const facilities = ref([]);

    const router = useRouter()
    const toast = useToast()

    const print = () => {
        const csvHeaders = ["Name", "Gender", "Registration Date", "Referred From", "Referred To", "Reason For Referral", "Referral Received"];

        let csvData = filteredReferrals.value.map(item => [`${item?.patient?.name[0]?.text}`, `${item?.patient?.gender}`, `${new Date(item.service.occurrenceDateTime).toDateString()}`, `${(item?.service?.supportingInfo?.find(item => item?.display === "REFERRING_FROM"))?.reference.split("/")[1]}`, `${(item?.service?.supportingInfo?.find(item => item?.display === "REFERRING_TO"))?.reference?.split("/")[1]}`, `${item?.service?.reasonCode[0].text}`, `${item?.service?.status == 'draft' ? 'Pending' : item?.service?.status == 'active' ? 'Recieved' : ''}`])

        csvData = [csvHeaders, ...csvData]

        const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(",")).join("\n")
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")

        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "Referrals.csv")
        document.body.appendChild(link)
        link.click()
    }

    const {makeRequest} = useAxios()

    const getPatient = async (patientID) => {
        try {
            const response = await makeRequest({url: `/Patient/${patientID}`})
            return response
        } catch (error) {
            toast.error('Error getting patient')

        }
    }

    const getReferrals = async () => {
        loading.value = true;
        try {
            const response = await makeRequest({
                url: `ServiceRequest`
            })
            if (response.entry)
                referrals.value = []

            for (const entry of response.entry) {
                let patientObject = await getPatient(entry.resource.subject.reference.split("/")[1])

                referrals.value = [...referrals.value,
                    {
                        service: {...entry.resource},
                        patient: {...patientObject}
                    }];

                filteredReferrals.value = [
                    ...filteredReferrals.value,
                    {
                        service: {...entry.resource},
                        patient: {...patientObject}
                    }
                ]

            }
        } catch (e) {
            toast.error('Error getting referrals')

        } finally {
            loading.value = false;
        }
    }

    const getFacilities = async () => {
        try {
            loading.value = true;
            const response = await makeRequest({url: `Location?type=FACILITY`})
            facilities.value = response?.entry?.map(entry => entry.resource.name)
        } catch (error) {
            toast.error('Error getting facilities')
        } finally {
            loading.value = false;
        }
    }

    const filterFacilityFrom = (facility) => {
        filteredReferrals.value = filteredReferrals.value.filter(item => (item.service.supportingInfo.find(info => info.display === "REFERRING_FROM")).reference.toLowerCase().includes(facility.split(" ")[0].toLowerCase()))
    }

    const filterFacilityTo = (facility) => {
        filteredReferrals.value = filteredReferrals.value.filter(item => (item.service.supportingInfo.find(info => info.display === "REFERRING_TO")).reference.toLowerCase().includes(facility.split(" ")[0].toLowerCase()))
    }

    const handleRange = () => {
        filteredReferrals.value = filteredReferrals.value.filter(item => (new Date(rangeValues.value.start) <= new Date(item.service.occurrenceDateTime)) && (new Date(rangeValues.value.end) >= new Date(item.service.occurrenceDateTime)))
    }

    const filterByGender = () => {
        if (gender.value === "all")
            filteredReferrals.value = referrals.value
        else
            filteredReferrals.value = referrals.value.filter(referral => referral.patient.gender === gender.value)
    }

    const handleClear = () => {
        gender.value = "all";
        facilityFrom.value = "";
        facilityTo.value = "";
        rangeValues.value = {
            start: "",
            end: ""
        }
        filteredReferrals.value = referrals.value;
    }

    return {
        rangeValues,
        gender,
        facilityTo,
        facilityFrom,
        loading,
        referrals,
        filteredReferrals,
        facilities,
        router,
        toast,
        print,
        getPatient,
        getReferrals,
        getFacilities,
        filterFacilityFrom,
        filterFacilityTo,
        handleRange,
        filterByGender,
        handleClear
    }


}