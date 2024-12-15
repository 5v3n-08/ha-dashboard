import type { App } from 'vue'
import hass from './homeassistant-websoket.service'
import { useHomeassistantStore } from '@/stores/homeassistant'
import type { HomeassistantWebsocketEvent } from './homeassistant-websocket.declaration'
import { useMainStore } from '@/stores/main'

export default {
  install: async (app: App) => {
    const store = useHomeassistantStore()
    console.log(import.meta.env)

    const client = await hass({
      token: import.meta.env.VITE_WEBSOCKET_TOKEN,
      host: import.meta.env.VITE_WEBSOCKET_HOST,
      protocol: 'wss',
      port: 443,
    })

    client.on('event', (e: HomeassistantWebsocketEvent) => {
      const { event } = e
      if (event.event_type === 'state_changed') {
        store.update(event.data.new_state)
      }
    })

    await client.getStates().then((states) => states.forEach((s) => store.update(s)))
    await client.getAreas().then((areas) => areas.forEach((a) => store.updateArea(a)))

    useMainStore().initialLoading = false
    app.provide('websocket', client)
  },
}
