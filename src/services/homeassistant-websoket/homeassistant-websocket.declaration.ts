import homeassistantWebsoketPlugin from './homeassistant-websoket.plugin'

export type HomeassistantEventStateChangedState = {
  entity_id: string
  state: string
  attributes: {
    unit_of_measurement?: string
    device_class?: string
    friendly_name: string
    icon?: string
  }
  last_changed: string
  last_reported: string
  last_updated: string
  context: HomeassistantEventContext
}

type HomeassistantEventStateChanged = {
  event_type: 'state_changed'
  data: {
    entity_id: string
    old_state: HomeassistantEventStateChangedState
    new_state: HomeassistantEventStateChangedState
  }
} & HomeassistantEventBase

type HomeassistantEventContext = { id: string; parent_id: null; user_id: null }
type HomeassistantEventBase = {
  origin: 'LOCAL'
  time_fired: string
  context: HomeassistantEventContext
}

type HomeassistantEvent = HomeassistantEventStateChanged

export type HomeassistantWebsocketEvent = {
  type: 'event'
  id: number
  event: HomeassistantEvent
}

export type HomeassistantArea = {
  aliases: string[]
  area_id: string
  created_at: number
  floor_id: string
  icon?: string
  labels: string[]
  modified_at: number
  name: string
  picture: string | null
}
