<template>
  <div
      class="flex items-center justify-between px-4 py-2 md:px-[49px] md:py-6 border-[.5px] border-[#c4c4c4] shadow-lg relative bg-secondary/90  text-white">
    <div class="flex items-center w-full justify-between lg:gap-2">
      <maz-icon @click="isOpen = !isOpen" name="bars-4" class="w-6 cursor-pointer lg:hidden"/>
      <router-link to="/facility" class=" md:text-[18px] leading-[42px] font-semibold tracking-[0px]">
        CB-DHS WEB APPLICATION
      </router-link>
    </div>

    <div
        :class="[isOpen ? 'flex': 'hidden lg:flex']"
        class="fixed  top-0 left-0 h-screen w-4/5 z-20 flex-col px-4 pt-4 gap-8 text-lg italic text-white lg:relative lg:h-full lg:flex-row lg:items-center bg-secondary">
      <maz-icon @click="isOpen = false" name="x-circle" size="2rem" class="text-white cursor-pointer lg:hidden"/>
      <router-link
          @click="isOpen = false"
          class="capitalize"
          v-for="item in navItems"
          :key="item.id"
          :to="item.path">
        <p v-if="!item.icon" class="md:text-[15px] leading-[20px] ">{{ item.title }}</p>
        <maz-icon v-else :name="item.iconPath" size="2rem" class="text-primary"/>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import MazIcon from 'maz-ui/components/MazIcon'
import {navItems} from "../../data/navItems.js";

defineProps(['isOpen'])



</script>

<style scoped>
.router-link-exact-active {
  @apply  underline;
}

</style>