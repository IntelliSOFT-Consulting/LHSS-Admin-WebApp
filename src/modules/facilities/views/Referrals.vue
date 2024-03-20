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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 w-full">
          <div
              v-for="item in badges"
              :key="item.text"
              class="flex items-center gap-8 border-[.5px]  border-[#C4C4C4] rounded-full px-4 py-1 text-xs text-[#707070] ">
            <p class="font-bold">{{ item.text }}</p>
            <div class="w-2 h-2 bg-[#EAEAEA] rounded-full flex items-center justify-center p-[15px] font-semibold">
              {{ item.value }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-5 w-full">
          <MazPicker
              size="sm"
              v-model="rangeValues"
              label="Select range"
              color="secondary"
              double
              class="w-full"
          />
          <maz-btn outline>Search</maz-btn>
        </div>
      </div>

      <div class="relative">
        <EasyDataTable
            border-cell
            table-class-name="customize-table"
            :items="dummyReferrals"
            :headers="referralHeaders">
          <template #item-registrationDate="item">
            <p class="">{{ new Date(item.registrationDate).toDateString() }}</p>
          </template>
          <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
            <div class="flex flex-row gap-4 w-full reative">
              <maz-btn size="mini" @click="print" class="md:w-40 md:h-8 ml-auto absolute left-4 bottom-4">Print Report</maz-btn>

            </div>
          </template>
        </EasyDataTable>
      </div>

    </div>

  </div>
</template>

<script setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import MazPicker from 'maz-ui/components/MazPicker'
import {ref} from "vue";
import {dummyReferrals} from "../data/dummy.js";
import {referralHeaders} from "../data/table.js";
import {useRouter} from "vue-router";

const rangeValues = ref({
  start: '2022-02-03',
  end: '2022-02-28',
})

const router = useRouter()

const print = () => null

const badges = [
  {
    text: "All",
    value: 200
  },
  {
    text: "Male",
    value: 150
  },
  {
    text: "Ethiopia health facility",
    value: 30
  },
]

</script>