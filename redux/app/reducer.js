import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import purchaseReducer from '../purchase/reducer';
import userReducer from '../account/reducer';
import twoFactorReducer from '../twoFactor/reducer';
import dashboardReducer from '../dashboard/reducer';
import kycReducer from '../kyc/reducer';
import walletReducer from '../wallet/reducer';
import crowdsaleReducer from '../crowdsale/reducer';

const reducers = {
    purchaseReducer,
    routing,
    userReducer,
    twoFactorReducer,
    dashboardReducer,
    walletReducer,
    kycReducer,
    crowdsaleReducer,
};

const appReducer = combineReducers(reducers);
export default appReducer;
