<template>
  <div class="flex flex-col w-full gap-10">

    <div class="flex w-full gap-16 ">
      <stat-box v-for="item in dummyStats" :key="item.title" :item="item"/>
    </div>

    <div class="flex flex-col px-[27px] py-10 border-[.5px] border-[#c4c4c4c] shadow-md gap-[35px] bg-white rounded-[10px]">
      <p class="text-[19px] leading-[29px] font-semibold">Quick Actions</p>
      <div class="flex items-center gap-[28px]">
        <quick-action-card v-for="item in quickActions" :key="item.title" :item="item"/>
      </div>
    </div>

    <div class="flex flex-col gap-[34px] px-[27px] py-[20px] border-[.5px] border-[#c4c4c4] bg-white shadow-md rounded-[10px]">
      <div class="flex w-0full justify-between">
        <p class="">Registered Facilities</p>
        <router-link class="text-[#067B40]  leading-[29px] font-medium underline" to="/facility/register">View all</router-link>
      </div>
      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="dummyFacilities"
          :headers="headers">
        <template #item-id="item">
          <div class="flex items-center gap-4">
            <router-link class="underline text-[#2b4fb1] font-medium" to="/facility/details">View</router-link>
            <router-link class="underline text-[#2b4fb1] font-medium" to="/facility/register">Edit</router-link>
          </div>
        </template>
      </EasyDataTable>
    </div>


  </div>
</template>

<script setup>
import StatBox from "../components/cards/StatBox.vue";
import {dummyFacilities, dummyStats} from "../data/dummy.js";
import QuickActionCard from "../components/cards/QuickActionCard.vue";
import {quickActions} from "../data/quickActions.js";


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
