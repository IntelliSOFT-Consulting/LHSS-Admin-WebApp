<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">

    <div class="flex flex-col  gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6 pb-10">
      <div class="flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user-circle" class="w-6 h-6 text-primary"/>
        <p class="text-xs lg:text-lg font-medium text-[#292929]">Users</p>
        <maz-btn size="mini" @click="router.push('/facility/register-user')" class="md:w-40 md:h-8 ml-auto">Add New</maz-btn>
      </div>


    </div>

    <MazSpinner color="secondary" v-if="loading" class="text-center self-center"/>
    <EasyDataTable
        border-cell
        table-class-name="customize-table"
        :items="users"
        :headers="tableHeaders">
    </EasyDataTable>
  </div>

</template>


<script setup>

import {useUsers} from "../hooks/useUsers.js";
import {onMounted} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazBtn from "maz-ui/components/MazBtn";
import {useRouter} from "vue-router";

const router = useRouter()

const {getUsers, tableHeaders, users, loading} = useUsers()

onMounted(()=>{
  getUsers()
})
</script>
