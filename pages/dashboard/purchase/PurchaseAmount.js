import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import formSerialize from 'form-serialize';

import {PurchaseActions} from '../../../redux/app/actions';
import LoadingOverlay from '../../../components/Common/LoadingOverlay';
import {normalizeCryptoAmount, makeCryptoString, pushToGTM, getSubData} from '../../../constants/Helpers';

let SHA3 = require('crypto-js/sha3');

class PurchaseAmount extends Component {
    componentWillMount() {
        const {
            restrictions,
            currencyQuotes,
            supportedCurrencies
        } = this.props;
        const {currency} = this.props.params;
        const supportedCurrency = ['btc', 'eth', 'ltc', 'bch'];

        if ((restrictions !== "no") || !supportedCurrencies || supportedCurrencies.length === 0) {
            this.context.router.push('/purchase/intro');
        }

        if (typeof currency === 'undefined' || supportedCurrency.indexOf(currency) === -1) {
            this.context.router.push('/purchase/currency');
        } else {
            const tokenPrice = normalizeCryptoAmount(currencyQuotes['psrc' + currency], currency);
            if (!tokenPrice) {
                this.context.router.push('/purchase/currency');
            }

            const min = {'btc': 0.01, 'eth': 0.1, 'ltc': 0.3, 'bch': 0.01};
            this.setState({
                tokenPrice,
                subunitValue: normalizeCryptoAmount(1, currency),
                amountOK: true,
                minAmount: min[currency],
                minTokens: Math.round(min[currency] / tokenPrice),
                netAmount: makeCryptoString(min[currency]),
                grossAmount: makeCryptoString(min[currency]),
                tokens: Math.round(min[currency] / tokenPrice),
                validAddress: true
            });
        }
    }

    onTokenChanges = (e) => {
        const tokens = Math.max(!!e.target.value ? parseInt(e.target.value) : 0, this.state.minTokens);
        const netAmount = tokens * this.state.tokenPrice;
        const grossAmount = netAmount;
        const fee = 0.0;
        this.updateValues(grossAmount, makeCryptoString(grossAmount, this.props.params.currency), netAmount, fee, tokens);
    };

    onGrossChanges = (e) => {
        const rawValue = (e.target.value || '0').replace(/[^0-9.,]/g, "");
        const floatRegexp = /^([0-9]*)?([\.\,]*)?([0-9.,]*)?$/i;
        const amountMatches = rawValue.match(floatRegexp);
        amountMatches[3] = amountMatches[3] && amountMatches[3].replace(/[,.]/g, "");
        const amountAsString = (amountMatches[1] || "0") + '.' + amountMatches[3];
        const grossAmount = parseFloat(amountAsString);
        const fee = 0.0;
        const netAmount = grossAmount - fee;
        const tokens = this.calculateTokens(netAmount);
        let grossAmountString = makeCryptoString(grossAmount, this.props.params.currency);
        if (Number.isInteger(grossAmount) && !!amountMatches[2])
            grossAmountString += ".";
        grossAmountString += (amountMatches[3] && amountMatches[3].match(/0*$/)[0]) || "";
        this.updateValues(grossAmount, grossAmountString, netAmount, fee, tokens);
    };

    updateValues = (grossAmountFloat, grossAmountString, netAmount, fee, tokens) => {
        this.setState({
            amountOK: grossAmountFloat >= this.state.minAmount,
            grossAmount: grossAmountString,
            fee: makeCryptoString(fee, this.props.params.currency),
            netAmount: makeCryptoString(netAmount, this.props.params.currency),
            tokens
        });
    };

    calculateTokens = (netAmount) => {
        if (!netAmount || !this.state.tokenPrice) {
            return 0;
        }
        return Math.round(netAmount / this.state.tokenPrice);
    };

    // walletChange = () => {
    //     if (!this.state.validAddress) {
    //         this.setState({
    //             validAddress: true
    //         });
    //     }
    // };

    sha3 = (value) => {
        return SHA3(value, {
            outputLength: 256
        }).toString();
    };

    // isAddress = (address) => {
    //     if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    //         // Check if it has the basic requirements of an address
    //         return false;
    //     } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    //         // If it's all small caps or all all caps, return true
    //         return true;
    //     } else {
    //         // Otherwise check each case
    //         return this.isChecksumAddress(address);
    //     }
    // };

    // isChecksumAddress = (address) => {
    //     // Check each case
    //     address = address.replace('0x','');
    //     let addressHash = this.sha3(address.toLowerCase());
    //
    //     for (let i = 0; i < 40; i++ ) {
    //         // The nth letter should be uppercase if the nth digit of casemap is 1
    //         if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
    //             (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    onSubmit = (e) => {
        e.preventDefault();

        let data = formSerialize(e.target, {hash: true});
        // data.grossAmount = parseFloat(data.grossAmount.replace(',', '.').replace("/^0+/", "0").replace("/^./", "0."));
        // data.netAmount = parseFloat(data.netAmount.replace(',', '.').replace("/^0+/", "0").replace("/^./", "0."));
        // data.fee = parseFloat(data.fee.replace(',', '.').replace("/^0+/", "0").replace("/^./", "0."));
        // if (!this.isAddress(data.wallet.trim())) {
        //     this.setState({
        //         validAddress: false
        //     });
        //     return false;
        // } else {
        //     this.setState({
        //         validAddress: true
        //     });
        // }

        data.currency = this.props.params.currency;
        data.id = this.props.userId;
        data.operation = "credit";
        data.type = "crypto";
        const sub_data = getSubData();

        if (sub_data) {
            data.sub_data = sub_data;
        }

        this.props.createPayment({
            data: data,
            token: this.props.userToken
        }).then(paymentId => {
            let newData = {
                id: data.id,
                paymentId: paymentId,
                coinAmount: this.state.tokens,
                tokenPrice: this.state.tokenPrice,
                // withdrawAddress: data.wallet.trim()
            };
            this.props.tokenBuys({
                data: newData,
                token: this.props.userToken
            }).then(() => {
                pushToGTM({'event': 'cm-deposit'}, 'depositEvent');
                this.context.router.push('/purchase/waiting/' + paymentId);
            }).catch(() => {
                this.props.removePayment({
                    token: this.props.userToken,
                    paymentId: paymentId
                });
            });
        });

        this.props.createPaymentErrorReset();
        this.props.tokenBuysErrorReset();
    };

    render() {
        return (
            <div className="container-fluid no-breadcrumbs">
                <LoadingOverlay overlayClass={(this.props.loading) ? 'overlay show' : 'overlay'} message=""/>

                <form className="form-horizontal" method="POST" onSubmit={(e) => this.onSubmit(e)}>
                    <QueueAnim type="bottom" className="ui-animate">
                        <div className="mb-4 d-md-flex align-items-center" key="1">
                            <a href="#/purchase/currency" className="btn btn-round btn-transparent btn-border px-3 py-2 text-small color-primary">
                                <i className="fa fa-chevron-left" /> Go Back
                            </a>

                            <div className="ml-md-3 mt-3 mt-md-0">
                                <h4 className="mt-0 mb-1">
                                    You have chosen to Buy <span className="primary font-weight-bold">
                                    COIN</span> paying in <span className="secondary font-weight-bold text-uppercase">
                                    {this.props.params.currency}</span>
                                </h4>
                                <h6 className="m-0 font-weight-light color-dark-3">Please make sure you made the right choice</h6>
                            </div>
                        </div>

                        <div className="row" key="2">
                            <div className="col-md-10 offset-md-1">
                                <div className="row d-flex">
                                    <div className="col-xl-7 mt-3">
                                        <div className="h-100 box bg-secondary color-white">
                                            <div className="h-100 px-5 pt-4 pb-2 pb-md-1 box-body">
                                                <h4 className="no-margin">How much COIN do you need?</h4>

                                                <span>Enter amount of COIN to buy, or <span className="text-uppercase">{this.props.params.currency}</span> to sell</span>

                                                <div className="mt-4 mb-2 d-md-flex border-2-dark border-radius-2">
                                                    <div className="p-5 d-flex align-items-center justify-content-center bg-primary text-center">
                                                        <img className="" src="/assets/images/exchange.png" />
                                                    </div>

                                                    <div className="px-3 flex-1 bg-white d-flex flex-column color-dark-3 min-height-120">
                                                        <div className="flex-1 py-1 d-flex align-items-center">
                                                            <span>When you sell</span>
                                                            <div className="flex-1 ml-1 d-flex align-items-center text-right">
                                                                <input className="purchase-amount-input flex-1 mr-1 border-0 text-medium font-weight-bold text-right"
                                                                       type="text" min="0" step={this.state.subunitValue} placeholder="0" name="grossAmount"
                                                                       onChange={(e) => this.onGrossChanges(e)} value={this.state.grossAmount} required />
                                                                <span className="text-uppercase">{this.props.params.currency}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex-1 py-1 d-flex align-items-center justify-content-between bt-gray-2">
                                                            <span>You will receive</span>
                                                            <div className="flex-1 ml-1 d-flex align-items-center text-right">
                                                                <input className="purchase-amount-input flex-1 mr-1 border-0 text-medium font-weight-bold text-right"
                                                                       type="number" name="tokens" placeholder="0" min={this.state.minTokens}
                                                                       onChange={(e) => this.onTokenChanges(e)} value={this.state.tokens} required />
                                                                <span className="text-uppercase">coin</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-medium text-right">
                                                    <span style={{ color: this.state.amountOK ? "green" : "red" }} >
                                                        Min: <b className="text-uppercase">{this.state.minAmount} {this.props.params.currency}</b>
                                                        {this.state.amountOK ?
                                                            <a className="fa fa-check" /> :
                                                            <a className="fa fa-times" />}
                                                    </span>
                                                    {/*<span className="ml-4">Max: <b className="text-uppercase">1000 {this.props.params.currency}</b></span>*/}
                                                </div>

                                                <div className="position-relative px-3 purchase-amount-bg">
                                                    <div className="d-flex align-items-end">
                                                        <div className="position-relative">
                                                            <img src="/assets/images/buildings.png" />

                                                            <div className="purchase-amount-board">
                                                                <img src="/assets/images/board.png" />

                                                                <div className="purchase-board-text text-center">
                                                                    <h6 className="mb-0 color-purple-4"><span className="text-white text-uppercase">1 {this.props.params.currency}</span> gets you</h6>
                                                                    <div className="text-medium font-weight-bold text-white">
                                                                        {(1/this.state.tokenPrice).toFixed(0)} PSRC
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <img className="ml-5 align-bottom purchase-amount-tree" src="/assets/images/tree.png" />

                                                        <div className="position-relative ml-5 align-bottom purchase-amount-windmill">
                                                            <img src="/assets/images/windmill_house.png" />
                                                            <img className="purchase-amount-windmill-blade" src="/assets/images/windmill_blade.png" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-5 mt-3">
                                        <div className="h-100 box box-default d-flex flex-column color-dark">
                                            <div className="box-header bg-gray-3 rounded-top">
                                                <h6 className="no-margin">Purchase details</h6>
                                            </div>

                                            <div className="box-body p-3 flex-1">
                                                <div className="h-100">
                                                    <div className="bg-gray-3">
                                                        <div className="p-2 flex-1 d-flex align-items-center justify-content-between">
                                                            <span className="color-dark-2">Coin to Buy</span>
                                                            <div className="flex-1 ml-1 d-flex align-items-center text-right">
                                                                <input className="purchase-amount-input flex-1 mx-1 bg-transparent border-0 text-right"
                                                                       type="text" placeholder="0" value={this.state.tokens} readOnly required />
                                                                <span className="color-dark-3">PSRC</span>
                                                            </div>
                                                        </div>

                                                        <div className="p-2 flex-1 d-flex align-items-center justify-content-between bt-white">
                                                            <span className="color-dark-2">COIN Price</span>
                                                            <div className="flex-1 ml-1 d-flex align-items-center text-right">
                                                                <input className="purchase-amount-input flex-1 mx-1 bg-transparent border-0 text-right"
                                                                       type="text" placeholder="0" value={makeCryptoString(this.state.tokenPrice, this.props.params.currency)} readOnly required />
                                                                <span className="color-dark-3 text-uppercase">{this.props.params.currency}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 bg-gray-4">
                                                        <div className="p-2 flex-1 d-flex align-items-center justify-content-between">
                                                            <span className="secondary">NET Amount</span>
                                                            <div className="flex-1 ml-1 d-flex align-items-center text-right">
                                                                <input className="purchase-amount-input flex-1 mx-1 bg-transparent border-0 text-right"
                                                                       type="text" name="netAmount" placeholder="0" value={this.state.netAmount} readOnly required />
                                                                <span className="color-green-4 text-uppercase">{this.props.params.currency}</span>
                                                            </div>
                                                        </div>

                                                        <div className="p-2 flex-1 d-flex align-items-center justify-content-between bt-white">
                                                            <span className="secondary">Commission (0.0%)</span>
                                                            <div className="flex-1 ml-1 d-flex align-items-center text-right">
                                                                <input className="purchase-amount-input flex-1 mx-1 bg-transparent border-0 text-right"
                                                                       type="text" name="fee" value="0" readOnly required />
                                                                <span className="color-green-4 text-uppercase">{this.props.params.currency}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="box-footer">
                                                <div className="px-4 py-2 d-flex align-items-center justify-content-between bg-purple-3 rounded-bottom text-white">
                                                    <b>Gross Amount</b>
                                                    <div className="flex-1 ml-1 d-flex align-items-center text-right">
                                                        <input className="purchase-amount-input flex-1 mx-1 bg-transparent border-0 font-weight-bold text-white text-right"
                                                               type="text" placeholder="0" value={this.state.grossAmount} readOnly required />
                                                        <span className="color-purple-4 text-uppercase">{this.props.params.currency}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5" key="3">
                            <div className="col-md-10 offset-md-1">
                                <div className="row box bg-primary px-5 py-4 d-flex border-radius-2">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="mt-0 text-white" htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" value={this.props.userEmail}
                                                   className="m-0 bg-purple-3 border-transparent" readOnly required />
                                        </div>

                                        <div className="form-group">
                                            {/*<div className="d-flex justify-content-between align-items-center">*/}
                                                {/*<label className="m-0 text-white" htmlFor="wallet">Your ETH Wallet</label>*/}

                                                {/*<div className="hidden-md-down">*/}
                                                    {/*<img className="mr-2" src="/assets/images/warning.png" width={16} />*/}
                                                    {/*<i className="fa fa-long-arrow-right text-white" aria-hidden="true" />*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<input type="text" id="wallet" name="wallet" placeholder="ETH Address / 42 Symbols"*/}
                                                   {/*className="m-0 border-transparent" onChange={() => this.walletChange()} required />*/}
                                            <span className="color-purple-4">Once the tokens have minted and available for distribution you will be given the option to add them to your exchange wallet or withdraw them to a compatible ERC20 wallet.</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-0">
                                            <div className="custom-checkbox d-flex justify-content-center">
                                                <Toggle label="" defaultToggled={false} required />

                                                <span className="color-purple-4">
                                                    I have double-checked the selected currency, amount, and fees and agree with the&nbsp;
                                                    <a href="https://parsecfrontiers.com/wp-content/uploads/terms-conditions.pdf" className="text-white no-underline" target="_blank">
                                                        COIN Token Sale Terms and Conditions
                                                    </a> as well as the <a href="https://parsecfrontiers.com/privacy-policy/" className="text-white no-underline" target="_blank">
                                                        parsecfrontiers Privacy Policy
                                                    </a>, <a href="https://parsecfrontiers.com/terms-of-use/" className="text-white no-underline" target="_blank">
                                                        Website Terms of Use
                                                    </a>, and <a href="https://parsecfrontiers.com/risk-disclaimer/" className="text-white no-underline" target="_blank">
                                                        Risk Disclaimers
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/*<div className="col-lg-6 pl-md-5 d-flex flex-column justify-content-center">*/}
                                        {/*<div className="position-relative p-5 border-purple-3 border-radius-1">*/}
                                            {/*<img className="warning" src="/assets/images/warning.png" />*/}
                                            {/*<div className="text-small font-weight-medium color-purple-4 text-justify">*/}
                                                {/*<span className="text-warning">ATTENTION:</span> Regardless of how you*/}
                                                {/*are making your purchase an ETH wallet is needed to link to the smart*/}
                                                {/*contract that is in control of the COIN (PSRC) token distribution.*/}
                                                {/*This wallet will be where we'll distribute your COIN should you choose*/}
                                                {/*to withdraw it from our platform once it has been minted and is ready*/}
                                                {/*for distribution, shortly following the close of our main token sale*/}
                                                {/*in late March of 2018. <b className="text-white">Do not register a wallet*/}
                                                {/*address from an exchange</b> (Kraken, Poloniex, Coinbase, etc.)*/}
                                                {/*Be sure to enter the address of a wallet that allows you to be interact*/}
                                                {/*with ERC20 token contracts, such as&nbsp;*/}
                                                {/*<a href="https://www.myetherwallet.com/" className="text-white" target="_blank">EtherWallet</a>,*/}
                                                {/*&nbsp;<a href="https://www.parity.io/" className="text-white" target="_blank">Parity</a>&nbsp;or*/}
                                                {/*&nbsp;<a href="https://metamask.io/" className="text-white" target="_blank">MetaMask</a>.*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5" key="4">
                            <div className="col-md-4 offset-md-4">
                                <div className="form-group">
                                    <span className="text-danger">{this.props.error}</span>

                                    {/*<span className={"text-danger" + (this.state.validAddress ? " hidden-xs-up" : "")}>*/}
                                        {/*Invalid Ethereum Address*/}
                                    {/*</span>*/}
                                </div>

                                <button type="submit" className="btn btn-full btn-round primary" disabled={this.props.loading}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </QueueAnim>
                </form>
            </div>
        );
    }
}

PurchaseAmount.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        restrictions: state.userReducer.userData.restrictions,
        userEmail:  state.userReducer.userData.email,
        supportedCurrencies: state.purchaseReducer.supportedCurrencies,
        currencyQuotes: state.purchaseReducer.currencyQuotes,
        loading: state.purchaseReducer.createPaymentLoading || state.purchaseReducer.tokenBuysLoading,
        error: state.purchaseReducer.createPaymentError || state.purchaseReducer.tokenBuysError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPayment: (req) => dispatch(PurchaseActions.createPayment(req.data, req.token)),
        tokenBuys: (req) => dispatch(PurchaseActions.tokenBuys(req.data, req.token, req.errcb)),
        createPaymentErrorReset: () => dispatch(PurchaseActions.createPaymentErrorReset()),
        tokenBuysErrorReset:  () => dispatch(PurchaseActions.tokenBuysErrorReset()),
        removePayment: (req) => dispatch(PurchaseActions.removePayment(req.paymentId, req.token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseAmount);
