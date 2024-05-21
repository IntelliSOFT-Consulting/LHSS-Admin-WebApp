<template>
  <div class="flex flex-col bg-white shadow-md rounded-[10px] border-[#c4c4c4] border-[.5px] w-full relative p-4 gap-8">
    <div class="flex items-center gap-2">
      <font-awesome-icon icon="fa-solid fa-user-circle" class="w-6 h-6 text-primary"/>
      <p class="text-xs lg:text-lg font-medium text-[#292929]">User Profile</p>
    </div>

    <form
        class="grid lg:grid-cols-3 gap-8  w-full "
        autocomplete="off"
        @submit="submit">
      <div class="col-span-full border-b-2 text-primary">Personal details</div>
      <maz-input v-model="firstName" required label="First Name"/>
      <maz-input v-model="lastName" required label="Last Name"/>
      <maz-input v-model="idNumber" required type="number" label="ID Number" min="1000"/>

      <div class="col-span-full border-b-2 text-primary">Contact details</div>
      <maz-input v-model="email" required label="Email Address" type="email"/>
      <maz-phone-number-input
          v-model="phone"
          required
          country-code="ET"
          :only-countries="['ET', 'DJ']"
          label="Phone Number" type="phone"
      />

      <div
          class="flex items-center w-full col-span-full justify-end gap-[25px] border-t-[.5px] border-t-[#C4C4C4] py-[11px] px-5 mt-auto absolute bottom-0 left-0">
        <MazSpinner color="secondary" v-if="loading"/>
        <div class="flex items-center gap-[25px]" v-else>
          <maz-btn type="button" @click="router.back()" class="w-20 h-8 lg:w-[165px] lg:h-[46px]" outline>Back</maz-btn>
          <maz-btn type="submit" class="w-20 h-8 lg:w-[165px] lg:h-[46px]">Update</maz-btn>
        </div>
      </div>
    </form>

    <maz-dialog v-model="isDialogOpen" title="Success" class="border-[.5px]">
      <template #header="{ close }">
        <p class="flex bg-[#0B8648] w-full px-8 py-[15px] text-white font-medium text-[14px]">Success.</p>
      </template>
      <div class="flex flex-col items-center gap-8">
        <font-awesome-icon icon="fa-solid fa-check-circle" class="w-1/2 h-1/2 text-primary"/>
        <p class="text-center">Profile updated successfully!</p>
        <maz-btn @click="close" size="lg">Close</maz-btn>
      </div>
    </maz-dialog>

  </div>
</template>

<script setup>


import {useProfile} from "../hooks/useProfile.js";
import {onMounted} from "vue";
import MazBtn from "maz-ui/components/MazBtn";
import {useRouter} from "vue-router";
import MazDialog from "maz-ui/components/MazDialog";

const router = useRouter()

const {getMyInfo, firstName, lastName, idNumber, email, phone, loading, submit, isDialogOpen} = useProfile()

onMounted(()=>{
  getMyInfo()
})
</script>