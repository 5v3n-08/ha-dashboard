<template>
  <button unstyled class="card-container" @click="onClick">
    <base-prepend-card-icon
      :isLoading="mainStore.initialLoading"
      :icon="icon"
      :color="iconColor"
      :badge-icon="badgeIcon"
      :badge-color="badgeColor"
      @click.stop="onIconClick ? onIconClick() : undefined"
    />
    <div class="content-container">
      <base-card-title :is-loading="mainStore.initialLoading" :name="name" />

      <div v-if="Array.isArray(state)" class="flex">
        <template v-for="(item, index) in state" :key="index">
          <base-card-append-item v-bind="item" :is-loading="mainStore.initialLoading" />
          <base-card-append-item
            v-if="index + 1 < state.length && !mainStore.initialLoading"
            class="mx-1"
            state="•"
          />
        </template>
      </div>

      <base-card-state v-else :is-loading="mainStore.initialLoading" :state="state" />
    </div>
    <div class="append-items-container">
      <base-card-append-item v-for="(item, index) in appendItems" :key="index" v-bind="item" />
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
import BaseCardAppendItem from '../base/card-append-item.vue'
import { useHaAction, type HaAction } from '@/services/use-ha-action'

type HaButtonAppendItem = {
  entityId?: string
  state?: string
  icon?: string
  iconColor?: string
}

export type HaButtonProps = {
  entityId?: string
  name?: string
  state?: string | HaButtonAppendItem[]
  icon?: string
  iconColor?: string
  badgeIcon?: string
  badgeColor?: string
  appendItems?: HaButtonAppendItem[]
  actions?: HaAction[]
}

const props = withDefaults(defineProps<HaButtonProps>(), {
  entityId: '',
})

const mainStore = useMainStore()
const { getState } = useHomeassistantStore()
const { isTemplate } = useLiquidJs()
const { onClick, onIconClick } = useHaAction(props.actions ?? [])
const entity = computed(() => getState(props.entityId))

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
  if (Array.isArray(props.state)) {
    const states: HaButtonAppendItem[] = []

    for (const item of props.state) {
      const entity = item.entityId ? getState(item.entityId) : undefined
      states.push({
        entityId: item.entityId,
        state: item.state
          ? isTemplate(item.state)
            ? useLiquidJsTemplate(item.state).value
            : item.state
          : entity?.getState({ withUnit: true }),
        icon: item.icon
          ? isTemplate(item.icon)
            ? useLiquidJsTemplate(item.icon).value
            : item.icon
          : entity?.icon,
        iconColor:
          item.iconColor && isTemplate(item.iconColor)
            ? useLiquidJsTemplate(item.iconColor).value
            : item.iconColor,
      })
    }
    return states
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

const appendItems = computed(() => {
  const states: HaButtonAppendItem[] = []
  if (!props.appendItems) {
    return states
  }

  for (const item of props.appendItems) {
    const entity = item.entityId ? getState(item.entityId) : undefined
    states.push({
      entityId: item.entityId,
      state: item.state
        ? isTemplate(item.state)
          ? useLiquidJsTemplate(item.state).value
          : item.state
        : entity?.getState({ withUnit: true }),
      icon: item.icon
        ? isTemplate(item.icon)
          ? useLiquidJsTemplate(item.icon).value
          : item.icon
        : entity?.icon,
      iconColor:
        item.iconColor && isTemplate(item.iconColor)
          ? useLiquidJsTemplate(item.iconColor).value
          : item.iconColor,
    })
  }

  return states
})
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
  padding-right: 16px;

  /* &.active {
    background-color: var(--active-color);
  } */
}

.separator {
  opacity: 0.7;
  color: var(--text-color);
  margin-left: 4px;
  margin-right: 4px;
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

.append-items-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
</style>
