import { SET_SENSORS, SET_LOADING, SET_FLOOR, SET_ADMIN, SET_COORD, SET_SENSOR, DELETE_SENSOR } from './action-types.js';

export const setSensors = sensors => ({
    type: SET_SENSORS,
    payload: sensors
});

export const setLoading = () => ({
    type: SET_LOADING,
    payload: null
});

export const setFloor = floor => ({
    type: SET_FLOOR,
    payload: floor
});

export const setAdmin = () => ({
    type: SET_ADMIN,
    payload: null
});

export const setCoord = payload => ({
    type: SET_COORD,
    payload: payload
});

export const setSensor = payload => ({
    type: SET_SENSOR,
    payload: payload
});