<template>
  <maz-select
      v-if="config.type ==='select'"
      v-bind="config"
      v-model="model"
      class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full"
  />
  <maz-input
      :label="config.label"
      :id="config.id"
      :type="config.type"
      :required="config.required"
      v-model="model"
      v-else
      class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full"
  />
</template>

<script setup>
import MazSelect from 'maz-ui/components/MazSelect'

defineProps(['config'])

const model = defineModel()
</script>