<template>
  <div class="login-bg w-screen h-screen flex justify-center align-center">
    <div class="flex flex-col w-11/12 lg:w-5/12 justify-center gap-10">
      <form
          autocomplete="off"
          @submit="login"
          class="flex flex-col bg-white rounded-[10px] border-[.5px] border-[#c4c4c4] items-center justify-center text-center px-4 py-6 lg:px-[97px] lg:pt-[95px] pb-[44px] relative">

        <div
            class="flex flex-col justify-center items-center gap-6 absolute border-2 border-white px-6 py-6 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-primary rounded-md text-white">
          <maz-icon name="white-facility" class=""/>
          <p class="leading-none ">CB-DHS <br> APPLICATION</p>
        </div>

        <p class="font-[29px] leading-[42px] text-[#5c5c5c] mb-[40px] mt-32 lg:mt-0">SIGN IN TO YOUR ACCOUNT</p>
        <maz-input
            required
            text="date"
            class="mb-[29px] w-full"
            v-model="username"
            left-icon="user-circle"
            id="idNumber"
            name="idNumber"
            placeholder="ID Number"
        />
        <maz-input
            required
            class="w-full"
            v-model="password"
            left-icon="lock-closed"
            placeholder="Password"
            type="password"
        />
        <p class="text-[11px] leading-[23px] text-[#707070] tracking-[0px] text-right w-fit my-[30px] ml-auto cursor-pointer">
          Forgot password?
        </p>
        <MazSpinner color="secondary" v-if="loading"/>
        <maz-btn v-else type="submit" color="secondary" class="ml-auto px-0 h-[45px] w-[200px]">Login</maz-btn>
      </form>
    </div>
  </div>
</template>


<script setup>
import MazInput from 'maz-ui/components/MazInput'
import MazBtn from 'maz-ui/components/MazBtn'
import MazSpinner from "maz-ui/components/MazSpinner";
import {useLogin} from "../hooks/useLogin.js";

const {password, username, loading, login} = useLogin()

</script>

<style scoped>
.login-bg {
  background: radial-gradient(closest-side at 50% 50%, #0B8648 0%, #0D5C34 100%) 0% 0% no-repeat padding-box;
}
</style>