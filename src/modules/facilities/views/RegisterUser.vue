<template>
  <div class="flex flex-col bg-white shadow-md rounded-[10px] border-[#c4c4c4] border-[.5px] w-full relative p-4 gap-8">
    <p class="text-xl font-medium text-[#292929]">Add user</p>
    <form
        class="grid lg:grid-cols-3 gap-8  w-full "
        autocomplete="off"
        @submit="submit">
      <div class="col-span-full border-b-2 text-primary">Personal details</div>
      <maz-input v-model="firstname" required label="First Name"/>
      <maz-input v-model="lastname" required label="Last Name"/>
      <maz-input v-model="idNumber" required type="number" label="ID Number" min="1000"/>

      <div class="col-span-full border-b-2 text-primary">Contact details</div>
      <maz-input v-model="email" required label="Email Address" type="email"/>
      <maz-phone-number-input
          v-model="phone"
          required
          country-code="ET"
          :only-countries="['ET', 'DJ']"
          label="Phone Number" type="phone"/>
      <div
          class="flex items-center w-full col-span-full justify-end gap-[25px] border-t-[.5px] border-t-[#C4C4C4] py-[11px] px-5 mt-auto absolute bottom-0 left-0">
        <MazSpinner color="secondary" v-if="loading"/>
        <div class="flex items-center gap-[25px]" v-else>
          <maz-btn type="button" @click="router.back()" class="w-20 h-8 lg:w-[165px] lg:h-[46px]" outline>Back</maz-btn>
          <maz-btn type="submit" class="w-20 h-8 lg:w-[165px] lg:h-[46px]">Submit</maz-btn>
        </div>
      </div>
    </form>
  </div>
</template>


<script setup>
import {useRegisterUser} from "../hooks/useRegisterUser.js";
import {useRouter} from "vue-router";

const router = useRouter()

const {submit, loading, firstname, lastname, idNumber, email, phone} = useRegisterUser()

</script>
