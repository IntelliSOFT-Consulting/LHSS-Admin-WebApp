<template>
  <div class="flex flex-col bg-white rounded-[10px] border-[.5px] border-[#C4C4C4] w-full gap-[34.5px]">
    <!--    .................header...............-->
    <div class="flex flex-row md:flex-row lg:items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="facility" class="w-4 h-4 lg:w-6 lg:h-6"/>
      <p class="text-sm lg:text-lg font-medium text-[#292929]">Registered Facilities</p>
    </div>

    <div class="flex flex-col lg:p-11 gap-[55px] px-4 lg:px-8">
      <div class="flex items-center gap-5">

        <maz-select
            v-if="countries.length>0"
            v-model="selectedCountryID"
            :options="countries"
            label="Country"
            id="countries"
        />
        <maz-select
            v-if="counties.length>0"
            v-model="selectedCountyID"
            :options="counties"
            label="County"
            id="counties"
            search
        />
        <maz-select
            v-if="subCounties.length>0"
            v-model="selectedSubCountyID"
            :options="subCounties"
            label="Sub County"
            id="subcounties"
            search
        />
        <maz-select
            v-if="wards.length>0"
            v-model="selectedWardID"
            :options="wards"
            label="Wards"
            id="wards"
            search
        />
        <maz-input
            @input="$evt => handleSearch($evt.target.value)"
            :value="searchString"
            placeholder="Use health facility name"
        />
      </div>

      <EasyDataTable
          :loading="loading"
          border-cell
          table-class-name="customize-table"
          :items="data"
          :headers="facilityTableHeaders">
        <template #item-id="item">
          <div class="flex items-center gap-4">
            <router-link class="underline text-[#2b4fb1] font-medium" :to="`/facility/${item.resource.id}`">View
            </router-link>
          </div>
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>

<script setup>
import MazIcon from 'maz-ui/components/MazIcon'
import MazInput from 'maz-ui/components/MazInput'
import {onMounted, watch} from "vue";
import MazSelect from "maz-ui/components/MazSelect";
import {useAllFacilities} from "../hooks/useAllFacilities.js";
import {facilityTableHeaders} from "../data/facilityTableHeaders.js";


const {
  handleSearch,
  getAllFacilities,
  data,
  searchString,
  loading,
  getCountries,
  countries,
  selectedCountryID,
  getCounties,
  counties,
  selectedCountyID,
  getSubCounties,
  subCounties,
  selectedSubCountyID,
  getWards,
  wards,
  selectedWardID,
} = useAllFacilities()


onMounted(() => {
  getCountries();
  getAllFacilities({})
})


watch(selectedCountryID, value => {
  if (value)
    getCounties({countryID: value})
});

watch(selectedCountyID, value => {
  if (value)
    getSubCounties({countyID: value})
});

watch(selectedSubCountyID, value => {
  if (value)
    getWards({subCountyID: value})
});


watch(selectedWardID, value => {
  if (value)
    getAllFacilities({wardID: value})
});


watch(searchString, value => {
  if (value) {
    selectedCountryID.value = ""
    selectedCountyID.value = ""
    selectedSubCountyID.value = ""
    selectedWardID.value = ""

    counties.value = [];
    subCounties.value = [];
    wards.value = [];
  }
})

</script>