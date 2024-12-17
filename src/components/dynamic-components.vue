<template>
  <div
    v-if="props.type === 'horizontal'"
    class="flex gap-2"
    :class="props.config?.breakOnSm ? 'flex-col md:flex-row' : 'flex-row'"
  >
    <dynamic-components
      v-for="(item, index) in content"
      :key="index"
      v-bind="item"
      class="flex-1 grow"
    />
  </div>
  <div v-else-if="type === 'vertical'" class="flex flex-col gap-2">
    <dynamic-components
      v-for="(item, index) in content"
      :key="index"
      v-bind="item"
      class="flex-1 grow"
    />
  </div>
  <template v-else-if="type === 'ha-button'">
    <ha-button v-bind="config" />
  </template>
  <template v-else-if="type === 'empty'">
    <div />
  </template>
</template>

<script setup lang="ts">
import type { HaButtonProps } from './ha-button/ha-button.vue'
import type { HaDialogProps } from './ha-dialog/ha-dialog.vue'

type ConfigRowElement = {
  type: 'horizontal'
  content?: Elements[]
  config?: { breakOnSm?: boolean }
}
type ConfigColElement = {
  type: 'vertical'
  content?: Elements[]
  config?: { cols: number }
}
type ConfigHaButton = {
  type: 'ha-button'
  config: HaButtonProps
}
export type ConfigHaDialog = {
  type: 'ha-dialog'
  config: HaDialogProps
  content?: Elements[]
}
type ConfigEmpty = {
  type: 'empty'
}

export type Elements = ConfigRowElement | ConfigColElement | ConfigHaButton | ConfigEmpty

type DynamicComponentsProps = Elements

const props = withDefaults(defineProps<DynamicComponentsProps>(), {
  type: 'empty',
})
</script>

<style lang="css" scoped></style>
