import {ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";

export const useRegisterUser = () => {
    const loading = ref(false);

    const firstname = ref("")
    const lastname = ref("")
    const idNumber = ref("")
    const email = ref("")
    const phone = ref("")
    const password = ref("")
    const facility = ref("")
    const role = ref("")
    const confirmPassword = ref("")
    const showPasswordError = ref(false)
    const isDialogOpen = ref(false)
    const facilityOptions = ref([])

    const {makeNormalRequest, makeFHIRRequest} = useAxios()

    const toast = useToast()

    const getAllFacilities = async () => {
        try {
            loading.value = true
            const response = await makeFHIRRequest({
                url: `/Location?type=FACILITY&_count=5000`,
            })

            facilityOptions.value = response?.entry?.map(entry => ({
                label: entry.resource.name,
                value: entry.resource.id
            }))
        } catch (e) {
            toast.error("Error getting facility information")
        } finally {
            loading.value = false
        }
    }


    const submit = async (evt) => {
        evt.preventDefault()
        try {
            loading.value = true;
            if (showPasswordError.value) return

            const requestBody = {
                "idNumber": idNumber.value,
                "password": password.value,
                "email": email.value,
                "firstName": firstname.value,
                "lastName": lastname.value,
                "phone": phone.value,
                "role": role.value
            }

            if (role.value !== "ADMINISTRATOR")
                requestBody['facility'] = facility.value


            const response = await makeNormalRequest({
                url: "/auth/provider/register",
                method: "POST",
                data: requestBody
            })

            if (response.status === "success") {
                isDialogOpen.value = !isDialogOpen.value
                setTimeout(() => {
                    isDialogOpen.value = false
                    idNumber.value = ""
                    password.value = ""
                    confirmPassword.value = ""
                    email.value = ""
                    firstname.value = ""
                    lastname.value = ""
                    phone.value = ""
                    role.value = ""
                    facility.value = ""
                }, 1000)
            }

        } catch (err) {
            toast.error(err.response.data.error)
        } finally {
            loading.value = false
        }
    }

    return {
        submit,
        loading,
        firstname,
        lastname,
        idNumber,
        email,
        phone,
        password,
        confirmPassword,
        showPasswordError,
        isDialogOpen,
        role,
        facility,
        getAllFacilities,
        facilityOptions
    }
}