<template>
  <div  class="flex flex-col w-screen  overflow-y-scroll relative">
    <AdminNavbar :is-open="isOpen" />
    <div class="flex px-4 pb-8 lg:px-16 lg:pb-10 pt-20 md:pt-40 lg:pt-40 bg-[#f5f5f5] min-h-[90vh] w-full">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from "../components/nav/AdminNavbar.vue";
import {ref} from "vue";

const isOpen = ref(false)


</script>