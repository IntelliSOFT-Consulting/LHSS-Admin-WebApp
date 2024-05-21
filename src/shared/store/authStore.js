import {defineStore} from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        accessToken: null
    }),
    actions: {
        loadToken(token) {
            this.accessToken = token
        },
        logout(){
            this.accessToken = null
        }
    },
    persist: {
        enabled: true
    }
})