import { useHomeassistantStore } from '@/stores/homeassistant'
import { computed, reactive, ref, watch } from 'vue'
import { useLiquidJs, type LiquidJsParseContext } from './use-liquid-js'
import { uniq } from 'lodash'
import { Area } from '../homeassistant-websoket/homeassistant-websoket.model'

export const useLiquidJsTemplate = (template: string) => {
  const store = useHomeassistantStore()
  const { parse, addToContext } = useLiquidJs()

  const value = computed(() => {
    let context: LiquidJsParseContext = {}
    const regex = /(?<id>(person|sensor|switch|area)[.][\w]+)/gm
    const matches = [...template.matchAll(regex)]
    const entities = uniq(matches.map((m) => m.groups?.id).filter((i) => i !== undefined))
    if (template.includes('area')) console.log(entities)

    for (const entityId of entities) {
      const isArea = entityId.startsWith('area.')
      const state = isArea ? store.getArea(entityId.split('.')[1]) : store.getState(entityId)
      if (!state) {
        continue
      }
      context = addToContext(state, context)
    }

    if (template.includes('full_area_context')) {
      for (const areaId in store.areas) {
        const area = store.getArea(areaId)
        if (!area) {
          continue
        }
        context = addToContext(area, context)
      }
    }

    if (template.includes('area')) console.log(context)
    return parse(template, context).trim()
  })

  return value
}
