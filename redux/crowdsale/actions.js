import axios from 'axios';
import qs from 'qs';

import * as actionTypes from '../../constants/ActionTypes';

axios.defaults.baseURL = process.env.REACT_APP_API_URI;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let CrowdsaleActions = {
    participate: function(amount, userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.participateStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.post(`crowdsale/${userId}/participate`, {amount})
                .then((response) => {
                    dispatch(_obj.participateSuccess(response.data.data));
                })
                .catch((error) => {
                    if (error.request.status === 500) {
                        dispatch(_obj.participateError(JSON.parse(error.request.response).response.errors.message));
                    } else {
                        if (error.response) {
                            dispatch(_obj.participateError(error.response));
                        } else {
                            dispatch(_obj.participateError(error.message));
                        }
                    }
                });
        }
    },

    participateStart: function() {
        return {
            type: actionTypes.PARTICIPATE,
        }
    },

    participateSuccess: function(data) {
        return {
            type: actionTypes.PARTICIPATE_SUCCESS,
            data,
        }
    },

    participateError: function(errorMsg) {
        return {
            type: actionTypes.PARTICIPATE_FAILURE,
            errorMsg,
        }
    },

    refund: function(userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.refundStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.post(`crowdsale/${userId}/refund`)
                .then((response) => {
                    dispatch(_obj.refundSuccess(response.data.data));
                })
                .catch((error) => {
                    if (error.request.status === 500) {
                        dispatch(_obj.refundError(JSON.parse(error.request.response).response.errors.message));
                    } else {
                        if (error.response) {
                            dispatch(_obj.refundError(error.response));
                        } else {
                            dispatch(_obj.refundError(error.message));
                        }
                    }
                })
        }
    },

    refundStart: function() {
        return {
            type: actionTypes.REFUND,
        }
    },

    refundSuccess: function(data) {
        return {
            type: actionTypes.REFUND_SUCCESS,
            data,
        }
    },

    refundError: function(errorMsg) {
        return {
            type: actionTypes.REFUND_FAILURE,
            errorMsg,
        }
    },

    getCrowdsaleGeneralStatus: function(userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.getCrowdsaleGeneralStatusStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            axios.get(`crowdsale/generalStatus`)
                .then((response) => {
                    dispatch(_obj.getCrowdsaleGeneralStatusSuccess(response.data.data.status));
                })
                .catch((error) => {
                    dispatch(_obj.getCrowdsaleGeneralStatusError());

                    if (error.response) {
                        dispatch(_obj.getCrowdsaleGeneralStatusError(error.response));
                    } else {
                        dispatch(_obj.getCrowdsaleGeneralStatusError(error.message));
                    }
                })
        }
    },

    getCrowdsaleGeneralStatusStart: function() {
        return {
            type: actionTypes.GET_CROWDSALE_GENERAL_STATUS,
        }
    },

    getCrowdsaleGeneralStatusSuccess: function(data) {
        return {
            type: actionTypes.GET_CROWDSALE_GENERAL_STATUS_SUCCESS,
            data,
        }
    },

    getCrowdsaleGeneralStatusError: function(errorMsg) {
        return {
            type: actionTypes.GET_CROWDSALE_INVESTOR_STATUS_FAILURE,
            errorMsg,
        }
    },

    getCrowdsaleInvestorStatus: function(userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.getCrowdsaleInvestorStatusStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            axios.get(`crowdsale/${userId}/investorStatus`)
                .then((response) => {
                    dispatch(_obj.getCrowdsaleInvestorStatusSuccess(response.data.data.status));
                })
                .catch((error) => {
                    dispatch(_obj.getCrowdsaleInvestorStatusError());

                    if (error.response) {
                        dispatch(_obj.getCrowdsaleInvestorStatusError(error.response));
                    } else {
                        dispatch(_obj.getCrowdsaleInvestorStatusError(error.message));
                    }
                })
        }
    },

    getCrowdsaleInvestorStatusStart: function() {
        return {
            type: actionTypes.GET_CROWDSALE_INVESTOR_STATUS,
        }
    },

    getCrowdsaleInvestorStatusSuccess: function(data) {
        return {
            type: actionTypes.GET_CROWDSALE_INVESTOR_STATUS_SUCCESS,
            data,
        }
    },

    getCrowdsaleInvestorStatusError: function(errorMsg) {
        return {
            type: actionTypes.GET_CROWDSALE_INVESTOR_STATUS_FAILURE,
            errorMsg,
        }
    },
};

export default CrowdsaleActions;
