<template>
  <div class="flex flex-col w-full">
    <div class="flex w-full gap-16">
      <stat-box v-for="item in dummyStats" :key="item.title" :item="item"/>
    </div>
  </div>
</template>

<script setup>

import StatBox from "../components/cards/StatBox.vue";
import {dummyStats} from "../data/dummy.js";
</script>

<style scoped>

</style>