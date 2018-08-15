import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';


const initialState = {
    sensors: [
        {'devEUI': 1111111111111111, 'data': 'TDoxOTYuNSBIOjIzLjkgVDoyMy40TToyLjY2NDcx'}
    ]
}

const history = createBrowserHistory()

const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
        )
    )
);



ReactDOM.render(
    <Provider store={store}>
         <App history={history} />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
