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
        <maz-input v-model="searchString" size="xs" placeholder="Use health facility name"/>
      </div>
      <MazSpinner color="secondary" v-if="loading" class="text-center self-center"/>
      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="data"
          :headers="headers">
        <template #item-country="item">
          <div class="flex items-center gap-4">
            <p>{{ item.resource.partOf.reference.split('/')[1] }}</p>
          </div>
        </template>
        <template #item-id="item">
          <div class="flex items-center gap-4">
            <router-link class="underline text-[#2b4fb1] font-medium" :to="`/facility/${item.resource.id}`">View</router-link>
            <router-link class="underline text-[#2b4fb1] font-medium" to="/facility/register">Edit</router-link>
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
import {useRouter} from "vue-router";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {useToast} from "maz-ui";
import {onMounted, ref, watch} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";

const router = useRouter()

const add = () => router.push("/facility/register")

const data = ref([])

const searchString = ref(null)

const headers = [
  {
    text: "HEALTH FACILITY NAME",
    value: "resource.name",
  },
  {
    text: "FACILITY CODE",
    value: "",
  },
  {
    text: "COUNTY OF ORIGIN",
    value: "country",
  },
  {
    text: "REGION",
    value: "",
  },
  {
    text: "LEVEL",
    value: "",
  },
  {
    text: "DISTRICT",
    value: "",
  },
  {
    text: "ACTION",
    value: "id",
  },
]

const {makeRequest, loading} = useAxios()

const toast = useToast()

const getAllFacilities = async ({filter = ""}) => {
  try {
    const response = await makeRequest({
      url: `/Location?type=FACILITY&${filter}`,
    })
    if (response.entry)
      data.value = response?.entry
    else
      data.value = []
  } catch (e) {
    toast.error('Error getting facilities')
  }
}


const handleSearch = () => {
  if (searchString.value.length > 0)
    getAllFacilities({filter: `name=${searchString.value}`})
  else if (searchString.value === "")
    getAllFacilities({})
}

watch(searchString, () => {
  handleSearch()
})

onMounted(() => {
  getAllFacilities({})
})

</script>