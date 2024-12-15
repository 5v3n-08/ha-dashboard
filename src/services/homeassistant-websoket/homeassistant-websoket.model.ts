import type { App } from 'vue'
import hass from 'homeassistant-ws'
import { useHomeassistantStore } from '@/stores/homeassistant'
import type {
  HomeassistantArea,
  HomeassistantEventStateChangedState,
  HomeassistantWebsocketEvent,
} from './homeassistant-websocket.declaration'
import { i18n } from '@/main'

export class EniityBase {
  constructor(protected readonly raw_state: HomeassistantEventStateChangedState) {}

  get raw() {
    return this.raw_state
  }

  get state(): string {
    return this.raw_state.state
  }

  public getState(options?: { withUnit?: boolean; translate?: boolean }) {
    let state = this.raw_state.state

    if (options?.translate) {
      state = i18n.global.t(this.raw_state.state)
    }

    if (options?.withUnit && this.raw_state.attributes.unit_of_measurement) {
      state = `${state} ${this.raw_state.attributes.unit_of_measurement}`
    }

    return state
  }

  get friendlyName() {
    return this.raw_state.attributes.friendly_name
  }

  get icon() {
    if (this.raw_state.attributes.icon) {
      return this.raw_state.attributes.icon.replace('mdi:', '')
    }
    switch (this.raw_state.attributes.device_class) {
      case 'power':
      case 'energy': {
        return 'flash'
      }
    }

    return 'help'
  }
}

export class Area {
  constructor(protected readonly raw_state: HomeassistantArea) {}

  get raw() {
    return this.raw_state
  }

  get icon() {
    if (this.raw_state.icon) {
      return this.raw_state.icon.replace('mdi:', '')
    }
    return 'help'
  }
}
