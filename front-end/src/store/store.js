import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { browserHistory } from 'react-router';
import rootReducer from '../reducers/rootReducer';

const middleware = routerMiddleware(browserHistory)

const store = createStore(
    combineReducers({
        rootReducer,
        routing: routerReducer
    }),
    composeWithDevTools(applyMiddleware(middleware))
);

export default store;