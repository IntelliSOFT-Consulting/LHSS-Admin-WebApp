<template>
  <div  class="flex flex-col w-screen  overflow-y-scroll">
    <AdminNavbar :is-open="isOpen" />
    <div class="flex px-16 py-10 bg-[#f5f5f5] min-h-[90vh] w-full">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from "../components/nav/AdminNavbar.vue";
import {ref} from "vue";

const isOpen = ref(false)


</script>