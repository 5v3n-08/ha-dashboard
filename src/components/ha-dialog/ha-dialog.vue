<template>
  <Dialog
    v-model:visible="isOpen"
    header="Edit Profile"
    :style="{ width: '25rem' }"
    position="bottom"
    :modal="true"
    :draggable="false"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="dialog?.setOpenDialogId(undefined)"
      ></Button>
      <Button type="button" label="Save"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { OpenDialogIdSymbol } from '@/symbols'
import { computed, inject } from 'vue'

const dialog = inject(OpenDialogIdSymbol)

const isOpen = computed(() => !!dialog?.openDialogId.value)
</script>
