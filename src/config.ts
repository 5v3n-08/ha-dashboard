import type { ConfigHaDialog, Elements } from '@/components/dynamic-components.vue'
import type { HaButtonProps } from './components/ha-button/ha-button.vue'

const stromConfig: HaButtonProps = {
  entityId: 'sensor.aktueller_stromverbrauch_watt',
  name: 'Stromübersicht',
  // icon: '{% full_area_context %} {% if person.astiels.state == "not_home" %} home-export-outline {% else %} {{ area[sensor.esp_iphone_anna.state].icon }}  {% endif %}',
  // iconColor: '{% if person.astiels.state == "not_home" %} red {% else %} green {% endif %}',
  icon: '{% if sensor.aktueller_stromverbrauch_watt.state > 0 %} transmission-tower-export {% else %} transmission-tower-import {% endif %}',
  iconColor:
    '{% if sensor.aktueller_stromverbrauch_watt.state > 20 %} yellow {% elsif sensor.aktueller_stromverbrauch_watt.state > 0 %} green {% else %} red {% endif %}',
  state: [
    { entityId: 'sensor.aktueller_stromverbrauch_watt', icon: 'transmission-tower' },
    {
      entityId: 'sensor.gesamter_stromverbrauch_watt',
      icon: 'home-lightning-bolt',
      visible: '{% if sensor.stromerzeugung_watt.state > 0 %} true {% else %} false {% endif %}',
    },
    {
      entityId: 'sensor.solarbank_2_e1600_pro_dc_ausgangsleistung',
      icon: 'solar-power-variant',
      state:
        '{% if sensor.solarbank_2_e1600_pro_dc_ausgangsleistung.state != sensor.solarbank_2_e1600_pro_einspeisevorgabe.state %} {{ sensor.solarbank_2_e1600_pro_dc_ausgangsleistung.state }} W ({{ sensor.solarbank_2_e1600_pro_einspeisevorgabe.state }} W) {% else %} {{ sensor.solarbank_2_e1600_pro_dc_ausgangsleistung.state }} W {% endif %}',
      visible:
        '{% if sensor.solarbank_2_e1600_pro_dc_ausgangsleistung.state > 0 %} true {% else %} false {% endif %}',
    },
  ],
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
          { type: 'click', context: 'dialog', options: { dialogId: '#sven' } },
          { type: 'icon-click', context: 'dialog', options: { dialogId: '#anna' } },
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
        actions: [{ type: 'click', context: 'dialog', options: { dialogId: '#anna' } }],
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
                  { entityId: 'sensor.speck_25_strompreis', showIcon: false },
                  { entityId: 'sensor.gesamter_stromverbrauch_watt' },
                ],
                appendItems: [
                  { entityId: 'sensor.system_zuhause_taglicher_solarertrag', icon: 'solar-panel' },
                  {
                    entityId: 'sensor.tibber_pulse_speck_25_kumulierter_verbrauch',
                    icon: 'counter',
                    state:
                      '{{ sensor.tibber_pulse_speck_25_kumulierter_verbrauch.state | round: 2  }} kWh',
                  },
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
