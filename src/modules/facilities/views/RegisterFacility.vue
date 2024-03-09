<template>
  <div class="flex flex-col bg-white shadow-md rounded-[10px] border-[#c4c4c4] border-[.5px] w-full relative">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="facility" class="w-6 h-6"/>
      <p class="text-xl font-medium text-[#292929]">Register Facility</p>
    </div>

    <form @submit="submit" class="grid grid-cols-1 lg:grid-cols-2 lg:px-11 pt-11 gap-x-[100px] gap-y-10">
      <maz-input v-for="item in forms" :key="item.id" v-bind="item" class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full"/>
      <div class="flex items-center w-full col-span-full justify-end gap-[25px] border-t-[.5px] border-t-[#C4C4C4] py-[11px] px-5 mt-auto absolute bottom-0 left-0">
        <maz-btn type="button" @click="router.back()" class="w-[165px] h-[46px]" outline>Back</maz-btn>
        <maz-btn type="button" @click="isOpen=true" class="w-[165px] h-[46px]">Submit</maz-btn>
      </div>

    </form>

    <maz-dialog v-model="isOpen" title="Success" class="border-[.5px]">
      <template #header="{ close }">
        <p class="flex bg-[#0B8648] w-full px-8 py-[15px] text-white font-medium text-[14px]">Success.</p>
      </template>
      <div class="flex flex-col items-center gap-8">
        <maz-icon name="tick-circle" />
        <p class="text-center">Facility registered successfully!</p>
        <maz-btn @click="close" size="lg">Close</maz-btn>
      </div>
    </maz-dialog>
  </div>
</template>

<script setup>
import MazIcon from 'maz-ui/components/MazIcon'
import MazDialog from 'maz-ui/components/MazDialog'
import MazBtn from 'maz-ui/components/MazBtn'
import {useRouter} from "vue-router";
import {ref} from "vue";

const isOpen = ref(false)
const forms = [
  {
    id: "name",
    type: "text",
    label: "Health facility name",
    required: true,
  },
  {
    id: "country",
    type: "text",
    label: "Country of origin",
    required: true,
  },
  {
    id: "level",
    type: "text",
    label: "Level",
    required: true,
  },
  {
    id: "region",
    type: "text",
    label: "Region",
    required: true,
  },
  {
    id: "district",
    type: "text",
    label: "District",
    required: true,
  },
  {
    id: "code",
    type: "text",
    label: "Facility code(id any)",
    required: false,
  },

]
const router = useRouter()


const submit = () => {
  isOpen.value = !isOpen.value
}

const close = () =>{
  isOpen.value = false
  router.push('/facility/registered-facilities')
}

</script>