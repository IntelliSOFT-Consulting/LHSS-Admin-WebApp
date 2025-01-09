import {useToast} from "maz-ui";
import {ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";

export const usePatients = () => {
    const toast = useToast()

    const data = ref([])

    const gender = ref("")

    const surname = ref("")

    const {makeFHIRRequest, loading} = useAxios()

    const getPatients = async ({filter = ""}) => {
        try {
            const response = await makeFHIRRequest({
                url: `/Patient?${filter}&_count=1000&_tag:not=GOLDEN_RECORD`
            })

            if (response.entry)
                data.value = response.entry
            else
                data.value = []
        } catch (e) {
            toast.error("Error fetching patients")
        }
    }

    const clearFilters = () => {
        gender.value = ""
        surname.value = ""
    }

    const getCBDId = (array) => {
        if (array)
            return (array.find(obj => obj?.type?.text?.toLowerCase()?.includes('cross')))?.value || " "
        return " "
    }

    const filterPatients = () => {
        let filterString = ``
        if (gender.value === "male" || gender.value === "female")
            filterString = filterString + `&gender=${gender.value}`;
        if (surname.value)
            filterString = filterString + `&name=${surname.value}`;

        getPatients({filter: filterString})

    }

    const print = () => {
        const csvHeaders = ['Name', 'Gender', 'Registration Date', 'CB-ID', 'Phone']

        let csvData = data.value.map(item => {
            const name = (item.resource.name[0].family || "") + " " + (item?.resource?.name[0]?.given || "");
            const gender = item.resource.gender;
            const registrationDate = new Date(item.resource.meta.lastUpdated).toLocaleDateString();
            const cbID = getCBDId(item.resource.identifier);

            let phone = '';

            if (item.resource.contact && item?.resource?.contact[0]?.telecom[0]?.value) {
                phone = item?.resource?.contact[0]?.telecom[0]?.value;
            } else if (item?.resource?.telecom && item?.resource?.telecom[0]?.value) {
                phone = item.resource.telecom[0].value
            }


            return [
                name, gender, registrationDate, cbID, phone
            ]
        })

        csvData = [csvHeaders, ...csvData]


        const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(",")).join("\n")

        const encodedUri = encodeURI(csvContent)

        const link = document.createElement("a")

        link.setAttribute("href", encodedUri)

        link.setAttribute("download", "Patients.csv")

        document.body.appendChild(link)

        link.click()

    }

    return {data, gender, getPatients, print, filterPatients, loading, surname, clearFilters}
}