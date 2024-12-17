<template>
  <Dialog
    v-model:visible="isOpen"
    header="Edit Profile"
    :style="{ width: '25rem' }"
    position="bottom"
    :modal="true"
    :draggable="false"
  >
    <slot />
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

export type HaDialogProps = {
  dialogId: string
}

const props = withDefaults(defineProps<HaDialogProps>(), {})

const dialog = inject(OpenDialogIdSymbol)
const isOpen = computed(() => dialog?.openDialogId.value === props.dialogId)

const config = {
  type: 'ha-button',
  config: {
    entityId: 'person.sven_stiels',
    icon: '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_sven.state].icon }}  {% endif %}',
    iconColor:
      '{% if person.sven_stiels.state == "not_home" %} red {% else %} var(--color-icon-green) {% endif %}',
    state:
      '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} {{ person.sven_stiels.state | translate }} {% else %} {{ area[sensor.esp_iphone_sven.state].name }} {% endif %}',
  },
}
</script>
