<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">

    <div class="flex flex-col  gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <div class="flex items-center gap-2">
        <maz-icon name="user-circle" class="w-6 h-6"/>
        <p class="text-xs lg:text-lg font-medium text-[#292929]">Referrals</p>
      </div>

      <div class="flex items-center gap-[10px] ml-auto">

        <maz-btn size="mini" @click="router.back()" outline class="md:w-40 md:h-8 ml-auto">Back</maz-btn>
      </div>
    </div>

    <div class="flex flex-col p-6 gap-11">

      <form class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 w-full">
        <maz-select :options=" ['all', 'male', 'female']" label="Gender" v-model="gender"/>
        <maz-select :options="facilities" label="Reffered from" v-model="facilityFrom"/>
        <maz-select :options="facilities" label="Reffered to" v-model="facilityTo"/>
        <maz-picker label="Select range" color="secondary" double v-model="rangeValues"/>
        <maz-btn
            @click="handleClear"
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
          :items="filteredReferrals"
          :headers="referralHeaders">
        <template #item-name="item">
          <p class="">{{ item?.patient?.name[0]?.text }}</p>
        </template>
        <template #item-gender="item">
          <p class="">{{ item?.patient?.gender }}</p>
        </template>
        <template #item-registrationDate="item">
          <p class="">{{ new Date(item.service.occurrenceDateTime).toDateString() }}</p>
        </template>
        <template #item-referredFrom="item">
          <p class="">{{
              (item?.service?.supportingInfo?.find(item => item?.display === "REFERRING_FROM"))?.reference.split("/")[1]
            }}</p>
        </template>
        <template #item-referredTo="item">
          <p class="">{{
              (item?.service?.supportingInfo?.find(item => item?.display === "REFERRING_TO"))?.reference?.split("/")[1]
            }}</p>
        </template>
        <template #item-reason="item">
          <p class="">{{ item?.service?.reasonCode[0].text }}</p>
        </template>
        <template #item-status="item">
          <Chip
              :variant="item?.service?.status == 'draft' ? 'warning' : item?.service?.status== 'active' ? 'success': ''"
              :text="item?.service?.status == 'draft' ? 'Pending':item?.service?.status == 'active' ? 'Recieved': '' "/>
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
import MazPicker from 'maz-ui/components/MazPicker'
import {onMounted, ref, watch} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import {referralHeaders} from "../data/table.js";
import {useRouter} from "vue-router";
import {useAxios} from "../../../shared/hooks/useAxios.js";
import Chip from "../../../shared/components/badges/Chip.vue";
import {useToast} from "maz-ui";

const rangeValues = ref({
  start: '',
  end: '',
})

const gender = ref("")
const facilityFrom = ref("")
const facilityTo = ref("")
const loading = ref(false)
const referrals = ref([])
const filteredReferrals = ref([])
const facilities = ref([]);

const router = useRouter()
const toast = useToast()


const print = () => null

const {makeRequest} = useAxios()

const getPatient = async (patientID) => {
  try {
    const response = await makeRequest({url: `/Patient/${patientID}`})
    return response
  } catch (error) {
    toast.error('Error getting patient')

  }
}

const getReferrals = async () => {
  loading.value = true;
  try {
    const response = await makeRequest({
      url: `ServiceRequest`
    })

    for (const entry of response.entry) {
      let patientObject = await getPatient(entry.resource.subject.reference.split("/")[1])

      referrals.value = [...referrals.value,
        {
          service: {...entry.resource},
          patient: {...patientObject}
        }];
    }
  } catch (e) {
    toast.error('Error getting referrals')

  } finally {
    loading.value = false;
  }
}

const getFacilities = async () => {
  try {
    loading.value = true;
    const response = await makeRequest({url: `Location?type=FACILITY`})
    facilities.value = response?.entry?.map(entry => entry.resource.name)
  } catch (error) {
    toast.error('Error getting facilities')
  } finally {
    loading.value = false;
  }
}

const filterFacilityFrom = (facility) => {
  filteredReferrals.value = filteredReferrals.value.filter(item => (item.service.supportingInfo.find(info => info.display === "REFERRING_FROM")).reference.toLowerCase().includes(facility.split(" ")[0].toLowerCase()))
}

const filterFacilityTo = (facility) => {
  filteredReferrals.value = filteredReferrals.value.filter(item => (item.service.supportingInfo.find(info => info.display === "REFERRING_TO")).reference.toLowerCase().includes(facility.split(" ")[0].toLowerCase()))
}

const handleRange = () => {
  filteredReferrals.value = filteredReferrals.value.filter(item => (new Date(rangeValues.value.start) <= new Date(item.service.occurrenceDateTime)) && (new Date(rangeValues.value.end) >= new Date(item.service.occurrenceDateTime)))
}

const filterByGender = () => {
  if (gender.value === "all")
    filteredReferrals.value = referrals.value
  else
    filteredReferrals.value = filteredReferrals.value.filter(referral => referral.patient.gender === gender.value)
}

const handleClear = () => {
  gender.value = "all";
  facilityFrom.value = "";
  facilityTo.value = "";
  rangeValues.value = {
    start: "",
    end: ""
  }
  filteredReferrals.value = referrals.value;
}


watch(referrals, value => {
  if (value.length > 0 && filteredReferrals.value.length === 0)
    filteredReferrals.value = value
})

watch(gender, value => {
  filterByGender()
})

watch(facilityFrom, value => {
  filterFacilityFrom(value)
})

watch(facilityTo, value => {
  filterFacilityTo(value)
})

watch(rangeValues, value => {
  if (rangeValues.value.start)
    handleRange()
})

onMounted(() => {
  getReferrals()
  getFacilities()
})


</script>