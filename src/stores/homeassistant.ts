import type {
  HomeassistantArea,
  HomeassistantEventStateChangedState,
} from '@/services/homeassistant-websoket/homeassistant-websocket.declaration'
import { Area, EniityBase } from '@/services/homeassistant-websoket/homeassistant-websoket.model'
import { defineStore } from 'pinia'

type State = {
  states: { [key: string]: HomeassistantEventStateChangedState | undefined }
  areas: { [key: string]: HomeassistantArea | undefined }
}

export const useHomeassistantStore = defineStore('homeassistante', {
  state: (): State => ({
    states: {},
    areas: {},
  }),
  getters: {
    getArea: (state) => {
      return (area_id: string) => {
        const area = state.areas[area_id]
        if (!area) return undefined
        return new Area(area)
      }
    },
    getState: (state) => {
      return (entity_id: string) => {
        const entity = state.states[entity_id]
        if (!entity) {
          return undefined
        }

        switch (entity.attributes.unit_of_measurement) {
          case 'energy':
            return new EniityBase(entity)
          default:
            return new EniityBase(entity)
        }
      }
    },
  },
  actions: {
    updateArea(area: HomeassistantArea) {
      this.areas[area.area_id] = { ...area, icon: area.icon?.replace('mdi:', '') }
    },
    update(state: HomeassistantEventStateChangedState) {
      if (!this.states[state.entity_id]) {
        this.states[state.entity_id] = state
        return
      }

      this.states[state.entity_id] = {
        ...state,
        attributes: { ...state.attributes, icon: state.attributes.icon?.replace('mdi:', '') },
      }
    },
  },
})
