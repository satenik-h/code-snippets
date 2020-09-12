import { Map } from 'immutable';

import * as actionTypes from '../../constants/ActionTypes';

const initialState = new Map({
    walletCreating: false,
    walletCreatingError: null,
    walletAddress: null,
    walletGetting: false,
    walletGettingError: null,
    balanceGetting: false,
    balanceGettingError: null,
    ethBalance: null,
    prscBalance: null,
    etherSending: false,
    etherSendingError: null,
    transactionId: null,
    parsecTokenSending: false,
    parsecTokenSendingError: null,
});

function walletReducer(state = initialState, action) {
    if (!action)
        return state;

    switch (action.type) {
        case actionTypes.CREATE_WALLET: {
            return Object.assign({}, state, {
                walletCreating: true,
            });
        }

        case actionTypes.CREATE_WALLET_SUCCESS: {
            return Object.assign({}, state, {
                walletCreating: false,
                walletCreatingError: null,
                walletAddress: action.data.address,
            });
        }

        case actionTypes.CREATE_WALLET_FAILURE: {
            return Object.assign({}, state, {
                walletCreating: false,
                walletCreatingError: action.errorMsg,
            })
        }

        case actionTypes.GET_WALLET: {
            return Object.assign({}, state, {
                walletGetting: true,
            });
        }

        case actionTypes.GET_WALLET_SUCCESS: {
            return Object.assign({}, state, {
                walletGetting: false,
                walletGettingError: null,
                walletAddress: action.data.address,
            });
        }

        case actionTypes.GET_WALLET_FAILURE: {
            return Object.assign({}, state, {
                walletGetting: false,
                walletGettingError: action.errorMsg,
            })
        }

        case actionTypes.GET_BALANCE: {
            return Object.assign({}, state, {
                balanceGetting: true,
            });
        }

        case actionTypes.GET_BALANCE_SUCCESS: {
            return Object.assign({}, state, {
                balanceGetting: false,
                balanceGettingError: null,
                ethBalance: action.data.ethBalance,
                prscBalance: action.data.prscBalance,
            });
        }

        case actionTypes.GET_BALANCE_ERROR: {
            return Object.assign({}, state, {
                blanceGetting: false,
                balanceGettingError: action.errorMsg,
            })
        }

        case actionTypes.SEND_EHTER: {
            console.log('1')
            return Object.assign({}, state, {
                etherSending: true,
            });
        }

        case actionTypes.SEND_ETHER_SUCCESS: {
            return Object.assign({}, state, {
                etherSending: false,
                etherSendingError: null,
                transactionId: action.data.response,
            });
        }

        case actionTypes.SEND_ETHER_FAILURE: {
            return Object.assign({}, state, {
                etherSending: false,
                etherSendingError: action.errorMsg,
            })
        }

        case actionTypes.SEND_PARSEC_TOKEN: {
            return Object.assign({}, state, {
                parsecTokenSending: true,
            });
        }

        case actionTypes.SEND_PARSEC_TOKEN_SUCCESS: {
            return Object.assign({}, state, {
                parsecTokenSending: false,
                parsecTokenSendingError: null,
                transactionId: action.data.transactionId,
            });
        }

        case actionTypes.SEND_PARSEC_TOKEN_FAILURE: {
            return Object.assign({}, state, {
                parsecTokenSending: false,
                parsecTokenSendingError: action.errorMsg,
            })
        }

        default: {
            return state;
        }
    }
}

export default walletReducer;
