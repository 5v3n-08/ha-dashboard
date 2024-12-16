import type { InjectionKey, Ref } from 'vue'

type OpenDialogIdType = {
  openDialogId: Ref<string | undefined>
  setOpenDialogId: (value: string | undefined) => void
}
export const OpenDialogIdSymbol = Symbol('OpenDialogIdSymbol') as InjectionKey<OpenDialogIdType>
