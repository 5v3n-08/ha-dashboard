import { computed, isReactive, isRef, toRef, type Ref } from 'vue'
import { useLiquidJs } from './liquidjs/use-liquid-js'
import { useLiquidJsTemplate } from './liquidjs/use-liqiuid-js-template'

export const useHaTemplating = <T>(state?: T, defaultState?: Ref<T> | T) => {
  const { isTemplate } = useLiquidJs()

  const defaultRefValue = computed(() => {
    return typeof defaultState === 'object' ? (defaultState as Ref<T>)?.value : defaultState
  })

  const value = computed<T | undefined | string>(() => {
    if (state === undefined) {
      if (defaultRefValue.value) {
        return defaultRefValue.value
      }
      return undefined
    }

    if (typeof state === 'string' && isTemplate(state)) {
      return useLiquidJsTemplate(state).value
    }

    return state
  })

  return value
}
