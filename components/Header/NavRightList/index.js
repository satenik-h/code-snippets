import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import NavDropDownMenu from './NavDropDownMenu';
import BalanceButton from '../../Buttons/BalanceButton';
import RefBalanceButton from '../../Buttons/RefBalanceButton';
import BuyCoinButton from '../../Buttons/BuyCoinButton';
import ReferralModal from '../../Modals/ReferralModal';
import { PurchaseActions, AccountActions, WalletActions } from '../../../redux/app/actions';

import DashboardButton from '../../NavButtons/DashboardButton';
import WalletButton from '../../NavButtons/WalletButton';
import CrowdsaleButton from '../../NavButtons/CrowdsaleButton';
import KYCButton from '../../NavButtons/KYCButton';
import NavButton from '../../NavButtons';

let timer, timer2;

class NavRightList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            balance: 0,
            sales: {},
            eurBalance: 0,
            usdBalance: 0,
            ref_balance: 0,
            ref_eurBalance: 0,
            ref_usdBalance: 0,
            ref_walletId: '',
            existRefBalance: false,
            ambassadorLink: '',
            currentPath: '/dashboard',
        };
    }

    dataCollection = () => {
        const marketingTracking = (ip, payment, sales, userData) => {
            const coinAmount = Math.round(payment.amount.net / payment.coinPrice);
            const eurValue = coinAmount * sales.token.price / 100;
        };

        const dataPromises = [
            // this.props.getWallets({
            //     userId: this.props.userId,
            //     token: this.props.userToken
            // }),
            this.props.getTokenSales({
                token: this.props.userToken
            }),
            this.props.getPayments({
                userId: this.props.userId,
                token: this.props.userToken
            }),
            this.props.getCurrencyQuote({
                token: this.props.userToken
            }),
            this.props.getWallet({
                userId: this.props.userId, token: this.props.userToken,
            }),
        ];

        Promise.all(dataPromises)
            .then(data => {
                const {wallets, sales, payments, currencyQuotes} = this.props;

                const newState = {};

                if (wallets === undefined || sales === undefined || payments === undefined ||
                    wallets === null || sales === null || payments === null)
                    return;

                wallets.forEach(wallet => {
                    if (wallet.label.toLowerCase() === 'psrc') {
                        newState.balance = wallet.balance;
                    } else if (wallet.label.toLowerCase() === 'ref') {
                        newState.ref_balance = wallet.balance;
                        newState.existRefBalance = true;
                        newState.ref_walletId = wallet._id;
                    }
                });

                newState.eurBalance = newState.balance * sales.token.price / 100;
                newState.usdBalance = newState.eurBalance * currencyQuotes.btcusd / currencyQuotes.btceur;
                newState.ref_eurBalance = newState.ref_balance * sales.token.price / 100;
                newState.ref_usdBalance = newState.ref_eurBalance * currencyQuotes.btcusd / currencyQuotes.btceur;

                this.setState({
                    ...newState
                });

                if (payments.length)
                    payments.forEach(payment => {
                        if (payment.credited && !payment.seen) {
                            this.props.trackPayment({
                                payment,
                                token: this.props.userToken
                            }).then(trackingData => {
                                marketingTracking(trackingData.ip, payment, sales, this.props.userData);
                            });
                        }
                    });
            });
    };

    componentWillMount() {
        const pushBack = () => {
            if (!this.props.flashsaleTokenOK) {
                let links = this.props.location.pathname.split("/");
                if (links.indexOf('purchase') > -1) {
                    // this.context.router.push('/dashboard/mainsale');
                    this.context.router.push('/dashboard');
                }
            }
        };

        timer = setInterval(this.dataCollection, 30000);
        timer2 = setInterval(pushBack, 3000);
        this.dataCollection();
        pushBack();
    }

    componentWillUnmount() {
        if (timer) clearInterval(timer);
        if (timer2) clearInterval(timer2);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPath: nextProps.location.pathname,
        });
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    goToReferral = () => {
        this.setState({
            modalIsOpen: true
        });
    };

    goToReferralDashboard = () => {
        this.setState({
            modalIsOpen: false
        }, () => {
            this.context.router.push('/referral-dashboard');
        });
    };

    becomeReferral = () => {
        this.props.getUserReferral({
            userId: this.props.userId,
            token: this.props.userToken
        }).then(() => {
            const { referralWallet, sales, currencyQuotes } = this.props;
            const ref_balance = referralWallet.balance;
            this.setState({
                ref_balance,
                ref_eurBalance: sales ? ref_balance * sales.token.price / 100 : 0,
                ref_usdBalance: currencyQuotes ? ref_eurBalance * currencyQuotes.btcusd / currencyQuotes.btceur : 0,
                existRefBalance: true,
                ref_walletId: referralWallet._id,
                modalIsOpen: true
            });
        });
    };

    signOut = (e) => {
        e.preventDefault();
        this.props.signOut({
            data: this.props.userToken,
        });
    };

    // goToDashboard = () => {
    //     this.context.router.push('/dashboard');
    // }

    // goToWallet = () => {
    //     this.context.router.push('/wallet');
    // }

    // goToCrowdsale = () => {
    //     this.context.router.push('/crowdsale');
    // }

    // goToKYC = () => {
    //     this.context.router.push('/kyc');
    // }

    render() {
        const { currentPath } = this.state;
        const { walletAddress } = this.props;

        return (
            <div className="h-100 d-flex align-items-center justify-content-between">
                <div className="pl-4 hidden-sm-down"><a href="https://parsecfrontiers.com"><img src="/assets/logo-main.svg" alt="{APPCONFIG.brand}" height="40" /></a></div>
                <div className="nav-buttons d-flex align-items-center justify-content-between">
                    <NavButton
                        router={this.context.router}
                        text='DASHBOARD'
                        routerPath='/dashboard'
                        menuStyle={{color: currentPath.indexOf('/dashboard') >= 0 ? 'palegreen' : 'white'}}
                    />
                    <NavButton
                        router={this.context.router}
                        text='WALLET'
                        routerPath='/wallet'
                        menuStyle={{color: currentPath.indexOf('/wallet') >= 0 ? 'palegreen' : 'white'}}
                    />
                    {
                        walletAddress &&
                        <NavButton
                            router={this.context.router}
                            text='CROWDSALE'
                            routerPath='/crowdsale'
                            menuStyle={{color: currentPath.indexOf('/crowdsale') >= 0 ? 'palegreen' : 'white'}}
                        />
                    }
                    {
                        walletAddress &&
                        <NavButton
                            router={this.context.router}
                            text='KYC'
                            routerPath='/kyc'
                            menuStyle={{color: currentPath.indexOf('/kyc') >= 0 ? 'palegreen' : 'white'}}
                        />
                    }
                    {/*<DashboardButton
                        router={this.context.router}
                        goToDashboard={this.goToDashboard}
                    />
                    <WalletButton
                        router={this.context.router}
                        goToWallet={this.goToWallet}
                    />
                    <CrowdsaleButton
                        router={this.context.router}
                        goToCrowdsale={this.goToCrowdsale}
                    />
                    <KYCButton
                        router={this.context.router}
                        goToKYC={this.goToKYC}
                    />*/}
                </div>
                <div className='pr-2'>
                    <NavDropDownMenu signOut={this.signOut} userData={this.props.userData} />
                </div>
            </div>
        );
    }
}

NavRightList.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userData: state.userReducer.userData,
        userId: state.userReducer.userId,
        userToken: state.userReducer.userToken,
        referralWallet: state.userReducer.referralWallet,
        wallets: state.purchaseReducer.wallets,
        loading: state.purchaseReducer.getWalletsLoading,
        error: state.purchaseReducer.getWalletsError,
        sales: state.purchaseReducer.sales,
        payments: state.purchaseReducer.payments,
        flashsaleTokenOK: state.purchaseReducer.flashsaleTokenOK,
        location: state.routing.locationBeforeTransitions,
        currencyQuotes: state.purchaseReducer.currencyQuotes,
        walletAddress: state.walletReducer.walletAddress,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (req) => dispatch(AccountActions.signOut(req.data)),
        // getWallets: (req) => dispatch(PurchaseActions.getWallets(req.userId, req.token)),
        getTokenSales: (req) => dispatch(PurchaseActions.getTokenSales(req.token)),
        getCurrencyQuote: (req) => dispatch(PurchaseActions.getCurrencyQuote(req.token)),
        getUserReferral: (req) => dispatch(AccountActions.getUserReferral(req.userId, req.token)),
        trackPayment: (req) => dispatch(PurchaseActions.trackPayment(req.payment, req.token)),
        getPayments: (req) => dispatch(PurchaseActions.getPayments(req.userId, req.token)),
        getWallet: (req) => dispatch(WalletActions.getWallet(req.userId, req.token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRightList);
