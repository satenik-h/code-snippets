import { Map } from 'immutable';

import * as actionTypes from '../../constants/ActionTypes';

const initialState = new Map({
    participateStarting: false,
    participateStartingError: null,
    refundStarting: false,
    refundStartingError: null,
    crowdsaleGeneralStatusGetting: false,
    crowdsaleGeneralStatusGettingError: null,
    crowdsaleInvestorStatusGetting: false,
    crowdsaleInvestorStatusGettingError: null,
    generalStatusData: null,
    investorStatusData: null,
});

function crowdsaleReducer(state = initialState, action) {
    if (!action)
        return state;

    switch (action.type) {
        case actionTypes.PARTICIPATE: {
            return Object.assign({}, state, {
                participateStarting: true,
            });
        }

        case actionTypes.PARTICIPATE_SUCCESS: {
            return Object.assign({}, state, {
                participateStarting: false,
            });
        }

        case actionTypes.PARTICIPATE_FAILURE: {
            return Object.assign({}, state, {
                participateStarting: false,
            });
        }

        case actionTypes.REFUND: {
            return Object.assign({}, state, {
                refundStarting: true,
            });
        }

        case actionTypes.REFUND_SUCCESS: {
            return Object.assign({}, state, {
                refundStarting: false,
            });
        }

        case actionTypes.REFUND_FAILURE: {
            return Object.assign({}, state, {
                refundStarting: false,
            });
        }

        case actionTypes.GET_CROWDSALE_GENERAL_STATUS: {
            return Object.assign({}, state, {
                crowdsaleGeneralStatusGetting: true,
            });
        }

        case actionTypes.GET_CROWDSALE_GENERAL_STATUS_SUCCESS: {
            return Object.assign({}, state, {
                crowdsaleGeneralStatusGetting: false,
                generalStatusData: action.data,
            });
        }

        case actionTypes.GET_CROWDSALE_GENERAL_STATUS_FAILURE: {
            return Object.assign({}, state, {
                crowdsaleGeneralStatusGetting: false,
            });
        }

        case actionTypes.GET_CROWDSALE_INVESTOR_STATUS: {
            return Object.assign({}, state, {
                crowdsaleInvestorStatusGetting: true,
            });
        }

        case actionTypes.GET_CROWDSALE_INVESTOR_STATUS_SUCCESS: {
            return Object.assign({}, state, {
                crowdsaleInvestorStatusGetting: false,
                investorStatusData: action.data,
            });
        }

        case actionTypes.GET_CROWDSALE_INVESTOR_STATUS_FAILURE: {
            return Object.assign({}, state, {
                crowdsaleInvestorStatusGetting: false,
            });
        }

        default: {
            return state;
        }
    }
}

export default crowdsaleReducer;
