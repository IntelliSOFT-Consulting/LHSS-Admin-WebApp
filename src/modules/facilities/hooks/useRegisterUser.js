import {ref} from "vue";

export const useRegisterUser = () => {
    const loading = ref(false);

    const firstname=ref("")
    const lastname=ref("")
    const idNumber=ref("")
    const email=ref("")
    const phone=ref("")

    const submit = async (evt) => {
        evt.preventDefault()
    }

    return {submit, loading, firstname, lastname, idNumber, email, phone}
}