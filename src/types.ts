type HaActionDialog = {
  context: 'dialog'
  options: { dialogId: string }
}

export type HaAction = {
  type: 'click' | 'icon-click'
} & HaActionDialog

export type BaseStateConfig = {
  entityId?: string
  showState?: boolean | string
  state?: string
  showIcon?: boolean | string
  icon?: string
  iconColor?: string
  visible?: boolean | string
  actions?: HaAction[]
}
