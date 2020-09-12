import * as actionTypes from '../../constants/ActionTypes';

const TwoFactorActions = {
    twoFactorAuthStart: function (cb, cbThis, cbArgs) {
        return (dispatch) => {
            return new Promise(resolve => {
                dispatch({
                    type: actionTypes.TWO_FACTOR_AUTH_START,
                    twoFactorCB:
                        {
                            cb,
                            cbThis,
                            cbArgs,
                            resolve
                        }
                });
            });
        }
    },

    twoFactorAuthGo: function (code, twoFactorCB) {
        return (dispatch) => {
            twoFactorCB.cbArgs[0].code = code;
            dispatch(this.twoFactorAuthEnd());
            twoFactorCB.resolve(dispatch(twoFactorCB.cb.apply(twoFactorCB.cbThis, twoFactorCB.cbArgs)));
        };
    },

    twoFactorAuthEnd: function () {
        return {
            type: actionTypes.TWO_FACTOR_AUTH_END,
        };
    }
};

export default TwoFactorActions;
