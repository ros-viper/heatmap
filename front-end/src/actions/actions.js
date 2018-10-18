import { SET_SENSORS, SET_LOADING, SET_FLOOR } from './action-types.js';

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