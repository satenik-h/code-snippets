import {Map} from 'immutable';

import * as actionTypes from '../../constants/ActionTypes';

const initialState = new Map({
    twoFactorCB: null
});

function twoFactorReducer(state = initialState, action) {
    if (!action)
        return state;

    switch (action.type) {
        case actionTypes.TWO_FACTOR_AUTH_START: {
            return Object.assign({}, state, {
                twoFactorCB: action.twoFactorCB
            });
        }

        case actionTypes.TWO_FACTOR_AUTH_END: {
            return Object.assign({}, state, {
                twoFactorCB: null
            });
        }

        case 'persist/REHYDRATE': {
            return Object.assign({}, state, {
                twoFactorCB: action.payload
                            && action.payload.twoFactorReducer
                            && action.payload.twoFactorReducer.twoFactorCB,
            });
        }

        default: {
            return state;
        }
    }
}

export default twoFactorReducer;
