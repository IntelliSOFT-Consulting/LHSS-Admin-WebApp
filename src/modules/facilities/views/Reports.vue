<template>
  <div class="flex flex-col gap-10 w-full">

    <div class="flex w-full gap-16 ">
      <stat-box v-for="item in dummyStats" :key="item.title" :item="item"/>
    </div>

    <div class="flex flex-col gap-[34px] px-[27px] py-[20px] border-[.5px] border-[#c4c4c4] bg-white shadow-md rounded-[10px]">
      <div class="flex w-0full justify-between">
        <p class="">Registered patients</p>
        <router-link class="text-[#067B40]  leading-[29px] font-medium underline" to="/">View all</router-link>
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

    <div class="flex flex-col gap-[34px] px-[27px] py-[20px] border-[.5px] border-[#c4c4c4] bg-white shadow-md rounded-[10px]">
      <div class="flex w-0full justify-between">
        <p class="">Referrals</p>
        <router-link class="text-[#067B40]  leading-[29px] font-medium underline" to="/">View all</router-link>
      </div>
      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="dummyReferrals"
          :headers="referralHeaders">
        <template #item-registrationDate="item">
          <p class="">{{new Date(item.registrationDate).toDateString()}}</p>
        </template>
      </EasyDataTable>
    </div>

  </div>
</template>

<script setup>
import {dummyPatients, dummyReferrals, dummyStats} from "../data/dummy.js";
import StatBox from "../components/cards/StatBox.vue";

const patientHeaders = [
  {
    text: "Name",
    value: "name",
  },
  {
    text: "Gender",
    value: "gender",
  },
  {
    text: "Registration Date",
    value: "registrationDate",
  },
  {
    text: "CB-ID",
    value: "cbID",
  },
  {
    text: "Facility",
    value: "facility",
  },
]

const referralHeaders = [
  {
    text: "Name",
    value: "name",
  },
  {
    text: "Gender",
    value: "gender",
  },
  {
    text: "Registration Date",
    value: "registrationDate",
  },
  {
    text: "Referred from",
    value: "referredFrom",
  },
  {
    text: "Referred to",
    value: "referredTo",
  },
  {
    text: "Reason for referral",
    value: "reasonForReferral",
  },
  {
    text: "Referral Received",
    value: "referralReceived",
  },
]
</script>