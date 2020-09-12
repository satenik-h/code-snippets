import React from 'react';
import { Cookies } from 'react-cookie';
import { IndexRoute, Route, IndexRedirect } from 'react-router';

import App from './app/App';

import Account from './account/Account';
import Login from './account/Login';
import SignUp from './account/SignUp';
import ConfirmEmail from './account/ConfirmEmail';
import EmailConfirmation from './account/EmailConfirmation';
import RecoverPassword from './account/RecoverPassword';
import ResetPassword from './account/ResetPassword';
import PasswordReset from './account/PasswordReset';

import Error404 from './error/Error404';

import MainApp from './MainApp';
import MainAppWithSideNav from './MainAppWithSideNav';
import MainAppAdmin from './MainAppAdmin';

// import Dashboard from './dashboard/dashboard/Dashboard';
// import ReferralDashboard from './dashboard1/referral/ReferralDashboard';
// import PreICO from './dashboard1/ico/PreICO';
// import FlashSale from './dashboard1/flashsale/FlashSale';

// import PurchaseIntro from './dashboard1/purchase/PurchaseIntro';
// import PurchaseAmount from './dashboard1/purchase/PurchaseAmount';
// import PurchaseWaiting from './dashboard1/purchase/PurchaseWaiting';
// import PurchaseCurrency from './dashboard1/purchase/PurchaseCurrency';

import References from './references';
import Dashboard from './dashboard';
import DashboardInfoView from './dashboard/DashboardInfoView';
import Wallet from './wallet';
import WalletCreate from './wallet/WalletCreate';
import WalletInfoView from './wallet/WalletInfoView';
import Crowdsale from './crowdsale';
import CrowdsaleInfoView from './crowdsale/CrowdsaleInfoView';
import Kyc from './kyc';
import KycInfoView from './kyc/KycInfoView';

import { pushToGTM } from '../constants/Helpers';

function asyncComponent(component) {
 //   return process.env.IS_BROWSER && process.env.NODE_ENV === 'production'
 //       ? component
        return (_r, cb) => cb(null, component);
}

export default function createRoutes(getState) {
    const requireAuth = (nextState, replace) => {
        const state = getState();
        const loggedInUser = state.userReducer.userData;
        let token = localStorage.getItem('jwtToken');
        if (!token || !loggedInUser) {
            replace({
                pathname: '/account/login',
                state: {
                    nextPathname: nextState.location.pathname
                }
            });
        }
    };

    const redirectAuth = (nextState, replace) => {
        const state = getState();
        const loggedInUser = state.userReducer.userData;
        let token = localStorage.getItem('jwtToken');

        if (token && loggedInUser) {
            replace({
                // pathname: '/dashboard/mainsale',
                // pathname: '/dashboard',
                pathname: '/wallet',
                state: {
                    nextPathname: nextState.location.pathname
                }
            });
        }
    };

    /**
     * Get URL parameter
     */
    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    /**
     * Handle referral url
     */
    const checkReferral = (nextState) => {
        const cookies = new Cookies;
        const referralId = getParameterByName('refId');

        if (referralId) {
            // add referral cookie

            const expireDate = new Date();
            // set cookie expiration date to one year later
            expireDate.setTime(expireDate.getTime() + 31536000000);

            cookies.set("refId", referralId, {
                path: "/",
                expires: expireDate,
            });

            window.location.href = `${window.location.origin}/#/account/signup`;
        }
    };

        /**
     * Handle track_id url
     */
    const checkMktTracking = (nextState) => {
        const cookies = new Cookies;
        const mktParams  = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'oid', 'pid', 's1', 's2'];

        console.log("checkMktTrackingFired")

        mktParams.forEach(mktParam => {
            const paramValue = getParameterByName(mktParam);

            if (paramValue) {
                // add marketing cookie

                const expireDate = new Date();
                // set cookie expiration date to one year later
                expireDate.setTime(expireDate.getTime() + 31536000000);

                cookies.set(mktParam, paramValue, {
                    path: "/",
                    expires: expireDate,
                });
            }
        });
    };

    /**
* Handle params in url
*/
    const onEntry = (nextState) => {
        checkReferral(nextState);
        checkMktTracking(nextState);
        if (typeof dataLayer != "undefined" && !dataLayer.find(e => (e.event == 'cm-pageview')))
            pushToGTM({ 'event': 'cm-pageview' }, 'pageviewEvent');
    };

    const onPageChange = (prevState, nextState) => {
       // if (prevState.location.action == "PUSH" &&
        //    nextState.location.action == "POP")
       //     pushToGTM({ 'event': 'cm-pageview' }, 'pageviewEvent');
    }

    return (
        <Route getComponent={asyncComponent(App)} path="/" onEnter={onEntry} onChange={onPageChange}>
            <IndexRedirect to="/account/login" />

            <Route getComponent={asyncComponent(Account)} path="/account" onEnter={redirectAuth}>
                <IndexRedirect to="/account/login" />

                <Route getComponent={asyncComponent(Login)} path="login" />
                <Route getComponent={asyncComponent(SignUp)} path="signup" />
                <Route getComponent={asyncComponent(ConfirmEmail)} path="confirm" />
                <Route getComponent={asyncComponent(EmailConfirmation)} path="email-confirmation/:token" />
                <Route getComponent={asyncComponent(RecoverPassword)} path="recover-password" />
                <Route getComponent={asyncComponent(ResetPassword)} path="reset/:userId/:token" />
                <Route getComponent={asyncComponent(PasswordReset)} path="reset-password/succeed" />
            </Route>

            {/*<Route getComponent={asyncComponent(MainApp)} path="/dashboard" onEnter={requireAuth}>
                <IndexRoute getComponent={asyncComponent(Dashboard)} />

                <Route getComponent={asyncComponent(PreICO)} path="presale" />
                <Route getComponent={asyncComponent(FlashSale)} path="mainsale" />
            </Route>*/}
            
            <Route getComponent={asyncComponent(MainApp)} path="/dashboard" onEnter={requireAuth}>
                <IndexRoute getComponent={asyncComponent(Dashboard)} />

                <Route getComponent={asyncComponent(DashboardInfoView)} path="info" />
            </Route>

            {/*<Route getComponent={asyncComponent(MainApp)} path="/referral-dashboard" onEnter={requireAuth}>
                <IndexRoute getComponent={asyncComponent(ReferralDashboard)} />
            </Route>*/}

            {/*<Route getComponent={asyncComponent(MainApp)} path="/purchase" onEnter={requireAuth}>
                <IndexRedirect to="/purchase/intro" />

                <Route getComponent={asyncComponent(PurchaseIntro)} path="intro" />
                <Route getComponent={asyncComponent(PurchaseAmount)} path="amount/:currency" />
                <Route getComponent={asyncComponent(PurchaseWaiting)} path="waiting/:paymentId" />
                <Route getComponent={asyncComponent(PurchaseCurrency)} path="currency" />
            </Route>*/}

            <Route getComponent={asyncComponent(MainApp)} path="/wallet" onEnter={requireAuth}>
                <IndexRoute getComponent={asyncComponent(Wallet)} />

                <Route getComponent={asyncComponent(WalletCreate)} path="create" />
                <Route getComponent={asyncComponent(WalletInfoView)} path="info" />
            </Route>

            <Route getComponent={asyncComponent(MainApp)} path="/crowdsale" onEnter={requireAuth}>
                <IndexRoute getComponent={asyncComponent(Crowdsale)} />

                <Route getComponent={asyncComponent(CrowdsaleInfoView)} path="info" />
            </Route>

            {/*<Route getComponent={asyncComponent(MainApp)} path="/kyc" onEnter={requireAuth}>
                <IndexRedirect to="/kyc/status"/>

                <Route getComponent={asyncComponent(Kyc)} path="/kyc/:type"/>
                <Route getComponent={asyncComponent(Kyc)} path="/kyc/:type/:secType"/>
            </Route>*/}

            <Route getComponent={asyncComponent(MainApp)} path="/kyc" onEnter={requireAuth}>
                <IndexRoute getComponent={asyncComponent(Kyc)} />

                <Route getComponent={asyncComponent(KycInfoView)} path="info" />
            </Route>

            <Route getComponent={asyncComponent(MainAppWithSideNav)} path="/references" onEnter={requireAuth}>
                <IndexRedirect to="/references/settings" />

                <Route getComponent={asyncComponent(References)} path="/references/:type" />
            </Route>

            <Route getComponent={asyncComponent(Error404)} path="*"/>
        </Route>
    );
}
