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
    const confirmPassword = ref("")
    const showPasswordError = ref(false)
    const isDialogOpen = ref(false)

    const {makeNormalRequest} = useAxios()

    const toast = useToast()

    const submit = async (evt) => {
        evt.preventDefault()
        try {
            loading.value = true;
            if (showPasswordError.value) return

            const response = await makeNormalRequest({
                url: "/auth/provider/register",
                method: "POST",
                data: {
                    "idNumber": idNumber.value,
                    "password": password.value,
                    "email": email.value,
                    "firstName": firstname.value,
                    "lastName": lastname.value,
                    "phone": phone.value,
                    "role": "ADMINISTRATOR"
                }
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
        isDialogOpen
    }
}