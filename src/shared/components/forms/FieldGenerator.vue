<template>
  <maz-select
      v-if="config.type ==='select'"
      v-bind="config"
      v-model="model"
      class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full outline-[.5px]"
  />
  <MazPicker
      v-if="config.type === 'date-range'"
      v-model="model"
      label="Select range"
      color="secondary"
      double
      class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full outline-[.5px]"
  />
  <maz-input
      :label="config.label"
      :id="config.id"
      :type="config.type"
      :required="config.required"
      v-model="model"
      v-if="config.type ==='text'"
      class="outline-[#4E4E4E] focus:outline-[#4E4E4E] w-full outline-[.5px]"
  />
</template>

<script setup>
import MazSelect from 'maz-ui/components/MazSelect'
import MazPicker from 'maz-ui/components/MazPicker'

defineProps(['config'])

const model = defineModel()
</script>