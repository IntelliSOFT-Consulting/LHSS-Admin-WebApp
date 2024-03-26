<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">

    <div class="flex flex-col  gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <div class="flex items-center gap-2">
        <maz-icon name="user-circle" class="w-6 h-6"/>
        <p class="text-xs lg:text-lg font-medium text-[#292929]">Registered patients</p>
      </div>

      <div class="flex items-center gap-[10px] ml-auto">
        <maz-btn size="mini" @click="router.back()" outline class="md:w-40 md:h-8 ml-auto">Back</maz-btn>
      </div>
    </div>


    <div class="flex flex-col p-6 gap-11">

      <form class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 w-full">
        <field-generator
            v-for="item in forms"
            :config="item"
            :key="item.id"
            v-model="item.refName.value"
            class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full"
        />
        <maz-btn @click="handleSearch" class="col-span-full lg:col-span-1 mt-10 lg:mt-0 h-9 lg:h-full py-1" outline>Search</maz-btn>
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
        <template #item-cb-id="item">
          <p class="">{{ getCBDId(item.resource.identifier) }}</p>
        </template>
        <template #item-phone="item">
          <p class="">{{item?.resource?.telecom ? item?.resource?.telecom[0]?.value: null }}</p>
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
import {onMounted, ref} from "vue";
import {patientHeaders} from "../data/table.js";
import {useRouter} from "vue-router";
import FieldGenerator from "../../../shared/components/forms/FieldGenerator.vue";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";
import MazSpinner from "maz-ui/components/MazSpinner";

const router = useRouter()
const toast = useToast()

const rangeValues = ref({
  start: '2022-02-03',
  end: '2022-02-28',
})

const data = ref([])

const gender = ref("")

const facility = ref("")

const forms = [
  {
    id: "gender",
    type: "select",
    label: "Gender",
    defaultValue: "all",
    options: ['all', 'male', 'female'],
    refName: gender
  },
  {
    id: "facility",
    type: "select",
    label: "Facility",
    options: ['Ethiopian health facility', 'Djiboutian health facility'],
    refName: facility
  },
  {
    id: "range",
    type: "date-range",
    label: "Date range",
    refName: rangeValues
  },
]


const {makeRequest, loading} = useAxios()

const getPatients = async ({genderFilter=""}) => {
  try {
    const response = await makeRequest({
      url: `/Patient?${genderFilter}`
    })

    data.value = response.entry
  } catch (e) {
    toast.error("Error fetching patients")
  }
}


const getCBDId = (array) => {
  if (array)
    return (array.find(obj => obj?.type?.text?.toLowerCase()?.includes('cross')))?.value
  return null
}

const handleSearch = () => {
  if(gender.value !== 'all')
    getPatients({genderFilter: `gender=${gender.value}`})
  else
    getPatients({})
}

const print = () =>{
  const csvHeaders =  ['Name', 'Age', 'Gender', 'Registration Date', 'CB-ID', 'Phone']

  const csvData = data.value.map(item=>{
    console.log('item', item)
    return [
        `${item.resource.name[0].family} ${item?.resource?.name[0]?.given[0]}`
    ]
  })


  console.log('csv data', csvData)
}

onMounted(() => {
  getPatients({})
})

</script>