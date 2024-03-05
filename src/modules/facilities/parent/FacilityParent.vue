<script setup>
import AdminNavbar from "../components/nav/AdminNavbar.vue";
</script>

<template>
  <div class="flex flex-col w-screen h-screen max-w-[] mx-auto">
    <AdminNavbar/>
    <div class="flex px-16 py-10 bg-[#f5f5f5] h-full w-full">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>

</style>