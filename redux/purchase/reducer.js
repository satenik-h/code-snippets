import {Map} from 'immutable';

import * as actionTypes from '../../constants/ActionTypes';

const initialState = new Map({
    supportedCurrencies: [],
    selectedCurrency: -1,
    currencyQuotes: [],
    payments: [],
    sales: [],
    salesMilestones: [],

    flashsaleTokenOK: null,
    flashsaleToken: null,

    payment: null,
    tokenBuys: null,
    wallets: null,

    supportedCurrenciesError: null,
    getCurrencyQuoteError: null,
    createPaymentError: null,
    tokenBuysError: null,
    getTokenBuysError: null,
    getTokenSalesError: null,
    getTokenSalesMilestonesError: null,
    getPaymentsError: null,
    getWalletsError: null,
    removePaymentError: null,
    trackPaymentError: null,

    supportedCurrenciesLoading: false,
    getCurrencyQuoteLoading: false,
    createPaymentLoading: false,
    tokenBuysLoading: false,
    getTokenBuysLoading: false,
    getTokenSalesLoading: false,
    getTokenSalesMilestonesLoading: false,
    getPaymentsLoading: false,
    getWalletsLoading: false,
    removePaymentLoading: false,
    trackPaymentLoading: false
});

function purchaseReducer(state = initialState, action) {
    if (!action)
        return state;

    switch (action.type) {
        case actionTypes.GET_SUPPORTED_CURRENCIES: {
            return Object.assign({}, state, {
                supportedCurrenciesLoading: true
            });
        }

        case actionTypes.GET_SUPPORTED_CURRENCIES_SUCCESS: {
            return Object.assign({}, state, {
                supportedCurrencies: action.data,
                supportedCurrenciesLoading: false,
                supportedCurrenciesError: null
            });
        }

        case actionTypes.GET_SUPPORTED_CURRENCIES_ERROR: {
            return Object.assign({}, state, {
                supportedCurrenciesLoading: false,
                supportedCurrenciesError: action.errorMsg
            });
        }

        case actionTypes.SELECT_CURRENCY: {
            return Object.assign({}, state, {
                selectedCurrency: action.id
            });
        }

        case actionTypes.CREATE_PAYMENT: {
            return Object.assign({}, state, {
                createPaymentLoading: true
            });
        }

        case actionTypes.CREATE_PAYMENT_SUCCESS: {
            return Object.assign({}, state, {
                payment: action.data,
                createPaymentLoading: false,
                createPaymentError: null
            });
        }

        case actionTypes.CREATE_PAYMENT_ERROR: {
            return Object.assign({}, state, {
                createPaymentLoading: false,
                createPaymentError: action.errorMsg
            });
        }

        case actionTypes.CREATE_PAYMENT_ERROR_RESET: {
            return Object.assign({}, state, {
                createPaymentError: null
            });
        }

        case actionTypes.TOKEN_BUYS: {
            return Object.assign({}, state, {
                tokenBuysLoading: true
            });
        }

        case actionTypes.TOKEN_BUYS_SUCCESS: {
            return Object.assign({}, state, {
                tokenBuys: action.data,
                tokenBuysLoading: false,
                tokenBuysError: null
            });
        }

        case actionTypes.TOKEN_BUYS_ERROR: {
            return Object.assign({}, state, {
                tokenBuysLoading: false,
                tokenBuysError: action.errorMsg
            });
        }

        case actionTypes.TOKEN_BUYS_ERROR_RESET: {
            return Object.assign({}, state, {
                tokenBuysError: null
            });
        }

        case actionTypes.GET_CURRENCY_QUOTE: {
            return Object.assign({}, state, {
                getCurrencyQuoteLoading: true
            });
        }

        case actionTypes.GET_CURRENCY_QUOTE_SUCCESS: {
            return Object.assign({}, state, {
                currencyQuotes: action.data,
                getCurrencyQuoteLoading: action.loading,
                getCurrencyQuoteError: null
            });
        }

        case actionTypes.GET_CURRENCY_QUOTE_ERROR: {
            return Object.assign({}, state, {
                getCurrencyQuoteLoading: false,
                getCurrencyQuoteError: action.errorMsg
            });
        }

        case actionTypes.GET_PAYMENTS: {
            return Object.assign({}, state, {
                getPaymentsLoading: true
            });
        }

        case actionTypes.GET_PAYMENTS_SUCCESS: {
            return Object.assign({}, state, {
                payments: action.data,
                getPaymentsLoading: false,
                getPaymentsError: null
            });
        }

        case actionTypes.GET_PAYMENTS_ERROR: {
            return Object.assign({}, state, {
                getPaymentsLoading: false,
                getPaymentsError: action.errorMsg
            });
        }

        case actionTypes.GET_WALLETS: {
            return Object.assign({}, state, {
                getWalletsLoading: true
            });
        }

        case actionTypes.GET_WALLETS_SUCCESS: {
            return Object.assign({}, state, {
                wallets: action.data,
                getWalletsLoading: false,
                getPaymentsError: null
            });
        }

        case actionTypes.GET_WALLETS_ERROR: {
            return Object.assign({}, state, {
                getWalletsLoading: false,
                getWalletsError: action.errorMsg
            });
        }

        case actionTypes.GET_WALLETS_REAL_TIME_SUCCESS: {
            return Object.assign({}, state, {
                wallets: action.data
            });
        }

        case actionTypes.GET_TOKEN_BUYS: {
            return Object.assign({}, state, {
                getTokenBuysLoading: true
            });
        }

        case actionTypes.GET_TOKEN_BUYS_SUCCESS: {
            return Object.assign({}, state, {
                sales: action.data,
                getTokenBuysLoading: false,
                getTokenBuysError: null
            });
        }

        case actionTypes.GET_TOKEN_BUYS_ERROR: {
            return Object.assign({}, state, {
                getTokenBuysLoading: false,
                getTokenBuysError: action.errorMsg
            });
        }

        case actionTypes.GET_TOKEN_BUYS_ERROR_RESET: {
            return Object.assign({}, state, {
                getTokenBuysError: null
            });
        }

        case actionTypes.GET_TOKEN_SALES: {
            return Object.assign({}, state, {
                getTokenSalesLoading: true
            });
        }

        case actionTypes.GET_TOKEN_SALES_SUCCESS: {
            return Object.assign({}, state, {
                sales: action.data,
                getTokenSalesLoading: false,
                getTokenSalesError: null
            });
        }

        case actionTypes.GET_TOKEN_SALES_ERROR: {
            return Object.assign({}, state, {
                getTokenSalesLoading: false,
                getTokenSalesError: action.errorMsg
            });
        }

        case actionTypes.GET_TOKEN_SALES_REAL_TIME_SUCCESS: {
            return Object.assign({}, state, {
                sales: action.data
            });
        }

        case actionTypes.GET_TOKEN_SALES_MILESTONES: {
            return Object.assign({}, state, {
                getTokenSalesMilestonesLoading: true
            });
        }

        case actionTypes.GET_TOKEN_SALES_MILESTONES_SUCCESS: {
            return Object.assign({}, state, {
                salesMilestones: action.data,
                getTokenSalesMilestonesLoading: false,
                getTokenSalesMilestonesError: null
            });
        }

        case actionTypes.GET_TOKEN_SALES_MILESTONES_ERROR: {
            return Object.assign({}, state, {
                getTokenSalesMilestonesLoading: false,
                getTokenSalesMilestonesError: action.errorMsg
            });
        }

        case actionTypes.REMOVE_PAYMENT: {
            return Object.assign({}, state, {
                removePaymentLoading: true
            });
        }

        case actionTypes.REMOVE_PAYMENT_SUCCESS: {
            return Object.assign({}, state, {
                removePaymentLoading: false,
                removePaymentError: null
            });
        }

        case actionTypes.REMOVE_PAYMENT_ERROR: {
            return Object.assign({}, state, {
                removePaymentLoading: false,
                removePaymentError: action.errorMsg
            });
        }

        case actionTypes.REMOVE_PAYMENT_ERROR_RESET: {
            return Object.assign({}, state, {
                removePaymentError: null
            });
        }

        case actionTypes.FLASHSALE_TOKEN_SUCCESS: {
            return Object.assign({}, state, {
                flashsaleTokenOK: true,
                flashsaleToken: action.code
            });
        }

        case actionTypes.FLASHSALE_TOKEN_FAIL: {
            return Object.assign({}, state, {
                flashsaleTokenOK: action.newValue
            });
        }

        case actionTypes.TRACK_PAYMENT: {
            return Object.assign({}, state, {
                trackPaymentLoading: true
            });
        }

        case actionTypes.TRACK_PAYMENT_SUCCESS: {
            const payments = state.payments;
            payments.find(payment => {
                return payment._id === action.payment._id
            }).seen = true;

            return Object.assign({}, state, {
                payments,
                trackPaymentLoading: false,
                trackPaymentError: null
            });
        }

        case actionTypes.TRACK_PAYMENT_ERROR: {
            return Object.assign({}, state, {
                trackPaymentLoading: false,
                trackPaymentError: action.errorMsg
            });
        }

        case 'persist/REHYDRATE': {
            return Object.assign({}, state, {
                supportedCurrencies: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.supportedCurrencies,
                selectedCurrency: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.selectedCurrency,
                currencyQuotes: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.currencyQuotes,
                payments: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.payments,
                payment: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.payment,
                tokenBuys: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.tokenBuys,
                wallets: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.wallets,
                sales: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.sales,
                salesMilestones: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.salesMilestones,
                flashsaleTokenOK: null,
                flashsaleToken: action.payload
                    && action.payload.purchaseReducer
                    && action.payload.purchaseReducer.flashsaleToken,
            });
        }

        default: {
            return state;
        }
    }
}

export default purchaseReducer;
