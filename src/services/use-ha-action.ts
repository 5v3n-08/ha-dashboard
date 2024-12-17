import { OpenDialogIdSymbol } from '@/symbols'
import { inject } from 'vue'

export type HaAction = {
  type: 'click' | 'icon-click'
  context: 'dialog'
  data: { dialogId: string }
}

export const useHaAction = (actions: HaAction[]) => {
  const dialog = inject(OpenDialogIdSymbol)

  const isOnClickAvailable = actions.some((v) => v.type === 'click')
  const onClick = isOnClickAvailable
    ? () => {
        const action = actions.find((v) => v.type === 'click')
        dialog?.setOpenDialogId(action?.data.dialogId)
      }
    : undefined

  const isOnIconClickAvailable = actions.some((v) => v.type === 'icon-click')
  const onIconClick = isOnIconClickAvailable
    ? () => {
        const action = actions.find((v) => v.type === 'icon-click')
        dialog?.setOpenDialogId(action?.data.dialogId)
      }
    : undefined

  return { onClick, onIconClick }
}
