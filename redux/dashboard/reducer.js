import { Map } from 'immutable';

import * as actionTypes from '../../constants/ActionTypes';

const initialState = new Map({
    getRefereeCountStarting: false,
    getRefereeCountStartingError: null,
    refereeCount: 0,
});

function dashboardReducer(state = initialState, action) {
    if (!action)
        return state;

    switch (action.type) {
        case actionTypes.GET_REFEREE_COUNT: {
            return Object.assign({}, state, {
                getRefereeCountStarting: true,
            });
        }

        case actionTypes.GET_REFEREE_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                getRefereeCountStarting: false,
                refereeCount: action.data.refereeCount
            });
        }

        case actionTypes.GET_REFEREE_COUNT_FAILURE: {
            return Object.assign({}, state, {
                getRefereeCountStarting: false,
            });
        }

        default: {
            return state;
        }
    }
}

export default dashboardReducer;
