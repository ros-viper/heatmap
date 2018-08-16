import { store } from '../index.js'
import { setSensors } from '../actions/actions';

export const sensorsLink = 'http://localhost:8000/api/sensors/';

export const getSensors = (link) => {
    fetch(link)
    .then(res => res.json())
    .then(result => store.dispatch(setSensors(result)));
}