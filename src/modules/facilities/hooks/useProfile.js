import {useAuthStore} from "../../../shared/store/authStore.js";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {ref} from "vue";
import {useToast} from "maz-ui";

export const useProfile = () => {

    const authStore = useAuthStore()

    const firstName = ref("")
    const lastName = ref("")
    const idNumber = ref("")
    const email = ref("")
    const phone = ref("")

    const loading = ref(false)

    const isDialogOpen = ref(false)

    const {makeNormalRequest} = useAxios()

    const toast = useToast()

    const getMyInfo = async () => {
        try {
            loading.value = true

            const response = await makeNormalRequest({
                url: "/auth/provider/me"
            })
            email.value = response.user.email
            firstName.value = response.user.firstName
            lastName.value = response.user.lastName
            idNumber.value = response.user.idNumber
            phone.value = response.user.phone
        } catch (e) {
            toast.error(e)
        } finally {
            loading.value = false
        }
    }

    const submit = async (evt) => {
        evt.preventDefault()

        try {
            loading.value = true

            const response = await makeNormalRequest({
                url: "auth/provider/me",
                method: "POST",
                data: {
                    email: email.value,
                    lastName: lastName.value,
                    firstName: firstName.value,
                    phone: phone.value,
                }
            })

            if (response.status === "success") {
                isDialogOpen.value = !isDialogOpen.value
                setTimeout(() => {
                    isDialogOpen.value = false
                    getMyInfo()
                }, 1000)
            }


        } catch (e) {
            toast.error(e)
        } finally {
            loading.value = false

        }
    }

    return {getMyInfo, firstName, lastName, idNumber, email, phone, loading, submit, isDialogOpen}
}