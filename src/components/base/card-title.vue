<template>
  <div class="name" style="">
    <Skeleton v-if="isLoading" width="100%" height="13px" class="mb-2" borderRadius="16px" />
    <div v-else class="__scrolling-container">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
type BaseCardTitleProps = {
  isLoading?: boolean
  name?: string
}

withDefaults(defineProps<BaseCardTitleProps>(), {
  isLoading: false,
})
</script>

<style lang="css" scoped>
.name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  position: relative;
  white-space: nowrap;
}
</style>
