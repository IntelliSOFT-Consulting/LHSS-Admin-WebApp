<script setup>
import AdminNavbar from "../components/nav/AdminNavbar.vue";
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <AdminNavbar/>
    <router-view/>
  </div>
</template>

<style scoped>

</style>