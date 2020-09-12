import axios from 'axios';
import qs from 'qs';

import * as actionTypes from '../../constants/ActionTypes';

axios.defaults.baseURL = process.env.REACT_APP_API_URI;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let WalletActions = {
    createWallet: function(userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.createWalletStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.post(`wallets/${userId}`, qs.stringify(userId))
                .then((response) => {
                    dispatch(_obj.createWalletSuccess(response.data.data));
                })
                .catch((error) => {
                    if (error.request.status === 400) {
                        dispatch(_obj.createWalletError(JSON.parse(error.request.response).response.errors.message));
                    }
                    if (error.response) {
                        dispatch(_obj.createWalletError(error.response))
                    } else {
                        dispatch(_obj.createWalletError(error.message))
                    }
                });
        }
    },

    createWalletStart: function() {
        return {
            type: actionTypes.CREATE_WALLET,
        }
    },

    createWalletSuccess: function(data) {
        return {
            type: actionTypes.CREATE_WALLET_SUCCESS,
            data,
        }
    },

    createWalletError: function(errorMsg) {
        return {
            type: actionTypes.CREATE_WALLET_FAILURE,
            errorMsg,
        }
    },

    getWallet: function(userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.createWalletStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.get(`wallets/${userId}`)
                .then((response) => {
                    dispatch(_obj.getWalletSuccess(response.data.data.userWallet));
                })
                .catch((error) => {
                    if (error.request.status === 400) {
                        dispatch(_obj.getWalletError(JSON.parse(error.request.response).response.errors.message));
                    }
                    if (error.response) {
                        dispatch(_obj.getWalletError(error.response))
                    } else {
                        dispatch(_obj.getWalletError(error.message))
                    }
                });
        }
    },

    getWalletStart: function() {
        return {
            type: actionTypes.GET_WALLET,
        }
    },

    getWalletSuccess: function(data) {
        return {
            type: actionTypes.GET_WALLET_SUCCESS,
            data,
        }
    },

    getWalletError: function(errorMsg) {
        return {
            type: actionTypes.GET_WALLET_FAILURE,
            errorMsg,
        }
    },

    getBalance: function(userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.createWalletStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.get(`wallets/${userId}/balance`)
                .then((response) => {
                    dispatch(_obj.getBalanceSuccess(response.data.data));
                })
                .catch((error) => {
                    dispatch(_obj.getBalanceError());

                    if (error.response) {
                        dispatch(_obj.getBalanceError(error.response));
                    } else {
                        dispatch(_obj.getBalanceError(error.message));
                    }
                });
        }
    },

    getBalanceStart: function() {
        return {
            type: actionTypes.GET_BALANCE,
        }
    },

    getBalanceSuccess: function(data) {
        return {
            type: actionTypes.GET_BALANCE_SUCCESS,
            data,
        }
    },

    getBalanceError: function(errorMsg) {
        return {
            type: actionTypes.GET_BALANCE_ERROR,
            errorMsg,
        }
    },

    sendEther: function(to, amount, userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.sendEtherStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.post(`wallets/${userId}/sendEther`, {to, amount})
                .then((response) => {
                    dispatch(_obj.sendEtherSuccess(response.data.data));
                })
                .catch((error) => {
                    if (error.request.status === 500) {
                        dispatch(_obj.sendEtherError(JSON.parse(error.request.response).response.errors.message));
                    } else {
                        if (error.response) {
                            dispatch(_obj.sendEtherError(error.response));
                        } else {
                            dispatch(_obj.sendEtherError(error.message));
                        }
                    }
                });
        }
    },

    sendEtherStart: function() {
        return {
            type: actionTypes.SEND_EHTER,
        }
    },

    sendEtherSuccess: function(data) {
        return {
            type: actionTypes.SEND_ETHER_SUCCESS,
            data,
        }
    },

    sendEtherError: function(errorMsg) {
        return {
            type: actionTypes.SEND_ETHER_FAILURE,
            errorMsg,
        }
    },

    sendParsecToken: function(to, amount, userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.sendParsecTokenStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.post(`wallets/${userId}/sendParsecToken`, {to, amount})
                .then((response) => {
                    dispatch(_obj.sendParsecTokenSuccess(response.data.data));
                })
                .catch((error) => {
                    if (error.request.status === 500) {
                        dispatch(_obj.sendParsecTokenError(JSON.parse(error.request.response).response.errors.message));
                    }
                    if (error.response) {
                        dispatch(_obj.sendParsecTokenError(error.response))
                    } else {
                        dispatch(_obj.sendParsecTokenError(error.message))
                    }
                });
        }
    },

    sendParsecTokenStart: function() {
        return {
            type: actionTypes.SEND_PARSEC_TOKEN,
        }
    },

    sendParsecTokenSuccess: function(data) {
        return {
            type: actionTypes.SEND_PARSEC_TOKEN_SUCCESS,
            data,
        }
    },

    sendParsecTokenError: function(errorMsg) {
        return {
            type: actionTypes.SEND_PARSEC_TOKEN_FAILURE,
            errorMsg,
        }
    },
};

export default WalletActions;
