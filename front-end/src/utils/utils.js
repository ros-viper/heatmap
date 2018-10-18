import store from '../store/store';
import { setSensors, setLoading } from '../actions/actions';

export const sensorsLink = 'http://localhost:8000/api/sensors/';

export const getSensors = (link) => {
    store.dispatch(setLoading());
    fetch(link)
    .then(res => res.json())
    .then(result => store.dispatch(setSensors(result)));
}