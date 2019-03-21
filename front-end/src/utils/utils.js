import store from '../store/store';
import { setSensors, setLoading, setCoord, setSensor } from '../actions/actions';
import { push } from 'react-router-redux';

export const sensorsLink = 'http://localhost:8000/api/sensors/';
// export const sensorsLink = 'http://10.25.100.164:80/api/sensors/';

export const getSensors = (link) => {
    store.dispatch(setLoading());
    fetch(link)
    .then(res => res.json())
    .then(result => store.dispatch(setSensors(result)));
    console.log("sensors updated");
}

export const addSensor = (link, sensor) => {
    store.dispatch(setLoading());
    fetch(link, 
        {
            method: 'POST',
            body: JSON.stringify(sensor),
            headers: {
                'Content-Type': 'application/json'
            }
        }    
    )
    .then(res => res.json())
    .then(() => store.dispatch(setCoord(null)))
    .then(() => getSensors(link));
}

export const getSensor = (link, key) => {
    store.dispatch(setLoading());
    fetch(link+key+'/')
    .then(res => res.json())
    .then(result => store.dispatch(setSensor(result)))
    .then(() => store.dispatch(push(`/sensor/${store.getState().rootReducer.selectedSensor.serialID}`)));
}

export const deleteSensor = (link, sensor) => {
    store.dispatch(setLoading());
    fetch(link+sensor.serialID+"/", {
        method: "DELETE"
    })
    .then(() => store.dispatch(setSensor(null)))
    .then(() => getSensors(sensorsLink))
    .then(() => store.dispatch(push("/")));
    
}