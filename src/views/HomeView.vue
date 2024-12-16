<template>
  <div v-for="(row, index) in config.content" :key="index" class="w-full p-4">
    <dynamic-components v-bind="row"></dynamic-components>
  </div>
  <ha-dialog></ha-dialog>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { config } from '../config'
import { OpenDialogIdSymbol } from '@/symbols'

const openDialogId = ref<string | undefined>()
const setOpenDialogId = (value: string | undefined) => {
  openDialogId.value = value
}

provide(OpenDialogIdSymbol, { openDialogId, setOpenDialogId })
</script>
