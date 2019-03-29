import store from '../store/store';
import { setSensors, setLoading, setCoord, setSensor, setToken } from '../actions/actions';
import { push } from 'react-router-redux';

export const sensorsLink = 'http://localhost:8000/api/sensors/';
export const credsLink = 'http://localhost:8000/api-auth/';
// export const sensorsLink = 'http://10.25.100.164:80/api/sensors/';
// export const credsLink = 'http://10.25.100.164:80/api-auth/';

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
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + store.getState().loginReducer.token
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
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + store.getState().loginReducer.token
        }
    })
    .then(() => store.dispatch(setSensor(null)))
    .then(() => getSensors(sensorsLink))
    .then(() => store.dispatch(push("/")));
    
}

export const getToken = (username, password) => {
    store.dispatch(setLoading(true));
    const credStorage = localStorage;

    fetch(credsLink, {
        method: 'POST',
        body: JSON.stringify({ 'username': username, 'password': password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then( res => res.json() )
        .then( result => {
            console.log(result);
            store.dispatch(setLoading(false));

            if(result.token) {
                store.dispatch(setToken(result.token));
                credStorage.setItem('token', result.token);
                store.dispatch(push('/'));
            }
        })
        .catch(e => console.log(`utils.getToken: ${e.message}`));
}