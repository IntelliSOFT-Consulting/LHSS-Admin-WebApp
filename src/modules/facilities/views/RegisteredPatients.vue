<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="user-circle" class="w-6 h-6"/>
      <p class="text-xl font-medium text-[#292929]">Registered patients</p>
      <div class="flex items-center gap-[10px] ml-auto">
        <maz-btn @click="print" class="w-[165px] h-[40px] ml-auto">Print Report</maz-btn>
        <maz-btn @click="print" outline class="w-[165px] h-[40px] ml-auto">Back</maz-btn>
      </div>
    </div>

    <div class="flex flex-col p-6 gap-11">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-[30px] w-full">
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
              v-model="rangeValues"
              label="Select range"
              color="secondary"
              double
              class="w-full"
          />
          <maz-btn outline>Search</maz-btn>
        </div>
      </div>

      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="dummyPatients"
          :headers="patientHeaders">
        <template #item-registrationDate="item">
          <p class="">{{new Date(item.registrationDate).toDateString()}}</p>
        </template>
      </EasyDataTable>

    </div>

  </div>
</template>

<script setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import MazPicker from 'maz-ui/components/MazPicker'
import {ref} from "vue";
import {dummyPatients} from "../data/dummy.js";
import {patientHeaders} from "../data/table.js";

const rangeValues = ref({
  start: '2022-02-03',
  end: '2022-02-28',
})

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