import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { QRCode } from 'react-qr-svg';
import fileDownload from 'js-file-download';
import ReactModal from 'react-modal';
import { keccak256 } from 'js-sha3';

import { WalletActions } from '../../redux/app/actions';


class WalletInfoView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            coinType: 'Ethereum',
            to: '',
            amount: 0,
            errors: {
                address: '',
                amount: '',
            },
        };
    }

    componentDidMount() {
        this.getBalance();
        this.intervalId = setInterval(this.getBalance, 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentWillReceiveProps(nextProps) {
        this.getWallet();
    }
    
    isChecksumAddress = (address) => {
        // Check each case
        address = address.replace('0x','');
        var addressHash = keccak256(address.toLowerCase());
        for (var i = 0; i < 40; i++ ) {
            // the nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    }

    isEthAddress = (address) => {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return this.isChecksumAddress(address);
        }
    }

    getBalance = () => {
        const { userId, userToken, getBalance } = this.props;

        getBalance({
            userId: userId,
            token: userToken,
        });
    }

    getWallet = () => {
        const { userId, userToken, getWallet } = this.props;

        getWallet({
            userId: userId,
            token: userToken,
        });
    }

    onSendEther = () => {
        this.setState({
            isModalOpen: true,
            coinType: 'Ethereum',
        });
    }

    onSendToken = () => {
        this.setState({
            isModalOpen: true,
            coinType: 'PRSC Tokens',
        });
    }

    onAfterModalOpen = () => {
        this.modalForm.style = {
            backgroundColor: 'white',
            padding: '20px',
        };
        this.modalTitle.style.color = '#333';
        this.addressLabel.style.color = '#333';
        this.amountLabel.style.color = '#333';
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
            to: '',
            amount: '',
            errors: {},
        });
    }

    onSend = () => {
        const { coinType, to, amount } = this.state;
        const { userId, userToken, sendEther, sendParsecToken } = this.props;

        const errors = {};
        if (!this.isEthAddress(to)) {
            errors.address = 'Invalid ethereum address!';
        }
        if (parseFloat(amount) === NaN || parseFloat(amount) <= 0) {
            errors.amount = 'Invalid amount!';
        }
        this.setState({ errors });
        if (errors.address || errors.amount) {
            return;
        }

        (coinType === 'Ethereum') ?
            sendEther(to, amount, userId, userToken)
        :   sendParsecToken(to, amount, userId, userToken)

        this.closeModal();
    }

    onCancel = () => {
        this.setState({
            to: '',
            amount: 0,
        });

        this.closeModal();
    }

    onAddressChange = (e) => {
        this.setState({
            to: e.target.value,
        });
    }

    onAmountChange = (e) => {
        this.setState({
            amount: (e.target.value || '').replace(/[^0-9\.]/g, ''),
        });
    }

    handleChange = (e) => {

    }

    render() {
        const { downloadKey, onSendEther, onSendToken, onAfterModalOpen, closeModal, onCancel, onSend, handleChange } = this;
        const { ethBalance, prscBalance, walletAddress } = this.props;
        const { isModalOpen, errors } = this.state;

        const modalStyle =  {
            overlay: {
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },

            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                minWidth: '300px',
                width: '60vw',
                padding: '50px',
                transform: 'translate(-50%, -50%)',
            }
        };

        return (
            <div className='content-form content-wrapper'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>My Wallet</h1>
                    </div>
                </div>
                <div className='row d-flex p-30'>
                    <div className='info-block full-width'>
                        <h6>Are you new to blockchain? Please read our introduction on how to proceed:</h6>
                        <a
                            href='https://medium.com/parsec-frontiers/from-crypto-newbie-to-ship-captain-in-parsec-frontiers-1bb48761604a'
                        >
                            https://medium.com/parsec-frontiers/from-crypto-newbie-to-ship-captain-in-parsec-frontiers-1bb48761604a
                        </a>
                    </div>
                </div>
                <div className='row d-flex'>
                    <div className='col-md-8 p-30'>
                        <div className='info-block wallet fill'>
                            <div className='row info-row'>
                                <label className='heading bold'>Your Address</label>
                                <input type='text' value={walletAddress} onChange={handleChange} disabled={true} />
                            </div>
                            <br/>
                            <div className='row info-row d-inline-flex flex-row align-items-center justify-content-center full-width mt-4'>
                                {
                                    walletAddress &&
                                    <QRCode
                                        bgColor='white'
                                        fgColor='black'
                                        level='Q'
                                        style={{ width: 225 }}
                                        value={walletAddress}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 p-30'>
                        <div className='info-block d-flex flex-column align-items-left justify-content-center fill balance-card'>
                            <div className='row info-row'>
                                <h4>My Balance</h4>
                            </div>

                            <div className='row info-row wallet'>
                                <div className='d-flex flex-row align-items-left'>
                                    <img className='symbol' src="/assets/images/ethlogo_32px.png" />
                                    <label className='coin'><b>{ethBalance}</b> ETH</label>
                                </div>
                            </div>

                            <div className='row info-row wallet'>
                                <div className='d-flex flex-row align-items-left'>
                                    <img className='symbol' src="/assets/images/prsc_32px.png" />
                                    <label className='coin'><b>{prscBalance}</b> PRSC</label>
                                </div>
                            </div>

                            <br />

                            <div className='row info-row'>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={onSendEther}>
                                    Withdraw Ether
                                </button>
                                <br />
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={onSendToken}>
                                    Withdraw Parsecs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactModal
                    isOpen={isModalOpen}
                    onAfterOpen={onAfterModalOpen}
                    onRequestClose={closeModal}
                    style={modalStyle}
                    closeTimeoutMS={400}
                    ariaHideApp={false}
                >
                    <div ref={modalForm => this.modalForm = modalForm}>
                        <div className='form-block'>
                            <h5 ref={modalTitle => this.modalTitle = modalTitle}>Withdraw {this.state.coinType == 'Ethereum' ? 'Ether' : 'Parsecs'} from this wallet</h5>
                            <div style={{color: '#777', fontSize: '14px', marginBottom: '10px'}}>
                                <b>Notice:</b> Transaction fee up to ~0.01 ETH will be paid from your wallet
                                {
                                    this.state.coinType == 'Ethereum' &&
                                    <span>&nbsp;so do not withdraw all you have!</span>
                                }
                            </div>
                            <div className='row mb-2'>
                                <h6 ref={addressLabel => this.addressLabel = addressLabel} className='col-4'>To Address:</h6>
                                <input type='text' className='col-8' style={{border: '1px solid #ccc'}} placeholder='Double check address, transaction is irreversible' value={this.state.to} onChange={this.onAddressChange} />
                                {
                                    errors.address &&
                                    <p className="offset-4 text-danger">{ errors.address }</p>
                                }
                            </div>
                            <div className='row mb-2'>
                                <h6 ref={amountLabel => this.amountLabel = amountLabel} className='col-4'>Amount, {this.state.coinType == 'Ethereum' ? 'ETH' : 'Parsecs'}:</h6>
                                <input type='text' className='col-8' style={{border: '1px solid #ccc'}} value={this.state.amount} onChange={this.onAmountChange} />
                                {
                                    errors.amount &&
                                    <p className="offset-4 text-danger">{ errors.amount }</p>
                                }
                            </div>
                            <div className='row d-flex align-items-end justify-content-end'>
                                <button
                                    ref={cancelButton => this.cancelButton = cancelButton}
                                    className='btn btn-danger mr-2'
                                    onClick={onCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    ref={sendButton => this.sendButton = sendButton}
                                    className='btn btn-success'
                                    onClick={onSend}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

WalletInfoView.propTypes = {
    userId: PropTypes.string,
    userToken: PropTypes.string,
    walletAddress: PropTypes.string,
    ethBalance: PropTypes.string,
    prscBalance: PropTypes.string,
    etherSending: PropTypes.bool,
    etherSendingError: PropTypes.string,
    parsecTokenSending: PropTypes.bool,
    parsecTokenSendingError: PropTypes.string,
    getWallet: PropTypes.func,
    getBalance: PropTypes.func,
    sendEther: PropTypes.func,
    sendParsecToken: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        walletAddress: state.walletReducer.walletAddress,
        ethBalance: state.walletReducer.ethBalance,
        prscBalance: state.walletReducer.prscBalance,
        etherSending: state.walletReducer.etherSending,
        etherSendingError: state.walletReducer.etherSendingError,
        parsecTokenSending: state.walletReducer.parsecTokenSending,
        parsecTokenSendingError: state.walletReducer.parsecTokenSendingError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getWallet: (req) => dispatch(WalletActions.getWallet(req.userId, req.token)),
        getBalance: (req) => dispatch(WalletActions.getBalance(req.userId, req.token)),
        sendEther: (to, amount, userId, userToken) => dispatch(WalletActions.sendEther(to, amount, userId, userToken)),
        sendParsecToken: (to, amount, userId, userToken) => dispatch(WalletActions.sendParsecToken(to, amount, userId, userToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfoView);
