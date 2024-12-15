import { defineStore } from 'pinia'

type State = {
  initialLoading: boolean
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    initialLoading: true,
  }),
})
