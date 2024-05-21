<template>
  <div class="flex flex-col bg-white w-full rounded-[10px]">
    <div class="flex flex-row md:flex-row lg:items-center gap-4 w-full border-b-[.5px] border-b-[#c4c4c4] p-6">
      <div class="flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user-circle" class="w-6 h-6 text-primary"/>
        <p class="text-xs lg:text-lg font-medium text-[#292929]">Users</p>
      </div>
      <maz-btn size="mini" @click="router.push('/facility/register-user')" class="w-20 h-8 lg:w-[165px] lg:h-[40px] ml-auto">Add New</maz-btn>
    </div>

    <div class="flex flex-col lg:p-11 gap-[55px] px-4 lg:px-8">
        <maz-input
            class="max-w-xs"
            v-model="searchString"
            size="xs"
            placeholder="Search"
        />

    <MazSpinner color="secondary" v-if="loading" class="text-center self-center"/>
    <EasyDataTable
        :search-value="searchString"
        border-cell
        table-class-name="customize-table"
        :items="users"
        :headers="tableHeaders">
    </EasyDataTable>
    </div>
  </div>

</template>


<script setup>

import {useUsers} from "../hooks/useUsers.js";
import {onMounted} from "vue";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazBtn from "maz-ui/components/MazBtn";
import {useRouter} from "vue-router";
import MazInput from "maz-ui/components/MazInput";

const router = useRouter()

const {getUsers, tableHeaders, users, loading, searchString} = useUsers()

onMounted(()=>{
  getUsers()
})
</script>
