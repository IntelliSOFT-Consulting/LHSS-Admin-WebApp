import {ref} from "vue";
import axios from "axios"
import {useAuthStore} from "../store/authStore.js";
import {useRouter} from "vue-router";
import {useToast} from "maz-ui";

export const useAxios = () => {
    const data = ref(null)
    const status = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const authStore = useAuthStore()

    const router = useRouter()

    const toast = useToast()

    const FHIRAxiosInstance = axios.create({
        baseURL: "https://hiedhs.intellisoftkenya.com/hapi/fhir",
        headers: {
            "Content-Type": "application/fhir+json"
        }
    })

    const normalAxiosInstance = axios.create({
        baseURL: "https://hiedhs.intellisoftkenya.com",
        headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
        }
    })

    /**
     * When token expires ask the user to login again
     */
    normalAxiosInstance.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && error.response.status === 401) {
                toast.info("Your session has expired please login again")
                authStore.logout()
                await router.push("/")
            }

            return Promise.reject(error)
        }
    )


    const makeFHIRRequest = async (config) => {
        return new Promise(async (resolve, reject) => {
            try {
                loading.value = true
                const response = await FHIRAxiosInstance(config)
                data.value = response?.data
                status.value = response.status
                resolve(response.data)
            } catch (e) {
                error.value = e
                reject(e)
            } finally {
                loading.value = false
            }
        })
    }

    const makeNormalRequest = async (config) => {
        return new Promise(async (resolve, reject) => {
            try {
                loading.value = true
                const response = await normalAxiosInstance(config)
                data.value = response?.data
                status.value = response?.status
                resolve(response.data)
            } catch (e) {
                error.value = e
                reject(e)
            } finally {
                loading.value = false
            }
        })
    }

    return {loading, data, status, error, makeFHIRRequest, makeNormalRequest}

}