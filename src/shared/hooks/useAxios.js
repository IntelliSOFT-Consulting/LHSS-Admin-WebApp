import {ref} from "vue";
import axios from "axios"

export const useAxios = () => {
    const data = ref(null)
    const status = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "application/fhir+json"
        }
    })


    const makeRequest = async (config) => {
        return new Promise(async (resolve, reject) => {
            try {
                loading.value = true
                const response = await axiosInstance(config)
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

    return {loading, data, status, error, makeRequest}

}