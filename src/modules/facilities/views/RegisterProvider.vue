<template>
  <div class="flex flex-col bg-white shadow-md rounded-[10px] border-[#c4c4c4] border-[.5px] w-full relative">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <font-awesome-icon icon="fa-solid fa-user-doctor" class="w-6 h-6 text-primary"/>
      <p class="text-xl font-medium text-[#292929]">Register User</p>
    </div>

    <form
        autocomplete="off"
        @submit.prevent="handleSubmit"
        class="grid grid-cols-1 md:grid-cols-2 px-4 pb-24 lg:px-11 pt-11 gap-8 lg:gap-x-[100px] gap-y-10">
      <maz-input label="ID Number" v-model="state.idNumber" size="sm" required/>
      <maz-input label="Email" v-model="state.email" size="sm" required/>
      <maz-input label="First Name" v-model="state.firstName" size="sm" required/>
      <maz-input label="Last Name" v-model="state.lastName" size="sm" required/>
      <maz-select
          required
          size="sm"
          search
          v-model="state.facility"
          label="Facility"
          :options="flattenedFacilities"
          optionLabelKey="name"
          optionValueKey="value"
          optionInputValueKey="name"
      />
      <MazPhoneNumberInput
          label="phone"
          v-model="state.phone"
          size="sm"
          required
          country-selector-display-name
          country-code="KE"
      />
      <maz-input label="Role" v-model="state.role" size="sm" required/>

      <div class="hidden md:flex"/>
      <maz-input label="Password" v-model="state.password" size="sm" required type="password" :error="!isFormValid" :hint="!isFormValid && 'Your passwords do not match'"/>
      <maz-input label="Confirm Password" v-model="state.confirmPassword" size="sm" required type="password" :error="!isFormValid" :hint="!isFormValid && 'Your passwords do not match'"/>


      <div
          class="flex items-center w-full col-span-full justify-end gap-[25px] border-t-[.5px] border-t-[#C4C4C4] py-[11px] px-5 mt-auto absolute bottom-0 left-0">
        <MazSpinner color="secondary" v-if="loading"/>
        <div class="flex items-center gap-[25px]" v-else>
          <maz-btn type="button" @click="router.back()" class="w-20 h-8 lg:w-[165px] lg:h-[46px]" outline>Back</maz-btn>
          <maz-btn :disabled="!isFormValid" type="submit" class="w-20 h-8 lg:w-[165px] lg:h-[46px]">Submit</maz-btn>
        </div>
      </div>
    </form>

  </div>
</template>

<script setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazSpinner from "maz-ui/components/MazSpinner";
import {useRegisterProvider} from "../hooks/useRegisterProvider.js";
import {useRouter} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import {useAllFacilities} from "../hooks/useAllFacilities.js";

const router = useRouter()
const {handleSubmit, state, loading} = useRegisterProvider();
const {getAllFacilities, data: facilityData} = useAllFacilities()
const flattenedFacilities = ref([]);

watch(facilityData, value=>{
  console.log("facilities", value)
  flattenedFacilities.value = value.map(item=> ({value: item.resource.id, name: item.resource.name}))
})

const isFormValid = computed(()=> state.confirmPassword === state.password)

onMounted(() => {
  getAllFacilities({})
});

</script>
