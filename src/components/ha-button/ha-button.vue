<template>
  <button unstyled class="card-container">
    <base-prepend-card-icon
      :isLoading="mainStore.initialLoading"
      :icon="icon"
      :color="iconColor"
      :badge-icon="badgeIcon"
      :badge-color="badgeColor"
      @click="dialog?.setOpenDialogId('test')"
    />
    <div class="content-container">
      <base-card-title :is-loading="mainStore.initialLoading" :name="name" />
      <base-card-state :is-loading="mainStore.initialLoading" :state="state" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { useLiquidJsTemplate } from '@/services/liquidjs/use-liqiuid-js-template'
import { useLiquidJs } from '@/services/liquidjs/use-liquid-js'
import { useHomeassistantStore } from '@/stores/homeassistant'
import { useMainStore } from '@/stores/main'
import { computed, inject, ref } from 'vue'
import BasePrependCardIcon from '../base/prepend-card-icon.vue'
import BaseCardTitle from '../base/card-title.vue'
import BaseCardState from '../base/card-state.vue'
import { OpenDialogIdSymbol } from '@/symbols'

export type HaButtonProps = {
  entityId?: string
  name?: string
  state?: string
  icon?: string
  iconColor?: string
  badgeIcon?: string
  badgeColor?: string
}

const props = withDefaults(defineProps<HaButtonProps>(), {
  entityId: '',
})

const mainStore = useMainStore()
const { getState } = useHomeassistantStore()
const { isTemplate } = useLiquidJs()
const entity = computed(() => getState(props.entityId))

const dialog = inject(OpenDialogIdSymbol)

const name = computed(() => {
  if (props.name === undefined) {
    return entity.value?.friendlyName
  }
  return isTemplate(props.name) ? useLiquidJsTemplate(props.name).value : props.name
})

const state = computed(() => {
  if (props.state === undefined) {
    return entity.value?.getState({ withUnit: true })
  }
  return isTemplate(props.state) ? useLiquidJsTemplate(props.state).value : props.state
})

const icon = computed(() => {
  if (props.icon === undefined) {
    return entity.value?.icon
  }
  return isTemplate(props.icon) ? useLiquidJsTemplate(props.icon).value : props.icon
})

const iconColor = computed(() =>
  props.iconColor && isTemplate(props.iconColor)
    ? useLiquidJsTemplate(props.iconColor).value
    : props.iconColor,
)

const badgeIcon = computed(() =>
  props.badgeIcon && isTemplate(props.badgeIcon)
    ? useLiquidJsTemplate(props.badgeIcon).value
    : props.badgeIcon,
)

const badgeColor = computed(() =>
  props.badgeColor && isTemplate(props.badgeColor)
    ? useLiquidJsTemplate(props.badgeColor).value
    : props.badgeColor,
)
</script>

<style scoped lang="css">
.card-container {
  /* --active-color: #ff9800; */
  /* --secondary-background-color: ; */
  /* --card-background-color: #1c1c1c; */
  padding: 0;
  background: none;
  border: medium;
  box-shadow: none;
  width: 100%;
  height: 50px;
  background-color: var(--color-card-background);
  border-radius: 12px;
  overflow: scroll;
  touch-action: pan-y;
  transition: background-color 1.5s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* &.active {
    background-color: var(--active-color);
  } */
}

.content-container {
  display: flex;
  line-height: 18px;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin: 0 16px 0 4px;
  pointer-events: none;
  position: relative;
  overflow: hidden;
}
</style>
