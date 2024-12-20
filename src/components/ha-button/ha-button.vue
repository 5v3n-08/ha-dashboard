<template>
  <button unstyled class="card-container" @click="onClick">
    <base-prepend-card-icon
      v-if="toBoolean(showIcon)"
      :isLoading="mainStore.initialLoading"
      :icon="icon"
      :color="iconColor"
      :show-badge-icon="toBoolean(showBadgeIcon)"
      :badge-icon="badgeIcon"
      :badge-color="badgeColor"
      @click.stop="onIconClick ? onIconClick() : undefined"
    />
    <div class="content-container">
      <base-card-title
        v-if="toBoolean(showName)"
        :is-loading="mainStore.initialLoading"
        :name="name"
      />

      <template v-if="toBoolean(showState)">
        <div v-if="Array.isArray(state)" class="flex">
          <template v-for="(item, index) in state" :key="index">
            <base-card-append-item
              v-if="toBoolean(item.visible) && index > 0 && !mainStore.initialLoading"
              class="mx-1"
              state="•"
            />
            <base-card-append-item
              v-if="toBoolean(item.visible)"
              v-bind="item"
              :show-icon="toBoolean(item.showIcon)"
              :show-state="toBoolean(item.showState)"
              :is-loading="mainStore.initialLoading"
            />
          </template>
        </div>

        <base-card-state v-else :is-loading="mainStore.initialLoading" :state="state" />
      </template>
    </div>

    <div class="append-items-container">
      <template v-for="(item, index) in appendItems" :key="index">
        <base-card-append-item
          v-if="toBoolean(item.visible)"
          v-bind="item"
          :show-icon="toBoolean(item.showIcon)"
          :show-state="toBoolean(item.showState)"
        />
      </template>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useLiquidJsTemplate } from '@/services/liquidjs/use-liqiuid-js-template'
import { useLiquidJs } from '@/services/liquidjs/use-liquid-js'
import { useHomeassistantStore } from '@/stores/homeassistant'
import { useMainStore } from '@/stores/main'
import { computed } from 'vue'
import BasePrependCardIcon from '../base/prepend-card-icon.vue'
import BaseCardTitle from '../base/card-title.vue'
import BaseCardState from '../base/card-state.vue'
import BaseCardAppendItem from '../base/card-append-item.vue'
import { useHaAction } from '@/services/use-ha-action'
import type { BaseStateConfig } from '@/types'
import { useHaTemplating } from '@/services/use-ha-templating'
import { toBoolean } from '@/services/helpers'

export type HaButtonProps = {
  name?: string
  showName?: boolean | string
  state?: string | BaseStateConfig[]
  showBadgeIcon?: boolean | string
  badgeIcon?: string
  badgeColor?: string
  appendItems?: BaseStateConfig[]
} & Omit<BaseStateConfig, 'state'>

const props = withDefaults(defineProps<HaButtonProps>(), {
  entityId: '',
  showName: true,
  showState: true,
  showIcon: true,
  showBadgeIcon: true,
})

const mainStore = useMainStore()
const { getState } = useHomeassistantStore()
const { isTemplate } = useLiquidJs()
const { onClick, onIconClick } = useHaAction(props.actions ?? [])
const entity = computed(() => getState(props.entityId))

if (props.debug) {
  console.log(entity)
}

const showName = useHaTemplating(props.showName, true)
const name = useHaTemplating(
  props.name,
  computed(() => entity.value?.friendlyName),
)
const showState = useHaTemplating(props.showState, true)
const showIcon = useHaTemplating(props.showIcon, true)
const icon = useHaTemplating(
  props.icon,
  computed(() => entity.value?.icon),
)
const iconColor = useHaTemplating(props.iconColor)
const showBadgeIcon = useHaTemplating(props.showBadgeIcon, true)
const badgeIcon = useHaTemplating(props.badgeIcon)
const badgeColor = useHaTemplating(props.badgeColor)
const isVisible = useHaTemplating(props.visible, true)

const state = computed(() => {
  if (props.state === undefined) {
    return entity.value?.getState({ withUnit: true })
  }
  if (Array.isArray(props.state)) {
    const states: BaseStateConfig[] = []
    for (const item of props.state) {
      const entity = item.entityId ? getState(item.entityId) : undefined
      states.push({
        entityId: item.entityId,
        showState: useHaTemplating(item.showState, true).value,
        state: useHaTemplating(
          item.state,
          computed(() => entity?.getState({ withUnit: true })),
        ).value,
        showIcon: useHaTemplating(item.showIcon, true).value,
        icon: useHaTemplating(item.icon, entity?.icon).value,
        iconColor: useHaTemplating(item.iconColor).value,
        visible: useHaTemplating(item.visible, true).value,
        actions: item.actions,
      })
    }
    return states
  }
  return isTemplate(props.state) ? useLiquidJsTemplate(props.state).value : props.state
})

const appendItems = computed(() => {
  const states: BaseStateConfig[] = []
  if (!props.appendItems) {
    return states
  }

  for (const item of props.appendItems) {
    const entity = item.entityId ? getState(item.entityId) : undefined

    states.push({
      entityId: item.entityId,
      showState: useHaTemplating(item.showState, true).value,
      state: useHaTemplating(
        item.state,
        computed(() => entity?.getState({ withUnit: true })),
      ).value,
      showIcon: useHaTemplating(item.showIcon, true).value,
      icon: useHaTemplating(item.icon, entity?.icon).value,
      iconColor: useHaTemplating(item.iconColor).value,
      visible: useHaTemplating(item.visible, true).value,
      actions: item.actions,
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
