import {ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "maz-ui";
import axios from "axios";
import {useAuthStore} from "../../../shared/store/authStore.js";

export const useLogin = () => {

    const password = ref("")
    const username = ref("")
    const loading = ref(false)

    const router = useRouter()

    const toast = useToast()

    const authStore = useAuthStore()

    const login = async (evt) => {
        const baseUrl = "https://hiedhs.intellisoftkenya.com"
        evt.preventDefault()
        try {
            loading.value = true

            const {data} = await axios({
                url: baseUrl + '/auth/provider/login',
                method: "POST",
                data: {
                    idNumber: username.value,
                    password: password.value
                }
            })


            const {data: userInfoData} = await axios({
                url: baseUrl + '/auth/provider/me',
                headers: {
                    Authorization: `Bearer ${data?.access_token}`
                }

            })

            if (userInfoData?.user?.role === "ADMINISTRATOR") {
                authStore.loadToken(data.access_token)
                router.push("/facility")
            } else if (userInfoData?.user?.role !== "ADMINISTRATOR") {
                toast.error("not an admin")
            }

        } catch (e) {
            toast.error(e?.message || e?.response?.data?.error)
        } finally {
            loading.value = false
        }

    }

    return {password, username, loading, login}
}