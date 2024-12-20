<template>
  <div class="icon-container">
    <Skeleton v-if="isLoading" class="skeleton" shape="circle" size="38px" />
    <mdicon v-else class="icon" :name="icon" :style="{ '--icon-color': color }" />
    <mdicon
      v-if="badgeIcon && !isLoading"
      class="badge"
      :size="12"
      :name="badgeIcon"
      :style="{ '--badge-icon-color': badgeColor }"
    />
  </div>
</template>

<script setup lang="ts">
type BasePrependCardIconProps = {
  icon?: string
  color?: string
  showBadgeIcon?: boolean
  badgeIcon?: string
  badgeColor?: string
  isLoading?: boolean
}

withDefaults(defineProps<BasePrependCardIconProps>(), {
  icon: 'help',
  badgeIcon: undefined,
  isLoading: false,
})
</script>

<style lang="css" scoped>
.skeleton {
  background: none;
}

.icon-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  min-width: 38px;
  min-height: 38px;
  margin: 6px;
  border-radius: 12px;
  background-color: var(--color-card-icon-background);
  overflow: visible;
  cursor: pointer;

  .icon {
    display: flex;
    opacity: 0.6;
    transition: color 1.5s;
    color: var(--icon-color);
  }

  .badge {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    background-color: var(--color-card-icon-background);
    color: var(--badge-icon-color);
    inset-block-start: 0;
    inset-inline-end: 0;
    top: -3px;
    right: -3px;
    padding: 3px;
    border-radius: 50%;
    transition: color 1.5s;
  }
}
</style>
