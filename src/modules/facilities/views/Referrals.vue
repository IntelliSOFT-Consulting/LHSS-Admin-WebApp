<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">

    <div class="flex flex-col  gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <div class="flex items-center gap-2">
        <maz-icon name="user-circle" class="w-6 h-6"/>
        <p class="text-xs lg:text-lg font-medium text-[#292929]">Referrals</p>
      </div>

      <div class="flex items-center gap-[10px] ml-auto">

        <maz-btn size="mini" @click="router.back()" outline class="md:w-40 md:h-8 ml-auto">Back</maz-btn>
      </div>
    </div>

    <div class="flex flex-col p-6 gap-11">

      <form class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 w-full">
        <maz-select :options=" ['all', 'male', 'female']" label="Gender" v-model="gender"/>
        <maz-select :options="facilities" label="Reffered from" v-model="facilityFrom"/>
        <maz-select :options="facilities" label="Reffered to" v-model="facilityTo"/>
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
          <maz-icon name="left-chevron" class="w-4 h-4 md:w-8 md:h-4 lg:w-8 lg:h-8 lg:mx-2  cursor-pointer"
                    :disabled="isFirstPage" @click="prevPage"/>
          <maz-icon name="right-chevron" class="w-4 h-4 md:w-8 md:h-4 lg:w-8 lg:h-8 lg:mx-2  cursor-pointer"
                    :disabled="isLastPage" @click="nextPage"/>
          <maz-icon name="export-file" class="w-4 h-4 md:w-8 md:h-4 lg:w-8 lg:h-6 lg:mx-2  cursor-pointer"
                    @click="print"/>
        </template>
      </EasyDataTable>
    </div>


  </div>
</template>

<script setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import MazPicker from 'maz-ui/components/MazPicker'
import {onMounted, ref, watch} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import {referralHeaders} from "../data/table.js";
import {useRouter} from "vue-router";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import Chip from "../../../shared/components/badges/Chip.vue";
import {useToast} from "maz-ui";
import {useReferrals} from "../hooks/useReferrals.js";

const {
  rangeValues,
  gender,
  facilityTo,
  facilityFrom,
  loading,
  referrals,
  filteredReferrals,
  facilities,
  router,
  toast,
  print,
  getPatient,
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