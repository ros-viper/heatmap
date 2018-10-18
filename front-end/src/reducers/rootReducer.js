import { SET_SENSORS, SET_LOADING, SET_FLOOR } from '../actions/action-types';

const initialState = {
    sensors: [],
    floor: "d2"
}


const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state); //makes sure there is always a new object(state) when something changes, rather then the same object with new property;

    switch (action.type) {
        case SET_SENSORS:
            newState.sensors = action.payload;
            newState.loading = false;
            return newState;
        case SET_LOADING:
            newState.loading = true;
            return newState;
        case SET_FLOOR:
            newState.floor = action.payload;
            return newState;
        default:
            return state; 
    };
};

export default rootReducer;