<template>
  <div class="login-bg w-screen h-screen flex justify-center align-center">
    <div class="flex flex-col w-11/12 lg:w-5/12 justify-center gap-10">
      <p class="text-white text-center leading-[42px] lg:text-[29px] font-bold">CB-DHS WEB APPLICATION</p>
      <div
          class="flex flex-col bg-white rounded-[10px] border-[.5px] border-[#c4c4c4] items-center justify-center text-center px-4 py-6 lg:px-[97px] lg:pt-[95px] pb-[44px]">
        <p class="font-[29px] leading-[42px] text-[#5c5c5c] mb-[40px]">LOGIN TO YOUR ACCOUNT</p>
        <maz-input class="mb-[29px] w-full" v-model="username" left-icon="envelope" placeholder="Username"/>
        <maz-input class="w-full" v-model="password" left-icon="lock-closed" placeholder="Password" type="password"/>
        <p class="text-[11px] leading-[23px] text-[#707070] tracking-[0px] text-right w-fit my-[30px] ml-auto cursor-pointer">
          Forgot password?
        </p>
        <maz-btn @click="login" color="secondary" class="ml-auto px-0 h-[45px] w-[200px]">Login</maz-btn>
      </div>
    </div>
  </div>
</template>


<script setup>
import MazInput from 'maz-ui/components/MazInput'
import MazBtn from 'maz-ui/components/MazBtn'
import {ref} from "vue";
import {useRouter} from "vue-router";

const password = ref("")
const username = ref("")

const router = useRouter()

const login = () => {
  router.push("/facility")
}

</script>

<style scoped>
.login-bg {
  background: radial-gradient(closest-side at 50% 50%, #0B8648 0%, #0D5C34 100%) 0% 0% no-repeat padding-box;
}
</style>