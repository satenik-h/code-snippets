import React, { Component } from 'react';
import { connect } from 'react-redux';

import { WalletActions } from '../../redux/app/actions';


class WalletCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMsg: '',
        }
    }

    onSubmit = (e) => {
        const { userId, userToken, createWallet, } = this.props;

        e.preventDefault();

        createWallet(userId, userToken);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errorMsg: '',
        });
    }

    render () {
        const { errorMsg } = this.state;

        return (
            <div className='content-form content-wrapper'>
                <div className='row mb-4'>
                    <div className='col-md-12'>
                        <h1>My Wallet</h1>
                    </div>
                </div>
                <div className='row d-flex p-30'>
                    <div className='col-md-12 info-block full-width'>
                        <h6>Are you new to blockchain? Please read our introduction on how to proceed:</h6>
                        <a
                            href='https://medium.com/parsec-frontiers/from-crypto-newbie-to-ship-captain-in-parsec-frontiers-1bb48761604a'
                        >
                            https://medium.com/parsec-frontiers/from-crypto-newbie-to-ship-captain-in-parsec-frontiers-1bb48761604a
                        </a>
                    </div>
                </div>
                <div className='row d-flex p-30'>
                    <div className='col-md-12 p-0'>
                        <form id='walletCreateForm' method='POST' onSubmit={(e) => this.onSubmit(e)}>
                            <h5 className='no-wallet'>You have no wallet</h5>
                            <div className='create-wallet-form1'>
                                {
                                    errorMsg &&
                                    <div className='row'>
                                        <span>{errorMsg}</span>
                                    </div>
                                }
                                <button type='submit' className='btn btn-primary'>
                                    Create New Wallet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        walletAddress: state.walletReducer.walletAddress,
        walletCreatingError: state.walletReducer.walletCreatingError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createWallet: (userId, userToken) => dispatch(WalletActions.createWallet(userId, userToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletCreate);
