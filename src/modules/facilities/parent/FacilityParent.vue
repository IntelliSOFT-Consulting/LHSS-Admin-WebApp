<template>
  <div  class="flex flex-col w-screen  overflow-y-scroll relative">
    <AdminNavbar :is-open="isOpen" />
    <div class="flex px-4 pb-8 lg:px-16 lg:pb-10 pt-20 md:pt-40 lg:pt-40 bg-[#f5f5f5] min-h-[100vh] w-full overflow-x-clip">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from "../components/nav/AdminNavbar.vue";
import {onMounted, ref} from "vue";
import {useLocationStore} from "../../../shared/store/locationStore.js";
import {useAxios} from "../../../shared/hooks/useAxios.js";

const isOpen = ref(false)

const locationStore = useLocationStore()

const {makeRequest} = useAxios()


const getAllLocations = async () => {
  try {
    const response = await makeRequest({url: 'Location'})
    locationStore.setLocations(response.entry)
  } catch (error) {
    console.error("error", error)
  }
}

onMounted(()=>{
  getAllLocations()
})

</script>