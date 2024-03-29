/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DeviceType } from './device-type';

let instance;

class Shower extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['guest shower'],
      roomHint: 'Bathroom'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Shower()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.SHOWER',
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.OnOff',
        'action.devices.traits.Modes'
      ],
      defaultNames: [`Smart Shower`],
      name: `Smart Shower`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableModes: [{
          name: 'monsoon',
          name_values: [{
            name_synonym: [
              'monsoon',
              'heavy rain',
              'waterfall'
            ],
            lang: 'en'
          }],
          settings: [{
            setting_name: 'trickle',
            setting_values: [{
              setting_synonym: [
                "trickle",
                "gentle"
              ],
              lang: 'en'
            }]
          }]
        }],
        ordered: true
      },
      willReportState: true,
      states: {
        online: true,
        on: false,
        isRunning: false,
        isPaused: false,
        currentModeSettings: {
          monsoon: 'trickle'
        }
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addShower',
  icon: 'maps:local-car-wash',
  label: 'Shower',
  function: (app) => { app._createDevice(Shower.createDevice()); }
})
