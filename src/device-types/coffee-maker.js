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

class CoffeeMaker extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['little coffee pot'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['coffee maker'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['my coffee cup'],
      roomHint: 'Office'
    }, {
        nicknames: ['desktop espresso machine'],
      roomHint: 'Office'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new CoffeeMaker()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.COFFEE_MAKER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl',
      ],
      defaultNames: [`Smart Coffee Maker`],
      name: `Smart Coffee Maker`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 0.0,
          maxThresholdCelsius: 100.0
        },
        temperatureUnitForUX: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        temperatureSetpointCelsius: 30,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addCoffeeMaker',
  icon: 'maps:local-cafe',
  label: 'Coffee Maker',
  function: (app) => { app._createDevice(CoffeeMaker.createDevice()); }
})
