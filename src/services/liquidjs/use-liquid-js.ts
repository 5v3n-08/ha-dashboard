import {
  Context,
  Hash,
  Liquid,
  Tag,
  TagToken,
  Value,
  type Emitter,
  type TopLevelToken,
} from 'liquidjs'
import { Area, type EniityBase } from '../homeassistant-websoket/homeassistant-websoket.model'
import type {
  HomeassistantArea,
  HomeassistantEventStateChangedState,
} from '../homeassistant-websoket/homeassistant-websocket.declaration'
import type { TagRenderReturn } from 'liquidjs/dist/template'
import { i18n } from '@/main'

export type LiquidJsParseContext = {
  [key: string]: {
    [key: string]: HomeassistantEventStateChangedState | HomeassistantArea | undefined
  }
}

class FullAreaContextTag extends Tag {
  private hash: Hash
  constructor(tagToken: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
    super(tagToken, remainTokens, liquid)
    this.hash = new Hash(tagToken.args)
  }

  render(ctx: Context, emitter: Emitter): TagRenderReturn {
    return ''
  }
}

export const useLiquidJs = () => {
  const engine = new Liquid()

  engine.registerTag('full_area_context', FullAreaContextTag)
  engine.registerFilter('translate', (v) => i18n.global.t(v))

  const isTemplate = (template: string) => {
    const regex = /{%|{{|}}|%}/gm
    return regex.test(template)
  }

  const parse = (config: string, context: LiquidJsParseContext): string => {
    return engine.parseAndRenderSync(config, context)
  }

  const addToContext = (entity: EniityBase | Area, currentContext: LiquidJsParseContext) => {
    const [domain, name] = (
      entity instanceof Area ? `area.${entity.raw.area_id}` : entity.raw.entity_id
    ).split('.')
    if (!currentContext[domain]) {
      currentContext[domain] = {}
    }
    currentContext[domain][name] = entity.raw

    return currentContext
  }

  return { parse, addToContext, isTemplate }
}
