<template>
  <div class="flex flex-col bg-white rounded-[10px] border-[.5px] border-[#C4C4C4] w-full gap-[34.5px]">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="facility" class="w-6 h-6"/>
      <p class="text-xl font-medium text-[#292929]">Registered Facilities</p>
      <maz-btn @click="add" class="w-[165px] h-[40px] ml-auto">Add New</maz-btn>
    </div>

    <div class="flex flex-col lg:p-11 gap-[55px]">
      <div class="flex items-center gap-5">
        <maz-input placeholder="Use health facility name, code"/>
        <maz-btn outline class="h-full w-[165px]">Search</maz-btn>
      </div>
      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="dummyFacilities"
          :headers="headers">
        <template #item-id="item">
          <div class="flex items-center gap-4">
            <router-link class="underline text-[#2b4fb1] font-medium" to="/">View</router-link>
            <router-link class="underline text-[#2b4fb1] font-medium" to="/">Edit</router-link>
          </div>
        </template>
      </EasyDataTable>
    </div>

  </div>
</template>

<script setup>
import MazIcon from 'maz-ui/components/MazIcon'
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import {dummyFacilities} from "../data/dummy.js";
import {useRouter} from "vue-router";

const router = useRouter()

const add = () => router.push("/facility/register")

const headers = [
  {
    text: "HEALTH FACILITY NAME",
    value: "name",
  },
  {
    text: "FACILITY CODE",
    value: "code",
  },
  {
    text: "COUNTY OF ORIGIN",
    value: "country",
  },
  {
    text: "REGION",
    value: "region",
  },
  {
    text: "LEVEL",
    value: "level",
  },
  {
    text: "DISTRICT",
    value: "district",
  },
  {
    text: "ACTION",
    value: "id",
  },
]

</script>