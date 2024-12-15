<template>
  <div v-for="(row, index) in config.content" :key="index" class="w-full p-4">
    <dynamic-components v-bind="row"></dynamic-components>
  </div>
</template>

<script setup lang="ts">
import type { Elements } from '@/components/dynamic-components.vue'

type Config = {
  type: 'root'
  content?: Elements[]
}

const config: Config = {
  type: 'root',
  content: [
    {
      type: 'horizontal',
      config: { breakOnSm: true },
      content: [
        {
          type: 'vertical',
          content: [
            {
              type: 'horizontal',
              content: [
                {
                  type: 'ha-button',
                  config: {
                    entityId: 'person.sven_stiels',
                    icon: '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_sven.state].icon }}  {% endif %}',
                    iconColor:
                      '{% if person.sven_stiels.state == "not_home" %} red {% else %} green {% endif %}',
                    state:
                      '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} {{ person.sven_stiels.state | translate }} {% else %} {{ area[sensor.esp_iphone_sven.state].name }} {% endif %}',
                  },
                },
                {
                  type: 'ha-button',
                  config: {
                    entityId: 'person.astiels',
                    icon: '{% full_area_context %} {% if person.astiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_anna.state].icon }}  {% endif %}',
                    iconColor:
                      '{% if person.astiels.state == "not_home" %} red {% else %} green {% endif %}',
                    state:
                      '{% full_area_context %} {% if person.astiels.state == "not_home" %} {{ person.astiels.state | translate }} {% else %} {{ area[sensor.esp_iphone_anna.state].name }} {% endif %}',
                  },
                },
              ],
            },
            {
              type: 'horizontal',
              content: [
                { type: 'ha-button', config: { entityId: 'sensor.aktueller_stromverbrauch_watt' } },
                { type: 'empty' },
                { type: 'ha-button', config: { entityId: 'sensor.aktueller_stromverbrauch_watt' } },
              ],
            },
          ],
        },
        {
          type: 'vertical',
          content: [
            {
              type: 'horizontal',
              content: [
                { type: 'ha-button', config: { entityId: 'sensor.aktueller_stromverbrauch_watt' } },
                { type: 'ha-button', config: { entityId: 'sensor.aktueller_stromverbrauch_watt' } },
              ],
            },
            { type: 'ha-button', config: { entityId: 'sensor.aktueller_stromverbrauch_watt' } },
          ],
        },
      ],
    },
  ],
}

const personSvenConfig = {
  entityId: 'person.sven_stiels',
  icon: '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_sven.state].icon }}  {% endif %}',
  iconColor: '{% if person.sven_stiels.state == "not_home" %} red {% else %} green {% endif %}',
  state:
    '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} {{ person.sven_stiels.state | translate }} {% else %} {{ area[sensor.esp_iphone_sven.state].name }} {% endif %}',
}

const personAnnaConfig = {
  entityId: 'person.astiels',
  icon: '{% full_area_context %} {% if person.astiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_anna.state].icon }}  {% endif %}',
  iconColor: '{% if person.astiels.state == "not_home" %} red {% else %} green {% endif %}',
  state:
    '{% full_area_context %} {% if person.astiels.state == "not_home" %} {{ person.astiels.state | translate }} {% else %} {{ area[sensor.esp_iphone_anna.state].name }} {% endif %}',
}

const stromConfig = {
  entityId: 'sensor.aktueller_stromverbrauch_watt',
  name: 'Aktueller Stromverbrauch',
  // icon: '{% full_area_context %} {% if person.astiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_anna.state].icon }}  {% endif %}',
  // iconColor: '{% if person.astiels.state == "not_home" %} red {% else %} green {% endif %}',
  state: '{{ sensor.aktueller_stromverbrauch_watt.state }} W',
}
</script>
