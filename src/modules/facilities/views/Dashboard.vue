<template>
  <div class="flex flex-col w-full gap-10 justify-around">
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


const loading = ref(false)

const stats = ref([])

const toast = useToast()

const {makeRequest} = useAxios()


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
  getStats()
})
</script>
