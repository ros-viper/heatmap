import { SET_SENSORS } from './action-types.js'

export const setSensors = sensors => ({
    type: SET_SENSORS,
    payload: sensors
});