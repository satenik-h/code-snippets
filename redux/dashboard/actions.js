import axios from 'axios';
import qs from 'qs';

import * as actionTypes from '../../constants/ActionTypes';

axios.defaults.baseURL = process.env.REACT_APP_API_URI;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let DashboardActions = {
    getRefereeCount: function(userId, token) {
        let _obj = this;
        return (dispatch) => {
            dispatch(_obj.getRefereeCountStart());

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.get(`dashboard/${userId}/refereeCount`)
                .then((response) => {
                    dispatch(_obj.getRefereeCountSuccess(response.data.data));
                })
                .catch((error) => {
                    if (error.request.status === 500) {
                        dispatch(_obj.getRefereeCountError(JSON.parse(error.request.response).response.errors.message));
                    } else {
                        if (error.response) {
                            dispatch(_obj.getRefereeCountError(error.response));
                        } else {
                            dispatch(_obj.getRefereeCountError(error.message));
                        }
                    }
                });
        }
    },

    getRefereeCountStart: function() {
        return {
            type: actionTypes.GET_REFEREE_COUNT_START,
        }
    },

    getRefereeCountSuccess: function(data) {
        return {
            type: actionTypes.GET_REFEREE_COUNT_SUCCESS,
            data,
        }
    },

    getRefereeCountError: function(errorMsg) {
        return {
            type: actionTypes.GET_REFEREE_COUNT_FAILURE,
            errorMsg,
        }
    },
};

export default DashboardActions;
