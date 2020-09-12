import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {autoRehydrate} from 'redux-persist';

import appReducer from '../app/reducer';

const logger = createLogger({
    level: 'info',
    collapsed: true
});

const router = routerMiddleware(browserHistory);

/**
 * Creates a preconfigured store.
 *
 * @param {initialState} initialState The initial state
 * @return {store} {*} Return the store object
 */
export default function configureStore(initialState) {
    return createStore(
        appReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk, router),
            autoRehydrate()
        )
    );
}
