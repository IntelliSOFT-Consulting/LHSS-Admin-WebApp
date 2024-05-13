<template>
  <div class="flex flex-col bg-white rounded-[10px] border-[.5px] border-[#C4C4C4] w-full gap-[34.5px]">

    <div class="flex flex-row md:flex-row lg:items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <div class="flex items-center gap-2">
        <maz-icon name="facility" class="w-4 h-4 lg:w-6 lg:h-6"/>
        <p class="text-sm lg:text-lg font-medium text-[#292929]">Registered Facilities</p>
      </div>
      <maz-btn size="mini" @click="add" class="w-20 h-8 lg:w-[165px] lg:h-[40px] ml-auto">Add New</maz-btn>
    </div>

    <div class="flex flex-col lg:p-11 gap-[55px] px-4 lg:px-8">
      <div class="flex items-center gap-5">
        <maz-input
            @input="$evt => handleSearch($evt.target.value)"
            :value="searchString"
            size="xs"
            placeholder="Use health facility name"
        />
        <MazSpinner color="secondary" v-if="loading" class="text-center self-center"/>
      </div>

      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="data"
          :headers="headers">
        <template #item-district="item">
          <div class="flex items-center gap-4">
            <p>{{ item.resource.partOf.reference.split('/')[1] }}</p>
          </div>
        </template>
        <template #item-region="item">
          <div class="flex items-center gap-4">
            <p>{{ getParentLocation(item.resource.partOf.reference.split('/')[1]) }}</p>
          </div>
        </template>
        <template #item-country="item">
          <div class="flex items-center gap-4">
            <p>{{ getParentLocation(getParentLocation(item.resource.partOf.reference.split('/')[1])) }}</p>
          </div>
        </template>
        <template #item-id="item">
          <div class="flex items-center gap-4">
            <router-link class="underline text-[#2b4fb1] font-medium" :to="`/facility/${item.resource.id}`">View
            </router-link>
            <router-link class="underline text-[#2b4fb1] font-medium" :to="`/facility/edit/${item.resource.id}`">Edit
            </router-link>
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
import {onMounted} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import {useAllFacilities} from "../hooks/useAllFacilities.js";


const {handleSearch, getAllFacilities, data, searchString, headers, add, loading, getAllLocations, getParentLocation} = useAllFacilities()


onMounted(() => {
  getAllFacilities({})
  getAllLocations()
})

</script>