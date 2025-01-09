<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">

    <div class="flex flex-col  gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <div class="flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user-circle" class="w-6 h-6 text-primary"/>
        <p class="text-xs lg:text-lg font-medium text-[#292929]">Registered patients</p>
      </div>

      <div class="flex items-center gap-[10px] ml-auto">
        <maz-btn size="mini" @click="router.back()" outline class="md:w-40 md:h-8 ml-auto">Back</maz-btn>
      </div>
    </div>

    <div class="flex flex-col p-6 gap-11">
      <form class="grid grid-cols-1 md:grid-cols-4 items-center gap-4 w-full">
        <maz-input id="name" v-model="surname" label="Name"/>
        <maz-select :options=" ['male', 'female']" label="Gender" v-model="gender"/>
        <MazPicker
            auto-close
            v-model="registrationDate"
            label="Registration date"
        />
        <maz-btn
            @click="clearFilters"
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
          :items="data"
          :headers="patientHeaders">
        <template #item-name="item">
          <p class="">{{ item.resource.name[0].family }}
            {{ item?.resource?.name[0]?.given ? item?.resource?.name[0]?.given[0] : null }}</p>
        </template>
        <template #item-registrationDate="item">
          <p class="">{{ new Date(item.resource.meta.lastUpdated).toLocaleDateString() }}</p>
        </template>
        <template #item-phone="item">
          <p class="">
            {{
              item.resource.contact ? item?.resource?.contact[0]?.telecom[0]?.value : item?.resource?.telecom ? item?.resource?.telecom[0]?.value : ''
            }}</p>
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
import {onMounted, watch} from "vue";
import {patientHeaders} from "../data/table.js";
import {useRouter} from "vue-router";
import MazSpinner from "maz-ui/components/MazSpinner";
import {usePatients} from "../hooks/usePatients.js";

const router = useRouter()

const {data, gender, getPatients, print, loading, filterPatients, surname, clearFilters, registrationDate} = usePatients()

watch([gender, surname, registrationDate], (values) => {
  filterPatients()
})


onMounted(() => {
  getPatients({})
})

</script>