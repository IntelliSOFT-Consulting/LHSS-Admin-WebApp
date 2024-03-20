<template>
  <div class="flex flex-col bg-white shadow-md rounded-[10px] border-[#c4c4c4] border-[.5px] w-full relative">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="facility" class="w-6 h-6"/>
      <p class="text-xl font-medium text-[#292929]">Register Facility</p>
    </div>

    <form @submit="submit"
          class="grid grid-cols-1 md:grid-cols-2 px-4 pb-24 lg:px-11 pt-11 gap-8 lg:gap-x-[100px] gap-y-10">

      <field-generator
          v-for="item in forms"
          :config="item"
          :key="item.id"
          v-model="item.refName.value"
          class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full"
      />
      <div
          class="flex items-center w-full col-span-full justify-end gap-[25px] border-t-[.5px] border-t-[#C4C4C4] py-[11px] px-5 mt-auto absolute bottom-0 left-0">
        <maz-btn type="button" @click="router.back()" class="w-20 h-8 lg:w-[165px] lg:h-[46px]" outline>Back</maz-btn>
        <maz-btn type="submit" class="w-20 h-8 lg:w-[165px] lg:h-[46px]">Submit</maz-btn>
      </div>

    </form>

    <maz-dialog v-model="isOpen" title="Success" class="border-[.5px]">
      <template #header="{ close }">
        <p class="flex bg-[#0B8648] w-full px-8 py-[15px] text-white font-medium text-[14px]">Success.</p>
      </template>
      <div class="flex flex-col items-center gap-8">
        <maz-icon name="tick-circle"/>
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
import {ref,} from "vue";
import FieldGenerator from "../../../shared/components/forms/FieldGenerator.vue";

const isOpen = ref(false)

const name = ref("")
const country = ref("")
const level = ref("")
const region = ref("")
const district = ref("")
const code = ref("")


const forms = [
  {
    id: "name",
    type: "text",
    label: "Health facility name",
    required: true,
    refName: name
  },
  {
    id: "country",
    type: "select",
    label: "Country of origin",
    required: true,
    options: ['Ethiopia', 'Djibouti'],
    refName: country
  },
  {
    id: "level",
    type: "select",
    label: "Level",
    required: true,
    options: ['Hospital', 'Health Centre_IV', 'Health Centre_III', 'Health Centre_II', 'Health Post'],
    refName: level
  },
  {
    id: "region",
    type: "select",
    label: "Region",
    required: true,
    options: ['Addis', 'Afmadow', 'Djibouti', 'Lower Nile'],
    refName: region
  },
  {
    id: "code",
    type: "text",
    label: "Facility code(id any)",
    required: false,
    refName: code
  },
  {
    id: "district",
    type: "select",
    label: "District",
    required: true,
    options: ['Addis', 'Afmadow', 'Djibouti', 'Lower Nile'],
    refName: district
  },


]
const router = useRouter()


const submit = (evt) => {
  evt.preventDefault()
  isOpen.value = !isOpen.value
  setTimeout(() => {
    isOpen.value = false
    router.push('/facility/registered-facilities')
  }, 1000)
}

const close = () => {
  isOpen.value = false
  router.push('/facility/registered-facilities')
}


</script>