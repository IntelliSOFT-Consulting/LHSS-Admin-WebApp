<template>
  <div
      class="flex items-center justify-between px-4 py-2 md:px-[49px] md:py-6 border-[.5px] border-[#c4c4c4] shadow-lg bg-secondary  text-white fixed top-0 w-full z-50">
    <div class="flex items-center w-full justify-between lg:gap-2">
      <div class="flex items-center gap-2 lg:hidden">
        <font-awesome-icon  @click="isOpen = !isOpen" icon="fa-solid fa-bars" class="w-6 cursor-pointer" />
        |
        <p class="capitalize text-xs">{{ route.name }}</p>
      </div>
      <router-link to="/facility" class="text-sm md:text-[18px] leading-[42px] font-semibold tracking-[0px]">
        CB-DHS WEB APPLICATION
      </router-link>
    </div>

    <div
        :class="[isOpen ? 'flex': 'hidden lg:flex']"
        class="fixed  top-0 left-0 h-screen w-4/5 z-20 flex-col px-4 pt-4 gap-8 text-lg md:text-sm  text-white lg:relative lg:h-full lg:flex-row lg:items-center lg:justify-end  bg-secondary lg:bg-transparent">
      <font-awesome-icon
          @click="isOpen = false"
          icon="fa-solid fa-xmark-circle"
          class="text-white cursor-pointer lg:hidden w-6"/>
      <router-link
          @click="isOpen = false"
          class="capitalize"
          v-for="item in navItems"
          :key="item.id"
          :to="item.path">
        <p v-if="!item.icon" class="whitespace-nowrap">{{ item.title }}</p>
        <font-awesome-icon v-else :icon="item.iconName" class="text-white lg:w-6 lg:h-6"/>
      </router-link>
      <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" @click="logout" class="text-primary cursor-pointer w-6 text-white lg:w-6 lg:h-6" />
    </div>
  </div>
</template>

<script setup>
import {navItems} from "../../data/navItems.js";
import {useRoute, useRouter} from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

defineProps(['isOpen'])

const route = useRoute()

const router = useRouter()

const logout = () => router.push("/")

</script>

<style scoped>
.router-link-exact-active {
  @apply underline;
}

</style>