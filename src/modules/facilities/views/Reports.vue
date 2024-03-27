<template>
  <div class="flex flex-col gap-10 w-full">

    <div class="flex flex-col md:flex-row w-full gap-16 ">
      <stat-box v-for="item in stats" :key="item.title" :item="item"/>
    </div>

    <div class="flex flex-col gap-[34px] px-[27px] py-[20px] border-[.5px] border-[#c4c4c4] bg-white shadow-md rounded-[10px]">
      <div class="flex w-0full justify-between">
        <p class="">Registered patients</p>
        <router-link class="text-[#067B40]  leading-[29px] font-medium underline" to="/facility/patients">View all</router-link>
      </div>
      <EasyDataTable
          border-cell
          table-class-name="customize-table"
          :items="patients"
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
          <p class="">{{item.resource.contact ? item?.resource?.contact[0]?.telecom[0]?.value : item?.resource?.telecom ? item?.resource?.telecom[0]?.value: ''}}</p>
        </template>
      </EasyDataTable>
    </div>

    <div class="flex flex-col gap-[34px] px-[27px] py-[20px] border-[.5px] border-[#c4c4c4] bg-white shadow-md rounded-[10px]">
      <div class="flex w-full justify-between">
        <p class="">Referrals</p>
        <router-link class="text-[#067B40]  leading-[29px] font-medium underline" to="/facility/referrals">View all</router-link>
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
import {patientHeaders, referralHeaders} from "../data/table.js";
import {onMounted, ref} from "vue";
import {useToast} from "maz-ui";
import {useAxios} from "../../../shared/hooks/useAxios.js";

const loading = ref(false)

const stats = ref([])

const patients = ref([])

const toast = useToast()


const {makeRequest} = useAxios()


const getStats = async () => {
  try {

    loading.value = true

    const patientResponse = await makeRequest({
      url: `/Patient?_summary=count`
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
        number: patientResponse.total
      },
    ]

  } catch (e) {
    toast.error("Error fetching stats")
  } finally {
    loading.value = false
  }
}



const getCBDId = (array) => {
  if (array)
    return (array.find(obj => obj?.type?.text?.toLowerCase()?.includes('cross')))?.value || " "
  return " "
}

const getPatients = async () => {
  try {
    loading.value=true
    const response = await makeRequest({
      url: `/Patient?_count=4`
    })

    if (response.entry)
      patients.value = response.entry
    else
      patients.value = []
  } catch (e) {
    toast.error("Error fetching patients")
  }finally {
    loading.value=false
  }
}


onMounted(() => {
  getStats()
  getPatients()
})

</script>