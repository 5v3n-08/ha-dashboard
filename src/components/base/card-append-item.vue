<template>
  <div class="append-item" style="">
    <mdicon
      v-if="showIcon && icon"
      class="icon"
      :size="12"
      :name="icon"
      :style="{ '--icon-color': iconColor }"
    />
    <span v-if="showState">{{ state }}</span>
  </div>
</template>

<script setup lang="ts">
type BaseCardAppendItemProps = {
  showState?: boolean
  state?: string
  showIcon?: boolean
  icon?: string
  iconColor?: string
}

withDefaults(defineProps<BaseCardAppendItemProps>(), {
  showIcon: true,
  showState: true,
})
</script>

<style lang="css" scoped>
.append-item {
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 12px;
  font-weight: normal;
  opacity: 0.7;
  color: var(--text-color);
  display: flex;
  position: relative;
  white-space: nowrap;
}

.icon {
  opacity: 0.6;
  transition: color 1.5s;
  color: var(--icon-color);
  margin-right: 2px;
}
</style>
