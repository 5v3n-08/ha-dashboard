<template>
  <div class="state" style="">
    <Skeleton v-if="isLoading" width="75%" height="11px" borderRadius="16px" />
    <div v-else class="__scrolling-container">{{ state }}</div>
  </div>
</template>

<script setup lang="ts">
type BaseCardStateProps = {
  isLoading?: boolean
  state?: string
}

withDefaults(defineProps<BaseCardStateProps>(), {
  isLoading: false,
})
</script>

<style lang="css" scoped>
.state {
  font-size: 12px;
  font-weight: normal;
  opacity: 0.7;
  display: flex;
  position: relative;
  white-space: nowrap;
}
</style>
