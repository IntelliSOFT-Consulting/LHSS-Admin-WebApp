<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">

    <div class="flex flex-col  gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <div class="flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user-circle" class="w-6 h-6 text-primary"/>
        <p class="text-xs lg:text-lg font-medium text-[#292929]">Referrals</p>
      </div>

      <div class="flex items-center gap-[10px] ml-auto">

        <maz-btn size="mini" @click="router.back()" outline class="md:w-40 md:h-8 ml-auto">Back</maz-btn>
      </div>
    </div>

    <div class="flex flex-col p-6 gap-11">

      <form class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-4 w-full">
        <maz-select :options=" ['all', 'male', 'female']" label="Gender" v-model="gender"/>
        <maz-input list="facilities" id="from" v-model="facilityFrom" label="Referred from"/>
        <maz-input list="facilities" id="to" v-model="facilityTo" label="Referred to"/>
        <datalist id="facilities">
          <option v-for="item in facilities" :value="item" :key="item"/>
        </datalist>
        <maz-picker label="Select range" color="secondary" double v-model="rangeValues"/>
        <maz-btn
            @click="handleClear"
            class="col-span-full lg:col-span-1 mt-10 lg:mt-0 h-9 lg:h-full py-1"
            color="danger"
            outline>
          Clear
        </maz-btn>
      </form>

      <MazSpinner color="secondary" v-if="loading" class="text-center self-center"/>
      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="filteredReferrals"
          :headers="referralHeaders">
        <template #item-name="item">
          <p class="">{{ item?.patient?.name[0]?.text }}</p>
        </template>
        <template #item-gender="item">
          <p class="">{{ item?.patient?.gender }}</p>
        </template>
        <template #item-registrationDate="item">
          <p class="">{{ new Date(item.service.occurrenceDateTime).toDateString() }}</p>
        </template>
        <template #item-referredFrom="item">
          <p class="">{{
              (item?.service?.supportingInfo?.find(item => item?.display === "REFERRING_FROM"))?.reference.split("/")[1]
            }}</p>
        </template>
        <template #item-referredTo="item">
          <p class="">{{
              (item?.service?.supportingInfo?.find(item => item?.display === "REFERRING_TO"))?.reference?.split("/")[1]
            }}</p>
        </template>
        <template #item-reason="item">
          <p class="">{{ item?.service?.reasonCode[0].text }}</p>
        </template>
        <template #item-status="item">
          <Chip
              :variant="item?.service?.status == 'draft' ? 'warning' : item?.service?.status== 'active' ? 'success': ''"
              :text="item?.service?.status == 'draft' ? 'Pending':item?.service?.status == 'active' ? 'Recieved': '' "/>
        </template>
        <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <div class="flex items-center gap-4">
            <font-awesome-icon
                :class="[isFirstPage ? 'text-gray-300': 'text-primary']"
                class="cursor-pointer w-4 h-4 md:w-8 md:h-4 lg:h-4" :disabled="isLastPage"
                @click="prevPage" icon="fa-solid fa-chevron-left"/>
            <font-awesome-icon
                :class="[isLastPage ? 'text-gray-300': 'text-primary']"
                class="cursor-pointer w-4 h-4 md:w-8 md:h-4 lg:h-4" :disabled="isLastPage"
                @click="nextPage" icon="fa-solid fa-chevron-right"/>
            <div class="flex relative group">
              <font-awesome-icon
                  icon="fa-solid fa-file-export"
                  class="w-4 h-4 md:w-8 md:h-4 lg:w-8 lg:h-6 lg:mx-2  cursor-pointer text-primary"
                  @click="print"/>
              <div
                  class="hidden group-hover:flex absolute px-4 z-10 -top-6 -left-6 bg-white px-2 py-0 rounded-lg shadow-xl text-primary font-semibold w-full whitespace-nowrap">
                print csv!
              </div>
            </div>
          </div>
        </template>
      </EasyDataTable>
    </div>


  </div>
</template>

<script setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazPicker from 'maz-ui/components/MazPicker'
import {onMounted, watch} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import {referralHeaders} from "../data/table.js";
import Chip from "../../../shared/components/badges/Chip.vue";
import {useReferrals} from "../hooks/useReferrals.js";

const {
  rangeValues,
  gender,
  facilityTo,
  facilityFrom,
  loading,
  filteredReferrals,
  facilities,
  router,
  print,
  getReferrals,
  getFacilities,
  filterFacilityFrom,
  filterFacilityTo,
  handleRange,
  filterByGender,
  handleClear
} = useReferrals()


watch(gender, value => {
  filterByGender()
})

watch(facilityFrom, value => {
  filterFacilityFrom(value)
})

watch(facilityTo, value => {
  filterFacilityTo(value)
})

watch(rangeValues, value => {
  if (rangeValues.value.start)
    handleRange()
})

onMounted(() => {
  getReferrals()
  getFacilities()
})


</script>