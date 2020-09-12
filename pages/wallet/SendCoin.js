import React, { Component } from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';

import { WalletActions } from '../../redux/app/actions';


class SendCoin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            to: '',
            amount: 0,
            coinType: 'Ethereum',
            transactionId: null,
            transactionDone: false,
            errorMsg: '',
        };

        this.onAddressChange = this.onAddressChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.etherSendingError !== (null || undefined)) {
            this.setState({
                errorMsg: nextProps.etherSendingError,
            });
        } else if (nextProps.parsecTokenSendingError !== (null || undefined)) {
            this.setState({
                errorMsg: nextProps.parsecTokenSendingError,
            });
        } else {
            if (nextProps.transactionId) {
                this.setState({
                    transactionDone: true,
                });
            }
        }
    }

    onAddressChange = (e) => {
        this.setState({
            to: e.target.value,
        });
    }

    onAmountChange = (e) => {
        this.setState({
            amount: e.target.value,
        });
    }

    onOptionChange = (e) => {
        this.setState({
            coinType: e.target.value,
        });
    }

    onSubmit = (e) => {
        const { userId, userToken, sendEther, sendParsecToken, } = this.props;
        const { to, amount, coinType, } = this.state;

        e.preventDefault();

        (coinType === 'Ethereum') ?
            sendEther(to, amount, userId, userToken)
        :   sendParsecToken(to, amount, userId, userToken)
    }

    render() {
        const { transactionId, userId } = this.props;
        const { transactionDone, errorMsg } = this.state;

        return (
            <form className='ga-sec-content send-coin-form' onSubmit={(e) => this.onSubmit(e)}>
                <div className='row'>
                    <div className='col-md-12 ga-sc-title'>
                        <h1>Send Ether & Tokens</h1>
                        <div className='row p-5'>
                            <div className='radio mr-5'>
                                <label className='option-label'>
                                    <input
                                        type='radio'
                                        value='Ethereum'
                                        checked={this.state.coinType === 'Ethereum'}
                                        onChange={this.onOptionChange}
                                    />
                                    Ethereum
                                </label>
                            </div>
                            <div className='radio'>
                                <label className='option-label'>
                                    <input
                                        type='radio'
                                        value='PRSC Tokens'
                                        checked={this.state.coinType === 'PRSC Tokens'}
                                        onChange={this.onOptionChange}
                                    />
                                    PRSC Tokens
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-block'>
                    <h5>Send {this.state.coinType}</h5>
                    <div className='row mb-2'>
                        <h6 className='col-4'>To Address:</h6>
                        <input type='text' className='col-8' value={this.state.to} onChange={this.onAddressChange} />
                    </div>
                    <div className='row mb-2'>
                        <h6 className='col-4'>Amount:</h6>
                        <input type='text' className='col-8' value={this.state.amount} onChange={this.onAmountChange} />
                    </div>
                    <div className='row align-items-end justify-content-end'>
                        <button type='submit' className='btn btn-round primary'>
                            Send
                        </button>
                    </div>
                </div>
                {
                    (errorMsg !== '' )&&
                    <div className='row'>
                        <span>{errorMsg}</span>
                    </div>
                }
                {
                    (transactionDone === true )&&
                    <div className='row'>
                        <span>Transaction done successfully</span>
                        <a href={`https://etherscan.io/tx/${transactionId}`}>View more</a>
                    </div>
                }
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        transactionId: state.walletReducer.transactionId,
        etherSendingError: state.walletReducer.etherSendingError,
        parsecTokenSendingError: state.walletReducer.parsecTokenSendingError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendEther: (to, amount, userId, userToken) => dispatch(WalletActions.sendEther(to, amount, userId, userToken)),
        sendParsecToken: (to, amount, userId, userToken) => dispatch(WalletActions.sendParsecToken(to, amount, userId, userToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendCoin);
