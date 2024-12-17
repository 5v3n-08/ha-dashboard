import type { ConfigHaDialog, Elements } from '@/components/dynamic-components.vue'

const stromConfig = {
  entityId: 'sensor.aktueller_stromverbrauch_watt',
  name: 'Aktueller Stromverbrauch',
  // icon: '{% full_area_context %} {% if person.astiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_anna.state].icon }}  {% endif %}',
  // iconColor: '{% if person.astiels.state == "not_home" %} red {% else %} green {% endif %}',
  state: '{{ sensor.aktueller_stromverbrauch_watt.state }} W',
}

type Config = {
  type: 'root'
  content?: Elements[]
  dialogs?: ConfigHaDialog[]
}

const personsRow: Elements = {
  type: 'horizontal',
  content: [
    {
      type: 'ha-button',
      config: {
        actions: [
          { type: 'click', context: 'dialog', data: { dialogId: '#sven' } },
          { type: 'icon-click', context: 'dialog', data: { dialogId: '#anna' } },
        ],
        entityId: 'person.sven_stiels',
        icon: '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_sven.state].icon }}  {% endif %}',
        iconColor:
          '{% if person.sven_stiels.state == "not_home" %} red {% else %} var(--color-icon-green) {% endif %}',
        state:
          '{% full_area_context %} {% if person.sven_stiels.state == "not_home" %} {{ sensor.iphone_5v3n_geocoded_location.attributes.Name }}, {{ sensor.iphone_5v3n_geocoded_location.attributes.Locality }} - {{ sensor.iphone_5v3n_geocoded_location.attributes["Sub Locality"] }}  {% else %} {{ area[sensor.esp_iphone_sven.state].name }} {% endif %}',
      },
    },
    {
      type: 'ha-button',
      config: {
        actions: [{ type: 'click', context: 'dialog', data: { dialogId: '#anna' } }],
        entityId: 'person.astiels',
        icon: '{% full_area_context %} {% if person.astiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_anna.state].icon }}  {% endif %}',
        iconColor:
          '{% if person.astiels.state == "not_home" %} red {% else %} var(--color-icon-green) {% endif %}',
        state:
          '{% full_area_context %} {% if person.astiels.state == "not_home" %} {{ sensor.sensor.iphone_von_anna_lena_geocoded_location.attributes.Name }}, {{ sensor.sensor.iphone_von_anna_lena_geocoded_location.attributes.Locality }} - {{ sensor.sensor.iphone_von_anna_lena_geocoded_location.attributes["Sub Locality"] }} {% else %} {{ area[sensor.esp_iphone_anna.state].name }} {% endif %}',
      },
    },
  ],
}

const dialog1: ConfigHaDialog = {
  type: 'ha-dialog',
  config: { dialogId: '#sven' },
  content: [{ type: 'ha-button', config: stromConfig }],
}

const dialog2: ConfigHaDialog = {
  type: 'ha-dialog',
  config: { dialogId: '#anna' },
  content: [personsRow.content![1]],
}

const leftSide: Elements = {
  type: 'vertical',
  content: [
    personsRow,
    {
      type: 'horizontal',
      content: [
        { type: 'ha-button', config: { entityId: 'sensor.aktueller_stromverbrauch_watt' } },
        { type: 'empty' },
        { type: 'ha-button', config: { entityId: 'sensor.aktueller_stromverbrauch_watt' } },
      ],
    },
  ],
}

export const config: Config = {
  type: 'root',
  dialogs: [dialog1, dialog2],
  content: [
    {
      type: 'horizontal',
      config: { breakOnSm: true },
      content: [
        leftSide,
        {
          type: 'vertical',
          content: [
            {
              type: 'ha-button',
              config: {
                entityId: 'sensor.speck_25_strompreis',
                name: 'Strompreis',
                state: [
                  { entityId: 'sensor.speck_25_strompreis' },
                  { entityId: 'sensor.aktueller_stromverbrauch_watt' },
                  { entityId: 'sensor.gesamter_stromverbrauch_watt' },
                ],
                appendItems: [
                  { entityId: 'sensor.aktueller_stromverbrauch_watt' },
                  { entityId: 'sensor.aktueller_stromverbrauch_watt' },
                ],
              },
            },
            { type: 'ha-button', config: stromConfig },
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
