<template>
  <div class="flex flex-col bg-white shadow-md rounded-[10px] border-[#c4c4c4] border-[.5px] w-full relative">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="facility" class="w-6 h-6"/>
      <p class="text-xl font-medium text-[#292929]">Register Facility</p>
    </div>

    <form
        autocomplete="off"
        @submit="submit"
        class="grid grid-cols-1 md:grid-cols-2 px-4 pb-24 lg:px-11 pt-11 gap-8 lg:gap-x-[100px] gap-y-10">

      <maz-select
          class=""
          size="sm"
          search
          v-model="searchString"
          label="Search facility"
          :options="listOfFacilities"
          optionLabelKey="name"
          optionValueKey="code"
          optionInputValueKey="name"
      />
      <div />

      <maz-input disabled v-model="selectedFacility.name" label="Name"/>
      <maz-input disabled v-model="selectedFacility.code" label="Code"/>
      <maz-input disabled v-model="selectedFacility.keph_level_name" label="Level"/>
      <maz-input disabled v-model="selectedFacility.facility_type_name" label="Facility type"/>
      <maz-input disabled v-model="selectedFacility.county" label="County"/>
      <maz-input disabled v-model="selectedFacility.sub_county_name" label="Sub county"/>
      <maz-input disabled v-model="selectedFacility.constituency" label="Constituency"/>
      <maz-input disabled v-model="selectedFacility.ward_name" label="Ward"/>
      <maz-input disabled v-model="selectedFacility.owner_name" label="Owner"/>
      <maz-input disabled v-model="selectedFacility.operation_status_name" label="Operation Status"/>
      <maz-input disabled v-model="selectedFacility.regulatory_status_name" label="Regulatory Status"/>

      <div
          class="flex items-center w-full col-span-full justify-end gap-[25px] border-t-[.5px] border-t-[#C4C4C4] py-[11px] px-5 mt-auto absolute bottom-0 left-0">
        <MazSpinner color="secondary" v-if="loading"/>
        <div class="flex items-center gap-[25px]" v-else>
          <maz-btn type="button" @click="router.back()" class="w-20 h-8 lg:w-[165px] lg:h-[46px]" outline>Back</maz-btn>
          <maz-btn type="submit" class="w-20 h-8 lg:w-[165px] lg:h-[46px]">Submit</maz-btn>
        </div>
      </div>

    </form>

    <maz-dialog v-model="isOpen" title="Success" class="border-[.5px]">
      <template #header="{ close }">
        <p class="flex bg-[#0B8648] w-full px-8 py-[15px] text-white font-medium text-[14px]">Success.</p>
      </template>
      <div class="flex flex-col items-center gap-8">
        <font-awesome-icon icon="fa-solid fa-check-circle" class="w-1/2 h-1/2 text-primary"/>
        <p class="text-center">Facility registered successfully!</p>
        <maz-btn @click="close" size="lg">Close</maz-btn>
      </div>
    </maz-dialog>
  </div>
</template>

<script setup>
import MazIcon from 'maz-ui/components/MazIcon'
import MazDialog from 'maz-ui/components/MazDialog'
import MazSpinner from 'maz-ui/components/MazSpinner'
import MazBtn from 'maz-ui/components/MazBtn'
import { onMounted, watch,} from "vue";
import {useRegistration} from "../hooks/useRegistration.js";
import {useRouter} from "vue-router";

const router = useRouter()


const {
  isOpen,
  loading,
  submit,
  close,
  getListOfFacilities,
  listOfFacilities,
  searchString,
  selectedFacility
} = useRegistration()


onMounted(() => {
  getListOfFacilities()
})


watch(searchString, value => {
  selectedFacility.value = listOfFacilities.value.find(facility => facility.code === value)
})


</script>