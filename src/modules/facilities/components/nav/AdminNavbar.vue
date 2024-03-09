<template>
  <div class="flex items-center justify-between px-[49px] py-6 border-[.5px] border-[#c4c4c4] shadow-lg">
    <router-link to="/facility" class="text-secondary text-[18px] leading-[42px] font-semibold tracking-[0px]">
      CB-DHS WEB APPLICATION
    </router-link>
    <div class="flex items-center gap-16">
      <router-link
          class="text-[#292929] capitalize"
          v-for="item in navItems"
          :key="item.id"
          :to="item.path">
        <p v-if="!item.icon" class="text-[15px] leading-[20px] ">{{ item.title }}</p>
        <maz-icon v-else :name="item.iconPath" size="2rem" class=""/>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import MazIcon from 'maz-ui/components/MazIcon'
import {navItems} from "../../data/navItems.js";
</script>

<style scoped>
.router-link-exact-active {
  @apply text-secondary underline;
}

</style>