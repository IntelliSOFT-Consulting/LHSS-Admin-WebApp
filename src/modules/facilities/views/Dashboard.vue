<template>
  <div class="flex flex-col w-full gap-10">

    <MazSpinner color="secondary" class="self-center" v-if="loading"/>
    <div class="flex flex-col md:flex-row w-full gap-16 ">
      <stat-box v-for="item in stats" :key="item.title" :item="item"/>
    </div>

    <div
        class="flex flex-col px-[27px] py-10 border-[.5px] border-[#c4c4c4c] shadow-md gap-[35px] bg-white rounded-[10px]">
      <p class="text-[19px] leading-[29px] font-semibold">Quick Actions</p>
      <div class="flex flex-col md:flex-row items-center gap-[28px]">
        <quick-action-card v-for="item in quickActions" :key="item.title" :item="item"/>
      </div>
    </div>

    <div
        class="flex flex-col gap-[34px] px-[27px] py-[20px] border-[.5px] border-[#c4c4c4] bg-white shadow-md rounded-[10px]">
      <div class="flex w-0full justify-between">
        <p class="">Registered Facilities</p>
        <router-link class="text-[#067B40]  leading-[29px] font-medium underline" to="/facility/register">View all
        </router-link>
      </div>
      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="facilities"
          :headers="headers">
        <template #item-country="item">
          <div class="flex items-center gap-4">
            <p>{{ item.resource.partOf.reference.split('/')[1] }}</p>
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
import StatBox from "../components/cards/StatBox.vue";
import QuickActionCard from "../components/cards/QuickActionCard.vue";
import {quickActions} from "../data/quickActions.js";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {onMounted, ref} from "vue";
import {useToast} from "maz-ui";
import MazSpinner from "maz-ui/components/MazSpinner";


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

const facilities = ref([])
const referrals = ref([])


const loading = ref(false)

const stats = ref([])

const toast = useToast()

const {makeRequest} = useAxios()


const getAllFacilities = async () => {
  try {
    loading.value = true

    const response = await makeRequest({
      url: `/Location?type=FACILITY&_count=2`,
    })

    if (response.entry)
      facilities.value = response?.entry
    else
      facilities.value = []

  } catch (e) {
    toast.error('Error getting facilities')
  } finally {
    loading.value = false
  }
}



const getStats = async () => {
  try {

    loading.value = true

    const patientResponse = await makeRequest({
      url: `/Patient?_summary=count`
    })

    const referralsResponse = await makeRequest({
      url: `ServiceRequest?_summary=count`
    })

    stats.value = [
      {
        id: "0",
        title: "Total number of Cross Border Patients",
        number: patientResponse.total
      },
      {
        id: "1",
        title: "Total number of referrals",
        number: referralsResponse.total
      },
    ]

  } catch (e) {
    toast.error("Error fetching stats")
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAllFacilities()
  getStats()
})
</script>
