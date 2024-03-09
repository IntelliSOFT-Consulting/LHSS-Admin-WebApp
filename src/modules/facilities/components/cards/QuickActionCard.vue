<template>
  <div
      @click="router.push(item.route)"
      class="flex flex-col justify-center items-center border-[#0A5F36] border-[.5px] rounded-[10px] shadow-md w-[185px] h-[151px] gap-6 cursor-pointer">
    <maz-icon :name="item.iconName"  class="w-8 h-8"/>
    <p class="text-center text-[15px] leading-[20px]">{{ item.title }}</p>
  </div>
</template>

<script setup>
import MazIcon from 'maz-ui/components/MazIcon'
import {useRouter} from "vue-router";

defineProps(['item'])

const router = useRouter()
</script>
