<template>
  <div
      :class="[variant === 'warning' ? 'bg-amber-500 text-white' : variant === 'success' ? 'bg-green-500 text-white' : '']"
      class="flex justify-center items-center py-1 px-2 rounded-full text-xs font-normal leading-none w-full max-w-[4rem] mx-auto capitalize">
    {{ text }}
  </div>
</template>

<script setup>
defineProps(['variant', 'text'])
</script>