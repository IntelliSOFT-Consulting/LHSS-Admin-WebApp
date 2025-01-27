import {reactive, ref} from "vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";
import {useRouter} from "vue-router";

export const useRegisterProvider = () => {
    const loading = ref(false);
    const router = useRouter();
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

    const resetState = () => {
        state.idNumber = "";
        state.email = "";
        state.role = "";
        state.firstName = "";
        state.lastName = "";
        state.facility = "";
        state.phone = "";
        state.password = "";
        state.confirmPassword = "";
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            loading.value = true;
             await makeNormalRequest({
                method: "POST",
                url: "auth/provider/register",
                data: {
                    ...state
                }
            })
            resetState();
            toast.success("Register successfully.");
            router.push("/facility/users")
        } catch (e){
            toast.error(e)
            return e;
        }finally {
            loading.value = false;
        }
    }

    return {handleSubmit, state, loading}
}