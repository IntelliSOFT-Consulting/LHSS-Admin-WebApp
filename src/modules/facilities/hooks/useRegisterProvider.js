import {reactive, ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";

export const useRegisterProvider = () => {
    const loading = ref(false);

    const state = reactive({
        idNumber: "",
        email: "",
        role: "",
        firstName: "",
        lastName: "",
        facility: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const toast = useToast();

    const {makeNormalRequest} = useAxios();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            loading.value = true;
            const response  = await makeNormalRequest({
                method: "POST",
                url: "auth/provider/register",
                data: {
                    ...state
                }
            })
        } catch (e){
            toast.error(e)
            return e;
        }finally {
            loading.value = false;
        }
    }

    return {handleSubmit, state, loading}
}