import { SET_SENSORS } from '../actions/action-types';

const initialState = {
    sensors: [{'init': 'init'}]
}


const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state); //makes sure there is always a new object(state) when something changes, rather then the same object with new property;

    switch (action.type) {
        case SET_SENSORS:
            newState.sensors = action.payload;
            return newState;
        default:
            return state; 
    };
};

export default rootReducer;