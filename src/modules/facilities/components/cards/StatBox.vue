<template>
  <div class="flex flex-col rounded-[10px] border-[.5px] border-[#c4c4c4] py-[55px] text-center justify-center items-center w-full gap-5 shadow-md bg-white">
    <p class="font-bold text-[65px] leading-[20px] text-black">{{item.number}}</p>
    <p class="text-[15px] leading-[20px] text-[#292929]/70">{{item.title}}</p>
  </div>
</template>

<script setup>
defineProps(['item'])
</script>
