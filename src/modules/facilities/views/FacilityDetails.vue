<template>
  <div class="flex flex-col bg-white rounded-[10px] border-[.5px] border-[#C4C4C4] w-full gap-[34.5px]">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="facility" class="w-6 h-6"/>
      <p class="text-xl font-medium text-[#292929]">{{resourceID}}</p>
      <maz-btn @click="router.back()" outline class="w-[165px] h-[40px] ml-auto">Back</maz-btn>
    </div>

    <div class="grid md:grid-cols-2 pr-6">
      <div v-for="item in Object.keys(state)" :key="item" class="grid grid-cols-2">
        <div class="ml-5 md:ml-10 border border-[#c4c4c4] p-5 font-medium italic text-sm md:text-base">{{item}} :</div>
        <div class="p-5 border border-[#C4C4C4]">{{state[item]}}</div>
      </div>
    </div>


  </div>
</template>

<script setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import {useRoute, useRouter} from "vue-router";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import {onMounted, reactive, ref, watch} from "vue";
import {useToast} from "maz-ui";

const router = useRouter()
const route = useRoute()

const {resourceID} = route.params

const state = reactive({
  "Health facility name": "",
  "Level": "",
  "District": "",
  "Region": "",
  "Country of origin": "",
  "Facility code (if any)": "",
})


const {makeRequest, loading} = useAxios()

const toast = useToast()

const getDetails = async () => {
  try {
    const response = await makeRequest({
      url: `/Location/${resourceID}`
    })
    state['Health facility name'] = response.name
    state['Country of origin'] = response.partOf.reference.split('/')[1]
    state['District'] = response.partOf.reference.split('/')[1]
    state['Region'] = response.partOf.reference.split('/')[1]
  } catch (e) {
    toast.error('Error getting facility', e)
  }
}

watch(state, value => {
  console.log('value', value)
})

onMounted(() => {
  getDetails()
})

</script>

