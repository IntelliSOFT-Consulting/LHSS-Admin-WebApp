<template>
  <div class="flex flex-col bg-white rounded-[10px] border-[.5px] border-[#C4C4C4] w-full gap-[34.5px]">

    <div class="flex items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <maz-icon name="facility" class="w-6 h-6"/>
      <p class="text-xl font-medium text-[#292929]">Facility XXX-XXX</p>
      <maz-btn @click="router.back()" outline class="w-[165px] h-[40px] ml-auto">Back</maz-btn>
    </div>

    <div class="grid-container">
      <div v-for="item in data" :key="item" class="grid-item">{{ item }}</div>
    </div>

  </div>
</template>

<script setup>
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import {useRouter} from "vue-router";

const router = useRouter()

const data = [
  "Health facility name",
  "Ethiopian dispensary",
  "Level",
  "III",
  "District",
  "Addis",
  "Region",
  "Afar",
  "Country of origin",
  "Ethiopia",
  "Facility code(if any):",
  "9116"
]
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin-left: -50px;
  padding: 55px 55px;

}
.grid-item {
  padding: 20px;
  border: 1px solid #C4C4C4;
}

.grid-item:nth-child(2n+1) {
  margin-left: 50px;
}

.grid-item:nth-child(2n + 1){
  font-weight: 500;
  font-style: italic;
}

.grid-item:nth-child(2n + 1)::after{
  content: " :";
}
</style>