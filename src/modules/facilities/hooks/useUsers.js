import {ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";


export const useUsers = () => {
    const users = ref([])
    const loading = ref(false)

    const toast = useToast()

    const {makeNormalRequest} = useAxios()

    const getUsers = async () => {
        try {
            loading.value = true;
            const response = await makeNormalRequest({
                url: "/auth/provider/users",
            })

            users.value = response?.users.filter(user => user?.role)
        } catch (e) {
            toast.error("Error getting users")
        } finally {
            loading.value = false
        }
    }

    const tableHeaders = [
        {
            text: "Username",
            value: "username"
        },
        {
            text: "First Name",
            value: "firstName"
        },
        {
            text: "Last Name",
            value: "lastName"
        },
        {
            text: "Phone Number",
            value: "phone"
        },
        {
            text: "Role",
            value: "role"
        },
    ]

    return {getUsers, users, tableHeaders, loading}
}