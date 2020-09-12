import axios from 'axios';
import qs from 'qs';

import * as actionTypes from '../../constants/ActionTypes';

axios.defaults.baseURL = process.env.REACT_APP_API_URI;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import AccountActions from '../account/actions';

let PurchaseActions = {
    getSupportedCurrencies: function (type, token) {
        return (dispatch) => {
            dispatch(this.getSupportedCurrenciesStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('payments/currencies?type=' + type)
                .then((response) => {
                    dispatch(this.getSupportedCurrenciesSuccess(response.data.data.list));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.getSupportedCurrenciesError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.getSupportedCurrenciesError(error.message));
                    }

                    return Promise.reject();
                });
        };
    },

    getSupportedCurrenciesStart: function () {
        return {
            type: actionTypes.GET_SUPPORTED_CURRENCIES
        }
    },

    getSupportedCurrenciesSuccess: function (data) {
        return {
            type: actionTypes.GET_SUPPORTED_CURRENCIES_SUCCESS,
            data
        }
    },

    getSupportedCurrenciesError: function (errorMsg) {
        return {
            type: actionTypes.GET_SUPPORTED_CURRENCIES_ERROR,
            errorMsg
        }
    },

    createPayment: function (data, token) {
        return (dispatch) => {
            dispatch(this.createPaymentStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.post('payments/' + data.id, qs.stringify(data))
                .then((response) => {
                    const payment = response.data.data;
                    dispatch(this.createPaymentSuccess(payment));
                    return payment._id;
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.createPaymentError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.createPaymentError(error.message));
                    }
                    return Promise.reject();
                });
        }
    },

    createPaymentStart: function () {
        return {
            type: actionTypes.CREATE_PAYMENT
        }
    },

    createPaymentSuccess: function (data) {
        return {
            type: actionTypes.CREATE_PAYMENT_SUCCESS,
            data
        }
    },

    createPaymentError: function (errorMsg) {
        return {
            type: actionTypes.CREATE_PAYMENT_ERROR,
            errorMsg
        }
    },

    createPaymentErrorReset: function () {
        return {
            type: actionTypes.CREATE_PAYMENT_ERROR_RESET
        }
    },

    tokenBuys: function (data, token) {
        return (dispatch) => {
            dispatch(this.tokenBuysStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.post('token-buys/' + data.id, qs.stringify(data))
                .then((response) => {
                    dispatch(this.tokenBuysSuccess(response.data.data));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.tokenBuysError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.tokenBuysError(error.message));
                    }
                    return Promise.reject();
                });
        }
    },

    tokenBuysStart: function () {
        return {
            type: actionTypes.TOKEN_BUYS
        }
    },

    tokenBuysSuccess: function (data) {
        return {
            type: actionTypes.TOKEN_BUYS_SUCCESS,
            data
        }
    },

    tokenBuysError: function (errorMsg) {
        return {
            type: actionTypes.TOKEN_BUYS_ERROR,
            errorMsg
        }
    },

    tokenBuysErrorReset: function () {
        return {
            type: actionTypes.TOKEN_BUYS_ERROR_RESET
        }
    },

    selectCurrency: function (id) {
        return {
            type: actionTypes.SELECT_CURRENCY,
            id
        }
    },

    getCurrencyQuote: function (token) {
        return (dispatch) => {
            dispatch(this.getCurrencyQuoteStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('quotes')
                .then((response) => {
                    return dispatch(this.getCurrencyQuoteSuccess(response.data.data));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.getCurrencyQuoteError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.getCurrencyQuoteError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    getCurrencyQuoteStart: function () {
        return {
            type: actionTypes.GET_CURRENCY_QUOTE,
        };
    },

    getCurrencyQuoteSuccess: function (data) {
        let result = {};
        data.forEach(function (dt) {
            if (dt.n.indexOf('eur') > -1 || dt.n.indexOf('usd') > -1) {
                result[dt.n] = dt.v / 100;
            } else {
                result[dt.n] = dt.v;
            }
        });

        return {
            type: actionTypes.GET_CURRENCY_QUOTE_SUCCESS,
            data: result
        };
    },

    getCurrencyQuoteError: function (errorMsg) {
        return {
            type: actionTypes.GET_CURRENCY_QUOTE_ERROR,
            errorMsg
        };
    },

    getPayments: function (userId, token) {
        return (dispatch) => {
            dispatch(this.getPaymentsStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('payments/' + userId)
                .then((response) => {
                    return dispatch(this.getPaymentsSuccess(response.data.data));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        return dispatch(this.getPaymentsError(error.response.data.response.errors.message));
                    } else {
                        return dispatch(this.getPaymentsError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    getPaymentsStart: function () {
        return {
            type: actionTypes.GET_PAYMENTS,
        };
    },

    getPaymentsSuccess: function (data) {
        return {
            type: actionTypes.GET_PAYMENTS_SUCCESS,
            data
        };
    },

    getPaymentsError: function (errorMsg) {
        return {
            type: actionTypes.GET_PAYMENTS_ERROR,
            errorMsg
        };
    },

    getWallets: function (userId, token) {
        return (dispatch) => {
            dispatch(this.getWalletsStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('users/' + userId + '/wallets')
                .then((response) => {
                    return dispatch(this.getWalletsSuccess(response.data.data.list));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.getWalletsError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.getWalletsError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    getWalletsStart: function () {
        return {
            type: actionTypes.GET_WALLETS,
        };
    },

    getWalletsSuccess: function (data) {
        return {
            type: actionTypes.GET_WALLETS_SUCCESS,
            data
        };
    },

    getWalletsError: function (errorMsg) {
        return {
            type: actionTypes.GET_WALLETS_ERROR,
            errorMsg
        };
    },

    getTokenBuys: function (userId, paymentId, token) {
        return (dispatch) => {
            dispatch(this.getTokenBuysStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('token-buys/' + userId + '?paymentId=' + paymentId)
                .then((response) => {
                    dispatch(this.getTokenBuysSuccess(response.data.data.list));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.getTokenBuysError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.getTokenBuysError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    getTokenBuysStart: function () {
        return {
            type: actionTypes.GET_TOKEN_BUYS,
        };
    },

    getTokenBuysSuccess: function (data) {
        return {
            type: actionTypes.GET_TOKEN_BUYS_SUCCESS,
            data
        };
    },

    getTokenBuysError: function (errorMsg) {
        return {
            type: actionTypes.GET_TOKEN_BUYS_ERROR,
            errorMsg
        };
    },

    getTokenBuysErrorReset: function () {
        return {
            type: actionTypes.GET_TOKEN_BUYS_ERROR_RESET
        };
    },

    getTokenSales: function (token) {
        return (dispatch) => {
            dispatch(this.getTokenSalesStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('sale-stats')
                .then((response) => {
                    dispatch(this.getTokenSalesSuccess(response.data.data));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);
                    
                    if (error.response) {
                        dispatch(this.getTokenSalesError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.getTokenSalesError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    getTokenSalesStart: function () {
        return {
            type: actionTypes.GET_TOKEN_SALES,
        };
    },

    getTokenSalesSuccess: function (data) {
        return {
            type: actionTypes.GET_TOKEN_SALES_SUCCESS,
            data
        };
    },

    getTokenSalesError: function (errorMsg) {
        return {
            type: actionTypes.GET_TOKEN_SALES_ERROR,
            errorMsg
        };
    },

    getTokenSalesMilestones: function (token) {
        return (dispatch) => {
            dispatch(this.getTokenSalesMilestonesStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('sale-milestones')
                .then((response) => {
                    dispatch(this.getTokenSalesMilestonesSuccess(response.data.data));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.getTokenSalesMilestonesError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.getTokenSalesMilestonesError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    getTokenSalesMilestonesStart: function () {
        return {
            type: actionTypes.GET_TOKEN_SALES_MILESTONES,
        };
    },

    getTokenSalesMilestonesSuccess: function (data) {
        return {
            type: actionTypes.GET_TOKEN_SALES_MILESTONES_SUCCESS,
            data
        };
    },

    getTokenSalesMilestonesError: function (errorMsg) {
        return {
            type: actionTypes.GET_TOKEN_SALES_MILESTONES_ERROR,
            errorMsg
        };
    },

    removePayment: function (paymentId, token) {
        return (dispatch) => {
            dispatch(this.removePaymentStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.post('payments/remove/' + paymentId)
                .then((response) => {
                    dispatch(this.removePaymentSuccess(response.data.data));
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.removePaymentError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.removePaymentError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    removePaymentStart: function () {
        return {
            type: actionTypes.REMOVE_PAYMENT
        }
    },

    removePaymentSuccess: function (data) {
        return {
            type: actionTypes.REMOVE_PAYMENT_SUCCESS,
            data
        }
    },

    removePaymentError: function (errorMsg) {
        return {
            type: actionTypes.REMOVE_PAYMENT_ERROR,
            errorMsg
        }
    },

    removePaymentErrorReset: function () {
        return {
            type: actionTypes.REMOVE_PAYMENT_ERROR_RESET
        }
    },

    verifyFlashsaleCode: function (token, code) {
        return (dispatch) => {
            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get('payments/flashsale/' + code)
                .then((response) => {
                    dispatch(this.verifyFlashsaleCodeSuccess(code));
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data.response.code === 401)
                            dispatch(this.verifyFlashsaleCodeFailWrongCode(error.response.data.response.errors.message));
                        else
                            dispatch(this.verifyFlashsaleCodeFail(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.verifyFlashsaleCodeFail(error.message));
                    }
                })
        }
    },

    verifyFlashsaleCodeSuccess: function (code) {
        return {
            type: actionTypes.FLASHSALE_TOKEN_SUCCESS,
            code
        };
    },

    verifyFlashsaleCodeFailWrongCode: function (errorMsg) {
        return {
            type: actionTypes.FLASHSALE_TOKEN_FAIL,
            newValue: false,
            errorMsg,
        };
    },

    verifyFlashsaleCodeFail: function (errorMsg) {
        return {
            type: actionTypes.FLASHSALE_TOKEN_FAIL,
            newValue: null,
            errorMsg
        };
    },

    trackPayment: function (payment, token) {
        return (dispatch) => {
            dispatch(this.trackPaymentStart());

            // add Bearer token to common axios request header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.post('payments/see/' + payment._id)
                .then((response) => {
                    dispatch(this.trackPaymentSuccess(response.data.data.payment));
                    return({
                        payment, 
                        ip: response.data.data.ip}
                    );
                })
                .catch((error) => {
                    AccountActions.acceptErrorResponse(error, dispatch, token);

                    if (error.response) {
                        dispatch(this.trackPaymentError(error.response.data.response.errors.message));
                    } else {
                        dispatch(this.trackPaymentError(error.message));
                    }

                    return Promise.reject();
                });
        }
    },

    trackPaymentStart: function () {
        return {
            type: actionTypes.TRACK_PAYMENT
        }
    },

    trackPaymentSuccess: function (payment) {
        return {
            type: actionTypes.TRACK_PAYMENT_SUCCESS,
            payment
        }
    },

    trackPaymentError: function (errorMsg) {
        return {
            type: actionTypes.TRACK_PAYMENT_ERROR,
            errorMsg
        }
    },
};

export default PurchaseActions;
