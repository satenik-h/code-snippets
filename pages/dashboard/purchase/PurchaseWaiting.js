import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';

import {PurchaseActions} from '../../../redux/app/actions';
import PurchaseDetails from './PurchaseDetails';
import PurchaseOperationDetails from './PurchaseOperationDetails';
import LoadingOverlay from '../../../components/Common/LoadingOverlay';
import {getTimeString} from '../../../constants/Helpers';

let timer;

class PurchaseWaiting extends Component {
    componentWillMount() {
        const {
            restrictions,
            currencyQuotes,
            selectedCurrency,
            supportedCurrencies,
            wallets
        } = this.props;

        if ((restrictions !== "no") || !supportedCurrencies || supportedCurrencies.length === 0 || selectedCurrency === -1) {
            this.context.router.push('/purchase/intro');
        } else if (!currencyQuotes) {
            this.context.router.push('/purchase/currency');
        } else {
            const currency = supportedCurrencies[selectedCurrency].code;

            if (this.props.params.paymentId === null || typeof this.props.params.paymentId === 'undefined') {
                this.context.router.push('/purchase/amount/' + currency);
            }

            this.state = {
                loading: true,
                grossAmount: 0,
                netAmount: 0,
                fee: 0,
                address: '',
                startedAt: '',
                tokenPrice: 0,
                tokens: 0,
                currency: currency,
                balance: (wallets.length > 0) ? wallets[0].balance : 0
            };

            let _obj = this;
            timer = setInterval(function () {
                if (!_obj.props.getPaymentsLoading) {
                    _obj.getPayments();
                }
            }, 5000);

            this.getTokenBuyObject();
        }
    }

    componentWillUnmount() {
        if (timer) {
            clearInterval(timer);
        }
    }

    getPayments = () => {
        this.props.getPayments({
            userId: this.props.userId,
            token: this.props.userToken,
        }).then(() => {
            const { payments } = this.props;
            payments.forEach(payment => {
                if (payment._id === this.props.params.paymentId) {
                    this.setState({
                        payment,
                        loading: false,
                        address: payment.address,
                        grossAmount: payment.amount.gross,
                        netAmount: payment.amount.net,
                        fee: payment.amount.fee,
                        startedAt: getTimeString(payment.createdAt)
                    });

                    if (payment.credited) {
                        this.context.router.push('/dashboard');
                    }
                }
            }, this);
        });
    };

    getTokenBuyObject = () => {
        this.props.getTokenBuys({
            userId: this.props.userId,
            paymentId: this.props.params.paymentId,
            token: this.props.userToken
        }).then(() => {
            this.setState({
                tokenPrice: this.props.tokenBuys.coinPrice,
                tokens: this.props.tokenBuys.coinAmount
            });
        });
    };

    render() {
        return (
            <div className="container-fluid no-breadcrumbs">
                <LoadingOverlay overlayClass={this.state.loading ? 'overlay show' : 'overlay'}
                                message="Please hold while your payment instructions are generated..." />

                <QueueAnim type="bottom" className="ui-animate">
                    <div className="mb-4 d-md-flex align-items-center" key="1">
                        <a href={"#/purchase/amount/" + this.state.currency}
                           className="btn btn-round btn-transparent btn-border px-3 py-2 text-small color-primary">
                            <i className="fa fa-chevron-left"/> Go Back
                        </a>

                        <div className="ml-md-3 mt-3 mt-md-0">
                            <h4 className="mt-0 mb-1">
                                <span className="text-uppercase">{this.state.currency}</span> Purchase
                            </h4>
                            <h6 className="m-0 font-weight-light primary">{this.state.startedAt}</h6>
                        </div>
                    </div>

                    <div className="row" key="2">
                        <div className="col-md-10 offset-md-1">
                            <div className="ga-do-section-third pt-4">
                                <div className="row d-flex">
                                    <div className="col-lg-8 mt-3">
                                        <PurchaseDetails
                                            address={this.state.address}
                                            currency={this.state.currency}
                                            grossAmount={this.state.grossAmount}
                                            payment={this.state.payment}
                                            startedAt={this.state.startedAt}
                                        />
                                    </div>

                                    <div className="col-lg-4 mt-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="balance-wrapper p-5 mb-4 bg-gray-4 border-radius-2">
                                                    <div className="d-flex align-items-center">
                                                        <img src="/assets/images/coin-icon-gold.png"/>
                                                        <span className="ml-2 font-weight-semibold color-dark">Balance</span>
                                                    </div>

                                                    <div className="mt-3 d-flex align-items-center text-big">
                                                        <span className="font-weight-bold primary">{this.state.balance}</span>
                                                        <span className="ml-2 color-green-4">(PSRC)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <PurchaseOperationDetails
                                            currency={this.state.currency}
                                            grossAmount={this.state.grossAmount}
                                            tokenPrice={this.state.tokenPrice}
                                            tokens={this.state.tokens}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </QueueAnim>
            </div>
        );
    }
}

PurchaseWaiting.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        restrictions: state.userReducer.userData.restrictions,
        supportedCurrencies: state.purchaseReducer.supportedCurrencies,
        selectedCurrency: state.purchaseReducer.selectedCurrency,
        currencyQuotes: state.purchaseReducer.currencyQuotes,
        payment: state.purchaseReducer.payment,
        tokenBuys: state.purchaseReducer.tokenBuys,
        wallets: state.purchaseReducer.wallets,
        sales: state.purchaseReducer.sales,
        payments: state.purchaseReducer.payments,
        getPaymentsLoading: state.purchaseReducer.getPaymentsLoading,
        getPaymentsError: state.purchaseReducer.getPaymentsError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPayment: (req) => dispatch(PurchaseActions.createPayment(req.data)),
        createPaymentErrorReset: () => dispatch(PurchaseActions.createPaymentErrorReset()),
        getTokenBuys: (req) => dispatch(PurchaseActions.getTokenBuys(req.userId, req.paymentId, req.token)),
        getTokenBuysErrorReset: () => dispatch(PurchaseActions.getTokenBuysErrorReset()),
        getPayments: (req) => dispatch(PurchaseActions.getPayments(req.userId, req.token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseWaiting);
