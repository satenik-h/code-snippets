import {createStore} from 'redux';

import reducers from '../app/reducer';

export default function reduxStore(initialState) {
    const store = createStore(reducers, initialState,
        window.devToolsExtension && window.devToolsExtension());

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../app/reducer', () => {
            // We need to require for hot reloading to work properly.
            const nextReducer = require('../app/reducer');  // eslint-disable-line global-require

            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
